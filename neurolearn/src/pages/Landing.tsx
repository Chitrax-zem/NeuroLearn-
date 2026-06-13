import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Brain, ArrowRight, Play, Sparkles, Star, ChevronRight, Check, Users, BookOpen, Award, Zap as ZapIcon, Globe, Heart } from "lucide-react";
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

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started",
    color: "border-white/10",
    badge: null,
    features: [
      "5 AI tutor sessions/month",
      "Access to 3 knowledge packs",
      "Basic quiz module",
      "Progress tracking",
      "Community support",
    ],
    cta: "Get Started Free",
    ctaVariant: "outline" as const,
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    desc: "For serious learners",
    color: "border-primary/40",
    badge: "Most Popular",
    features: [
      "Unlimited AI tutor sessions",
      "Full marketplace access",
      "Advanced analytics dashboard",
      "Unlimited quizzes + XP",
      "AI study planner",
      "Priority support",
      "Offline knowledge packs",
    ],
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
    highlight: true,
  },
  {
    name: "Teams",
    price: "$29",
    period: "per month",
    desc: "For classrooms & institutions",
    color: "border-secondary/30",
    badge: null,
    features: [
      "Everything in Pro",
      "Up to 30 team members",
      "Admin dashboard",
      "Custom knowledge packs",
      "Usage analytics per student",
      "Dedicated account manager",
      "SLA & SSO support",
    ],
    cta: "Contact Sales",
    ctaVariant: "outline" as const,
    highlight: false,
  },
];

const teamMembers = [
  { name: "Dr. Sarah Chen", role: "AI Research Lead", color: "from-blue-500 to-cyan-500", initials: "SC" },
  { name: "Arjun Mehta", role: "Product & Design", color: "from-purple-500 to-pink-500", initials: "AM" },
  { name: "Priya Nair", role: "Curriculum Science", color: "from-emerald-500 to-teal-500", initials: "PN" },
  { name: "James Wilson", role: "Engineering Lead", color: "from-orange-500 to-yellow-500", initials: "JW" },
];

