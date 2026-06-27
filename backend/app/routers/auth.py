from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date

from app.database import get_db
from app.models.user import User
from app.models.analytics import Analytics

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    Token,
    UserOut,
)

from app.utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

router = APIRouter()


@router.post("/register", response_model=Token, status_code=201)
def register(
    body: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == body.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        full_name=body.full_name,
        phone_number=body.phone_number,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    # ---------------------------
    # Analytics Tracking
    # ---------------------------
    today = date.today()

    analytics = Analytics(
        user_id=user.id,
        date=today,
        login_count=1,
    )

    db.add(analytics)
    db.commit()

    token = create_access_token(
        {"sub": user.id}
    )

    return Token(
        access_token=token
    )


@router.post("/login", response_model=Token)
def login(
    body: UserLogin,
    db: Session = Depends(get_db)
):
    print("LOGIN EMAIL:", body.email)

    user = db.query(User).filter(
        User.email == body.email
    ).first()

    print("USER:", user)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    print("HASH:", user.hashed_password)
    print("BODY PASSWORD:", repr(body.password))
    print("BODY PASSWORD LENGTH:", len(body.password))
    print("=" * 60)
    print("EMAIL:", body.email)
    print("PASSWORD:", repr(body.password))
    print("TYPE:", type(body.password))
    print("LEN:", len(body.password))
    print("=" * 60)
 
    valid = verify_password(
        body.password,
        user.hashed_password
    )

    print("PASSWORD VALID:", valid)

    if not valid:
        raise HTTPException(
            status_code=401,
            detail="Wrong password"
        )

    # ---------------------------
    # Analytics Tracking
    # ---------------------------
    today = date.today()

    analytics = db.query(Analytics).filter(
        Analytics.user_id == user.id,
        Analytics.date == today
    ).first()

    if analytics:
        analytics.login_count += 1
    else:
        analytics = Analytics(
            user_id=user.id,
            date=today,
            login_count=1,
        )
        db.add(analytics)

    db.commit()

    token = create_access_token(
        {"sub": user.id}
    )

    return Token(
        access_token=token
    )


@router.get("/me", response_model=UserOut)
def me(
    current_user: User = Depends(
        get_current_user
    )
):
    return current_user
