import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Flame,
  Trophy,
  Zap,
  Medal,
  BookOpen,
  Globe,
  LogOut,
} from "lucide-react";
import AppShell from "@/components/AppShell";

const profileStats = [
  {
    label: "Total XP",
    value: "8,530",
    icon: Zap,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
  },
  {
    label: "Streak",
    value: "17 Days",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    label: "Global Rank",
    value: "#234",
    icon: Globe,
    color: "text-[#5EF0DA]",
    bg: "bg-[#5EF0DA]/10 border-[#5EF0DA]/20",
  },
  {
    label: "Active Courses",
    value: "4",
    icon: BookOpen,
    color: "text-[#A78BFA]",
    bg: "bg-[#A78BFA]/10 border-[#A78BFA]/20",
  },
];

const achievements = [
  {
    title: "7-Day Streak",
    icon: "🔥",
    earned: true,
    rarity: "Common",
  },
  {
    title: "First Quiz",
    icon: "📝",
    earned: true,
    rarity: "Common",
  },
  {
    title: "Physics Master",
    icon: "⚛️",
    earned: true,
    rarity: "Rare",
  },
  {
    title: "Speed Learner",
    icon: "⚡",
    earned: true,
    rarity: "Rare",
  },
  {
    title: "Top 500",
    icon: "🏆",
    earned: true,
    rarity: "Epic",
  },
  {
    title: "Perfect Score",
    icon: "💯",
    earned: true,
    rarity: "Epic",
  },
];

const certificates = [
  {
    title: "Newton's Laws Certification",
    subject: "Physics",
    date: "May 2026",
    color:
      "from-[#5EF0DA]/20 to-[#5EF0DA]/5 border-[#5EF0DA]/30",
  },
  {
    title: "Calculus Fundamentals",
    subject: "Mathematics",
    date: "April 2026",
    color:
      "from-[#A78BFA]/20 to-[#A78BFA]/5 border-[#A78BFA]/30",
  },
];

const leaderboard = [
  { rank: 1, name: "Arjun Singh", xp: "24,560", avatar: "AS" },
  { rank: 2, name: "Emily Chen", xp: "21,890", avatar: "EC" },
  { rank: 3, name: "Marcus Lee", xp: "19,340", avatar: "ML" },
  { rank: 4, name: "Priya Sharma", xp: "17,200", avatar: "PS" },
  { rank: 5, name: "Tom Walker", xp: "15,780", avatar: "TW" },
];

const rarityColors: Record<string, string> = {
  Common: "text-muted-foreground border-white/10 bg-white/5",
  Rare: "text-[#5EF0DA] border-[#5EF0DA]/30 bg-[#5EF0DA]/10",
  Epic: "text-[#A78BFA] border-[#A78BFA]/30 bg-[#A78BFA]/10",
  Legendary:
    "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
};

export default function Profile() {
  const [, navigate] = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const userName = user.full_name || "User";
  const userEmail = user.email || "No Email";
  const userInitial = userName.charAt(0).toUpperCase();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6 pb-8"
      >
        <div className="rounded-2xl border border-white/5 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-[#5EF0DA]/40 via-[#A78BFA]/30 to-[#5EF0DA]/20" />

          <div className="px-6 pb-5 bg-card/50">
            <div className="flex items-end justify-between -mt-12">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] text-[#06121A] text-3xl font-black shadow-2xl border-4 border-background">
                {userInitial}
              </div>

              <div className="flex gap-2 pb-2">
                <div className="flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1.5 text-sm font-bold text-yellow-400">
                  <Zap className="h-3.5 w-3.5" />
                  Level 12
                </div>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm font-bold text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h1 className="text-2xl font-black">
                {userName}
              </h1>

              <p className="text-muted-foreground text-sm">
                {userEmail}
              </p>

              <div className="mt-3 max-w-xs">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">
                    Progress to Level 13
                  </span>

                  <span className="text-[#5EF0DA] font-semibold">
                    8,530 / 10,000 XP
                  </span>
                </div>

                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[85.3%] rounded-full bg-gradient-to-r from-[#5EF0DA] to-[#A78BFA]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {profileStats.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl border ${s.bg} p-4 text-center`}
            >
              <s.icon
                className={`h-6 w-6 ${s.color} mx-auto mb-2`}
              />
              <p className="text-xl font-black">{s.value}</p>
              <p className="text-xs text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Achievements
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-6 gap-3">
            {achievements.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-white/10 bg-card/50 p-3 text-center"
              >
                <div className="text-3xl mb-2">{a.icon}</div>

                <p className="text-xs font-bold mb-1">
                  {a.title}
                </p>

                <span
                  className={`text-xs rounded-full border px-1.5 py-0.5 ${rarityColors[a.rarity]}`}
                >
                  {a.rarity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-2xl border border-white/5 bg-card/50 p-5">
            <h2 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Medal className="h-4 w-4 text-yellow-400" />
              Certificates
            </h2>

            <div className="space-y-3">
              {certificates.map((c, i) => (
                <div
                  key={i}
                  className={`rounded-xl border bg-gradient-to-br ${c.color} p-4`}
                >
                  <p className="font-bold text-sm">
                    {c.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.subject} · Issued {c.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card/50 p-5">
            <h2 className="font-bold text-sm mb-4">
              Global Leaderboard
            </h2>

            <div className="space-y-2">
              {leaderboard.map((u) => (
                <div
                  key={u.rank}
                  className="flex items-center gap-3 rounded-xl p-2.5"
                >
                  <span className="w-6 text-center">
                    #{u.rank}
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA]/40 to-[#A78BFA]/40 text-xs font-bold">
                    {u.avatar}
                  </div>

                  <span className="flex-1">{u.name}</span>

                  <span>{u.xp} XP</span>
                </div>
              ))}

              <div className="flex items-center gap-3 rounded-xl border border-[#5EF0DA]/20 bg-[#5EF0DA]/10 p-2.5">
                <span className="w-6 text-center text-[#5EF0DA]">
                  #234
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5EF0DA] to-[#A78BFA] text-xs font-bold text-[#06121A]">
                  {userInitial}
                </div>

                <span className="flex-1 font-bold text-[#5EF0DA]">
                  You ({userName})
                </span>

                <span className="text-yellow-400 font-semibold">
                  8,530 XP
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}