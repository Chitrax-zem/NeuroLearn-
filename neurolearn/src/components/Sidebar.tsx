import React from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Brain,
  Store,
  Zap,
  BarChart3,
  Calendar,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Brain, label: "AI Tutor", href: "/tutor" },
  { icon: Store, label: "Marketplace", href: "/marketplace" },
  { icon: Zap, label: "Quiz", href: "/quiz" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Planner", href: "/planner" },
  { icon: User, label: "Profile", href: "/profile" },
];

const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, staggerChildren: 0.06, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0 },
};

export default function Sidebar() {
  const [location] = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.full_name || "User";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col"
      style={{
        background: "rgba(7, 11, 20, 0.85)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(24px)",
      }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ambient glow top */}
      <div
        className="pointer-events-none absolute -top-20 left-8 h-40 w-40 rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, #5EF0DA 0%, transparent 70%)", filter: "blur(20px)" }}
      />

      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <motion.div
            className="relative flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden"
            style={{ background: "#5EF0DA" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="h-5 w-5 text-[#06121A] relative z-10" strokeWidth={2.5} />
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0, 0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ background: "linear-gradient(135deg, white 0%, transparent 60%)" }}
            />
          </motion.div>
          <span
            className="text-[18px] font-black tracking-tight"
            style={{ background: "linear-gradient(90deg, #fff 0%, #7BF4E1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            NeuroLearn
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-0.5">
        {navItems.map((item, idx) => {
          const isActive = location === item.href;
          return (
            <motion.div key={item.label} variants={itemVariants}>
              <Link href={item.href}>
                <motion.div
                  className="relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer group"
                  style={
                    isActive
                      ? {
                          background: "linear-gradient(90deg, rgba(94,240,218,0.15) 0%, rgba(251,191,36,0.08) 100%)",
                          border: "1px solid rgba(94,240,218,0.25)",
                          color: "#7BF4E1",
                        }
                      : {
                          background: "transparent",
                          border: "1px solid transparent",
                          color: "rgba(255,255,255,0.45)",
                        }
                  }
                  whileHover={!isActive ? { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.06)" } : {}}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                      style={{ background: "linear-gradient(180deg, #5EF0DA, #5EF0DA)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon
                    className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
                    style={{ color: isActive ? "#5EF0DA" : "currentColor" }}
                  />
                  {item.label}
                  {isActive && (
                    <motion.div
                      className="ml-auto h-1.5 w-1.5 rounded-full"
                      style={{ background: "#5EF0DA" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="mx-3 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      {/* User Card */}
      <div className="p-3">
        <motion.div
          className="flex items-center gap-3 rounded-xl p-3 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
          whileHover={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.1)" }}
          transition={{ duration: 0.15 }}
        >
          <Avatar className="h-8 w-8 shrink-0" style={{ border: "1.5px solid rgba(94,240,218,0.3)" }}>
            <AvatarImage src={user.avatar_url || ""} />
            <AvatarFallback
              className="text-xs font-bold"
              style={{ background: "#5EF0DA", color: "#06121A" }}
            >
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">{userName}</span>
            <span className="text-xs font-medium" style={{ color: "#5EF0DA" }}>
              Level {user.level || 1}
            </span>
          </div>
          <div className="ml-auto flex flex-col items-end gap-0.5">
            <div className="h-1.5 w-12 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div className="h-full w-[85%] rounded-full" style={{ background: "linear-gradient(90deg, #5EF0DA, #5EF0DA)" }} />
            </div>
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>85% to Lv.13</span>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}