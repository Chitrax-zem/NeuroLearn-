from app.database import engine
from app.database import Base
 
# Make sure the model is imported so SQLAlchemy registers it with Base
from app.models.otp import EmailOTP  # noqa: F401
 
print("Creating email_otps table if it doesn't exist...")
Base.metadata.create_all(bind=engine, tables=[EmailOTP.__table__])
print("Done. email_otps table is ready.")
 