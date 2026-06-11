import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Zap, Clock, Lightbulb, SkipForward, CheckCircle2, XCircle } from "lucide-react";
import AppShell from "@/components/AppShell";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    subject: "Physics — Newton's Laws",
    question: "According to Newton's Second Law, if a constant force is applied to an object while its mass increases, what happens to the acceleration?",
    options: [
      "Acceleration increases proportionally",
      "Acceleration decreases inversely",
      "Acceleration remains constant",
      "Acceleration becomes zero",
    ],
    correct: 1,
    explanation: "F = ma, so a = F/m. If force is constant and mass increases, acceleration decreases inversely.",
  },
  {
    id: 2,
    subject: "Physics — Newton's Laws",
    question: "A car of mass 1500 kg accelerates at 2 m/s². What is the net force acting on it?",
    options: ["750 N", "1500 N", "3000 N", "6000 N"],
    correct: 2,
    explanation: "F = ma = 1500 × 2 = 3000 N",
  },
  {
    id: 3,
    subject: "Physics — Newton's Laws",
    question: "Newton's First Law is also known as the Law of:",
    options: ["Acceleration", "Inertia", "Action-Reaction", "Gravitation"],
    correct: 1,
    explanation: "Newton's First Law states that an object at rest stays at rest — this property is called inertia.",
  },
];

export default function Quiz() {
  const [, setLocation] = useLocation();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(150);
  const [xp, setXp] = useState(0);
  const [showXpPop, setShowXpPop] = useState(false);

  useEffect(() => {
    if (confirmed) return;
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, [confirmed]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const isRed = timeLeft < 30;

  const question = questions[current % questions.length];

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setConfirmed(true);
    if (selected === question.correct) {
      setXp((x) => x + 25);
      setShowXpPop(true);
      setTimeout(() => setShowXpPop(false), 2000);
    }
  };

  const handleNext = () => {
    if (current >= 2) {
      setLocation("/quiz/results");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setConfirmed(false);
      setShowHint(false);
      setTimeLeft(150);
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <AppShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Question {current + 1}</span>
            <span>/</span>
            <span>10</span>
          </div>
          <motion.div
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-sm font-bold ${
              isRed ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-white/10 bg-white/5 text-foreground"
            }`}
            animate={isRed ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Clock className="h-4 w-4" />
            {minutes}:{seconds}
          </motion.div>
          <motion.div
            className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5"
            key={xp}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-400">{xp} XP</span>
          </motion.div>
        </div>

        <div className="h-2 rounded-full bg-white/5 mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: `${(current / 10) * 100}%` }}
            animate={{ width: `${((current + 1) / 10) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl border border-white/10 bg-card/50 p-6 mb-5">
              <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 inline-block mb-4">
                {question.subject}
              </span>
              <h2 className="text-lg font-bold leading-relaxed">{question.question}</h2>
            </div>

            <div className="space-y-3 mb-6">
              {question.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = confirmed && i === question.correct;
                const isWrong = confirmed && isSelected && i !== question.correct;
                return (
                  <motion.button
                    key={i}
                    onClick={() => handleSelect(i)}
                    whileHover={!confirmed ? { scale: 1.01, x: 4 } : {}}
                    whileTap={!confirmed ? { scale: 0.99 } : {}}
                    animate={isWrong ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
                      isCorrect
                        ? "border-green-500/50 bg-green-500/10 shadow-lg shadow-green-500/10"
                        : isWrong
                        ? "border-red-500/50 bg-red-500/10"
                        : isSelected
                        ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-white/5 bg-card/30 hover:border-white/15 hover:bg-card/60"
                    } ${confirmed ? "cursor-default" : "cursor-pointer"}`}
                    data-testid={`option-${optionLabels[i]}`}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                      isCorrect ? "bg-green-500/20 text-green-400" :
                      isWrong ? "bg-red-500/20 text-red-400" :
                      isSelected ? "bg-primary/20 text-primary" :
                      "bg-white/5 text-muted-foreground"
                    }`}>
                      {optionLabels[i]}
                    </span>
                    <span className={`text-sm font-medium ${
                      isCorrect ? "text-green-300" : isWrong ? "text-red-300" : ""
                    }`}>{opt}</span>
                    {isCorrect && <CheckCircle2 className="h-5 w-5 text-green-400 ml-auto shrink-0" />}
                    {isWrong && <XCircle className="h-5 w-5 text-red-400 ml-auto shrink-0" />}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 mb-5"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      <span className="text-yellow-400 font-semibold">Hint: </span>
                      Think about the mathematical relationship F = ma. What happens to 'a' when 'm' increases while 'F' stays constant?
                    </p>
                  </div>
                </motion.div>
              )}

              {confirmed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-5"
                >
                  <p className="text-sm">
                    <span className="text-primary font-semibold">Explanation: </span>
                    {question.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowHint(!showHint)}
                disabled={confirmed}
                className="border-white/10 bg-white/5 hover:bg-white/10 gap-2"
                data-testid="button-hint"
              >
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                Hint
              </Button>
              <Button
                variant="outline"
                onClick={handleNext}
                className="border-white/10 bg-white/5 hover:bg-white/10 gap-2"
                data-testid="button-skip"
              >
                <SkipForward className="h-4 w-4" />
                Skip
              </Button>
              {!confirmed ? (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    onClick={handleSubmit}
                    disabled={selected === null}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/20 h-10"
                    data-testid="button-submit"
                  >
                    Submit Answer
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <Button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white border-0 shadow-lg shadow-primary/20 h-10"
                    data-testid="button-next"
                  >
                    {current >= 2 ? "See Results" : "Next Question"}
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showXpPop && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -60, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.5 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border border-yellow-500/40 px-5 py-2.5 shadow-2xl"
            >
              <Zap className="h-5 w-5 text-yellow-400" />
              <span className="text-yellow-300 font-black text-lg">+25 XP</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AppShell>
  );
}
