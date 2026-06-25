from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from typing import List

from app.database import get_db
from app.models.user import User
from app.models.study_plan import StudyPlan
from app.models.analytics import Analytics

from app.schemas.planner import (
    StudyPlanRequest,
    StudyPlanOut,
)

from app.utils.auth import get_current_user

router = APIRouter()


@router.post(
    "/generate-study-plan",
    response_model=StudyPlanOut
)
def generate_study_plan(
    body: StudyPlanRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    exam_date_str = (
        body.exam_date.isoformat()
        if body.exam_date
        else None
    )

    # ==================================
    # Generate Plan Using AI
    # ==================================
    try:
        from app.services.llm_service import (
            generate_study_plan as llm_plan
        )

        plan_data = llm_plan(
            body.subjects,
            body.hours_per_day,
            exam_date_str,
            body.focus_areas,
        )

    except Exception:
        plan_data = {
            "title": (
                f"Study Plan — "
                f"{', '.join(body.subjects)}"
            ),
            "weekly_schedule": [
                {
                    "day": day,
                    "blocks": [
                        {
                            "time": "9:00 AM",
                            "subject": body.subjects[
                                i % len(body.subjects)
                            ],
                            "topic": "Core Concepts",
                            "duration_minutes":
                                body.hours_per_day * 30,
                        }
                    ],
                }
                for i, day in enumerate(
                    [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                    ]
                )
            ],
            "daily_goals": [
                "Review previous notes",
                "Complete one quiz",
                "Ask AI Tutor 5 questions",
            ],
            "ai_recommendations":
                "Focus on active recall and spaced repetition.",
        }

    # ==================================
    # Save Study Plan
    # ==================================
    plan = StudyPlan(
        user_id=current_user.id,
        title=plan_data.get(
            "title",
            "My Study Plan"
        ),
        exam_date=body.exam_date,
        hours_per_day=body.hours_per_day,
        subjects=body.subjects,
        weekly_schedule=plan_data.get(
            "weekly_schedule",
            []
        ),
        daily_goals=plan_data.get(
            "daily_goals",
            []
        ),
        ai_recommendations=plan_data.get(
            "ai_recommendations",
            ""
        ),
    )

    db.add(plan)

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
            analytics.study_plans_created += 1

            subjects = (
                analytics.subject_breakdown
                or {}
            )

            for subject in body.subjects:
                subjects[subject] = (
                    subjects.get(subject, 0)
                    + 1
                )

            analytics.subject_breakdown = (
                subjects
            )

        else:
            subject_data = {}

            for subject in body.subjects:
                subject_data[subject] = 1

            analytics = Analytics(
                user_id=current_user.id,
                date=today,
                study_plans_created=1,
                subject_breakdown=subject_data,
            )

            db.add(analytics)

    except Exception as e:
        print(
            "PLANNER ANALYTICS ERROR:",
            str(e)
        )

    db.commit()
    db.refresh(plan)

    print(
        "Study Plan Created:",
        plan.title
    )

    return plan


@router.get(
    "/study-plans",
    response_model=List[StudyPlanOut]
)
def list_study_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(StudyPlan)
        .filter(
            StudyPlan.user_id
            == current_user.id
        )
        .order_by(
            StudyPlan.created_at.desc()
        )
        .all()
    )