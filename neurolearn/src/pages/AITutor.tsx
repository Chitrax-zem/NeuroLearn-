import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { askAI } from "@/lib/api";
import {
  Brain, Mic, MicOff, Paperclip, Send, FileText, Upload,
  Atom, FlaskConical, Code, Calculator, Zap, ChevronRight, BookOpen,
  MessageSquare, Target, Lightbulb, ExternalLink, CheckCircle, XCircle, Loader2
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadKnowledgePack } from "@/lib/api";

type PackKey = "physics" | "maths" | "chemistry" | "cs";

type PackData = {
  key: PackKey;
  icon: React.ElementType;
  name: string;
  difficulty: string;
  color: string;
  bg: string;
  accentColor: string;
  userQuestion: string;
  aiIntro: string;
  formulaLabel: string;
  formulaDisplay: React.ReactNode;
  formulaLegend: { color: string; label: string }[];
  exampleTitle: string;
  exampleText: React.ReactNode;
  exampleCalc: React.ReactNode;
  quizLabel: string;
  sourceChapter: string;
  followUps: string[];
  topic: string;
  mastery: number;
  relatedTopics: string[];
  sessionXP: number;
};




const packs: PackData[] = [
  {
    key: "physics",
    icon: Atom,
    name: "Physics Complete",
    difficulty: "Advanced",
    color: "text-[#5EF0DA]",
    bg: "bg-[#5EF0DA]/10 border-[#5EF0DA]/20",
    accentColor: "blue",
    userQuestion: "Explain Newton's Second Law of Motion",
    aiIntro: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass. In other words, applying more force to an object causes it to accelerate faster, while a heavier object requires more force to achieve the same acceleration.",
    formulaLabel: "Formula",
    formulaDisplay: (
      <span className="text-4xl font-black">
        <span className="text-[#5EF0DA]">F</span>
        <span className="text-muted-foreground mx-2">=</span>
        <span className="text-[#A78BFA]">m</span>
        <span className="text-muted-foreground mx-1">×</span>
        <span className="text-green-400">a</span>
      </span>
    ),
    formulaLegend: [
      { color: "text-[#5EF0DA]", label: "F = Force (Newtons)" },
      { color: "text-[#A78BFA]", label: "m = Mass (kg)" },
      { color: "text-green-400", label: "a = Acceleration (m/s²)" },
    ],
    exampleTitle: "Real-World Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        A rocket with a mass of <span className="text-[#5EF0DA] font-semibold">1,000 kg</span> needs a force of{" "}
        <span className="text-[#A78BFA] font-semibold">50,000 N</span> to achieve an acceleration of{" "}
        <span className="text-green-400 font-semibold">50 m/s²</span>.
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm">
        F = 1000 × 50 = <span className="text-[#5EF0DA] font-bold">50,000 N</span>
      </div>
    ),
    quizLabel: "Take a Quiz on Newton's Laws",
    sourceChapter: "Physics Complete Pack — Chapter 3: Classical Mechanics",
    followUps: [
      "What is Newton's First Law?",
      "How does mass affect acceleration?",
      "Give me real-world examples",
      "Explain momentum vs force",
    ],
    topic: "Newton's Laws of Motion",
    mastery: 68,
    relatedTopics: ["Momentum", "Energy", "Forces", "Gravity", "Friction"],
    sessionXP: 85,
  },
  {
    key: "maths",
    icon: Calculator,
    name: "Mathematics Pro",
    difficulty: "Intermediate",
    color: "text-[#A78BFA]",
    bg: "bg-[#A78BFA]/10 border-[#A78BFA]/20",
    accentColor: "purple",
    userQuestion: "Explain the Quadratic Formula",
    aiIntro: "The Quadratic Formula is used to find the roots of any quadratic equation of the form ax² + bx + c = 0. It gives us the exact values of x where the parabola crosses the x-axis. The formula works even when factoring is difficult or impossible — making it one of the most powerful tools in algebra.",
    formulaLabel: "Quadratic Formula",
    formulaDisplay: (
      <div className="text-center py-2">
        <span className="text-xl font-black font-mono">
          <span className="text-[#A78BFA]">x</span>
          <span className="text-muted-foreground"> = </span>
          <span className="text-foreground">
            <span className="text-[#A78BFA]">−b</span>
            <span className="text-muted-foreground"> ± </span>
            <span className="text-green-400">√(b²−4ac)</span>
          </span>
        </span>
        <div className="border-t border-white/20 my-1 mx-auto w-48" />
        <span className="text-xl font-black font-mono">
          <span className="text-yellow-400">2a</span>
        </span>
      </div>
    ),
    formulaLegend: [
      { color: "text-[#A78BFA]", label: "x = roots of the equation" },
      { color: "text-[#A78BFA]", label: "b = linear coefficient" },
      { color: "text-green-400", label: "b²−4ac = discriminant" },
    ],
    exampleTitle: "Worked Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Solve <span className="text-[#A78BFA] font-semibold">x² − 5x + 6 = 0</span> where{" "}
        <span className="text-[#A78BFA] font-semibold">a=1, b=−5, c=6</span>.
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm space-y-1">
        <div>x = (5 ± √(25 − 24)) / 2</div>
        <div>x = (5 ± √1) / 2</div>
        <div>
          x = <span className="text-[#A78BFA] font-bold">3</span> or x = <span className="text-[#A78BFA] font-bold">2</span>
        </div>
      </div>
    ),
    quizLabel: "Take a Quiz on Quadratic Equations",
    sourceChapter: "Mathematics Pro Pack — Chapter 5: Algebra & Polynomials",
    followUps: [
      "What is the discriminant?",
      "When does the equation have no real roots?",
      "How do I complete the square?",
      "What is vertex form of a parabola?",
    ],
    topic: "Quadratic Equations",
    mastery: 55,
    relatedTopics: ["Polynomials", "Parabolas", "Factoring", "Roots", "Algebra"],
    sessionXP: 70,
  },
  {
    key: "chemistry",
    icon: FlaskConical,
    name: "Chemistry Basics",
    difficulty: "Beginner",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    accentColor: "emerald",
    userQuestion: "Explain Molarity and how to calculate it",
    aiIntro: "Molarity is one of the most important ways to express the concentration of a solution in chemistry. It tells us how many moles of a solute are dissolved in one litre of solution. The higher the molarity, the more concentrated the solution. It's used in titrations, reactions, and lab work every day.",
    formulaLabel: "Molarity Formula",
    formulaDisplay: (
      <span className="text-4xl font-black">
        <span className="text-emerald-400">M</span>
        <span className="text-muted-foreground mx-2">=</span>
        <span className="text-[#A78BFA]">n</span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-yellow-400">V</span>
      </span>
    ),
    formulaLegend: [
      { color: "text-emerald-400", label: "M = Molarity (mol/L)" },
      { color: "text-[#A78BFA]", label: "n = moles of solute" },
      { color: "text-yellow-400", label: "V = Volume of solution (L)" },
    ],
    exampleTitle: "Lab Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Dissolve <span className="text-[#A78BFA] font-semibold">0.5 moles</span> of NaCl into{" "}
        <span className="text-yellow-400 font-semibold">2 litres</span> of water.
        What is the molarity?
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm space-y-1">
        <div>M = n / V</div>
        <div>M = 0.5 mol / 2 L</div>
        <div>
          M = <span className="text-emerald-400 font-bold">0.25 mol/L</span>
        </div>
      </div>
    ),
    quizLabel: "Take a Quiz on Molarity & Solutions",
    sourceChapter: "Chemistry Basics Pack — Chapter 4: Solutions & Concentration",
    followUps: [
      "What is the difference between molarity and molality?",
      "How do I calculate moles from grams?",
      "What is a titration?",
      "Explain dilution of a solution",
    ],
    topic: "Molarity & Concentration",
    mastery: 42,
    relatedTopics: ["Moles", "Solutions", "Titration", "Dilution", "pH"],
    sessionXP: 60,
  },
  {
    key: "cs",
    icon: Code,
    name: "CS Fundamentals",
    difficulty: "Intermediate",
    color: "text-[#FBBF24]",
    bg: "bg-[#FBBF24]/10 border-[#FBBF24]/20",
    accentColor: "orange",
    userQuestion: "Explain Big-O Notation and time complexity",
    aiIntro: "Big-O Notation is the language used to describe the efficiency of an algorithm — specifically how its runtime or space usage grows as the input size (n) increases. It tells us the worst-case scenario. Understanding Big-O helps you write code that scales well, which is critical in real-world software engineering and technical interviews.",
    formulaLabel: "Common Complexities (best → worst)",
    formulaDisplay: (
      <div className="space-y-1.5 text-sm font-mono text-left w-full px-2">
        {[
          { notation: "O(1)", label: "Constant", color: "text-green-400" },
          { notation: "O(log n)", label: "Logarithmic", color: "text-[#5EF0DA]" },
          { notation: "O(n)", label: "Linear", color: "text-[#FBBF24]" },
          { notation: "O(n²)", label: "Quadratic", color: "text-red-400" },
        ].map((row) => (
          <div key={row.notation} className="flex items-center justify-between">
            <span className={`font-black ${row.color}`}>{row.notation}</span>
            <div className="flex-1 mx-3 border-t border-white/10 border-dashed" />
            <span className="text-muted-foreground text-xs">{row.label}</span>
          </div>
        ))}
      </div>
    ),
    formulaLegend: [
      { color: "text-[#FBBF24]", label: "n = size of input" },
      { color: "text-green-400", label: "O(1) = best (constant time)" },
      { color: "text-red-400", label: "O(n²) = avoid for large n" },
    ],
    exampleTitle: "Code Example: Linear vs Binary Search",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Searching an array of <span className="text-[#FBBF24] font-semibold">1,000,000 items</span>:{" "}
        Linear search checks up to <span className="text-red-400 font-semibold">1M steps</span>, while
        Binary search takes only <span className="text-green-400 font-semibold">20 steps</span> — O(log n).
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm space-y-1">
        <div><span className="text-red-400">Linear:</span>  O(n)      → 1,000,000 steps</div>
        <div><span className="text-green-400">Binary:</span>  O(log n) → log₂(1M) ≈ <span className="text-[#FBBF24] font-bold">20 steps</span></div>
      </div>
    ),
    quizLabel: "Take a Quiz on Algorithms & Big-O",
    sourceChapter: "CS Fundamentals Pack — Chapter 2: Algorithms & Complexity",
    followUps: [
      "What is O(n log n) — merge sort?",
      "How do I find the Big-O of my code?",
      "Explain space complexity vs time complexity",
      "What's the difference between best, average, worst case?",
    ],
    topic: "Big-O & Time Complexity",
    mastery: 50,
    relatedTopics: ["Sorting", "Searching", "Recursion", "Data Structures", "Graphs"],
    sessionXP: 75,
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] shrink-0">
        <Brain className="h-4 w-4 text-[#06121A]" />
      </div>
      <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-card/80 px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-[#5EF0DA]"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  type?: "default";
};

