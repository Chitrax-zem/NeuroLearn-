import React from "react";
import { Bell, Search, Flame } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-background/80 px-6 backdrop-blur-xl ml-64">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md hidden md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search knowledge packs, quizzes..."
            className="w-full rounded-full border-white/10 bg-white/5 pl-10 focus-visible:ring-primary focus-visible:bg-white/10 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <motion.div
          className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Flame className="h-4 w-4 text-orange-500" />
          </motion.div>
          <span className="text-sm font-semibold text-orange-500">17 Days</span>
        </motion.div>

        <div className="relative cursor-pointer">
          <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground animate-pulse">
            3
          </span>
        </div>

        <Avatar className="h-9 w-9 border border-white/10 cursor-pointer hover:border-primary/50 transition-colors">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
