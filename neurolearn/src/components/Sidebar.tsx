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
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <motion.aside
      className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-background/80 backdrop-blur-xl flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-shadow">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NeuroLearn
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <motion.div key={item.label} variants={itemVariants}>
              <Link href={item.href}>
                <div
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(59,130,246,0.1)] border border-primary/20"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <item.icon
                    className={`h-5 w-5 ${isActive ? "text-primary" : ""}`}
                  />
                  {item.label}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-card/50 p-3 shadow-sm hover:bg-card/80 transition-colors cursor-pointer">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Chitransh</span>
            <span className="text-xs text-primary font-medium">Level 12</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
