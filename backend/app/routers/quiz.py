from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.quiz import Quiz, QuizQuestion, QuizResult
from app.models.knowledge_pack import KnowledgePack, DocumentChunk
from app.models.analytics import Analytics
from app.schemas.quiz import QuizOut, SubmitQuizRequest, QuizResultOut
from app.utils.auth import get_current_user
from datetime import date

router = APIRouter()


@router.post("/generate-quiz/{pack_id}", response_model=QuizOut)
def generate_quiz(
    pack_id: str,
    count: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    pack = db.query(KnowledgePack).filter(KnowledgePack.id == pack_id).first()
    if not pack:
        raise HTTPException(status_code=404, detail="Knowledge pack not found")

    existing = db.query(Quiz).filter(Quiz.pack_id == pack_id).first()
    if existing and existing.questions:
        return existing

    chunks = db.query(DocumentChunk).filter(DocumentChunk.pack_id == pack_id).limit(10).all()
    context_chunks = [c.content for c in chunks]

    try:
        from app.services.llm_service import generate_quiz_questions
        questions_data = generate_quiz_questions(f"{pack.subject} - {pack.title}", context_chunks, count)
    except Exception:
        questions_data = []

    quiz = Quiz(
        pack_id=pack_id,
        title=f"{pack.title} Quiz",
        subject=pack.subject,
        difficulty=pack.difficulty,
        question_count=len(questions_data),
    )
    db.add(quiz)
    db.flush()

    for i, q in enumerate(questions_data):
        db.add(QuizQuestion(
            quiz_id=quiz.id,
            question=q.get("question", ""),
            options=q.get("options", []),
            correct_answer=q.get("correct_answer", "A"),
            explanation=q.get("explanation", ""),
            order_index=i,
        ))

    db.commit()
    db.refresh(quiz)
    return quiz


@router.get("/quiz/{quiz_id}", response_model=QuizOut)
def get_quiz(quiz_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz


@router.post("/submit-quiz", response_model=QuizResultOut)
def submit_quiz(
    body: SubmitQuizRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    quiz = db.query(Quiz).filter(Quiz.id == body.quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    questions = db.query(QuizQuestion).filter(QuizQuestion.quiz_id == body.quiz_id).order_by(QuizQuestion.order_index).all()
    correct_answers = [q.correct_answer for q in questions]

    score = sum(1 for user_ans, correct in zip(body.answers, correct_answers) if user_ans.strip().upper() == correct.strip().upper())
    total = len(questions)
    accuracy = (score / total * 100) if total > 0 else 0
    xp_earned = score * 25

    result = QuizResult(
        user_id=current_user.id,
        quiz_id=body.quiz_id,
        score=score,
        total_questions=total,
        accuracy=accuracy,
        time_taken_seconds=body.time_taken_seconds,
        xp_earned=xp_earned,
        answers={"user": body.answers, "correct": correct_answers},
    )
    db.add(result)

    current_user.xp += xp_earned

    today = date.today()
    analytics = db.query(Analytics).filter(Analytics.user_id == current_user.id, Analytics.date == today).first()
    if analytics:
        analytics.quizzes_completed += 1
        analytics.average_quiz_score = (analytics.average_quiz_score + accuracy) / 2
        analytics.xp_earned += xp_earned
    else:
        db.add(Analytics(user_id=current_user.id, date=today, quizzes_completed=1, average_quiz_score=accuracy, xp_earned=xp_earned))

    db.commit()
    db.refresh(result)

    return QuizResultOut(
        id=result.id,
        quiz_id=result.quiz_id,
        score=result.score,
        total_questions=result.total_questions,
        accuracy=result.accuracy,
        xp_earned=result.xp_earned,
        time_taken_seconds=result.time_taken_seconds,
        completed_at=result.completed_at,
        correct_answers=correct_answers,
        user_answers=body.answers,
    )