export default function Landing() {
  const [, navigate] = useLocation();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Features", action: () => scrollTo("features") },
    { label: "Marketplace", action: () => navigate("/login?redirect=marketplace") },
    { label: "Pricing", action: () => scrollTo("pricing") },
    { label: "About", action: () => scrollTo("about") },
  ];

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

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between px-8 border-b border-white/5 bg-background/70 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            NeuroLearn AI
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none outline-none"
            >
              {item.label}
            </motion.button>
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

      {/* HERO */}
      <section className="relative z-10 px-8 pt-24 pb-16">
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
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 h-12 px-8 text-base font-semibold gap-2"
                  onClick={() => scrollTo("features")}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20">
                    <Play className="h-3 w-3 text-primary fill-primary" />
                  </div>
                  See Features
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
                      <ZapIcon className="h-4 w-4 text-secondary" />
                      <span className="text-sm font-semibold text-secondary">Take a Quiz on this topic</span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
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
              className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6 text-center hover:border-primary/30 hover:bg-card transition-all"
            >
              <AnimatedCounter target={stat.value} />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-8 py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs text-primary mb-4">
              <Sparkles className="h-3 w-3" /> Platform Features
            </div>
            <h2 className="text-4xl font-black mb-4">Everything you need to learn smarter</h2>
            <p className="text-muted-foreground text-lg">Powered by cutting-edge AI technology</p>
          </motion.div>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "AI-Powered Tutoring", desc: "Your personal AI tutor adapts explanations to match your learning style and pace in real-time.", color: "from-primary/20 to-primary/5", iconColor: "text-primary" },
            { icon: BookOpen, title: "Knowledge Marketplace", desc: "Access thousands of expert-curated learning packs from top educators and institutions worldwide.", color: "from-secondary/20 to-secondary/5", iconColor: "text-secondary" },
            { icon: Award, title: "Gamified Learning", desc: "Earn XP, unlock achievements, and compete on leaderboards to stay motivated every single day.", color: "from-yellow-500/20 to-yellow-500/5", iconColor: "text-yellow-400" },
            { icon: ZapIcon, title: "Instant Quizzes", desc: "Auto-generated quizzes from any topic you study, with instant feedback and spaced repetition.", color: "from-emerald-500/20 to-emerald-500/5", iconColor: "text-emerald-400" },
            { icon: Globe, title: "Study Planner", desc: "AI builds your personalized weekly study schedule based on your goals, pace, and exam dates.", color: "from-cyan-500/20 to-cyan-500/5", iconColor: "text-cyan-400" },
            { icon: Users, title: "Community & Leaderboard", desc: "Learn alongside 50,000+ students. Compete globally or with your class on live leaderboards.", color: "from-pink-500/20 to-pink-500/5", iconColor: "text-pink-400" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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

      {/* PRICING */}
      <section id="pricing" className="relative z-10 px-8 py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-1.5 text-xs text-secondary mb-4">
                <ZapIcon className="h-3 w-3" /> Simple Pricing
              </div>
              <h2 className="text-4xl font-black mb-4">Start free, scale as you grow</h2>
              <p className="text-muted-foreground text-lg">No hidden fees. Cancel anytime.</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl border ${plan.color} bg-card/50 backdrop-blur p-7 ${plan.highlight ? "shadow-2xl shadow-primary/20 ring-1 ring-primary/30" : ""}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-secondary px-3 py-1 text-xs font-bold text-white shadow-lg">
                      <Star className="h-3 w-3 fill-white" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-1">{plan.name}</p>
                  <div className="flex items-end gap-1.5">
                    <span className="text-4xl font-black text-foreground">{plan.price}</span>
                    <span className="text-sm text-muted-foreground mb-1.5">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full ${plan.highlight ? "bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/25 hover:shadow-primary/40" : "border-white/10 hover:bg-white/5"}`}
                  >
                    {plan.cta}
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground mt-8"
          >
            All plans include a 14-day free trial. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative z-10 px-8 py-20 scroll-mt-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-400 mb-4">
                <Heart className="h-3 w-3" /> Our Story
              </div>
              <h2 className="text-4xl font-black mb-4">Built by learners, for learners</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We believe every student deserves a world-class tutor — regardless of budget, location, or background. NeuroLearn AI makes that possible through the power of artificial intelligence.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-8"
            >
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Traditional education is broken. Students spend thousands on tutors, courses, and textbooks — yet learning outcomes haven't improved in decades.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                NeuroLearn AI is our answer: an intelligent, adaptive, gamified learning platform that meets students where they are — and gets them where they want to be.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-8"
            >
              <h3 className="text-xl font-bold mb-4">Why NeuroLearn?</h3>
              <ul className="space-y-3">
                {[
                  "Personalized AI that adapts to YOUR learning style",
                  "Gamification that actually keeps you motivated",
                  "Expert knowledge packs from real educators",
                  "Analytics that show exactly where you need help",
                  "Affordable — 10x cheaper than private tutoring",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2">Meet the Team</h3>
            <p className="text-muted-foreground text-sm">The minds behind NeuroLearn AI</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-2xl border border-white/10 bg-card/50 backdrop-blur p-6 text-center"
              >
                <div className={`mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-lg mb-3 shadow-lg`}>
                  {member.initials}
                </div>
                <p className="text-sm font-semibold">{member.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-xl shadow-primary/30 h-12 px-10 text-base font-semibold">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("pricing")}
                className="h-12 px-8 text-base font-semibold rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors text-foreground"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-card/20 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Brand column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  NeuroLearn AI
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The AI-powered learning platform that adapts to you. Study smarter, not harder.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {[
                  { label: "X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                  { label: "Li", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                  { label: "Gh", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
                ].map((s) => (
                  <motion.div
                    key={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.path} />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Product</h4>
              <ul className="space-y-3">
                {[
                  { label: "Features", action: () => scrollTo("features") },
                  { label: "Marketplace", action: () => navigate("/login?redirect=marketplace") },
                  { label: "Pricing", action: () => scrollTo("pricing") },
                  { label: "AI Tutor", action: () => navigate("/login") },
                  { label: "Analytics", action: () => navigate("/login") },
                  { label: "Study Planner", action: () => navigate("/login") },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Company</h4>
              <ul className="space-y-3">
                {[
                  { label: "About Us", action: () => scrollTo("about") },
                  { label: "Blog", action: () => {} },
                  { label: "Careers", action: () => {} },
                  { label: "Press Kit", action: () => {} },
                  { label: "Contact Us", action: () => {} },
                  { label: "Partners", action: () => {} },
                ].map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">Get the latest learning tips and product updates.</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 h-9 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold shrink-0"
                  >
                    Join
                  </motion.button>
                </div>
                <p className="text-xs text-muted-foreground">No spam, unsubscribe anytime.</p>
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-foreground">Trusted by students from</p>
                <div className="flex flex-wrap gap-2">
                  {["MIT", "Stanford", "IIT", "Oxford"].map((uni) => (
                    <span key={uni} className="text-xs px-2 py-1 rounded-md border border-white/10 bg-white/5 text-muted-foreground">
                      {uni}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 NeuroLearn AI, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <button
                  key={item}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
