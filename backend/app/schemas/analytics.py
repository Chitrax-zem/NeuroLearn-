from pydantic import BaseModel
from typing import List, Optional, Any, Dict
from datetime import date


class DailyAnalytics(BaseModel):
    date: date
    study_minutes: int
    questions_asked: int
    quizzes_completed: int
    average_quiz_score: float
    xp_earned: int
    subject_breakdown: Optional[Any] = None


class AnalyticsSummary(BaseModel):
    # Existing Analytics
    total_study_hours: float
    total_questions: int
    total_quizzes: int
    average_accuracy: float
    current_streak: int
    total_xp: int
    mastery_score: float
    knowledge_growth_percent: float

    # Weekly Data
    weekly_data: List[DailyAnalytics]

    # Subject Analytics
    subject_breakdown: Dict[str, int]
    weak_topics: List[str]

    # New Real-Time Analytics
    total_logins: int
    total_uploads: int
    total_ai_sessions: int
    total_study_plans: int
    total_page_visits: int