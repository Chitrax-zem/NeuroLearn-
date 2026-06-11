import { motion } from "framer-motion";
import { Flame, Trophy, Star, Zap, Medal, BookOpen, Globe, Lock } from "lucide-react";
import AppShell from "@/components/AppShell";

const profileStats = [
  { label: "Total XP", value: "8,530", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
  { label: "Streak", value: "17 Days", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { label: "Global Rank", value: "#234", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { label: "Active Courses", value: "4", icon: BookOpen, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
];

const achievements = [
  { title: "7-Day Streak", icon: "🔥", desc: "Learned 7 days in a row", earned: true, rarity: "Common" },
  { title: "First Quiz", icon: "📝", desc: "Completed your first quiz", earned: true, rarity: "Common" },
  { title: "Physics Master", icon: "⚛️", desc: "80%+ mastery in Physics", earned: true, rarity: "Rare" },
  { title: "Speed Learner", icon: "⚡", desc: "Finished a lesson in record time", earned: true, rarity: "Rare" },
  { title: "Top 500", icon: "🏆", desc: "Reached top 500 globally", earned: true, rarity: "Epic" },
  { title: "Perfect Score", icon: "💯", desc: "Scored 100% on a quiz", earned: true, rarity: "Epic" },
  { title: "Sharpshooter", icon: "🎯", desc: "10 correct answers in a row", earned: false, rarity: "Rare" },
  { title: "Star Student", icon: "⭐", desc: "Top student of the month", earned: false, rarity: "Legendary" },
  { title: "Night Owl", icon: "🦉", desc: "Study after midnight", earned: false, rarity: "Common" },
  { title: "Bookworm", icon: "📚", desc: "Read 50 knowledge packs", earned: false, rarity: "Epic" },
  { title: "Polymath", icon: "🧠", desc: "Master 5 subjects", earned: false, rarity: "Legendary" },
  { title: "Centurion", icon: "💪", desc: "Complete 100 quizzes", earned: false, rarity: "Epic" },
];

const certificates = [
  { title: "Newton's Laws Certification", subject: "Physics", date: "May 2026", color: "from-blue-500/20 to-blue-700/10 border-blue-500/30" },
  { title: "Calculus Fundamentals", subject: "Mathematics", date: "April 2026", color: "from-purple-500/20 to-purple-700/10 border-purple-500/30" },
];

const leaderboard = [
  { rank: 1, name: "Arjun Singh", xp: "24,560", avatar: "AS", crown: true },
  { rank: 2, name: "Emily Chen", xp: "21,890", avatar: "EC", crown: false },
  { rank: 3, name: "Marcus Lee", xp: "19,340", avatar: "ML", crown: false },
  { rank: 4, name: "Priya Sharma", xp: "17,200", avatar: "PS", crown: false },
  { rank: 5, name: "Tom Walker", xp: "15,780", avatar: "TW", crown: false },
];

const rarityColors: Record<string, string> = {
  Common: "text-muted-foreground border-white/10 bg-white/5",
  Rare: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  Epic: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  Legendary: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
};

export default function Profile() {
  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-white/5"
        >
          <div className="h-28 bg-gradient-to-r from-primary/40 via-secondary/30 to-primary/20 relative">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-32 w-32 rounded-full"
                  style={{
                    left: `${i * 20}%`,
                    top: "-50%",
                    background: `radial-gradient(circle, ${i % 2 === 0 ? "hsl(217 91% 60% / 0.3)" : "hsl(262 83% 58% / 0.3)"} 0%, transparent 70%)`,
                  }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
            </div>
          </div>
          <div className="px-6 pb-5 bg-card/50">
            <div className="flex items-end justify-between -mt-12">
              <motion.div
                className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white text-3xl font-black shadow-2xl shadow-primary/30 border-4 border-background"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                C
              </motion.div>
              <div className="flex gap-2 pb-2">
                <div className="flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-sm font-bold text-yellow-400">
                  <Zap className="h-3.5 w-3.5" />
                  Level 12
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-bold text-orange-400">
                  <Flame className="h-3.5 w-3.5" />
                  17 Day Streak
                </div>
              </div>
            </div>
            <div className="mt-3">
              <h1 className="text-2xl font-black">Chitransh</h1>
              <p className="text-muted-foreground text-sm">Advanced Learner · Member since Jan 2026 · Mumbai, India</p>
              <div className="mt-3 max-w-xs">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Progress to Level 13</span>
                  <span className="text-primary font-semibold">8,530 / 10,000 XP</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: "85.3%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {profileStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border ${s.bg} p-4 text-center`}
            >
              <s.icon className={`h-6 w-6 ${s.color} mx-auto mb-2`} />
              <p className="text-xl font-black">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Achievements
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-3">
            {achievements.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.04, type: "spring" }}
                whileHover={a.earned ? { scale: 1.08, y: -4 } : {}}
                className={`rounded-2xl border p-3 text-center cursor-pointer transition-all ${
                  a.earned
                    ? "border-white/10 bg-card/50 hover:border-white/20 hover:shadow-lg"
                    : "border-white/5 bg-white/2 opacity-40 grayscale"
                }`}
              >
                <div className="text-3xl mb-2">{a.icon}</div>
                <p className="text-xs font-bold leading-tight mb-1">{a.title}</p>
                <span className={`text-xs rounded-full border px-1.5 py-0.5 ${rarityColors[a.rarity]}`}>
                  {a.rarity}
                </span>
                {!a.earned && <Lock className="h-3 w-3 text-muted-foreground mx-auto mt-1" />}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Medal className="h-4 w-4 text-yellow-400" />
              Certificates
            </h2>
            <div className="space-y-3">
              {certificates.map((c, i) => (
                <div key={i} className={`rounded-xl border bg-gradient-to-br ${c.color} p-4`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-sm">{c.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{c.subject} · Issued {c.date}</p>
                    </div>
                    <Medal className="h-6 w-6 text-yellow-400 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              Leaderboard
              <span className="ml-auto text-xs text-muted-foreground">Global</span>
            </h2>
            <div className="space-y-2">
              {leaderboard.map((u, i) => (
                <div
                  key={u.rank}
                  className={`flex items-center gap-3 rounded-xl p-2.5 ${
                    u.rank === 1 ? "border border-yellow-500/20 bg-yellow-500/5" : "hover:bg-white/3"
                  }`}
                >
                  <span className={`text-sm font-black w-6 text-center ${
                    u.rank === 1 ? "text-yellow-400" : u.rank === 2 ? "text-slate-400" : u.rank === 3 ? "text-orange-400" : "text-muted-foreground"
                  }`}>#{u.rank}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 text-xs font-bold shrink-0">
                    {u.avatar}
                  </div>
                  <span className="text-sm font-medium flex-1">{u.name}</span>
                  <span className="text-xs text-yellow-400 font-semibold">{u.xp} XP</span>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-2.5">
                <span className="text-sm font-black w-6 text-center text-primary">#234</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold shrink-0 text-white">
                  C
                </div>
                <span className="text-sm font-bold flex-1 text-primary">You (Chitransh)</span>
                <span className="text-xs text-yellow-400 font-semibold">8,530 XP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppShell>
  );
}
