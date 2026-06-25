from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import date, datetime


class StudyPlanRequest(BaseModel):
    subjects: List[str]
    exam_date: Optional[date] = None
    hours_per_day: int = 2
    focus_areas: Optional[List[str]] = None


class DailyBlock(BaseModel):
    time: str
    subject: str
    topic: str
    duration_minutes: int


class WeeklyDay(BaseModel):
    day: str
    blocks: List[DailyBlock]


class StudyPlanOut(BaseModel):
    id: str
    title: str
    exam_date: Optional[date]
    hours_per_day: int
    subjects: Optional[Any]
    weekly_schedule: Optional[Any]
    daily_goals: Optional[Any]
    ai_recommendations: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
