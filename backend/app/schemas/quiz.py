from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime


class QuizQuestionOut(BaseModel):
    id: str
    question: str
    options: Any
    correct_answer: str
    explanation: Optional[str]
    order_index: int

    class Config:
        from_attributes = True


class QuizOut(BaseModel):
    id: str
    pack_id: str
    title: str
    subject: str
    difficulty: str
    question_count: int
    questions: List[QuizQuestionOut]
    created_at: datetime

    class Config:
        from_attributes = True


class SubmitQuizRequest(BaseModel):
    quiz_id: str
    answers: List[str]
    time_taken_seconds: int


class QuizResultOut(BaseModel):
    id: str
    quiz_id: str
    score: int
    total_questions: int
    accuracy: float
    xp_earned: int
    time_taken_seconds: Optional[int]
    completed_at: datetime
    correct_answers: List[str]
    user_answers: List[str]

    class Config:
        from_attributes = True
