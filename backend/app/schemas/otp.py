from pydantic import BaseModel, EmailStr


class SendOTPRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class MessageResponse(BaseModel):
    message: str


class VerifyOTPResponse(BaseModel):
    verified: bool
    message: str