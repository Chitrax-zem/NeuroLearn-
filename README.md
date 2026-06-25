
# 🚀 NeuroLearn AI

<div align="center">

### AI-Powered Personalized Learning Platform

Transform PDFs, notes, and textbooks into intelligent tutoring experiences.

**ChatGPT × Notion × Duolingo for Education**

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge\&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-purple?style=for-the-badge\&logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge\&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-black?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Prototype-success?style=for-the-badge)

</div>

---

## 📖 Overview

**NeuroLearn AI** is a next-generation AI learning platform designed to revolutionize education through personalized tutoring experiences.

Instead of reading static textbooks, students can upload learning materials and instantly interact with an AI tutor that explains concepts, generates quizzes, tracks mastery, and adapts to individual learning styles.

### 🎯 Mission

> Make personalized, high-quality education accessible to everyone through AI.

---

## ✨ Key Features

### 🤖 AI Tutor

* Real-time conversational learning
* Formula explanations
* Context-aware follow-up questions
* Source citations
* Interactive quizzes

### 📚 Knowledge Packs

Upload:

* PDFs
* Notes
* Textbooks
* Study Material

Convert them into searchable AI-powered learning packs.

### 🎮 Gamified Learning

* XP System
* Daily Streaks
* Achievement Badges
* Leaderboards
* Progress Tracking

### 🛒 Marketplace

* Discover expert-created learning packs
* Share educational content
* Community-driven knowledge ecosystem

### 📊 Analytics Dashboard

* Learning heatmaps
* Mastery tracking
* Weekly activity reports
* Personalized AI recommendations

---

# 🖼️ Application Screens

| Screen        | Description                                |
| ------------- | ------------------------------------------ |
| Landing Page  | Product introduction and conversion funnel |
| Dashboard     | Learning progress overview                 |
| AI Tutor      | Interactive tutoring experience            |
| Marketplace   | Discover learning packs                    |
| Quiz Module   | Gamified assessment engine                 |
| Analytics     | Performance insights                       |
| Study Planner | AI-generated schedules                     |
| Profile       | Achievements and progress                  |

---

# 🏗️ System Architecture

```text
┌───────────────────┐
│ Learning Material │
│ PDF / Notes       │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ Knowledge Pack AI │
└─────────┬─────────┘
          │
          ▼
┌───────────────────┐
│ AI Tutor Engine   │
└─────┬───────┬─────┘
      │       │
      ▼       ▼
   Quiz     Insights
      │
      ▼
 Progress Tracking
      │
      ▼
 XP • Streaks • Analytics
```

---

# 🛠️ Tech Stack

| Layer           | Technology      |
| --------------- | --------------- |
| Frontend        | React 18        |
| Language        | TypeScript      |
| Build Tool      | Vite 7          |
| Styling         | Tailwind CSS v4 |
| Animations      | Framer Motion   |
| Charts          | Recharts        |
| Icons           | Lucide React    |
| Routing         | Wouter          |
| UI Components   | shadcn/ui       |
| Package Manager | pnpm            |

---

# 📂 Project Structure

```bash
src/
│
├── components/
│   ├── AppShell.tsx
│   ├── Sidebar.tsx
│   ├── TopNav.tsx
│   └── ui/
│
├── pages/
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── AITutor.tsx
│   ├── Marketplace.tsx
│   ├── Quiz.tsx
│   ├── QuizResults.tsx
│   ├── Analytics.tsx
│   ├── Planner.tsx
│   └── Profile.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```

---

# 🎨 Design System

## Colors

| Token        | Purpose                   |
| ------------ | ------------------------- |
| 🔵 Primary   | CTAs & Active States      |
| 🟣 Secondary | Gradients & Accents       |
| ⚫ Background | Dark Glassmorphism Theme  |
| ⚪ Text       | High Contrast Readability |

---

## UI Principles

### 🌙 Dark Mode First

Premium SaaS aesthetic with deep navy backgrounds.

### 🪟 Glassmorphism

```css
backdrop-blur-xl
bg-card/50
border-white/5
```

### ✨ Motion Design

* Smooth Page Transitions
* Hover Elevation Effects
* Progress Ring Animations
* Floating Particle Effects
* AI Typing Indicators

---

# 🚀 Getting Started

## Prerequisites

```bash
Node.js >= 18
pnpm (recommended)
```

---

## Installation

```bash
# Clone repository

git clone <repository-url>

# Navigate

cd neurolearn

# Install dependencies

npm install

# OR

pnpm install
```

---

## Run Development Server

```bash
npm run dev
```

or

```bash
pnpm dev
```

Application starts at:

```bash
http://localhost:21834
```

---

## Production Build

```bash
npm run build
```

Output:

```bash
dist/
```

Ready for:

* ▲ Vercel
* 🌐 Netlify
* 📄 GitHub Pages
* ☁️ Replit

---

# 🧪 Prototype Scope

This project is currently a **frontend-only high-fidelity prototype**.

### Included

✅ Dashboard

✅ AI Tutor UI

✅ Quiz Experience

✅ Analytics

✅ Marketplace

✅ Study Planner

✅ Achievements

---

### Not Yet Implemented

❌ Backend API

❌ Authentication

❌ Database

❌ Real AI Integration

❌ File Processing

❌ Payments

---

# 🔮 Future Roadmap

## Phase 1 — AI Integration

* OpenAI / Gemini Integration
* PDF Processing
* Vector Search
* Streaming Responses

## Phase 2 — User Accounts

* OAuth Login
* Progress Persistence
* Cloud Sync

## Phase 3 — Marketplace

* Creator Accounts
* Ratings & Reviews
* Stripe Payments

## Phase 4 — Advanced Learning

* Adaptive Difficulty
* Spaced Repetition
* Voice Learning
* Collaborative Study Rooms

## Phase 5 — Mobile App

* React Native
* Offline Learning
* Push Notifications
* In-App Purchases

---

# 📈 Why NeuroLearn AI?

| Traditional Learning | NeuroLearn AI          |
| -------------------- | ---------------------- |
| Static Textbooks     | Interactive AI Tutor   |
| Generic Teaching     | Personalized Learning  |
| Expensive Tutors     | Scalable AI Assistance |
| No Motivation        | Gamification & Rewards |
| Manual Tracking      | Real-Time Analytics    |

---

# 🤝 Contributing

Contributions, suggestions, and feature requests are welcome.

```bash
Fork → Develop → Pull Request
```

---

# 📜 License

MIT License

---

<div align="center">

## 🚀 NeuroLearn AI

### The Future of Personalized Learning

**Learn Faster. Learn Smarter. Learn with AI.**

</div>
