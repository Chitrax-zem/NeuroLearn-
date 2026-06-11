import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { Brain, ArrowRight, Play, Sparkles, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
    >
      {target}{suffix}
    </motion.span>
  );
}

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 10 + 10,
}));

export default function Landing() {
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, hsl(262 83% 58%) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, hsl(217 91% 60%) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, 15, 0], y: [0, -25, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <nav className="relative z-10 flex h-16 items-center justify-between px-8 border-b border-white/5 bg-background/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NeuroLearn AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Features", "Marketplace", "Pricing", "About"].map((item) => (
            <span key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all text-white border-0">
              Start Free
            </Button>
          </Link>
        </div>
      </nav>

      <section ref={heroRef} className="relative z-10 px-8 pt-24 pb-16">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                <span>AI-Powered Learning Platform</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="text-foreground">Learn Anything.</span>
                <br />
                <span className="text-foreground">Anytime.</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  With Your Personal AI Tutor.
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              NeuroLearn AI transforms textbooks, notes, PDFs and knowledge packs into personalized AI tutoring experiences — adapting to your pace, your gaps, your goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow h-12 px-8 text-base font-semibold">
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" size="lg" className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 h-12 px-8 text-base font-semibold gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <Play className="h-3 w-3 text-primary fill-primary" />
                  </div>
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"].map((color, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Loved by 50,000+ students</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg"
                  animate={{ boxShadow: ["0 0 0 0 rgba(59,130,246,0.4)", "0 0 0 8px rgba(59,130,246,0)", "0 0 0 0 rgba(59,130,246,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold">NeuroLearn AI</p>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                    Online — Your AI Tutor
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-primary to-secondary px-4 py-3">
                    <p className="text-sm text-white font-medium">Explain Newton's Second Law</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-white/5 bg-card/50 p-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Newton's Second Law states that the <span className="text-foreground font-medium">acceleration of an object</span> is directly proportional to the net force acting on it and inversely proportional to its mass.
                    </p>
                  </div>

                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">Formula</p>
                    <p className="text-2xl font-black text-center text-foreground py-2">
                      <span className="text-primary">F</span> = <span className="text-secondary">m</span> × <span className="text-green-400">a</span>
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span className="text-primary">F = Force (N)</span>
                      <span className="text-secondary">m = Mass (kg)</span>
                      <span className="text-green-400">a = Accel. (m/s²)</span>
                    </div>
                  </div>

                  <Link href="/quiz">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 rounded-xl border border-secondary/30 bg-secondary/10 py-3 cursor-pointer hover:bg-secondary/20 transition-colors"
                    >
                      <Zap className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-semibold text-secondary">Take a Quiz on this topic</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 px-8 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
          {[
            { value: "50,000+", label: "Students Worldwide" },
            { value: "1M+", label: "Questions Solved" },
            { value: "95%", label: "Learning Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6 text-center hover:border-primary/30 hover:bg-card transition-all group"
            >
              <AnimatedCounter target={stat.value} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-8 py-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything you need to learn smarter</h2>
          <p className="text-muted-foreground">Powered by cutting-edge AI technology</p>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "AI-Powered Tutoring", desc: "Your personal AI tutor adapts explanations to match your learning style and pace in real-time.", color: "from-primary/20 to-primary/5", iconColor: "text-primary" },
            { icon: Store, title: "Knowledge Marketplace", desc: "Access thousands of expert-curated learning packs from top educators and institutions worldwide.", color: "from-secondary/20 to-secondary/5", iconColor: "text-secondary" },
            { icon: Trophy, title: "Gamified Learning", desc: "Earn XP, unlock achievements, and compete on leaderboards to stay motivated every single day.", color: "from-yellow-500/20 to-yellow-500/5", iconColor: "text-yellow-400" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6 hover:border-white/20 hover:shadow-xl hover:shadow-black/20 transition-all"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur p-12">
            <h2 className="text-4xl font-black mb-4">Ready to learn smarter?</h2>
            <p className="text-muted-foreground mb-8 text-lg">Join 50,000+ students transforming how they study.</p>
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-xl shadow-primary/30 h-12 px-10 text-base font-semibold">
                  Get Started Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function Zap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function Store({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
