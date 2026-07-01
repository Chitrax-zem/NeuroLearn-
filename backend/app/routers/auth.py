from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, datetime, timedelta
import random
import hashlib

from app.database import get_db
from app.models.user import User
from app.models.analytics import Analytics
from app.models.otp import EmailOTP

from app.schemas.auth import (
    UserRegister,
    UserLogin,
    Token,
    UserOut,
)
from app.schemas.otp import (
    SendOTPRequest,
    VerifyOTPRequest,
    MessageResponse,
    VerifyOTPResponse,
)

from app.utils.auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)
from app.utils.email import send_otp_email

router = APIRouter()

OTP_EXPIRE_MINUTES = 10
OTP_VERIFIED_WINDOW_MINUTES = 30


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

    # ---------------------------
    # Require a verified OTP for this email before creating the account.
    # This is checked server-side so it can't be bypassed by calling
    # /register directly without going through /send-otp + /verify-otp.
    # ---------------------------
    otp_record = (
        db.query(EmailOTP)
        .filter(
            EmailOTP.email == body.email,
            EmailOTP.is_verified == True,
        )
        .order_by(EmailOTP.verified_at.desc())
        .first()
    )

    otp_window_start = datetime.utcnow() - timedelta(
        minutes=OTP_VERIFIED_WINDOW_MINUTES
    )

    if not otp_record or not otp_record.verified_at or otp_record.verified_at < otp_window_start:
        raise HTTPException(
            status_code=400,
            detail="Please verify your email with the OTP sent before registering."
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

    # OTP has been consumed — remove it so it can't be reused
    db.query(EmailOTP).filter(EmailOTP.email == body.email).delete()
    db.commit()

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


@router.post("/send-otp", response_model=MessageResponse)
def send_otp(
    body: SendOTPRequest,
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

    # invalidate any previous codes for this email before issuing a new one
    db.query(EmailOTP).filter(
        EmailOTP.email == body.email
    ).delete()

    otp_code = f"{random.randint(0, 999999):06d}"

    record = EmailOTP(
        email=body.email,
        otp_hash=hashlib.sha256(otp_code.encode()).hexdigest(),
        expires_at=datetime.utcnow() + timedelta(minutes=OTP_EXPIRE_MINUTES),
        is_verified=False,
    )

    db.add(record)
    db.commit()

    send_otp_email(body.email, otp_code)

    return MessageResponse(message="OTP sent to your email")


@router.post("/verify-otp", response_model=VerifyOTPResponse)
def verify_otp(
    body: VerifyOTPRequest,
    db: Session = Depends(get_db)
):
    record = (
        db.query(EmailOTP)
        .filter(
            EmailOTP.email == body.email,
            EmailOTP.is_verified == False,
        )
        .order_by(EmailOTP.created_at.desc())
        .first()
    )

    if not record or record.expires_at < datetime.utcnow():
        raise HTTPException(
            status_code=400,
            detail="OTP expired. Please request a new one."
        )

    if hashlib.sha256(body.otp.encode()).hexdigest() != record.otp_hash:
        raise HTTPException(
            status_code=400,
            detail="Incorrect OTP"
        )

    record.is_verified = True
    record.verified_at = datetime.utcnow()
    db.commit()

    return VerifyOTPResponse(verified=True, message="Email verified successfully")