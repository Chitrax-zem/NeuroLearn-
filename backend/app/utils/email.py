import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.config import settings


def send_otp_email(to_email: str, otp_code: str) -> None:
    subject = "Your NeuroLearn AI verification code"
    body = (
        f"Your verification code is: {otp_code}\n\n"
        f"This code expires in 10 minutes. "
        f"If you didn't request this, you can safely ignore this email."
    )

    msg = MIMEMultipart()
    msg["From"] = settings.SMTP_FROM
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
        server.sendmail(settings.SMTP_FROM, to_email, msg.as_string())