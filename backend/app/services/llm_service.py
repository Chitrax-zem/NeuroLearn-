from typing import List, Optional
from app.config import settings


def _get_llm():
    if settings.LLM_PROVIDER == "groq":
        from langchain_groq import ChatGroq
        return ChatGroq(
            api_key=settings.GROQ_API_KEY,
            model=settings.GROQ_MODEL,
            temperature=0.3,
        )
    else:
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_MODEL,
            temperature=0.3,
        )


def answer_question(question: str, context_chunks: List[str], chat_history: Optional[List[dict]] = None) -> str:
    """
    RAG: Given retrieved chunks, ask the LLM to answer the question.
    """
    context = "\n\n---\n\n".join(context_chunks)

    system_prompt = (
        "You are NeuroLearn AI, an expert educational tutor. "
        "Answer questions clearly and concisely using the provided context. "
        "If the context doesn't contain the answer, say so honestly. "
        "Use examples, formulas, and step-by-step explanations where helpful. "
        "Keep responses educational, engaging, and well-structured."
    )

    history_text = ""
    if chat_history:
        for msg in chat_history[-4:]:
            role = "Student" if msg["role"] == "user" else "Tutor"
            history_text += f"\n{role}: {msg['content']}"

    user_message = f"""Context from knowledge pack:
{context}

{f'Recent conversation:{history_text}' if history_text else ''}

Student's question: {question}

Please provide a clear, educational answer."""

    llm = _get_llm()
    from langchain_core.messages import SystemMessage, HumanMessage
    response = llm.invoke([
        SystemMessage(content=system_prompt),
        HumanMessage(content=user_message),
    ])
    return response.content


def generate_quiz_questions(topic: str, context_chunks: List[str], count: int = 10) -> List[dict]:
    """
    Generate MCQ quiz questions from context chunks.
    Returns list of {question, options: [A,B,C,D], correct_answer, explanation}
    """
    context = "\n\n".join(context_chunks[:8])

    prompt = f"""You are creating a quiz for students studying: {topic}

Based on this content:
{context}

Generate exactly {count} multiple choice questions. Return ONLY valid JSON array — no extra text.

Format:
[
  {{
    "question": "What is...?",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correct_answer": "A",
    "explanation": "Because..."
  }}
]

Rules:
- Options must be labeled A), B), C), D)
- correct_answer is just the letter: A, B, C, or D
- Make questions educational and varied in difficulty
- Base questions on the provided content only"""

    llm = _get_llm()
    from langchain_core.messages import HumanMessage
    import json
    response = llm.invoke([HumanMessage(content=prompt)])
    text = response.content.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    text = text.strip()

    try:
        return json.loads(text)
    except Exception:
        return []


def generate_summary(text: str, title: str) -> str:
    """Generate a concise summary of a document."""
    prompt = f"""Summarize the following educational content titled "{title}" in 3-4 sentences. 
Focus on the key concepts, formulas, and learning objectives.

Content (first 3000 chars):
{text[:3000]}

Summary:"""

    llm = _get_llm()
    from langchain_core.messages import HumanMessage
    response = llm.invoke([HumanMessage(content=prompt)])
    return response.content.strip()


def generate_flashcards(text: str, count: int = 10) -> List[dict]:
    """Generate flashcard pairs from content."""
    prompt = f"""Create {count} flashcards from this educational content.
Return ONLY a JSON array — no extra text.

Format: [{{"front": "Question or term", "back": "Answer or definition"}}]

Content:
{text[:4000]}"""

    llm = _get_llm()
    from langchain_core.messages import HumanMessage
    import json
    response = llm.invoke([HumanMessage(content=prompt)])
    text_resp = response.content.strip()

    if text_resp.startswith("```"):
        text_resp = text_resp.split("```")[1]
        if text_resp.startswith("json"):
            text_resp = text_resp[4:]
    text_resp = text_resp.strip()

    try:
        return json.loads(text_resp)
    except Exception:
        return []


def generate_study_plan(subjects: List[str], hours_per_day: int, exam_date_str: Optional[str], focus_areas: Optional[List[str]]) -> dict:
    """Generate a weekly AI study plan."""
    exam_info = f"Exam date: {exam_date_str}" if exam_date_str else "No specific exam date"
    focus_info = f"Focus areas: {', '.join(focus_areas)}" if focus_areas else ""

    prompt = f"""Create a detailed weekly study plan for a student.

Subjects: {', '.join(subjects)}
Study time: {hours_per_day} hours per day
{exam_info}
{focus_info}

Return ONLY valid JSON — no extra text:
{{
  "title": "Weekly Study Plan",
  "weekly_schedule": [
    {{
      "day": "Monday",
      "blocks": [
        {{"time": "9:00 AM", "subject": "Physics", "topic": "Newton's Laws", "duration_minutes": 60}}
      ]
    }}
  ],
  "daily_goals": ["Goal 1", "Goal 2", "Goal 3"],
  "ai_recommendations": "Personalized advice paragraph"
}}"""

    llm = _get_llm()
    from langchain_core.messages import HumanMessage
    import json
    response = llm.invoke([HumanMessage(content=prompt)])
    text = response.content.strip()

    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    text = text.strip()

    try:
        return json.loads(text)
    except Exception:
        return {
            "title": "Study Plan",
            "weekly_schedule": [],
            "daily_goals": [],
            "ai_recommendations": "Focus on consistent daily practice.",
        }
