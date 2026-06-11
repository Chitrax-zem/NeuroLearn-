import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Brain, Zap, MessageSquare, TrendingUp, BookOpen, Clock,
  CheckCircle2, Circle, ArrowRight, Flame, Star, Play
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

const subjects = [
  { name: "Physics", emoji: "⚛️", progress: 72, xp: 2340, lessons: 18, total: 25, color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/20", ring: "hsl(217 91% 60%)" },
  { name: "Mathematics", emoji: "📐", progress: 58, xp: 1890, lessons: 14, total: 24, color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/20", ring: "hsl(262 83% 58%)" },
  { name: "Chemistry", emoji: "🧪", progress: 45, xp: 1200, lessons: 9, total: 20, color: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/20", ring: "hsl(142 71% 45%)" },
  { name: "Computer Science", emoji: "💻", progress: 83, xp: 3100, lessons: 20, total: 24, color: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/20", ring: "hsl(43 100% 50%)" },
];

const goals = [
  { label: "Physics Chapter 4", done: true },
  { label: "AI Quiz", done: false },
  { label: "Complete Mathematics Pack", done: false },
];

const recentConversations = [
  { topic: "Newton's Laws of Motion", time: "2h ago", subject: "Physics", color: "text-blue-400" },
  { topic: "Quadratic Equations", time: "Yesterday", subject: "Mathematics", color: "text-purple-400" },
  { topic: "Electron Configuration", time: "2 days ago", subject: "Chemistry", color: "text-emerald-400" },
];

function ProgressRing({ progress, color, size = 60 }: { progress: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize="12" fontWeight="700" fill="white">
        {progress}%
      </text>
    </svg>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <AppShell>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 pb-8">
        <motion.div
          variants={cardVariants}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-card to-secondary/10 p-6"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
          </div>
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Good Evening</p>
              <h1 className="text-3xl font-black mb-1">Chitransh</h1>
              <div className="flex items-center gap-2 mt-2">
                <motion.div
                  className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-bold text-orange-400">17-Day Streak</span>
                </motion.div>
                <span className="text-sm text-muted-foreground">Keep going!</span>
              </div>
              <div className="mt-4 max-w-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-muted-foreground">Today's Goal</span>
                  <span className="text-xs font-semibold text-primary">1/3 completed</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: "33%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
            <div className="hidden sm:block space-y-2">
              {goals.map((g, i) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  {g.done
                    ? <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    : <Circle className="h-4 w-4 text-muted-foreground shrink-0" />}
                  <span className={g.done ? "line-through text-muted-foreground" : "text-foreground"}>{g.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div>
          <h2 className="text-lg font-bold mb-4">Your Subjects</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {subjects.map((s, i) => (
              <motion.div
                key={s.name}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} p-4 cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-2xl">{s.emoji}</span>
                    <h3 className="text-sm font-bold mt-1">{s.name}</h3>
                    <p className="text-xs text-muted-foreground">{s.lessons}/{s.total} lessons</p>
                  </div>
                  <ProgressRing progress={s.progress} color={s.ring} size={52} />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-yellow-400">{s.xp.toLocaleString()} XP</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div variants={cardVariants} className="lg:col-span-2 rounded-2xl border border-white/5 bg-card/50 p-5">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              Recent AI Conversations
            </h2>
            <div className="space-y-3">
              {recentConversations.map((c) => (
                <Link href="/tutor" key={c.topic}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/3 p-3 hover:bg-white/5 hover:border-primary/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Brain className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium group-hover:text-primary transition-colors">{c.topic}</p>
                        <p className="text-xs text-muted-foreground">{c.time} · <span className={c.color}>{c.subject}</span></p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={cardVariants} className="rounded-2xl border border-white/5 bg-card/50 p-5">
            <h2 className="text-base font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link href="/tutor">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary/20 to-secondary/10 hover:from-primary/30 border border-primary/20 text-foreground h-11">
                    <Brain className="h-4 w-4 text-primary" />
                    Ask AI Tutor
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full justify-start gap-2 border-white/10 bg-white/3 hover:bg-white/8 h-11">
                  <Play className="h-4 w-4 text-green-400" />
                  Continue Learning
                </Button>
              </motion.div>
              <Link href="/marketplace">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start gap-2 border-white/10 bg-white/3 hover:bg-white/8 h-11">
                    <BookOpen className="h-4 w-4 text-purple-400" />
                    Open Marketplace
                  </Button>
                </motion.div>
              </Link>
              <Link href="/analytics">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="w-full justify-start gap-2 border-white/10 bg-white/3 hover:bg-white/8 h-11">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    View Analytics
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div variants={cardVariants} className="rounded-2xl border border-white/5 bg-card/50 p-5">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            Recommended Lessons
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { title: "Newton's Third Law", subject: "Physics", duration: "25 min", difficulty: "Intermediate", color: "from-blue-500/15 to-transparent" },
              { title: "Derivatives & Integrals", subject: "Mathematics", duration: "40 min", difficulty: "Advanced", color: "from-purple-500/15 to-transparent" },
              { title: "Chemical Bonding", subject: "Chemistry", duration: "30 min", difficulty: "Beginner", color: "from-emerald-500/15 to-transparent" },
            ].map((lesson) => (
              <Link href="/tutor" key={lesson.title}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  className={`rounded-xl border border-white/5 bg-gradient-to-br ${lesson.color} p-4 hover:border-white/10 cursor-pointer group transition-all`}
                >
                  <h3 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors">{lesson.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{lesson.subject}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{lesson.duration}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      lesson.difficulty === "Beginner" ? "bg-green-500/20 text-green-400" :
                      lesson.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
                      "bg-red-500/20 text-red-400"
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
