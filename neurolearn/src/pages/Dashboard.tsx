import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Brain, Zap, MessageSquare, TrendingUp, BookOpen, Clock,
  CheckCircle2, Circle, ArrowRight, Flame, Star, Play
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

const user = JSON.parse(localStorage.getItem("user") || "{}");

const subjects = [
  { name: "Physics", emoji: "⚛️", progress: 72, xp: 2340, lessons: 18, total: 25, color: "from-[#5EF0DA]/10 to-transparent", border: "border-[#5EF0DA]/20", ring: "#5EF0DA" },
  { name: "Mathematics", emoji: "📐", progress: 58, xp: 1890, lessons: 14, total: 24, color: "from-[#A78BFA]/10 to-transparent", border: "border-[#A78BFA]/20", ring: "#A78BFA" },
  { name: "Chemistry", emoji: "🧪", progress: 45, xp: 1200, lessons: 9, total: 20, color: "from-emerald-500/10 to-transparent", border: "border-emerald-500/20", ring: "#34D399" },
  { name: "Computer Science", emoji: "💻", progress: 83, xp: 3100, lessons: 20, total: 24, color: "from-[#FBBF24]/10 to-transparent", border: "border-[#FBBF24]/20", ring: "#FBBF24" },
];

const goals = [
  { label: "Physics Chapter 4", done: true },
  { label: "AI Quiz", done: false },
  { label: "Complete Mathematics Pack", done: false },
];

const recentConversations = [
  { topic: "Newton's Laws of Motion", time: "2h ago", subject: "Physics", color: "text-[#5EF0DA]", dot: "#5EF0DA" },
  { topic: "Quadratic Equations", time: "Yesterday", subject: "Mathematics", color: "text-[#A78BFA]", dot: "#A78BFA" },
  { topic: "Electron Configuration", time: "2 days ago", subject: "Chemistry", color: "text-emerald-400", dot: "#34D399" },
];

