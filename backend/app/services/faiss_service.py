import os
import json
import numpy as np
from pathlib import Path
from typing import List, Tuple, Optional
from app.config import settings

try:
    import faiss
    from sentence_transformers import SentenceTransformer
    FAISS_AVAILABLE = True
except ImportError:
    FAISS_AVAILABLE = False


class FAISSService:
    """
    Manages FAISS indexes per knowledge pack.
    Each pack gets its own index file: faiss_store/<pack_id>.index
    Metadata (chunk IDs) stored alongside: faiss_store/<pack_id>.meta.json
    """

    def __init__(self):
        self.index_dir = Path(settings.FAISS_INDEX_PATH)
        self.index_dir.mkdir(parents=True, exist_ok=True)
        self._model: Optional[object] = None

    def _get_model(self):
        if not FAISS_AVAILABLE:
            raise RuntimeError("sentence-transformers / faiss-cpu not installed. Run: pip install sentence-transformers faiss-cpu")
        if self._model is None:
            self._model = SentenceTransformer(settings.EMBEDDING_MODEL)
        return self._model

    def _index_path(self, pack_id: str) -> Path:
        return self.index_dir / f"{pack_id}.index"

    def _meta_path(self, pack_id: str) -> Path:
        return self.index_dir / f"{pack_id}.meta.json"

    def embed_texts(self, texts: List[str]) -> np.ndarray:
        model = self._get_model()
        embeddings = model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)
        return embeddings.astype(np.float32)

    def save_index(self, pack_id: str, chunks: List[dict]) -> int:
        """
        Build and persist a FAISS flat L2 index for a pack.
        chunks: [{"id": str, "content": str, "page": int|None}]
        Returns: number of vectors stored
        """
        if not FAISS_AVAILABLE:
            raise RuntimeError("faiss-cpu not installed")

        texts = [c["content"] for c in chunks]
        embeddings = self.embed_texts(texts)
        dim = embeddings.shape[1]

        index = faiss.IndexFlatIP(dim)
        index.add(embeddings)

        faiss.write_index(index, str(self._index_path(pack_id)))

        meta = [{"id": c["id"], "content": c["content"], "page": c.get("page")} for c in chunks]
        with open(self._meta_path(pack_id), "w") as f:
            json.dump(meta, f)

        return len(chunks)

    def load_index(self, pack_id: str):
        if not FAISS_AVAILABLE:
            raise RuntimeError("faiss-cpu not installed")
        path = self._index_path(pack_id)
        if not path.exists():
            raise FileNotFoundError(f"No FAISS index found for pack {pack_id}")
        return faiss.read_index(str(path))

    def load_meta(self, pack_id: str) -> List[dict]:
        path = self._meta_path(pack_id)
        if not path.exists():
            return []
        with open(path) as f:
            return json.load(f)

    def search_chunks(self, pack_id: str, query: str, top_k: int = 5) -> List[Tuple[dict, float]]:
        """
        Returns list of (chunk_meta, score) tuples, best match first.
        """
        if not FAISS_AVAILABLE:
            return []

        index = self.load_index(pack_id)
        meta = self.load_meta(pack_id)

        query_vec = self.embed_texts([query])
        scores, indices = index.search(query_vec, min(top_k, len(meta)))

        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx >= 0 and idx < len(meta):
                results.append((meta[idx], float(score)))
        return results

    def delete_index(self, pack_id: str):
        for path in [self._index_path(pack_id), self._meta_path(pack_id)]:
            if path.exists():
                path.unlink()


faiss_service = FAISSService()
