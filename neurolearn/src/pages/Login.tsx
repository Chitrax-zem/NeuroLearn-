import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useSearch } from "wouter";
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShoppingBag,
  Activity,
  Loader2,
  KeyRound,
} from "lucide-react";
import { useState, useEffect } from "react";
import { login, register, sendOtp, verifyOtp } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

export default function Login() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const redirect = params.get("redirect");
  const redirectTo = redirect === "marketplace" ? "/marketplace" : "/dashboard";
  const fromMarketplace = redirect === "marketplace";
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [mode, setMode] = useState<"login" | "register">("login");
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [otp, setOtp] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Ping the backend as soon as the login page loads so Render's free-tier
  // instance is warm by the time the user submits the form.
  useEffect(() => {
    fetch(`${API_URL}/api/health`).catch(() => {});
  }, []);

const completeAuth = (data: any) => {
  // Save token immediately
  localStorage.setItem("access_token", data.access_token);

  // Navigate NOW — don't block on /me
  setLocation(redirectTo);

  // Fetch user profile in the background after navigation
  fetch(`${API_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  })
    .then((res) => res.json())
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      // storage event only fires cross-tab — dispatch manually so Dashboard
      // re-reads localStorage and shows the real name in the same tab.
      window.dispatchEvent(new Event("storage"));
    })
    .catch((err) => console.error("Failed to fetch user:", err));
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    if (mode === "login") {
      const data = await login(email, password);
      await completeAuth(data);
    } else {
      // Registration no longer creates the account directly — verify the
      // email with an OTP first, then /verify-otp + /register run on submit
      // of the OTP step below.
      await sendOtp(email);
      setStep("otp");
    }
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Authentication failed");
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    await verifyOtp(email, otp);
    const data = await register(
      fullName,
      phoneNumber,
      email,
      password
    );
    await completeAuth(data);
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Verification failed");
  } finally {
    setLoading(false);
  }
};

const handleResendOtp = async () => {
  if (resendCooldown > 0) return;

  try {
    await sendOtp(email);
    setResendCooldown(30);
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Failed to resend OTP");
  }
};

useEffect(() => {
  if (resendCooldown <= 0) return;
  const id = setTimeout(() => setResendCooldown((s) => s - 1), 1000);
  return () => clearTimeout(id);
}, [resendCooldown]);

  const stats = [
    { value: "50,000+", label: "Active learners" },
    { value: "1M+", label: "Questions solved" },
    { value: "95%", label: "Satisfaction rate" },
  ];

  // ---- Signature visual: a live "synapse map" representing the tutor
  // actively traversing subjects. Purely decorative / presentational.
  const topics = ["Quantum Mechanics", "Organic Chemistry", "Linear Algebra", "Cell Biology", "Thermodynamics"];
  const [topicIndex, setTopicIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTopicIndex((i) => (i + 1) % topics.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const nodes = [
    { id: "core", x: 320, y: 258, r: 10, label: "" },
    { id: "n1", x: 168, y: 132, r: 5, label: "Physics" },
    { id: "n2", x: 472, y: 110, r: 5, label: "Calculus" },
    { id: "n3", x: 548, y: 296, r: 5, label: "Chemistry" },
    { id: "n4", x: 430, y: 432, r: 5, label: "Biology" },
    { id: "n5", x: 196, y: 426, r: 5, label: "Algebra" },
    { id: "n6", x: 104, y: 270, r: 5, label: "Statistics" },
  ];
  const edges: [string, string][] = [
    ["core", "n1"], ["core", "n2"], ["core", "n3"],
    ["core", "n4"], ["core", "n5"], ["core", "n6"],
    ["n1", "n2"], ["n3", "n4"], ["n5", "n6"],
  ];
  const findNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div className="min-h-screen flex bg-[#070B14] overflow-hidden">
      {/* ===================== LEFT: signature panel ===================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-[58%] relative flex-col justify-between p-14"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        {/* wordmark */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5EF0DA]">
            <Brain className="h-4.5 w-4.5 text-[#06121A]" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#EAF0F6]">
            NeuroLearn <span className="text-[#5EF0DA]">AI</span>
          </span>
        </div>

        {/* synapse map — the hero */}
        <div className="relative z-10 flex-1 flex items-center justify-center -my-4">
          <div className="relative w-full max-w-xl">
            <svg viewBox="0 0 640 520" className="w-full h-auto">
              {edges.map(([a, b], i) => {
                const A = findNode(a);
                const B = findNode(b);
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke="#5EF0DA"
                    strokeOpacity={0.22}
                    strokeWidth={1.25}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.22 }}
                    transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
                  />
                );
              })}

              {/* traveling pulse along a couple of edges for "activity" */}
              {[["core", "n2"], ["core", "n4"]].map(([a, b], i) => {
                const A = findNode(a);
                const B = findNode(b);
                return (
                  <motion.circle
                    key={`pulse-${a}-${b}`}
                    r={3}
                    fill="#5EF0DA"
                    initial={{ cx: A.x, cy: A.y, opacity: 0 }}
                    animate={{ cx: [A.x, B.x], cy: [A.y, B.y], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1.4 + i * 0.9, ease: "easeInOut" }}
                  />
                );
              })}

              {nodes.map((n, i) =>
                n.id === "core" ? (
                  <g key={n.id}>
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r={22}
                      fill="none"
                      stroke="#5EF0DA"
                      strokeWidth={1}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: [0.5, 0, 0.5], scale: [0.8, 1.6, 0.8] }}
                      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                    />
                    <motion.circle
                      cx={n.x}
                      cy={n.y}
                      r={n.r}
                      fill="#5EF0DA"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </g>
                ) : (
                  <motion.g key={n.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  >
                    <circle cx={n.x} cy={n.y} r={n.r} fill="#0E1626" stroke="#5EF0DA" strokeOpacity={0.6} strokeWidth={1.5} />
                    <text
                      x={n.x}
                      y={n.y + (n.y < 258 ? -14 : 18)}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="11"
                      fill="#7C8AA3"
                      letterSpacing="0.04em"
                    >
                      {n.label}
                    </text>
                  </motion.g>
                )
              )}
            </svg>

            {/* live topic readout, anchored under the network */}
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#5EF0DA] opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5EF0DA]" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7C8AA3]">
                tutoring session active —{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={topics[topicIndex]}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#5EF0DA] inline-block"
                  >
                    {topics[topicIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>
          </div>
        </div>

        {/* heading + stats + activity log */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-[#EAF0F6] mb-2">
              Built for the way<br />your brain actually learns.
            </h2>
            <p className="text-[#7C8AA3] text-sm max-w-md">
              Every answer reshapes the map above — the tutor follows where your understanding actually breaks down.
            </p>
          </div>

          <div className="flex items-stretch divide-x divide-white/10">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex-1 px-5 first:pl-0"
              >
                <p className="text-xl font-bold text-[#EAF0F6] font-mono">{s.value}</p>
                <p className="text-[11px] uppercase tracking-wider text-[#7C8AA3] mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 border-l-2 border-[#5EF0DA]/60 bg-white/[0.03] pl-4 pr-5 py-3"
          >
            <Activity className="h-4 w-4 text-[#5EF0DA] shrink-0" />
            <p className="text-xs text-[#7C8AA3] font-mono">
              <span className="text-[#EAF0F6]">Chitransh</span> earned "Physics Master" — module 4 complete
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ===================== RIGHT: form panel ===================== */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-1 items-center justify-center p-8 lg:border-l lg:border-white/5 bg-[#070B14]"
      >
        <div className="w-full max-w-sm">
          <div className="mb-10">
            <Link href="/" className="flex items-center gap-2 lg:hidden mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5EF0DA]">
                <Brain className="h-4.5 w-4.5 text-[#06121A]" strokeWidth={2.5} />
              </div>
              <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#EAF0F6]">
                NeuroLearn <span className="text-[#5EF0DA]">AI</span>
              </span>
            </Link>

            {fromMarketplace && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-md border-l-2 border-[#5EF0DA]/60 bg-white/[0.03] px-4 py-3 mb-6"
              >
                <ShoppingBag className="h-4 w-4 text-[#5EF0DA] shrink-0" />
                <p className="text-sm text-[#EAF0F6] font-medium">
                  Sign in to access the Knowledge Marketplace
                </p>
              </motion.div>
            )}

            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5EF0DA]">
              {step === "otp" ? "// verify email" : mode === "login" ? "// sign in" : "// create account"}
            </span>
            <h1 className="text-3xl font-black mt-2 mb-2 text-[#EAF0F6]">
              {step === "otp" ? "Check your inbox" : mode === "login" ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-[#7C8AA3] text-sm">
              {step === "otp"
                ? <>We sent a 6-digit code to <span className="text-[#EAF0F6]">{email}</span></>
                : mode === "login"
                ? fromMarketplace ? "Sign in to browse & open knowledge packs" : "Sign in to continue your learning journey"
                : "Start your AI-powered learning journey today"}
            </p>
          </div>

          {mode === "register" && step === "otp" ? (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="relative group">
                <KeyRound className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C8AA3] group-focus-within:text-[#5EF0DA] transition-colors" />
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="pl-7 pr-2 h-11 rounded-none border-0 border-b border-white/15 bg-transparent text-[#EAF0F6] placeholder:text-[#7C8AA3]/70 focus-visible:ring-0 focus-visible:border-[#5EF0DA] transition-colors tracking-[0.3em] font-mono"
                  data-testid="input-otp"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full h-11 rounded-md bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 font-mono uppercase tracking-wider text-sm font-semibold disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setOtp("");
                  }}
                  className="text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className="text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors disabled:opacity-50"
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                </button>
              </div>
            </form>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

  {mode === "register" && (
    <>
      <Input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="h-11 rounded-none border-0 border-b border-white/15 bg-transparent text-[#EAF0F6] placeholder:text-[#7C8AA3]/70 focus-visible:ring-0 focus-visible:border-[#5EF0DA]"
      />

      <Input
        type="tel"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="h-11 rounded-none border-0 border-b border-white/15 bg-transparent text-[#EAF0F6] placeholder:text-[#7C8AA3]/70 focus-visible:ring-0 focus-visible:border-[#5EF0DA]"
      />
    </>
  )}

  {/* Email */}
  <div className="relative group">
    <Mail className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C8AA3] group-focus-within:text-[#5EF0DA] transition-colors" />
    <Input
      type="email"
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="pl-7 pr-2 h-11 rounded-none border-0 border-b border-white/15 bg-transparent text-[#EAF0F6] placeholder:text-[#7C8AA3]/70 focus-visible:ring-0 focus-visible:border-[#5EF0DA] transition-colors"
      data-testid="input-email"
    />
  </div>

  {/* Password */}
  <div className="relative group">
    <Lock className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C8AA3] group-focus-within:text-[#5EF0DA] transition-colors" />

    <Input
      type={showPass ? "text" : "password"}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="pl-7 pr-8 h-11 rounded-none border-0 border-b border-white/15 bg-transparent text-[#EAF0F6] placeholder:text-[#7C8AA3]/70 focus-visible:ring-0 focus-visible:border-[#5EF0DA] transition-colors"
      data-testid="input-password"
    />

    <button
      type="button"
      onClick={() => setShowPass(!showPass)}
      className="absolute right-0 top-1/2 -translate-y-1/2 text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors"
    >
      {showPass ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  </div>

  <Button
  type="submit"
  disabled={loading}
  className="w-full h-11 rounded-md bg-[#5EF0DA] hover:bg-[#7BF4E1] text-[#06121A] border-0 font-mono uppercase tracking-wider text-sm font-semibold disabled:opacity-70"
>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {mode === "login" ? "Signing In..." : "Creating Account..."}
    </>
  ) : (
    <>
      {mode === "login" ? "Sign In" : "Create Account"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </>
  )}
</Button>

</form>
          )}

          {step === "credentials" && (
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setStep("credentials");
                setOtp("");
              }}
              className="text-sm text-[#7C8AA3] hover:text-[#5EF0DA] transition-colors"
            >
              {mode === "login" ? "Don't have an account? " : "Already have an account? "}
              <span className="font-semibold text-[#5EF0DA]">{mode === "login" ? "Create account" : "Sign in"}</span>
            </button>
          </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}