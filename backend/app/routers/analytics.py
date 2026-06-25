from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta

from app.database import get_db
from app.models.user import User
from app.models.analytics import Analytics

from app.schemas.analytics import (
    AnalyticsSummary,
    DailyAnalytics,
)

from app.utils.auth import get_current_user

router = APIRouter()


@router.get(
    "/analytics",
    response_model=AnalyticsSummary
)
def get_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    seven_days_ago = (
        date.today() - timedelta(days=7)
    )

    rows = (
        db.query(Analytics)
        .filter(
            Analytics.user_id
            == current_user.id,
            Analytics.date
            >= seven_days_ago,
        )
        .order_by(Analytics.date)
        .all()
    )

    # ==================================
    # Totals
    # ==================================
    total_study_minutes = sum(
        r.study_minutes
        for r in rows
    )

    total_questions = sum(
        r.questions_asked
        for r in rows
    )

    total_quizzes = sum(
        r.quizzes_completed
        for r in rows
    )

    total_xp = sum(
        r.xp_earned
        for r in rows
    )

    total_logins = sum(
        r.login_count
        for r in rows
    )

    total_uploads = sum(
        r.pdf_uploads
        for r in rows
    )

    total_ai_sessions = sum(
        r.ai_sessions
        for r in rows
    )

    total_study_plans = sum(
        r.study_plans_created
        for r in rows
    )

    total_page_visits = sum(
        r.page_visits
        for r in rows
    )

    avg_score = (
        sum(
            r.average_quiz_score
            for r in rows
        ) / len(rows)
    ) if rows else 0

    # ==================================
    # Subject Breakdown
    # ==================================
    subject_breakdown = {}

    for row in rows:
        if row.subject_breakdown:
            for subject, value in (
                row.subject_breakdown.items()
            ):
                subject_breakdown[
                    subject
                ] = (
                    subject_breakdown.get(
                        subject,
                        0
                    )
                    + value
                )

    # ==================================
    # Weekly Data
    # ==================================
    weekly_data = [
        DailyAnalytics(
            date=r.date,
            study_minutes=r.study_minutes,
            questions_asked=r.questions_asked,
            quizzes_completed=r.quizzes_completed,
            average_quiz_score=r.average_quiz_score,
            xp_earned=r.xp_earned,
            subject_breakdown=r.subject_breakdown,
        )
        for r in rows
    ]

    # ==================================
    # Weak Topics
    # ==================================
    weak_topics = []

    for subject, count in (
        subject_breakdown.items()
    ):
        if count < 3:
            weak_topics.append(subject)

    # ==================================
    # Return Analytics
    # ==================================
    return AnalyticsSummary(
        total_study_hours=round(
            total_study_minutes / 60,
            1
        ),

        total_questions=total_questions,

        total_quizzes=total_quizzes,

        average_accuracy=round(
            avg_score,
            1
        ),

        current_streak=current_user.streak,

        total_xp=current_user.xp,

        mastery_score=min(
            100,
            round(
                avg_score * 0.8
                + (total_quizzes * 2),
                1,
            ),
        ),

        knowledge_growth_percent=min(
            100,
            round(
                total_quizzes * 3,
                1,
            ),
        ),

        weekly_data=weekly_data,

        subject_breakdown=subject_breakdown,

        weak_topics=weak_topics,

        # NEW ANALYTICS
        total_logins=total_logins,
        total_uploads=total_uploads,
        total_ai_sessions=total_ai_sessions,
        total_study_plans=total_study_plans,
        total_page_visits=total_page_visits,
    )