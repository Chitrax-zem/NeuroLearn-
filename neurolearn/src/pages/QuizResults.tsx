import { motion } from "framer-motion";
import { Link } from "wouter";
import { Trophy, Zap, BarChart3, RotateCcw, ArrowRight, Flame, Target, BookOpen } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

function Confetti() {
  const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];
  const pieces = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: Math.random() * 8 + 4,
    duration: Math.random() * 2 + 2,
    delay: Math.random() * 1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{ left: `${p.x}%`, width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: [1, 1, 0], rotate: Math.random() * 360 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

export default function QuizResults() {
  const metrics = [
    { label: "Accuracy", value: "80%", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
    { label: "XP Earned", value: "+250 XP", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
    { label: "Time Taken", value: "8m 32s", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { label: "Streak", value: "+1 Day", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  ];

  return (
    <AppShell>
      <div className="relative max-w-2xl mx-auto pb-8">
        <Confetti />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-center mb-8 pt-4"
        >
          <motion.div
            className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl shadow-yellow-500/30 mb-6"
            animate={{ rotate: [0, -5, 5, -5, 5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Trophy className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-5xl font-black mb-2">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              8/10
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl font-bold text-foreground mb-1"
          >
            Excellent Performance!
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground"
          >
            You're mastering Newton's Laws of Motion
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-4 gap-3 mb-6"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
              className={`rounded-2xl border ${m.bg} p-4 text-center`}
            >
              <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 p-5 mb-5 text-center"
        >
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(234,179,8,0.4)", "0 0 0 16px rgba(234,179,8,0)", "0 0 0 0 rgba(234,179,8,0)"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/30 to-orange-500/30 mb-3"
          >
            <Trophy className="h-7 w-7 text-yellow-400" />
          </motion.div>
          <p className="text-xs text-yellow-500/70 font-semibold uppercase tracking-wider mb-1">Achievement Unlocked</p>
          <p className="text-lg font-bold text-yellow-300">Newton's Scholar</p>
          <p className="text-xs text-muted-foreground mt-1">Score 80%+ on a Newton's Laws quiz</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-4"
          >
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-red-400" />
              Areas to Improve
            </h3>
            <div className="space-y-2">
              {["Acceleration formulas", "Unit conversions"].map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400/60" />
                  <span className="text-sm text-muted-foreground">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.85 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-4"
          >
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Recommended Lessons
            </h3>
            <div className="space-y-2">
              {[
                { title: "Advanced Force Problems", duration: "20 min" },
                { title: "SI Units Mastery", duration: "15 min" },
              ].map((l) => (
                <div key={l.title} className="flex items-center justify-between rounded-lg bg-white/3 px-3 py-2 hover:bg-white/5 cursor-pointer transition-colors">
                  <span className="text-sm">{l.title}</span>
                  <span className="text-xs text-muted-foreground">{l.duration}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          className="flex gap-3"
        >
          <Link href="/quiz">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 gap-2">
              <RotateCcw className="h-4 w-4" />
              Retry Quiz
            </Button>
          </Link>
          <Link href="/dashboard">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/20 gap-2">
                Continue Learning
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </Link>
          <Link href="/analytics">
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </motion.div>
      </div>
    </AppShell>
  );
}
