import { motion } from "framer-motion";
import { Link, useLocation, useSearch } from "wouter";
import { Brain, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect");
  const redirectTo = redirect === "marketplace" ? "/marketplace" : "/dashboard";
  const fromMarketplace = redirect === "marketplace";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation(redirectTo);
  };

  const handleGuest = () => setLocation(redirectTo);
  const handleGoogle = () => setLocation(redirectTo);

  const stats = [
    { value: "50,000+", label: "Active Learners" },
    { value: "1M+", label: "Questions Solved" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen flex bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden lg:flex lg:w-[60%] relative flex-col items-center justify-center p-12 overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-background to-secondary/20" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 0.3) 0%, transparent 70%)" }}
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(262 83% 58% / 0.3) 0%, transparent 70%)" }}
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative z-10 text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary shadow-2xl shadow-primary/40">
                <Brain className="h-10 w-10 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              The Future of{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Learning is Here
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12">
              Join 50,000+ learners transforming how they study with AI-powered personalized tutoring.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4"
                >
                  <p className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mt-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-6 py-4"
        >
          <Sparkles className="h-5 w-5 text-yellow-400 shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="text-foreground font-semibold">Chitransh</span> just earned the "Physics Master" badge after completing Module 4!
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-1 items-center justify-center p-8 lg:border-l lg:border-white/5"
      >
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link href="/" className="flex items-center gap-2 lg:hidden mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NeuroLearn AI
              </span>
            </Link>

            {fromMarketplace && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl border border-secondary/30 bg-secondary/10 px-4 py-3 mb-6"
              >
                <ShoppingBag className="h-4 w-4 text-secondary shrink-0" />
                <p className="text-sm text-secondary font-medium">
                  Sign in to access the Knowledge Marketplace
                </p>
              </motion.div>
            )}

            <h1 className="text-3xl font-black mb-2">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === "login"
                ? fromMarketplace ? "Sign in to browse & open knowledge packs" : "Sign in to continue your learning journey"
                : "Start your AI-powered learning journey today"}
            </p>
          </div>

          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="button"
                variant="outline"
                className="w-full border-white/10 bg-white/5 hover:bg-white/10 h-11 font-medium gap-3"
                onClick={handleGoogle}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 border-white/10 bg-white/5 focus-visible:ring-primary focus-visible:bg-white/8 h-11 transition-all"
                  data-testid="input-email"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border-white/10 bg-white/5 focus-visible:ring-primary h-11 transition-all"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow h-11 font-semibold"
                  data-testid="button-submit"
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                <span className="font-semibold text-primary">{mode === "login" ? "Create account" : "Sign in"}</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground hover:bg-white/5 gap-2"
                onClick={handleGuest}
                data-testid="button-guest"
              >
                Continue as Guest
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
