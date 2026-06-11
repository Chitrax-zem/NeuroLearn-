import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Star, Download, Eye, Brain, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const filters = ["All", "Physics", "Mathematics", "Chemistry", "AI", "Programming", "Biology"];

const packs = [
  {
    id: 1, title: "Physics Complete", creator: "Prof. Sarah Chen", avatar: "SC",
    rating: 4.9, reviews: 5234, downloads: 12450, subject: "Physics",
    difficulty: "Advanced", description: "Complete physics curriculum from mechanics to quantum theory.",
    color: "from-blue-600/30 to-blue-800/10", badge: "bg-blue-500/20 text-blue-400", trend: true,
  },
  {
    id: 2, title: "Calculus Mastery", creator: "Dr. James Wilson", avatar: "JW",
    rating: 4.8, reviews: 3892, downloads: 9230, subject: "Mathematics",
    difficulty: "Intermediate", description: "Master derivatives, integrals, and multivariable calculus.",
    color: "from-purple-600/30 to-purple-800/10", badge: "bg-purple-500/20 text-purple-400", trend: true,
  },
  {
    id: 3, title: "Organic Chemistry", creator: "Dr. Priya Patel", avatar: "PP",
    rating: 4.7, reviews: 2741, downloads: 7840, subject: "Chemistry",
    difficulty: "Intermediate", description: "Deep dive into organic reactions, mechanisms, and synthesis.",
    color: "from-emerald-600/30 to-emerald-800/10", badge: "bg-emerald-500/20 text-emerald-400", trend: true,
  },
  {
    id: 4, title: "Python Programming", creator: "Alex Kumar", avatar: "AK",
    rating: 4.9, reviews: 8120, downloads: 15670, subject: "Programming",
    difficulty: "Beginner", description: "From zero to Python hero — comprehensive programming foundations.",
    color: "from-orange-600/30 to-orange-800/10", badge: "bg-orange-500/20 text-orange-400", trend: true,
  },
  {
    id: 5, title: "AI Fundamentals", creator: "OpenLearn Team", avatar: "OL",
    rating: 4.8, reviews: 4560, downloads: 11200, subject: "AI",
    difficulty: "Intermediate", description: "Machine learning, neural networks, and AI ethics explained.",
    color: "from-cyan-600/30 to-cyan-800/10", badge: "bg-cyan-500/20 text-cyan-400", trend: false,
  },
  {
    id: 6, title: "Cell Biology Pro", creator: "Dr. Emma Liu", avatar: "EL",
    rating: 4.6, reviews: 1823, downloads: 5430, subject: "Biology",
    difficulty: "Beginner", description: "Complete cellular biology from DNA to cellular processes.",
    color: "from-pink-600/30 to-pink-800/10", badge: "bg-pink-500/20 text-pink-400", trend: false,
  },
];

const creators = [
  { name: "Prof. Sarah Chen", specialty: "Physics & Astrophysics", followers: "12.4K", avatar: "SC", color: "from-blue-500 to-blue-700" },
  { name: "Dr. James Wilson", specialty: "Pure Mathematics", followers: "9.8K", avatar: "JW", color: "from-purple-500 to-purple-700" },
  { name: "Alex Kumar", specialty: "Computer Science & AI", followers: "18.2K", avatar: "AK", color: "from-orange-500 to-orange-700" },
];

function PackCard({ pack }: { pack: typeof packs[0] }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-2xl border border-white/10 bg-gradient-to-br ${pack.color} overflow-hidden group cursor-pointer hover:border-white/20 hover:shadow-2xl hover:shadow-black/30 transition-all`}
    >
      {pack.trend && (
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 text-xs text-orange-400">
          <TrendingUp className="h-3 w-3" /> Trending
        </div>
      )}
      <div className="p-5">
        <div className="mb-4">
          <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${pack.badge} mb-3`}>
            {pack.subject}
          </span>
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{pack.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">{pack.description}</p>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 text-xs font-bold">
            {pack.avatar}
          </div>
          <span className="text-xs text-muted-foreground">{pack.creator}</span>
        </div>
        <div className="flex items-center justify-between text-xs mb-4">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-yellow-400" />
            <span className="font-bold">{pack.rating}</span>
            <span className="text-muted-foreground">({pack.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Download className="h-3 w-3" />
            <span>{pack.downloads.toLocaleString()}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            pack.difficulty === "Beginner" ? "bg-green-500/20 text-green-400" :
            pack.difficulty === "Intermediate" ? "bg-yellow-500/20 text-yellow-400" :
            "bg-red-500/20 text-red-400"
          }`}>{pack.difficulty}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 h-9 text-xs gap-1">
            <Eye className="h-3.5 w-3.5" /> Preview
          </Button>
          <Link href="/tutor">
            <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-secondary text-white border-0 h-9 text-xs gap-1 shadow-lg shadow-primary/20">
              <Brain className="h-3.5 w-3.5" /> Open with AI
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Marketplace() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = packs.filter((p) =>
    (activeFilter === "All" || p.subject === activeFilter) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-8">
        <div>
          <h1 className="text-2xl font-black mb-1">Knowledge Marketplace</h1>
          <p className="text-muted-foreground text-sm">Discover expert-curated learning packs for every subject</p>
          <div className="relative mt-4">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search knowledge packs, creators, subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 border-white/10 bg-white/5 focus-visible:ring-primary rounded-xl text-base"
              data-testid="input-search"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {filters.map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20"
                    : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
                }`}
                data-testid={`filter-${f}`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              Trending Packs
            </h2>
            <span className="text-xs text-muted-foreground">{filtered.length} packs</span>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {filtered.slice(0, 4).map((pack, i) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <PackCard pack={pack} />
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            Featured Creators
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {creators.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-white/5 bg-card/50 p-5 hover:border-white/10 transition-all cursor-pointer group"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} text-white text-xl font-black mb-3 shadow-lg group-hover:scale-105 transition-transform`}>
                  {c.avatar}
                </div>
                <h3 className="font-bold text-sm group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.specialty}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{c.followers} followers</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Recommended For You</h2>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.slice(3).map((pack, i) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <PackCard pack={pack} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}
