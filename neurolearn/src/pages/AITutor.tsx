import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import {
  Brain, Mic, Paperclip, Send, FileText, Upload,
  Atom, FlaskConical, Code, Calculator, Zap, ChevronRight, BookOpen,
  MessageSquare, Target, Lightbulb, ExternalLink
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    accentColor: "blue",
    userQuestion: "Explain Newton's Second Law of Motion",
    aiIntro: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass. In other words, applying more force to an object causes it to accelerate faster, while a heavier object requires more force to achieve the same acceleration.",
    formulaLabel: "Formula",
    formulaDisplay: (
      <span className="text-4xl font-black">
        <span className="text-blue-400">F</span>
        <span className="text-muted-foreground mx-2">=</span>
        <span className="text-secondary">m</span>
        <span className="text-muted-foreground mx-1">×</span>
        <span className="text-green-400">a</span>
      </span>
    ),
    formulaLegend: [
      { color: "text-blue-400", label: "F = Force (Newtons)" },
      { color: "text-secondary", label: "m = Mass (kg)" },
      { color: "text-green-400", label: "a = Acceleration (m/s²)" },
    ],
    exampleTitle: "Real-World Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        A rocket with a mass of <span className="text-blue-400 font-semibold">1,000 kg</span> needs a force of{" "}
        <span className="text-secondary font-semibold">50,000 N</span> to achieve an acceleration of{" "}
        <span className="text-green-400 font-semibold">50 m/s²</span>.
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm">
        F = 1000 × 50 = <span className="text-blue-400 font-bold">50,000 N</span>
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
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    accentColor: "purple",
    userQuestion: "Explain the Quadratic Formula",
    aiIntro: "The Quadratic Formula is used to find the roots of any quadratic equation of the form ax² + bx + c = 0. It gives us the exact values of x where the parabola crosses the x-axis. The formula works even when factoring is difficult or impossible — making it one of the most powerful tools in algebra.",
    formulaLabel: "Quadratic Formula",
    formulaDisplay: (
      <div className="text-center py-2">
        <span className="text-xl font-black font-mono">
          <span className="text-purple-400">x</span>
          <span className="text-muted-foreground"> = </span>
          <span className="text-foreground">
            <span className="text-secondary">−b</span>
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
      { color: "text-purple-400", label: "x = roots of the equation" },
      { color: "text-secondary", label: "b = linear coefficient" },
      { color: "text-green-400", label: "b²−4ac = discriminant" },
    ],
    exampleTitle: "Worked Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Solve <span className="text-purple-400 font-semibold">x² − 5x + 6 = 0</span> where{" "}
        <span className="text-secondary font-semibold">a=1, b=−5, c=6</span>.
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm space-y-1">
        <div>x = (5 ± √(25 − 24)) / 2</div>
        <div>x = (5 ± √1) / 2</div>
        <div>
          x = <span className="text-purple-400 font-bold">3</span> or x = <span className="text-purple-400 font-bold">2</span>
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
        <span className="text-secondary">n</span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-yellow-400">V</span>
      </span>
    ),
    formulaLegend: [
      { color: "text-emerald-400", label: "M = Molarity (mol/L)" },
      { color: "text-secondary", label: "n = moles of solute" },
      { color: "text-yellow-400", label: "V = Volume of solution (L)" },
    ],
    exampleTitle: "Lab Example",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Dissolve <span className="text-secondary font-semibold">0.5 moles</span> of NaCl into{" "}
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
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
    accentColor: "orange",
    userQuestion: "Explain Big-O Notation and time complexity",
    aiIntro: "Big-O Notation is the language used to describe the efficiency of an algorithm — specifically how its runtime or space usage grows as the input size (n) increases. It tells us the worst-case scenario. Understanding Big-O helps you write code that scales well, which is critical in real-world software engineering and technical interviews.",
    formulaLabel: "Common Complexities (best → worst)",
    formulaDisplay: (
      <div className="space-y-1.5 text-sm font-mono text-left w-full px-2">
        {[
          { notation: "O(1)", label: "Constant", color: "text-green-400" },
          { notation: "O(log n)", label: "Logarithmic", color: "text-blue-400" },
          { notation: "O(n)", label: "Linear", color: "text-orange-400" },
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
      { color: "text-orange-400", label: "n = size of input" },
      { color: "text-green-400", label: "O(1) = best (constant time)" },
      { color: "text-red-400", label: "O(n²) = avoid for large n" },
    ],
    exampleTitle: "Code Example: Linear vs Binary Search",
    exampleText: (
      <p className="text-sm leading-relaxed">
        Searching an array of <span className="text-orange-400 font-semibold">1,000,000 items</span>:{" "}
        Linear search checks up to <span className="text-red-400 font-semibold">1M steps</span>, while
        Binary search takes only <span className="text-green-400 font-semibold">20 steps</span> — O(log n).
      </p>
    ),
    exampleCalc: (
      <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm space-y-1">
        <div><span className="text-red-400">Linear:</span>  O(n)      → 1,000,000 steps</div>
        <div><span className="text-green-400">Binary:</span>  O(log n) → log₂(1M) ≈ <span className="text-orange-400 font-bold">20 steps</span></div>
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
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shrink-0">
        <Brain className="h-4 w-4 text-white" />
      </div>
      <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-card/80 px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
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

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping, activePackKey]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setExtraMessages((prev) => ({ ...prev, [activePackKey]: [...prev[activePackKey], userMsg] }));
    setChatInputs((prev) => ({ ...prev, [activePackKey]: "" }));
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: `Great question about "${input}"! This ties directly into ${pack.topic}. Keep exploring — every question deepens your mastery of ${pack.name}.`,
        type: "default",
      };
      setExtraMessages((prev) => ({ ...prev, [activePackKey]: [...prev[activePackKey], aiMsg] }));
    }, 2000);
  };

  const handleSuggestion = (q: string) => {
    setChatInputs((prev) => ({ ...prev, [activePackKey]: q }));
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
          <div className="mt-auto rounded-xl border border-dashed border-white/10 p-3 text-center hover:border-primary/30 transition-colors cursor-pointer group">
            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary mx-auto mb-1 transition-colors" />
            <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Upload Pack</p>
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
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30"
                  animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.4)", "0 0 0 8px rgba(59,130,246,0)", "0 0 0 0 rgba(59,130,246,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Brain className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold">NeuroLearn AI</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                    Online · {pack.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5"><Mic className="h-4 w-4 text-muted-foreground" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5"><Upload className="h-4 w-4 text-muted-foreground" /></Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5"><FileText className="h-4 w-4 text-muted-foreground" /></Button>
              </div>
            </div>

            <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* Pre-loaded conversation */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary to-secondary px-4 py-3">
                    <p className="text-sm text-white font-medium">{pack.userQuestion}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shrink-0 shadow-lg shadow-primary/20">
                    <Brain className="h-4 w-4 text-white" />
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
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
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
                          className="flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 py-2.5 cursor-pointer hover:bg-secondary/20 transition-colors"
                        >
                          <Target className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-semibold text-secondary">{pack.quizLabel}</span>
                          <ChevronRight className="h-4 w-4 text-secondary" />
                        </motion.div>
                      </Link>

                      {/* Source */}
                      <div className="text-xs text-muted-foreground flex items-center gap-1.5 px-1">
                        <ExternalLink className="h-3 w-3" />
                        Source: <span className="text-primary">{pack.sourceChapter}</span>
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
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all"
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
                      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary to-secondary px-4 py-3">
                        <p className="text-sm text-white font-medium">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shrink-0">
                        <Brain className="h-4 w-4 text-white" />
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
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 shrink-0 hover:bg-white/5 rounded-xl">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setChatInputs((prev) => ({ ...prev, [activePackKey]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={`Ask me anything about ${pack.name}...`}
                  className="flex-1 border-white/10 bg-white/5 focus-visible:ring-primary rounded-xl h-10"
                  data-testid="input-chat"
                />
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 shrink-0 hover:bg-white/5 rounded-xl">
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="h-10 w-10 p-0 bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/20 rounded-xl"
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
                  <span className="text-primary font-semibold">{pack.mastery}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
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
                <span className="text-lg font-black text-primary">12</span>
              </div>
              <div className="flex gap-1">
                {[8, 5, 10, 12, 7, 9, 12].map((v, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-sm bg-primary/30"
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
                  <span key={t} className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs hover:border-primary/30 hover:text-primary cursor-pointer transition-all">
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
