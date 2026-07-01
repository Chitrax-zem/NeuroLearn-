from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import traceback

from app.database import Base, engine

from app.routers import (
    auth,
    upload,
    chat,
    quiz,
    planner,
    marketplace,
    analytics,
    profile,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("=" * 80)
    print("🚀 NeuroLearn Backend Starting...")
    print("=" * 80)

    try:
        # -------------------------------------------------
        # TEMPORARILY DISABLED
        #
        # This can block Render startup.
        # Use Alembic migrations instead.
        #
        # Base.metadata.create_all(bind=engine)
        # -------------------------------------------------

        print("✅ Startup completed successfully.")

    except Exception:
        print("❌ STARTUP ERROR")
        traceback.print_exc()
        raise

    yield

    print("🛑 Backend shutting down...")


app = FastAPI(
    title="NeuroLearn API",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",

    "https://neuro-learn-one.vercel.app",
    "https://neuro-learn-d2rv-phi.vercel.app",

    # YOUR CURRENT VERCEL DEPLOY
    "https://neuro-learn-d2rv-gb3c4rsqq-chitransh-nigams-projects-f07e1331.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Change to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(upload.router, prefix="/api", tags=["Upload"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(quiz.router, prefix="/api", tags=["Quiz"])
app.include_router(planner.router, prefix="/api", tags=["Planner"])
app.include_router(marketplace.router, prefix="/api/marketplace", tags=["Marketplace"])
app.include_router(analytics.router, prefix="/api", tags=["Analytics"])
app.include_router(profile.router, prefix="/api", tags=["Profile"])


@app.get("/")
async def root():
    return {
        "message": "NeuroLearn Backend Running",
        "status": "ok",
    }


@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
    }


@app.get("/api/healthz")
async def healthz():
    return {
        "status": "healthy",
        "service": "NeuroLearn Backend",
    }


@app.get("/api/ping")
async def ping():
    # Lightweight keep-alive endpoint.
    # Point a free UptimeRobot monitor at this URL every 14 minutes
    # to prevent Render's free tier from spinning down between requests.
    return {"pong": True}