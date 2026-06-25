import { useState } from "react";
import { uploadKnowledgePack } from "@/lib/api";
import { useLocation } from "wouter";

export default function UploadKnowledgePack() {
  const [, navigate] = useLocation();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a PDF");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("access_token");

      if (!token) {
        alert("Please login first");
        return;
      }

      const result =
        await uploadKnowledgePack(
          file,
          title,
          subject,
          token
        );

      console.log(result);

      localStorage.setItem(
        "currentPackId",
        result.pack_id
      );

      alert(
        "Knowledge Pack Uploaded Successfully"
      );

      navigate("/ai-tutor");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        Upload Knowledge Pack
      </h1>

      <input
        type="text"
        placeholder="Pack Title"
        className="border p-3 w-full mb-4"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="text"
        placeholder="Subject"
        className="border p-3 w-full mb-4"
        value={subject}
        onChange={(e) =>
          setSubject(e.target.value)
        }
      />

      <input
        type="file"
        accept=".pdf"
        className="mb-4"
        onChange={(e) =>
          setFile(
            e.target.files
              ? e.target.files[0]
              : null
          )
        }
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading
          ? "Uploading..."
          : "Upload PDF"}
      </button>
    </div>
  );
}