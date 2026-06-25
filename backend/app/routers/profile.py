from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.models.knowledge_pack import KnowledgePack
from app.models.quiz import QuizResult
from app.schemas.auth import UserOut
from app.utils.auth import get_current_user
from typing import List

router = APIRouter()


@router.get("/profile", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/profile/stats")
def get_profile_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    packs_created = db.query(KnowledgePack).filter(KnowledgePack.owner_id == current_user.id).count()
    quizzes_taken = db.query(QuizResult).filter(QuizResult.user_id == current_user.id).count()

    recent_results = db.query(QuizResult).filter(
        QuizResult.user_id == current_user.id
    ).order_by(QuizResult.completed_at.desc()).limit(5).all()

    return {
        "user": {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "level": current_user.level,
            "xp": current_user.xp,
            "streak": current_user.streak,
        },
        "stats": {
            "packs_created": packs_created,
            "quizzes_taken": quizzes_taken,
            "total_xp": current_user.xp,
            "current_streak": current_user.streak,
        },
        "recent_quiz_results": [
            {
                "quiz_id": r.quiz_id,
                "score": r.score,
                "total": r.total_questions,
                "accuracy": r.accuracy,
                "xp_earned": r.xp_earned,
                "completed_at": r.completed_at.isoformat(),
            }
            for r in recent_results
        ],
    }
