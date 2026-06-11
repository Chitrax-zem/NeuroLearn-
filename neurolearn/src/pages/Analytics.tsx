import { motion } from "framer-motion";
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { TrendingUp, Clock, Target, Zap, Brain, ArrowUpRight } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

const weeklyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 80 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 90 },
  { day: "Fri", minutes: 60 },
  { day: "Sat", minutes: 120 },
  { day: "Sun", minutes: 75 },
];

const radarData = [
  { subject: "Physics", score: 72 },
  { subject: "Math", score: 58 },
  { subject: "Chemistry", score: 45 },
  { subject: "CS", score: 83 },
  { subject: "Biology", score: 61 },
];

const heatmapData = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  value: Math.random(),
}));

const stats = [
  { label: "Study Hours", value: "47.5h", trend: "+12%", icon: Clock, color: "text-blue-400", bg: "from-blue-500/15 to-transparent", iconBg: "bg-blue-500/15" },
  { label: "Mastery Score", value: "78/100", trend: "+5pts", icon: Target, color: "text-purple-400", bg: "from-purple-500/15 to-transparent", iconBg: "bg-purple-500/15" },
  { label: "Questions Solved", value: "1,247", trend: "+89", icon: Zap, color: "text-yellow-400", bg: "from-yellow-500/15 to-transparent", iconBg: "bg-yellow-500/15" },
  { label: "Knowledge Growth", value: "23%", trend: "+3%", icon: TrendingUp, color: "text-green-400", bg: "from-green-500/15 to-transparent", iconBg: "bg-green-500/15" },
];

const weakTopics = [
  { name: "Electromagnetic Induction", score: 35 },
  { name: "Integration Techniques", score: 42 },
  { name: "Organic Reactions", score: 38 },
];

const recommendations = [
  { title: "Review Electromagnetic Waves", subject: "Physics", reason: "Lowest mastery score", color: "border-blue-500/20 bg-blue-500/5" },
  { title: "Practice Integration Drills", subject: "Mathematics", reason: "Needs reinforcement", color: "border-purple-500/20 bg-purple-500/5" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/10 bg-card/90 backdrop-blur px-3 py-2 text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-primary">{payload[0].value} min</p>
      </div>
    );
  }
  return null;
}

export default function Analytics() {
  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Analytics</h1>
          <p className="text-muted-foreground text-sm">Your learning performance at a glance</p>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border border-white/5 bg-gradient-to-br ${s.bg} p-5 hover:border-white/10 transition-all`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-xs text-green-400">
                  <ArrowUpRight className="h-3 w-3" />
                  {s.trend}
                </div>
              </div>
              <p className="text-2xl font-black">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Weekly Activity
              <span className="text-xs text-muted-foreground font-normal ml-auto">This week</span>
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(222 10% 60%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(222 10% 60%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="hsl(217 91% 60%)"
                  strokeWidth={2.5}
                  fill="url(#blueGrad)"
                  dot={{ fill: "hsl(217 91% 60%)", r: 4, strokeWidth: 2, stroke: "hsl(222 47% 7%)" }}
                  activeDot={{ r: 6, fill: "hsl(217 91% 60%)" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Target className="h-4 w-4 text-secondary" />
              Subject Performance
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(222 10% 60%)", fontSize: 11 }} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="hsl(262 83% 58%)"
                  fill="hsl(262 83% 58%)"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl border border-white/5 bg-card/50 p-5"
        >
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            Learning Heatmap
            <span className="text-xs text-muted-foreground font-normal ml-auto">Last 3 months</span>
          </h2>
          <div className="flex gap-1 flex-wrap">
            {heatmapData.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.005 }}
                className="h-4 w-4 rounded-sm cursor-pointer hover:scale-125 transition-transform"
                style={{
                  backgroundColor: d.value > 0.7
                    ? "hsl(217 91% 60%)"
                    : d.value > 0.4
                    ? "hsl(217 91% 40%)"
                    : d.value > 0.1
                    ? "hsl(217 91% 20%)"
                    : "rgba(255,255,255,0.04)",
                }}
                title={`${Math.round(d.value * 120)} min`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Less</span>
            {["rgba(255,255,255,0.04)", "hsl(217 91% 20%)", "hsl(217 91% 40%)", "hsl(217 91% 60%)"].map((c, i) => (
              <div key={i} className="h-3 w-3 rounded-sm" style={{ backgroundColor: c }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold mb-4 text-sm">Weak Topics</h2>
            <div className="space-y-3">
              {weakTopics.map((t) => (
                <div key={t.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span>{t.name}</span>
                    <span className="text-red-400 font-semibold">{t.score}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-red-500/60 to-orange-500/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${t.score}%` }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold mb-4 text-sm flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              AI Recommendations
            </h2>
            <div className="space-y-3">
              {recommendations.map((r) => (
                <div key={r.title} className={`rounded-xl border p-4 ${r.color}`}>
                  <h3 className="text-sm font-semibold mb-0.5">{r.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{r.reason} · {r.subject}</p>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-white/10 bg-white/5">
                    Start Learning
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  );
}
