import { motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar, CheckSquare, Square, Clock, Target, Sparkles,
  Brain, RefreshCw, ChevronLeft, ChevronRight
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = [2, 3, 4, 5, 6, 7, 8];
const todayIdx = 2;

const calendarEvents: Record<number, { subject: string; time: string; color: string }[]> = {
  0: [{ subject: "Physics", time: "2-3pm", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" }],
  1: [{ subject: "Math", time: "4-5pm", color: "bg-purple-500/20 border-purple-500/30 text-purple-300" }],
  2: [
    { subject: "Chemistry", time: "10-11am", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
    { subject: "Physics", time: "3-4pm", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
  ],
  3: [{ subject: "CS Pract.", time: "2-4pm", color: "bg-orange-500/20 border-orange-500/30 text-orange-300" }],
  4: [{ subject: "Math Quiz", time: "11-12pm", color: "bg-red-500/20 border-red-500/30 text-red-300" }],
  5: [{ subject: "AI Tutor", time: "All day", color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300" }],
  6: [],
};

const dailyGoals = [
  { task: "Complete Newton's Laws Module", subject: "Physics", time: "25 min", done: true },
  { task: "Practice 20 Calculus Problems", subject: "Mathematics", time: "40 min", done: true },
  { task: "Read Chemistry Chapter 6", subject: "Chemistry", time: "30 min", done: false },
  { task: "AI Tutor Session: Organic Reactions", subject: "Chemistry", time: "20 min", done: false },
  { task: "Review CS Data Structures", subject: "Computer Science", time: "35 min", done: false },
];

const weeklyGoals = [
  "Complete Physics Module 4",
  "Practice 50 Math problems",
  "Read Chemistry Chapter 6",
];

const aiPlan = [
  { day: "Tomorrow (Thu)", tasks: ["Focus on Newton's Laws (2h)", "Math Practice (1h)"], color: "border-blue-500/20" },
  { day: "Friday", tasks: ["Chemistry Review (1.5h)", "Physics Problem Set (45m)"], color: "border-emerald-500/20" },
  { day: "Saturday", tasks: ["Mixed Quiz Session (45m)", "Rest & Review (30m)"], color: "border-purple-500/20" },
];

export default function Planner() {
  const [checkedGoals, setCheckedGoals] = useState<Record<number, boolean>>({
    0: true, 1: true,
  });
  const [showAI, setShowAI] = useState(false);

  const toggle = (i: number) => setCheckedGoals((prev) => ({ ...prev, [i]: !prev[i] }));
  const completedCount = Object.values(checkedGoals).filter(Boolean).length;

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black mb-1 flex items-center gap-2">
              Study Planner
              <span className="text-xs font-semibold rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 px-3 py-1 text-primary ml-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> AI-Generated
              </span>
            </h1>
            <p className="text-muted-foreground text-sm">Your personalized study schedule for this week</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-white/10 bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-semibold">June 2–8, 2026</span>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-white/10 bg-white/5">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-card/50 p-5"
        >
          <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            This Week
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, i) => (
              <div key={day} className="text-center">
                <p className="text-xs text-muted-foreground mb-2">{day}</p>
                <div className={`relative rounded-xl p-2 min-h-[80px] border transition-all ${
                  i === todayIdx
                    ? "border-primary/40 bg-primary/10 ring-2 ring-primary/20"
                    : "border-white/5 bg-white/2 hover:bg-white/5"
                }`}>
                  <p className={`text-sm font-bold mb-2 ${i === todayIdx ? "text-primary" : ""}`}>{dates[i]}</p>
                  <div className="space-y-1">
                    {(calendarEvents[i] || []).map((ev, j) => (
                      <div key={j} className={`rounded px-1 py-0.5 text-xs border ${ev.color} truncate`}>
                        {ev.subject}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-sm flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-green-400" />
                Today's Goals
              </h2>
              <span className="text-xs text-muted-foreground">
                <span className="text-green-400 font-semibold">{completedCount}</span>/{dailyGoals.length} completed
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 mb-4 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                animate={{ width: `${(completedCount / dailyGoals.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="space-y-2">
              {dailyGoals.map((goal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  onClick={() => toggle(i)}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/3 p-3 hover:bg-white/6 cursor-pointer group transition-all"
                >
                  {checkedGoals[i]
                    ? <CheckSquare className="h-5 w-5 text-green-400 shrink-0" />
                    : <Square className="h-5 w-5 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${checkedGoals[i] ? "line-through text-muted-foreground" : ""}`}>
                      {goal.task}
                    </p>
                    <p className="text-xs text-muted-foreground">{goal.subject} · {goal.time}</p>
                  </div>
                  <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                    checkedGoals[i] ? "bg-green-500/15 text-green-400" : "bg-white/5 text-muted-foreground"
                  }`}>
                    <Clock className="h-3 w-3" />
                    {goal.time}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-white/5 bg-card/50 p-4"
            >
              <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-secondary" />
                Weekly Goals
              </h2>
              <div className="space-y-2 mb-3">
                {weeklyGoals.map((g, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                    <span>{g}</span>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-secondary font-semibold">5/12 tasks</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: "42%" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-secondary/5 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <h2 className="font-bold text-sm">AI Study Plan</h2>
              </div>
              <div className="space-y-3">
                {aiPlan.map((plan, i) => (
                  <div key={i} className={`rounded-xl border ${plan.color} bg-white/3 p-3`}>
                    <p className="text-xs font-bold text-muted-foreground mb-2">{plan.day}</p>
                    {plan.tasks.map((t, j) => (
                      <p key={j} className="text-xs text-foreground mb-0.5">· {t}</p>
                    ))}
                  </div>
                ))}
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-3 border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary h-8 text-xs gap-2"
                onClick={() => setShowAI(!showAI)}
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate Plan
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 rounded-2xl border border-primary/30 bg-card/90 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/40 cursor-pointer hover:border-primary/50 transition-all"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            >
              <Brain className="h-5 w-5 text-primary" />
            </motion.div>
            <div>
              <p className="text-xs font-bold">Need help planning?</p>
              <p className="text-xs text-muted-foreground">Chat with AI</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </AppShell>
  );
}
