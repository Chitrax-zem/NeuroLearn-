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

const packs = [
  { icon: Atom, name: "Physics Complete", difficulty: "Advanced", active: true, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: Calculator, name: "Mathematics Pro", difficulty: "Intermediate", active: false, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: FlaskConical, name: "Chemistry Basics", difficulty: "Beginner", active: false, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  { icon: Code, name: "CS Fundamentals", difficulty: "Intermediate", active: false, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
];

const suggestedQuestions = [
  "What is Newton's First Law?",
  "How does mass affect acceleration?",
  "Give me real-world examples",
  "Explain momentum vs force",
];

type Message = {
  id: number;
  role: "user" | "ai";
  content: string;
  type?: "default" | "formula" | "quiz" | "example";
};

const initialMessages: Message[] = [
  { id: 1, role: "user", content: "Explain Newton's Second Law of Motion" },
  { id: 2, role: "ai", content: "Newton's Second Law states that the acceleration of an object is directly proportional to the net force applied and inversely proportional to its mass. In other words, applying more force to an object causes it to accelerate faster, while a heavier object requires more force to achieve the same acceleration.", type: "default" },
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

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [showTyping, setShowTyping] = useState(false);
  const [showFullResponse, setShowFullResponse] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowFullResponse(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: `Great question about "${input}"! This is directly related to the concepts we've been exploring in Newton's Laws. The key principle here involves the relationship between force, mass, and acceleration. Keep asking — every question deepens your understanding!`,
        type: "default",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 2000);
  };

  return (
    <AppShell>
      <div className="flex h-[calc(100vh-4rem)] gap-4 -mt-6 -mx-6 px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-56 shrink-0 flex flex-col gap-3"
        >
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Knowledge Packs</h3>
          <div className="space-y-2">
            {packs.map((pack, i) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 3 }}
                className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                  pack.active
                    ? `${pack.bg} shadow-lg`
                    : "border-white/5 bg-card/30 hover:bg-card/60"
                }`}
              >
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${pack.active ? pack.bg : "bg-white/5"}`}>
                  <pack.icon className={`h-4 w-4 ${pack.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{pack.name}</p>
                  <p className="text-xs text-muted-foreground">{pack.difficulty}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-auto rounded-xl border border-dashed border-white/10 p-3 text-center hover:border-primary/30 transition-colors cursor-pointer group">
            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary mx-auto mb-1 transition-colors" />
            <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">Upload Pack</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
                  Online · Physics Complete
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5">
                <Upload className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/5">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary to-secondary px-4 py-3">
                      <p className="text-sm text-white font-medium">{msg.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shrink-0 shadow-lg shadow-primary/20">
                      <Brain className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-[85%] space-y-3">
                      <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-card/80 px-4 py-3">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      {idx === 1 && showFullResponse && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-3"
                        >
                          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                              <BookOpen className="h-3.5 w-3.5" /> Formula
                            </p>
                            <div className="text-center py-3">
                              <span className="text-4xl font-black">
                                <span className="text-primary">F</span>
                                <span className="text-muted-foreground mx-2">=</span>
                                <span className="text-secondary">m</span>
                                <span className="text-muted-foreground mx-1">×</span>
                                <span className="text-green-400">a</span>
                              </span>
                            </div>
                            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
                              <span><span className="text-primary font-semibold">F</span> = Force (Newtons)</span>
                              <span><span className="text-secondary font-semibold">m</span> = Mass (kg)</span>
                              <span><span className="text-green-400 font-semibold">a</span> = Acceleration (m/s²)</span>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/5 bg-card/60 p-4">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <Zap className="h-3.5 w-3.5 text-yellow-400" /> Real-World Example
                            </p>
                            <p className="text-sm leading-relaxed">
                              A rocket with a mass of <span className="text-primary font-semibold">1,000 kg</span> needs a force of{" "}
                              <span className="text-secondary font-semibold">50,000 N</span> to achieve an acceleration of{" "}
                              <span className="text-green-400 font-semibold">50 m/s²</span>.
                            </p>
                            <div className="mt-2 rounded-lg bg-white/3 px-3 py-2 font-mono text-sm">
                              F = 1000 × 50 = <span className="text-primary font-bold">50,000 N</span>
                            </div>
                          </div>

                          <Link href="/quiz">
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 py-2.5 cursor-pointer hover:bg-secondary/20 transition-colors"
                            >
                              <Target className="h-4 w-4 text-secondary" />
                              <span className="text-sm font-semibold text-secondary">Take a Quiz on Newton's Laws</span>
                              <ChevronRight className="h-4 w-4 text-secondary" />
                            </motion.div>
                          </Link>

                          <div className="text-xs text-muted-foreground flex items-center gap-1.5 px-1">
                            <ExternalLink className="h-3 w-3" />
                            Source: <span className="text-primary">Physics Complete Pack — Chapter 3: Classical Mechanics</span>
                          </div>

                          <div className="space-y-2">
                            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                              <Lightbulb className="h-3.5 w-3.5 text-yellow-400" /> Follow-up questions
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {suggestedQuestions.map((q) => (
                                <motion.button
                                  key={q}
                                  whileHover={{ scale: 1.03 }}
                                  whileTap={{ scale: 0.97 }}
                                  onClick={() => setInput(q)}
                                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all"
                                >
                                  {q}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
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

          <div className="border-t border-white/5 p-4 shrink-0">
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 shrink-0 hover:bg-white/5 rounded-xl">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask me anything about Physics..."
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

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-64 shrink-0 flex flex-col gap-3"
        >
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Learning Insights</h3>
          <div className="rounded-xl border border-white/5 bg-card/50 p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Current Topic</p>
              <p className="text-sm font-semibold">Newton's Laws of Motion</p>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">Mastery</span>
                <span className="text-primary font-semibold">68%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: "68%" }}
                  transition={{ duration: 1, delay: 0.5 }}
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
              {["Momentum", "Energy", "Forces", "Gravity", "Friction"].map((t) => (
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
              +85 XP
            </motion.p>
            <p className="text-xs text-muted-foreground">Keep asking questions!</p>
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
