#!/bin/bash
set -e

echo "📦 Installing dependencies..."
pip install -r requirements.txt --quiet

echo "🗄️  Running database migrations..."
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine); print('Tables created.')"

echo "🚀 Starting NeuroLearn AI Backend on port ${PORT:-8000}..."
uvicorn main:app --host 0.0.0.0 --port "${PORT:-8000}" --reload
