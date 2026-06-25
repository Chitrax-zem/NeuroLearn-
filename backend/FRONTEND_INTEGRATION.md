# Frontend ↔ Backend Integration Guide

This document explains exactly how to connect your existing NeuroLearn AI React frontend to this FastAPI backend.

---

## 1. Base URL Setup

In your React app, create `src/lib/api.ts`:

```ts
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = {
  baseUrl: BASE_URL,

  async post(path: string, body: unknown, token?: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  async get(path: string, token?: string) {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
};
```

Add to your `.env`:
```
VITE_API_URL=http://localhost:8000
```

---

## 2. Auth — Login.tsx

```ts
// Replace handleSubmit and handleGoogle in Login.tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const data = await api.post("/api/auth/login", { email, password });
  localStorage.setItem("token", data.access_token);
  setLocation(redirectTo);
};

// Register new users
const handleRegister = async () => {
  const data = await api.post("/api/auth/register", { email, password, full_name: name });
  localStorage.setItem("token", data.access_token);
  setLocation("/dashboard");
};
```

---

## 3. AI Tutor — AITutor.tsx

```ts
// Replace the mock handleSend with real API call
const handleSend = async () => {
  if (!input.trim()) return;
  const token = localStorage.getItem("token");

  setShowTyping(true);
  const data = await api.post("/api/chat", {
    pack_id: activePack.id,        // use real pack ID from DB
    question: input,
    history: messages.map(m => ({ role: m.role, content: m.content })),
  }, token);

  setShowTyping(false);
  setMessages(prev => [...prev, {
    id: Date.now(),
    role: "ai",
    content: data.answer,
  }]);
  // data.sources contains the retrieved chunks
};
```

---

## 4. Upload PDF — Knowledge Pack

```ts
// In AITutor.tsx — "Upload Pack" button handler
const handleUpload = async (file: File, title: string, subject: string) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", title);
  formData.append("subject", subject);
  formData.append("is_public", "false");

  const res = await fetch(`${BASE_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,  // Do NOT set Content-Type for FormData
  });
  const data = await res.json();
  // data.pack_id — use this as the pack_id for /api/chat
};
```

---

## 5. Marketplace — Marketplace.tsx

```ts
// Fetch public packs
const packs = await api.get("/api/marketplace?limit=20");

// Search packs
const results = await api.get(`/api/marketplace?search=${query}&subject=${subject}`);

// Open/download a pack (increments download count)
const pack = await api.get(`/api/marketplace/${packId}`);
```

---

## 6. Quiz — Quiz.tsx

```ts
// Generate quiz from a pack
const quiz = await api.post(`/api/generate-quiz/${packId}`, {}, token);
// quiz.questions — array of MCQ objects

// Submit answers
const result = await api.post("/api/submit-quiz", {
  quiz_id: quiz.id,
  answers: selectedAnswers,   // ["A", "C", "B", ...]
  time_taken_seconds: elapsed,
}, token);
// result.score, result.accuracy, result.xp_earned
```

---

## 7. Study Planner — Planner.tsx

```ts
// Generate AI study plan
const plan = await api.post("/api/generate-study-plan", {
  subjects: ["Physics", "Mathematics"],
  exam_date: "2026-08-15",
  hours_per_day: 3,
}, token);
// plan.weekly_schedule, plan.daily_goals, plan.ai_recommendations
```

---

## 8. Analytics — Analytics.tsx

```ts
// Fetch analytics summary (last 7 days)
const analytics = await api.get("/api/analytics", token);
// analytics.total_study_hours, .weekly_data[], .subject_breakdown
```

---

## 9. Profile — Profile.tsx

```ts
// Get profile + stats
const stats = await api.get("/api/profile/stats", token);
// stats.user, stats.stats, stats.recent_quiz_results
```

---

## 10. API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login, get JWT token |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/upload` | Upload PDF → create knowledge pack |
| POST | `/api/chat` | RAG-based AI tutor chat |
| GET | `/api/knowledge-packs` | My knowledge packs |
| POST | `/api/generate-quiz/{pack_id}` | Generate MCQ quiz |
| GET | `/api/quiz/{quiz_id}` | Get quiz with questions |
| POST | `/api/submit-quiz` | Submit answers, get score |
| POST | `/api/generate-study-plan` | AI-generated study plan |
| GET | `/api/study-plans` | My study plans |
| GET | `/api/marketplace` | Browse public packs |
| GET | `/api/marketplace/{pack_id}` | Get single pack |
| PATCH | `/api/marketplace/{pack_id}/publish` | Publish pack |
| GET | `/api/analytics` | Analytics summary |
| GET | `/api/profile` | User profile |
| GET | `/api/profile/stats` | Profile + quiz history |
| GET | `/api/healthz` | Health check |

---

## 11. Interactive API Docs

Once the backend is running, open:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

All endpoints are documented and testable from the browser.

---

## 12. Offline Mode Architecture

For offline AI (the key differentiator):

1. When user opens a pack, **cache the FAISS index** to IndexedDB/localStorage via a service worker
2. When offline, skip `/api/chat` → use `@xenova/transformers` in-browser to embed + search the cached chunks locally
3. Send chunks to a local LLM (Ollama) or show cached responses

The backend already supports this — each pack's FAISS index is isolated at `faiss_store/<pack_id>.index` and can be exported as a binary blob.
