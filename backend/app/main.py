from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import engine, Base
from app.routers import auth, upload, chat, quiz, planner, marketplace, analytics, profile


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="NeuroLearn AI Backend",
    description="FastAPI backend powering the NeuroLearn AI platform — RAG-based tutoring, quiz generation, study planning, and analytics.",
    version="1.0.0",
    lifespan=lifespan,
)
origins = [
    "http://localhost:5173",
    "https://neuro-learn-one.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,        prefix="/api/auth",        tags=["Auth"])
app.include_router(upload.router,      prefix="/api",             tags=["Upload"])
app.include_router(chat.router,        prefix="/api",             tags=["AI Tutor"])
app.include_router(quiz.router,        prefix="/api",             tags=["Quiz"])
app.include_router(planner.router,     prefix="/api",             tags=["Planner"])
app.include_router(marketplace.router, prefix="/api/marketplace", tags=["Marketplace"])
app.include_router(analytics.router,   prefix="/api",             tags=["Analytics"])
app.include_router(profile.router,     prefix="/api",             tags=["Profile"])


@app.get("/api/healthz", tags=["Health"])
def health():
    return {"status": "ok", "service": "NeuroLearn AI Backend"}