export default function AITutor() {
  const [activePackKey, setActivePackKey] = useState<PackKey>("physics");
  const [chatInputs, setChatInputs] = useState<Record<PackKey, string>>({
    physics: "", maths: "", chemistry: "", cs: ""
  });
  const [extraMessages, setExtraMessages] = useState<Record<PackKey, Message[]>>({
    physics: [], maths: [], chemistry: [], cs: []
  });
  const [showTyping, setShowTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const pack = packs.find((p) => p.key === activePackKey)!;
  const input = chatInputs[activePackKey];
  const messages = extraMessages[activePackKey];
  
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Mic (Speech Recognition)
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const handleMicToggle = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addMessage("ai", "⚠️ Speech recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setChatInputs((prev) => ({ ...prev, [activePackKey]: transcript }));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  // Chatbox attachment upload
  const chatFileRef = useRef<HTMLInputElement>(null);
  const [chatUploading, setChatUploading] = useState(false);

  const handleChatFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const token = localStorage.getItem("access_token");
    if (!token) {
      addMessage("ai", "⚠️ You must be logged in to upload a PDF.");
      return;
    }
    setChatUploading(true);
    addMessage("ai", `📎 Uploading "${file.name}"…`);
    try {
      const result = await uploadKnowledgePack(
        file,
        file.name.replace(".pdf", ""),
        "General",
        token
      );
      localStorage.setItem("currentPackId", result.pack_id);
      addMessage("ai", `✅ "${file.name}" uploaded and ready! You can now ask questions about it.`);
    } catch (err: any) {
      addMessage("ai", `❌ Upload failed: ${err.message}`);
    } finally {
      setChatUploading(false);
      if (chatFileRef.current) chatFileRef.current.value = "";
    }
  };
 
  const handleUploadPack = async () => {
    if (!pdfFile) {
      setUploadStatus({ type: "info", message: "Please select a PDF file first." });
      return;
    }
    const token = localStorage.getItem("access_token");
    if (!token) {
      setUploadStatus({ type: "error", message: "You must be logged in to upload." });
      return;
    }
    try {
      setUploading(true);
      setUploadStatus(null);
      const result = await uploadKnowledgePack(
        pdfFile,
        pdfFile.name.replace(".pdf", ""),
        "General",
        token
      );
      localStorage.setItem("currentPackId", result.pack_id);
      setUploadStatus({ type: "success", message: `✓ "${pdfFile.name}" uploaded! Pack is ready.` });
      setPdfFile(null);
    } catch (err: any) {
      console.error(err);
      setUploadStatus({ type: "error", message: err.message || "Upload failed. Please try again." });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping, activePackKey]);
 

  const msgIdRef = useRef(1);
  const nextId = () => msgIdRef.current++;

  const addMessage = (role: "user" | "ai", content: string): Message => {
    const msg: Message = { id: nextId(), role, content };
    setExtraMessages((prev) => ({
      ...prev,
      [activePackKey]: [...prev[activePackKey], msg],
    }));
    return msg;
  };

  const sendQuestion = async (question: string) => {
    addMessage("user", question);
    setChatInputs((prev) => ({ ...prev, [activePackKey]: "" }));
    setShowTyping(true);
    try {
      const packId = localStorage.getItem("currentPackId");
      if (!packId) {
        addMessage("ai", "⚠️ No knowledge pack is loaded yet. Please upload a PDF using the panel on the left, then ask your question again.");
        return;
      }
      const result = await askAI(packId, question);
      addMessage("ai", result.answer);
    } catch (err: any) {
      console.error("AI ERROR:", err);
      addMessage("ai", `Sorry, something went wrong: ${err.message}`);
    } finally {
      setShowTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendQuestion(input);
  };

  const handleSuggestion = (q: string) => {
    sendQuestion(q);
  };

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-4rem)] gap-4 -mt-6 -mx-6 px-6 pt-6">

        {/* LEFT: Pack Selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0 flex flex-col gap-3"
        >
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Knowledge Packs</h3>
          <div className="space-y-2">
            {packs.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 3 }}
                onClick={() => setActivePackKey(p.key)}
                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                  p.key === activePackKey
                    ? `${p.bg} shadow-lg`
                    : "border-white/5 bg-card/30 hover:bg-card/60"
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${p.key === activePackKey ? p.bg : "bg-white/5"}`}>
                  <p.icon className={`h-4 w-4 ${p.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.difficulty}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto rounded-xl border border-dashed border-[#5EF0DA]/30 p-3 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upload PDF</p>
            <label className={`flex items-center gap-2 rounded-lg border cursor-pointer px-2 py-1.5 text-xs transition-all ${pdfFile ? "border-[#5EF0DA]/40 bg-[#5EF0DA]/10 text-[#5EF0DA]" : "border-white/10 bg-white/5 text-muted-foreground hover:border-white/20"}`}>
              <Upload className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{pdfFile ? pdfFile.name : "Choose PDF…"}</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => {
                  setPdfFile(e.target.files?.[0] || null);
                  setUploadStatus(null);
                }}
              />
            </label>
            {uploadStatus && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-xs rounded-lg px-2 py-1.5 leading-snug ${
                  uploadStatus.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : uploadStatus.type === "error"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : "bg-[#5EF0DA]/10 text-[#5EF0DA] border border-[#5EF0DA]/20"
                }`}
              >
                {uploadStatus.message}
              </motion.p>
            )}
            <Button
              onClick={handleUploadPack}
              disabled={uploading}
              className="w-full h-8 text-xs"
            >
              {uploading ? (
                <span className="flex items-center gap-1.5">
                  <motion.span
                    className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white inline-block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Uploading…
                </span>
              ) : "Upload PDF"}
            </Button>
          </div>
        </motion.div>

        {/* CENTER: Chat */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePackKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col rounded-2xl border border-white/5 bg-card/30 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-card/50 backdrop-blur shrink-0">
              <div className="flex items-center gap-3">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] shadow-lg shadow-[#5EF0DA]/30"
                  animate={{ boxShadow: ["0 0 0 0 rgba(94,240,218,0.4)", "0 0 0 8px rgba(94,240,218,0)", "0 0 0 0 rgba(94,240,218,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Brain className="h-5 w-5 text-[#06121A]" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">NeuroLearn AI</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Online · {pack.name}
                  </p>
                </div>
              </div>
             
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* Pre-loaded conversation */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#5EF0DA] to-[#A78BFA] px-4 py-3">
                    <p className="text-sm text-[#06121A] font-medium">{pack.userQuestion}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] shrink-0 shadow-lg shadow-[#5EF0DA]/20">
                    <Brain className="h-4 w-4 text-[#06121A]" />
                  </div>
                  <div className="max-w-[85%] space-y-3">
                    <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-card/80 px-4 py-3">
                      <p className="text-sm leading-relaxed">{pack.aiIntro}</p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      {/* Formula card */}
                      <div className="rounded-2xl border border-[#5EF0DA]/20 bg-[#5EF0DA]/5 p-4">
                        <p className="text-xs font-bold text-[#5EF0DA] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" /> {pack.formulaLabel}
                        </p>
                        <div className="flex items-center justify-center py-3">
                          {pack.formulaDisplay}
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground mt-2">
                          {pack.formulaLegend.map((leg) => (
                            <span key={leg.label}><span className={`${leg.color} font-semibold`}>{leg.label.split(" = ")[0]}</span> = {leg.label.split(" = ")[1]}</span>
                          ))}
                        </div>
                      </div>

                      {/* Example card */}
                      <div className="rounded-2xl border border-white/5 bg-card/60 p-4">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-yellow-400" /> {pack.exampleTitle}
                        </p>
                        {pack.exampleText}
                        {pack.exampleCalc}
                      </div>

                      {/* Quiz CTA */}
                      <Link href="/quiz">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center justify-center gap-2 rounded-xl border border-[#A78BFA]/30 bg-[#A78BFA]/10 py-2.5 cursor-pointer hover:bg-[#A78BFA]/20 transition-colors"
                        >
                          <Target className="h-4 w-4 text-[#A78BFA]" />
                          <span className="text-sm font-semibold text-[#A78BFA]">{pack.quizLabel}</span>
                          <ChevronRight className="h-4 w-4 text-[#A78BFA]" />
                        </motion.div>
                      </Link>

                      {/* Source */}
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 px-1">
                        <ExternalLink className="h-3 w-3" />
                        Source: <span className="text-[#5EF0DA]">{pack.sourceChapter}</span>
                      </div>

                      {/* Follow-ups */}
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5 text-yellow-400" /> Follow-up questions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {pack.followUps.map((q) => (
                            <motion.button
                              key={q}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleSuggestion(q)}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:border-[#5EF0DA]/30 hover:bg-[#5EF0DA]/10 hover:text-[#5EF0DA] transition-all"
                            >
                              {q}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Extra user messages */}
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  {msg.role === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-[#5EF0DA] to-[#A78BFA] px-4 py-3">
                        <p className="text-sm text-[#06121A] font-medium">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] shrink-0">
                        <Brain className="h-4 w-4 text-[#06121A]" />
                      </div>
                      <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-card/80 px-4 py-3 max-w-[85%]">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              <AnimatePresence>
                {showTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="border-t border-white/5 p-4 shrink-0">
              <div className="flex gap-2 items-center">
                {/* Paperclip — upload PDF from chat */}
                <input
                  ref={chatFileRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleChatFileUpload}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={chatUploading}
                  onClick={() => chatFileRef.current?.click()}
                  className="h-10 w-10 p-0 shrink-0 hover:bg-white/5 rounded-xl"
                  title="Attach PDF"
                >
                  {chatUploading
                    ? <Loader2 className="h-4 w-4 text-[#5EF0DA] animate-spin" />
                    : <Paperclip className="h-4 w-4 text-muted-foreground" />}
                </Button>

                <Input
                  value={input}
                  onChange={(e) => setChatInputs((prev) => ({ ...prev, [activePackKey]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder={isListening ? "Listening…" : `Ask me anything about ${pack.name}...`}
                  className={`flex-1 border-white/10 bg-white/5 focus-visible:ring-[#5EF0DA] rounded-xl h-10 transition-all ${isListening ? "border-red-500/50 ring-1 ring-red-500/30 placeholder:text-red-400" : ""}`}
                  data-testid="input-chat"
                />

                {/* Mic */}
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMicToggle}
                    className={`h-10 w-10 p-0 shrink-0 rounded-xl transition-all ${isListening ? "bg-red-500/20 hover:bg-red-500/30" : "hover:bg-white/5"}`}
                    title={isListening ? "Stop listening" : "Speak your question"}
                  >
                    <AnimatePresence mode="wait">
                      {isListening ? (
                        <motion.span key="mic-on" initial={{ scale: 0.7 }} animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                          <MicOff className="h-4 w-4 text-red-400" />
                        </motion.span>
                      ) : (
                        <motion.span key="mic-off" initial={{ scale: 0.7 }} animate={{ scale: 1 }}>
                          <Mic className="h-4 w-4 text-muted-foreground" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>

                {/* Send */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 p-0 bg-gradient-to-r from-[#5EF0DA] to-[#A78BFA] text-[#06121A] border-0 shadow-lg shadow-[#5EF0DA]/20 rounded-xl"
                    data-testid="button-send"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* RIGHT: Insights panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`insights-${activePackKey}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="w-64 shrink-0 flex flex-col gap-3"
          >
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Learning Insights</h3>
            <div className="rounded-xl border border-white/5 bg-card/50 p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Topic</p>
                <p className="text-sm font-semibold">{pack.topic}</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground">Mastery</span>
                  <span className="text-[#5EF0DA] font-semibold">{pack.mastery}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#5EF0DA] to-[#A78BFA]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pack.mastery}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-card/50 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-muted-foreground">Questions Today</p>
                <span className="text-lg font-black text-[#5EF0DA]">12</span>
              </div>
              <div className="flex gap-1">
                {[8, 5, 10, 12, 7, 9, 12].map((v, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-[#5EF0DA]/30"
                    initial={{ height: 0 }}
                    animate={{ height: `${v * 2}px` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    style={{ alignSelf: "flex-end" }}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Last 7 days</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-card/50 p-4">
              <p className="text-xs font-semibold mb-2">Related Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {pack.relatedTopics.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs hover:border-[#5EF0DA]/30 hover:text-[#5EF0DA] cursor-pointer transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-yellow-400 mb-1">Study Tip</p>
                  <p className="text-xs text-muted-foreground">You learn best in 25-minute focused sessions. Take a 5-min break after this one!</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-card/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">Session XP</p>
              <motion.p
                className="text-2xl font-black text-yellow-400"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
              >
                +{pack.sessionXP} XP
              </motion.p>
              <p className="text-xs text-muted-foreground">Keep asking questions!</p>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </AppShell>
  );
}