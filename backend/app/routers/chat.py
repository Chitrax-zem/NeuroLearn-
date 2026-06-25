from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.models.user import User
from app.models.knowledge_pack import KnowledgePack, DocumentChunk
from app.models.analytics import Analytics
from app.schemas.chat import ChatRequest, ChatResponse, Source
from app.services.faiss_service import faiss_service
from app.services.llm_service import answer_question
from app.utils.auth import get_current_user

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(
    body: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    print("\n========== CHAT REQUEST ==========")
    print("User ID:", current_user.id)
    print("Pack ID:", body.pack_id)
    print("Question:", body.question)
    print("==================================\n")

    # ==================================
    # Find Knowledge Pack
    # ==================================
    pack = (
        db.query(KnowledgePack)
        .filter(KnowledgePack.id == body.pack_id)
        .first()
    )

    if not pack:
        raise HTTPException(
            status_code=404,
            detail="Knowledge pack not found"
        )

    # ==================================
    # Access Control
    # ==================================
    if not pack.is_public and pack.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    sources_out = []
    context_chunks = []

    # ==================================
    # FAISS Search
    # ==================================
    try:
        print("Searching FAISS index...")

        results = faiss_service.search_chunks(
            body.pack_id,
            body.question,
            top_k=5
        )

        print(f"FAISS returned {len(results)} results")

        for chunk_meta, score in results:
            context_chunks.append(chunk_meta["content"])

            sources_out.append(
                Source(
                    chunk_id=chunk_meta["id"],
                    content=(
                        chunk_meta["content"][:200] + "..."
                        if len(chunk_meta["content"]) > 200
                        else chunk_meta["content"]
                    ),
                    page=chunk_meta.get("page"),
                    relevance_score=float(score),
                )
            )

    except FileNotFoundError:
        print("FAISS index not found. Using DB fallback.")

        db_chunks = (
            db.query(DocumentChunk)
            .filter(DocumentChunk.pack_id == body.pack_id)
            .limit(5)
            .all()
        )

        for chunk in db_chunks:
            context_chunks.append(chunk.content)

            sources_out.append(
                Source(
                    chunk_id=chunk.id,
                    content=(
                        chunk.content[:200] + "..."
                        if len(chunk.content) > 200
                        else chunk.content
                    ),
                    page=chunk.source_page,
                    relevance_score=0.5,
                )
            )

    except Exception as e:
        print("FAISS ERROR:", str(e))

    print("CONTEXT CHUNKS FOUND:", len(context_chunks))

    # ==================================
    # Fallback Context
    # ==================================
    if not context_chunks:
        print("No chunks found. Using pack summary.")

        context_chunks = [
            f"""
Subject: {pack.subject}
Title: {pack.title}
Summary: {pack.summary or 'No summary available'}
"""
        ]

    # ==================================
    # Conversation History
    # ==================================
    history = []

    if body.history:
        history = [
            {
                "role": msg.role,
                "content": msg.content
            }
            for msg in body.history
        ]

    # ==================================
    # LLM Call
    # ==================================
    try:
        print("Calling LLM...")

        answer = answer_question(
            body.question,
            context_chunks,
            history
        )

        print("\n========== AI RESPONSE ==========")
        print(answer[:500])
        print("=================================\n")

    except Exception as e:
        print("\n========== AI ERROR ==========")
        print(type(e).__name__)
        print(str(e))
        print("==============================\n")

        answer = (
            f"AI Error: {str(e)}\n\n"
            f"Context Preview:\n"
            f"{context_chunks[0][:500]}"
        )

    # ==================================
    # Analytics Tracking
    # ==================================
    try:
        today = date.today()

        analytics = (
            db.query(Analytics)
            .filter(
                Analytics.user_id == current_user.id,
                Analytics.date == today
            )
            .first()
        )

        if analytics:
            analytics.questions_asked += 1
            analytics.ai_sessions += 1

        else:
            analytics = Analytics(
                user_id=current_user.id,
                date=today,
                questions_asked=1,
                ai_sessions=1,
            )

            db.add(analytics)

        db.commit()

        print(
            "Analytics Updated:",
            analytics.questions_asked,
            analytics.ai_sessions,
        )

    except Exception as e:
        print("Analytics Error:", str(e))
        db.rollback()

    # ==================================
    # Response
    # ==================================
    return ChatResponse(
        answer=answer,
        sources=sources_out,
        pack_id=body.pack_id,
        tokens_used=None,
    )