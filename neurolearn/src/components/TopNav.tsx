import React, { useState, useRef, useEffect } from "react";
import { Bell, Search, Flame, X, Command } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

const ROUTES = [
  { keywords: ["dashboard", "home", "overview"], path: "/dashboard", label: "Dashboard" },
  { keywords: ["tutor", "ai", "chat", "learn"], path: "/tutor", label: "AI Tutor" },
  { keywords: ["quiz", "test", "question", "mcq"], path: "/quiz", label: "Quiz" },
  { keywords: ["analytics", "stats", "progress", "report"], path: "/analytics", label: "Analytics" },
  { keywords: ["planner", "plan", "schedule", "study plan"], path: "/planner", label: "Planner" },
  { keywords: ["marketplace", "market", "store", "packs"], path: "/marketplace", label: "Marketplace" },
  { keywords: ["profile", "account", "settings", "me"], path: "/profile", label: "Profile" },
];

export default function TopNav() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    "Quiz available for your uploaded notes",
    "AI Tutor generated a new study summary",
    "Your study streak reached 17 days",
  ]);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.full_name || "User";
  const userInitials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredRoutes = search.trim().length > 0
    ? ROUTES.filter((r) =>
        r.keywords.some((k) => k.includes(search.toLowerCase())) ||
        r.label.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const handleSearch = (value: string) => {
    setSearch(value);
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSelectRoute = (path: string, label: string) => {
    setSearch(label);
    setShowSuggestions(false);
    navigate(path);
    setTimeout(() => setSearch(""), 800);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && filteredRoutes.length > 0) {
      handleSelectRoute(filteredRoutes[0].path, filteredRoutes[0].label);
    }
    if (e.key === "Escape") {
      setSearch("");
      setShowSuggestions(false);
    }
  };

  const dismissNotification = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between px-6 ml-64"
      style={{
        background: "rgba(7, 11, 20, 0.75)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Search */}
      <div className="flex flex-1 items-center gap-4">
        <div ref={searchRef} className="relative w-full max-w-sm hidden md:flex flex-col">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 pointer-events-none transition-colors" style={{ color: "rgba(255,255,255,0.3)" }} />
            <Input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              onFocus={() => search.trim().length > 0 && setShowSuggestions(true)}
              placeholder="Search pages..."
              className="h-9 pl-9 pr-20 text-sm rounded-xl border-0 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.8)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07)",
              }}
            />
            {search ? (
              <button
                onClick={() => { setSearch(""); setShowSuggestions(false); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[10px] font-medium" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Command className="h-2.5 w-2.5" />K
                </kbd>
              </div>
            )}
          </div>

          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full mt-2 w-full rounded-xl overflow-hidden z-50"
                style={{
                  background: "rgba(11,17,28,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
                  backdropFilter: "blur(20px)",
                }}
              >
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route, i) => (
                    <motion.button
                      key={route.path}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onMouseDown={() => handleSelectRoute(route.path, route.label)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(94,240,218,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Search className="h-3.5 w-3.5 shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                      <span className="text-white">{route.label}</span>
                      <span className="ml-auto text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{route.path}</span>
                    </motion.button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                    No pages found for "{search}"
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Streak pill */}
        <motion.div
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-default select-none"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Flame className="h-3.5 w-3.5 text-orange-500" />
          </motion.div>
          <span className="text-sm font-bold text-orange-400">17</span>
          <span className="text-xs hidden sm:block" style={{ color: "rgba(251,146,60,0.7)" }}>day streak</span>
        </motion.div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <motion.button
            className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            whileHover={{ background: "rgba(255,255,255,0.08)" }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-4 w-4" style={{ color: "rgba(255,255,255,0.6)" }} />
            <AnimatePresence>
              {notifications.length > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                  style={{ background: "#5EF0DA", color: "#06121A" }}
                >
                  {notifications.length}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl p-3 z-50"
                style={{
                  background: "rgba(11,17,28,0.97)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="font-semibold text-sm text-white">Notifications</h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={() => setNotifications([])}
                      className="text-xs transition-colors"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {notifications.length === 0 ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-center py-6"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      All caught up ✓
                    </motion.p>
                  ) : (
                    notifications.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 group transition-colors mb-1"
                        style={{ border: "1px solid rgba(255,255,255,0.04)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <div className="flex gap-2.5 items-start">
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "#5EF0DA" }} />
                          <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>{item}</p>
                        </div>
                        <button
                          onClick={() => dismissNotification(index)}
                          className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-6 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />

        {/* Avatar */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Avatar
            onClick={() => navigate("/profile")}
            className="h-8 w-8 cursor-pointer"
            style={{ border: "1.5px solid rgba(94,240,218,0.3)", boxShadow: "0 0 0 2px rgba(94,240,218,0.1)" }}
          >
            <AvatarImage src={user.avatar_url || ""} />
            <AvatarFallback
              className="text-xs font-bold"
              style={{ background: "#5EF0DA", color: "#06121A" }}
            >
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </header>
  );
}