function ProgressRing({ progress, color, size = 60 }: { progress: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="4"
        strokeLinecap="round" strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">{progress}%</text>
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Dashboard() {
  return (
    <AppShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-10">

        {/* Hero Banner */}
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden rounded-2xl p-6"
          style={{
            background: "linear-gradient(135deg, rgba(94,240,218,0.18) 0%, rgba(7,11,20,0.6) 50%, rgba(251,191,36,0.12) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Background radial */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(94,240,218,0.25) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -left-8 bottom-0 h-32 w-32 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(251,191,36,0.2) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Good Evening</p>
              <h1 className="text-3xl font-black tracking-tight text-white mb-3">{user.full_name || "User"}</h1>
              <motion.div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)" }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-400">17-Day Streak</span>
                <span className="text-xs" style={{ color: "rgba(251,146,60,0.6)" }}>Keep going!</span>
              </motion.div>
              <div className="max-w-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Today's Goal</span>
                  <span className="text-xs font-semibold" style={{ color: "#5EF0DA" }}>1/3 completed</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "#5EF0DA" }}
                    initial={{ width: 0 }}
                    animate={{ width: "33%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>

            <div className="hidden sm:flex flex-col gap-2">
              {goals.map((g, i) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  {g.done
                    ? <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    : <Circle className="h-4 w-4 shrink-0" style={{ color: "rgba(255,255,255,0.25)" }} />}
                  <span style={{ color: g.done ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)", textDecoration: g.done ? "line-through" : "none" }}>
                    {g.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Subjects */}
        <div>
          <h2 className="text-base font-bold mb-4 text-white">Your Subjects</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.18 } }}
                className={`relative overflow-hidden rounded-2xl ${s.border} bg-gradient-to-br ${s.color} p-4 cursor-pointer group`}
                style={{ border: `1px solid`, borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{s.emoji}</span>
                    <h3 className="text-sm font-bold mt-1.5 text-white">{s.name}</h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{s.lessons}/{s.total} lessons</p>
                  </div>
                  <ProgressRing progress={s.progress} color={s.ring} size={50} />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold text-yellow-400">{s.xp.toLocaleString()} XP</span>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{ boxShadow: `inset 0 0 30px ${s.ring}15` }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Middle row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Recent Conversations */}
          <motion.div
            variants={cardVariants}
            className="lg:col-span-2 rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-white">
              <MessageSquare className="h-4 w-4" style={{ color: "#5EF0DA" }} />
              Recent AI Conversations
            </h2>
            <div className="space-y-2">
              {recentConversations.map((c) => (
                <Link href="/tutor" key={c.topic}>
                  <motion.div
                    whileHover={{ x: 4, background: "rgba(94,240,218,0.06)" }}
                    className="flex items-center justify-between rounded-xl p-3 cursor-pointer group transition-all"
                    style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "rgba(94,240,218,0.1)" }}>
                        <Brain className="h-4 w-4" style={{ color: "#5EF0DA" }} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-[#5EF0DA] transition-colors">{c.topic}</p>
                        <p className="text-xs mt-0.5">
                          <span style={{ color: "rgba(255,255,255,0.35)" }}>{c.time} · </span>
                          <span className={c.color}>{c.subject}</span>
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" style={{ color: "rgba(255,255,255,0.4)" }} />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl p-5"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-white">
              <Zap className="h-4 w-4 text-yellow-400" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link href="/tutor">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all"
                    style={{ background: "rgba(94,240,218,0.12)", border: "1px solid rgba(94,240,218,0.25)", color: "rgba(255,255,255,0.85)" }}>
                    <Brain className="h-4 w-4" style={{ color: "#5EF0DA" }} />
                    Ask AI Tutor
                  </button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)" }}>
                  <Play className="h-4 w-4 text-green-400" />
                  Continue Learning
                </button>
              </motion.div>
              <Link href="/marketplace">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)" }}>
                    <BookOpen className="h-4 w-4 text-[#A78BFA]" />
                    Open Marketplace
                  </button>
                </motion.div>
              </Link>
              <Link href="/analytics">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button className="w-full flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium text-left transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.65)" }}>
                    <TrendingUp className="h-4 w-4 text-[#5EF0DA]" />
                    View Analytics
                  </button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recommended Lessons */}
        <motion.div
          variants={cardVariants}
          className="rounded-2xl p-5"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <h2 className="text-sm font-bold mb-4 flex items-center gap-2 text-white">
            <Clock className="h-4 w-4" style={{ color: "#FBBF24" }} />
            Recommended Lessons
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "Newton's Third Law", subject: "Physics", duration: "25 min", difficulty: "Intermediate", gradient: "from-[#5EF0DA]/12 to-transparent", accent: "rgba(94,240,218,0.6)" },
              { title: "Derivatives & Integrals", subject: "Mathematics", duration: "40 min", difficulty: "Advanced", gradient: "from-[#A78BFA]/12 to-transparent", accent: "rgba(167,139,250,0.6)" },
              { title: "Chemical Bonding", subject: "Chemistry", duration: "30 min", difficulty: "Beginner", gradient: "from-emerald-500/12 to-transparent", accent: "rgba(16,185,129,0.6)" },
            ].map((lesson) => (
              <Link href="/tutor" key={lesson.title}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className={`rounded-xl bg-gradient-to-br ${lesson.gradient} p-4 cursor-pointer group transition-all`}
                  style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = `${lesson.accent}40`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <h3 className="text-sm font-semibold mb-1 text-white group-hover:text-[#5EF0DA] transition-colors">{lesson.title}</h3>
                  <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>{lesson.subject}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span style={{ color: "rgba(255,255,255,0.35)" }}>{lesson.duration}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      lesson.difficulty === "Beginner" ? "bg-green-500/15 text-green-400" :
                      lesson.difficulty === "Intermediate" ? "bg-yellow-500/15 text-yellow-400" :
                      "bg-red-500/15 text-red-400"
                    }`}>{lesson.difficulty}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AppShell>
  );
}