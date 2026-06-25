from typing import List, Tuple
import re


def extract_text_from_pdf(file_bytes: bytes) -> List[Tuple[int, str]]:
    """
    Extract text from a PDF file.
    Returns list of (page_number, text) tuples.
    """
    try:
        from pypdf import PdfReader
        import io
        reader = PdfReader(io.BytesIO(file_bytes))
        pages = []
        for i, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            text = text.strip()
            if text:
                pages.append((i + 1, text))
        return pages
    except Exception as e:
        raise ValueError(f"Failed to extract PDF text: {e}")


def chunk_text(pages: List[Tuple[int, str]], chunk_size: int = 500, overlap: int = 50) -> List[dict]:
    """
    Split pages into overlapping chunks.
    Returns list of {content, page, chunk_index}
    """
    chunks = []
    chunk_index = 0

    for page_num, text in pages:
        words = text.split()
        i = 0
        while i < len(words):
            chunk_words = words[i: i + chunk_size]
            content = " ".join(chunk_words).strip()
            if len(content) > 50:
                chunks.append({
                    "content": content,
                    "page": page_num,
                    "chunk_index": chunk_index,
                })
                chunk_index += 1
            i += chunk_size - overlap

    return chunks


def clean_text(text: str) -> str:
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s.,;:!?()[\]{}"\'%-]', '', text)
    return text.strip()
