from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.database import get_db
from app.models.user import User
from app.models.analytics import Analytics
from app.models.knowledge_pack import KnowledgePack, DocumentChunk
from app.schemas.knowledge_pack import UploadResponse
from app.services.pdf_service import extract_text_from_pdf, chunk_text
from app.services.faiss_service import faiss_service
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/upload", response_model=UploadResponse)
async def upload_pdf(
    file: UploadFile = File(...),
    title: str = Form(...),
    subject: str = Form(...),
    difficulty: str = Form("Intermediate"),
    is_public: bool = Form(False),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    print("\n========== PDF UPLOAD ==========")
    print("User:", current_user.id)
    print("Title:", title)
    print("Subject:", subject)
    print("================================\n")

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )

    file_bytes = await file.read()

    if len(file_bytes) > 20 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File too large (max 20MB)"
        )

    try:
        pages = extract_text_from_pdf(file_bytes)

    except ValueError as e:
        raise HTTPException(
            status_code=422,
            detail=str(e)
        )

    if not pages:
        raise HTTPException(
            status_code=422,
            detail="No extractable text found in PDF"
        )

    full_text = " ".join(
        text for _, text in pages
    )

    # ==================================
    # Create Knowledge Pack
    # ==================================
    pack = KnowledgePack(
        owner_id=current_user.id,
        title=title,
        subject=subject,
        difficulty=difficulty,
        is_public=is_public,
        summary="Processing...",
    )

    db.add(pack)
    db.flush()

    # ==================================
    # Create Chunks
    # ==================================
    raw_chunks = chunk_text(pages)

    faiss_chunks = []

    for i, c in enumerate(raw_chunks):
        chunk = DocumentChunk(
            pack_id=pack.id,
            content=c["content"],
            chunk_index=i,
            source_page=c["page"],
            faiss_id=i,
        )

        db.add(chunk)

        faiss_chunks.append(
            {
                "id": f"{pack.id}_{i}",
                "content": c["content"],
                "page": c["page"],
            }
        )

    # ==================================
    # FAISS Index
    # ==================================
    try:
        faiss_service.save_index(
            pack.id,
            faiss_chunks
        )

    except RuntimeError as e:
        print(
            "FAISS SAVE ERROR:",
            str(e)
        )

    # ==================================
    # Generate AI Content
    # ==================================
    summary = (
        f"Knowledge pack '{title}' "
        f"covering {subject}. "
        f"Contains {len(raw_chunks)} "
        f"content sections across "
        f"{len(pages)} pages."
    )

    flashcards_list = []
    quiz_questions = []

    try:
        from app.services.llm_service import (
            generate_summary,
            generate_flashcards,
            generate_quiz_questions,
        )

        summary = generate_summary(
            full_text,
            title
        )

        flashcards_list = generate_flashcards(
            full_text,
            count=10
        )

        context_chunks = [
            c["content"]
            for c in raw_chunks[:10]
        ]

        quiz_questions = (
            generate_quiz_questions(
                f"{subject} - {title}",
                context_chunks,
                count=10,
            )
        )

    except Exception as e:
        print(
            "AI GENERATION ERROR:",
            str(e)
        )

    # ==================================
    # Save Pack Data
    # ==================================
    pack.summary = summary
    pack.flashcards = flashcards_list
    pack.faiss_index_id = pack.id

    # ==================================
    # Quiz Creation
    # ==================================
    if quiz_questions:
        from app.models.quiz import (
            Quiz,
            QuizQuestion,
        )

        quiz = Quiz(
            pack_id=pack.id,
            title=f"{title} Quiz",
            subject=subject,
            difficulty=difficulty,
            question_count=len(
                quiz_questions
            ),
        )

        db.add(quiz)
        db.flush()

        for i, q in enumerate(
            quiz_questions
        ):
            db.add(
                QuizQuestion(
                    quiz_id=quiz.id,
                    question=q.get(
                        "question",
                        ""
                    ),
                    options=q.get(
                        "options",
                        []
                    ),
                    correct_answer=q.get(
                        "correct_answer",
                        "A"
                    ),
                    explanation=q.get(
                        "explanation",
                        ""
                    ),
                    order_index=i,
                )
            )

    # ==================================
    # Analytics Tracking
    # ==================================
    try:
        today = date.today()

        analytics = (
            db.query(Analytics)
            .filter(
                Analytics.user_id
                == current_user.id,
                Analytics.date
                == today,
            )
            .first()
        )

        if analytics:
            analytics.pdf_uploads += 1

            subjects = (
                analytics.subject_breakdown
                or {}
            )

            subjects[subject] = (
                subjects.get(subject, 0)
                + 1
            )

            analytics.subject_breakdown = (
                subjects
            )

        else:
            analytics = Analytics(
                user_id=current_user.id,
                date=today,
                pdf_uploads=1,
                subject_breakdown={
                    subject: 1
                },
            )

            db.add(analytics)

    except Exception as e:
        print(
            "ANALYTICS ERROR:",
            str(e)
        )

    # ==================================
    # Commit
    # ==================================
    db.commit()

    print(
        "PDF Uploaded Successfully:",
        pack.id
    )

    # ==================================
    # Response
    # ==================================
    return UploadResponse(
        pack_id=pack.id,
        title=title,
        chunks_created=len(raw_chunks),
        flashcards_count=len(
            flashcards_list
        ),
        quiz_questions_count=len(
            quiz_questions
        ),
        summary=summary,
        message=(
            "Knowledge pack created "
            "successfully"
        ),
    )