import { motion } from "framer-motion";
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
      className="text-3xl font-bold font-mono text-[#5EF0DA]"
    >
      {target}{suffix}
    </motion.span>
  );
}

// Faint ambient "synapse" threads behind the page — same visual language as
// the sign-in screen, kept quiet so it reads as texture, not decoration.
const threads = [
  { x1: "8%", y1: "12%", x2: "28%", y2: "34%", delay: 0 },
  { x1: "72%", y1: "8%", x2: "92%", y2: "26%", delay: 1.2 },
  { x1: "15%", y1: "78%", x2: "38%", y2: "58%", delay: 2.1 },
  { x1: "80%", y1: "70%", x2: "60%", y2: "90%", delay: 0.6 },
];

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
    color: "border-[#5EF0DA]/40",
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
    color: "border-white/10",
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
  { name: "Dr. Sarah Chen", role: "AI Research Lead", initials: "SC" },
  { name: "Arjun Mehta", role: "Product & Design", initials: "AM" },
  { name: "Priya Nair", role: "Curriculum Science", initials: "PN" },
  { name: "James Wilson", role: "Engineering Lead", initials: "JW" },
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
    <div className="min-h-screen bg-[#070B14] text-[#EAF0F6] overflow-x-hidden">
      {/* ambient backdrop: dot grid + faint synapse threads, fixed and quiet */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          {threads.map((t, i) => (
            <motion.line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke="#5EF0DA"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.12, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: t.delay, ease: "easeInOut" }}
            />
          ))}
        </svg>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #5EF0DA 0%, transparent 70%)" }} />
      </div>

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex h-16 items-center justify-between px-8 border-b border-white/5 bg-[#070B14]/80 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5EF0DA]">
            <Brain className="h-4.5 w-4.5 text-[#06121A]" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#EAF0F6]">
            NeuroLearn <span className="text-[#5EF0DA]">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.action}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-mono uppercase tracking-wide text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors cursor-pointer bg-transparent border-none outline-none"
            >
              {item.label}
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-[#7C8AA3] hover:text-[#EAF0F6] hover:bg-white/5">
              Log In
            </Button>
          </Link>
          <Link href="/login">
            <Button size="sm" className="bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 font-semibold transition-colors">
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
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#5EF0DA] mb-6">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#5EF0DA] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EF0DA]" />
                </span>
                AI-powered learning platform
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                <span className="text-[#EAF0F6]">Learn Anything.</span>
                <br />
                <span className="text-[#EAF0F6]">Anytime.</span>
                <br />
                <span className="text-[#5EF0DA]">
                  With Your Personal AI Tutor.
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-[#7C8AA3] leading-relaxed max-w-xl"
            >
              NeuroLearn AI transforms textbooks, notes, PDFs and knowledge packs into personalized AI tutoring experiences — adapting to your pace, your gaps, your goals.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button
                    size="lg"
                    className="bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 h-12 px-8 text-base font-mono uppercase tracking-wide font-semibold transition-colors"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/15 bg-transparent text-[#EAF0F6] hover:bg-white/5 h-12 px-8 text-base font-semibold gap-2"
                  onClick={() => scrollTo("features")}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#5EF0DA]/15">
                    <Play className="h-3 w-3 text-[#5EF0DA] fill-[#5EF0DA]" />
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
                {["#5EF0DA", "#FBBF24", "#5EF0DA", "#7C8AA3"].map((color, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-[#070B14]" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                  ))}
                </div>
                <p className="text-xs text-[#7C8AA3]">Loved by 50,000+ students</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#5EF0DA]/10 rounded-2xl blur-3xl" />
            <div className="relative rounded-xl border border-white/10 bg-[#0B121F] p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-[#5EF0DA]"
                  animate={{ boxShadow: ["0 0 0 0 rgba(94,240,218,0.4)", "0 0 0 8px rgba(94,240,218,0)", "0 0 0 0 rgba(94,240,218,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Brain className="h-5 w-5 text-[#06121A]" />
                </motion.div>
                <div>
                  <p className="text-sm font-semibold text-[#EAF0F6]">NeuroLearn AI</p>
                  <p className="text-xs text-[#5EF0DA] flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5EF0DA] inline-block" />
                    Online — Your AI Tutor
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-xl rounded-tr-sm bg-[#5EF0DA] px-4 py-3">
                    <p className="text-sm text-[#06121A] font-medium">Explain Newton's Second Law</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
                    <p className="text-sm text-[#7C8AA3] leading-relaxed">
                      Newton's Second Law states that the <span className="text-[#EAF0F6] font-medium">acceleration of an object</span> is directly proportional to the net force acting on it and inversely proportional to its mass.
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#5EF0DA]/20 bg-[#5EF0DA]/5 p-4">
                    <p className="text-xs text-[#5EF0DA] font-mono uppercase tracking-wider mb-2">Formula</p>
                    <p className="text-2xl font-black text-center text-[#EAF0F6] py-2">
                      <span className="text-[#5EF0DA]">F</span> = <span className="text-[#FBBF24]">m</span> × <span className="text-[#EAF0F6]">a</span>
                    </p>
                    <div className="flex justify-between text-xs text-[#7C8AA3] mt-2 font-mono">
                      <span className="text-[#5EF0DA]">F = Force (N)</span>
                      <span className="text-[#FBBF24]">m = Mass (kg)</span>
                      <span className="text-[#EAF0F6]">a = Accel. (m/s²)</span>
                    </div>
                  </div>

                  <Link href="/login?redirect=quiz">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 rounded-lg border border-[#FBBF24]/30 bg-[#FBBF24]/5 py-3 cursor-pointer hover:bg-[#FBBF24]/10 transition-colors"
                    >
                      <ZapIcon className="h-4 w-4 text-[#FBBF24]" />
                      <span className="text-sm font-semibold text-[#FBBF24]">
                        Take a Quiz on this topic
                      </span>
                    </motion.div>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 px-8 py-12">
        <div className="max-w-3xl mx-auto flex items-stretch divide-x divide-white/10 border border-white/10 rounded-lg">
          {[
            { value: "50,000+", label: "Students worldwide" },
            { value: "1M+", label: "Questions solved" },
            { value: "95%", label: "Learning satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 text-center py-6"
            >
              <AnimatedCounter target={stat.value} />
              <p className="mt-2 text-xs uppercase tracking-wide text-[#7C8AA3]">{stat.label}</p>
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
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EF0DA]">// platform features</span>
            <h2 className="text-4xl font-black mt-3 mb-4 text-[#EAF0F6]">Everything you need to learn smarter</h2>
            <p className="text-[#7C8AA3] text-lg">Powered by cutting-edge AI technology</p>
          </motion.div>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">
          {[
            { icon: Brain, title: "AI-Powered Tutoring", desc: "Your personal AI tutor adapts explanations to match your learning style and pace in real-time.", accent: "teal" },
            { icon: BookOpen, title: "Knowledge Marketplace", desc: "Access thousands of expert-curated learning packs from top educators and institutions worldwide.", accent: "amber" },
            { icon: Award, title: "Gamified Learning", desc: "Earn XP, unlock achievements, and compete on leaderboards to stay motivated every single day.", accent: "teal" },
            { icon: ZapIcon, title: "Instant Quizzes", desc: "Auto-generated quizzes from any topic you study, with instant feedback and spaced repetition.", accent: "amber" },
            { icon: Globe, title: "Study Planner", desc: "AI builds your personalized weekly study schedule based on your goals, pace, and exam dates.", accent: "teal" },
            { icon: Users, title: "Community & Leaderboard", desc: "Learn alongside 50,000+ students. Compete globally or with your class on live leaderboards.", accent: "amber" },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-md mb-4 ${feature.accent === "teal" ? "bg-[#5EF0DA]/10" : "bg-[#FBBF24]/10"}`}>
                <feature.icon className={`h-5 w-5 ${feature.accent === "teal" ? "text-[#5EF0DA]" : "text-[#FBBF24]"}`} />
              </div>
              <h3 className="text-base font-semibold mb-2 text-[#EAF0F6]">{feature.title}</h3>
              <p className="text-sm text-[#7C8AA3] leading-relaxed">{feature.desc}</p>
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EF0DA]">// simple pricing</span>
              <h2 className="text-4xl font-black mt-3 mb-4 text-[#EAF0F6]">Start free, scale as you grow</h2>
              <p className="text-[#7C8AA3] text-lg">No hidden fees. Cancel anytime.</p>
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
                className={`relative rounded-lg border ${plan.color} bg-white/[0.02] p-7 ${plan.highlight ? "ring-1 ring-[#5EF0DA]/40" : ""}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#5EF0DA] px-3 py-1 text-xs font-mono font-bold uppercase tracking-wide text-[#06121A]">
                      <Star className="h-3 w-3 fill-[#06121A]" /> {plan.badge}
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-mono uppercase tracking-wide text-[#7C8AA3] mb-1">{plan.name}</p>
                  <div className="flex items-end gap-1.5">
                    <span className="text-4xl font-black text-[#EAF0F6]">{plan.price}</span>
                    <span className="text-sm text-[#7C8AA3] mb-1.5">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-[#7C8AA3] mt-1">{plan.desc}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 text-[#5EF0DA] mt-0.5 shrink-0" />
                      <span className="text-[#7C8AA3]">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/login">
                  <Button
                    variant={plan.highlight ? "default" : "outline"}
                    className={`w-full ${plan.highlight ? "bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 font-semibold" : "border-white/15 text-[#EAF0F6] hover:bg-white/5"}`}
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
            className="text-center text-sm text-[#7C8AA3] mt-8"
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
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#5EF0DA]">// our story</span>
              <h2 className="text-4xl font-black mt-3 mb-4 text-[#EAF0F6]">Built by learners, for learners</h2>
              <p className="text-[#7C8AA3] text-lg max-w-2xl mx-auto">
                We believe every student deserves a world-class tutor — regardless of budget, location, or background. NeuroLearn AI makes that possible through the power of artificial intelligence.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[#EAF0F6]">Our Mission</h3>
              <p className="text-[#7C8AA3] leading-relaxed mb-4">
                Traditional education is broken. Students spend thousands on tutors, courses, and textbooks — yet learning outcomes haven't improved in decades.
              </p>
              <p className="text-[#7C8AA3] leading-relaxed">
                NeuroLearn AI is our answer: an intelligent, adaptive, gamified learning platform that meets students where they are — and gets them where they want to be.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-8"
            >
              <h3 className="text-xl font-bold mb-4 text-[#EAF0F6]">Why NeuroLearn?</h3>
              <ul className="space-y-3">
                {[
                  "Personalized AI that adapts to YOUR learning style",
                  "Gamification that actually keeps you motivated",
                  "Expert knowledge packs from real educators",
                  "Analytics that show exactly where you need help",
                  "Affordable — 10x cheaper than private tutoring",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-[#7C8AA3]">
                    <Check className="h-4 w-4 text-[#5EF0DA] mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-2 text-[#EAF0F6]">Meet the Team</h3>
            <p className="text-[#7C8AA3] text-sm">The minds behind NeuroLearn AI</p>
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
                className="rounded-lg border border-white/10 bg-white/[0.02] p-6 text-center"
              >
                <div className="mx-auto h-14 w-14 rounded-full border border-[#5EF0DA]/30 bg-[#5EF0DA]/5 flex items-center justify-center text-[#5EF0DA] font-mono font-bold text-lg mb-3">
                  {member.initials}
                </div>
                <p className="text-sm font-semibold text-[#EAF0F6]">{member.name}</p>
                <p className="text-xs text-[#7C8AA3] mt-1">{member.role}</p>
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
          <div className="rounded-xl border border-[#5EF0DA]/20 bg-[#5EF0DA]/[0.04] p-12">
            <h2 className="text-4xl font-black mb-4 text-[#EAF0F6]">Ready to learn smarter?</h2>
            <p className="text-[#7C8AA3] mb-8 text-lg">Join 50,000+ students transforming how they study.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 h-12 px-10 text-base font-mono uppercase tracking-wide font-semibold transition-colors">
                    Get Started Free
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("pricing")}
                className="h-12 px-8 text-base font-semibold rounded-md border border-white/15 bg-transparent hover:bg-white/5 transition-colors text-[#EAF0F6]"
              >
                View Pricing
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-[#070B14]">
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

            {/* Brand column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#5EF0DA]">
                  <Brain className="h-5 w-5 text-[#06121A]" />
                </div>
                <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#EAF0F6]">
                  NeuroLearn <span className="text-[#5EF0DA]">AI</span>
                </span>
              </div>
              <p className="text-sm text-[#7C8AA3] leading-relaxed">
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
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.02] hover:border-[#5EF0DA]/40 transition-all cursor-pointer"
                  >
                    <svg className="h-3.5 w-3.5 text-[#7C8AA3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.path} />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wide text-[#EAF0F6]">Product</h4>
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
                      className="text-sm text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company links */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wide text-[#EAF0F6]">Company</h4>
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
                      className="text-sm text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors bg-transparent border-none cursor-pointer p-0 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h4 className="text-sm font-mono uppercase tracking-wide text-[#EAF0F6]">Stay Updated</h4>
              <p className="text-sm text-[#7C8AA3]">Get the latest learning tips and product updates.</p>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 h-9 rounded-md border border-white/10 bg-white/[0.02] px-3 text-sm text-[#EAF0F6] placeholder:text-[#7C8AA3] focus:outline-none focus:border-[#5EF0DA]/50 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="h-9 px-4 rounded-md bg-[#5EF0DA] text-[#06121A] text-sm font-semibold shrink-0"
                  >
                    Join
                  </motion.button>
                </div>
                <p className="text-xs text-[#7C8AA3]">No spam, unsubscribe anytime.</p>
              </div>
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium text-[#EAF0F6]">Trusted by students from</p>
                <div className="flex flex-wrap gap-2">
                  {["MIT", "Stanford", "IIT", "Oxford"].map((uni) => (
                    <span key={uni} className="text-xs px-2 py-1 rounded-md border border-white/10 bg-white/[0.02] text-[#7C8AA3]">
                      {uni}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#7C8AA3]">
              © 2026 NeuroLearn AI, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                <button
                  key={item}
                  className="text-xs text-[#7C8AA3] hover:text-[#EAF0F6] transition-colors bg-transparent border-none cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-[#7C8AA3]">All systems operational</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}