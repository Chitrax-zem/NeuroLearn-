import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/pages/not-found";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import AITutor from "@/pages/AITutor";
import Marketplace from "@/pages/Marketplace";
import Quiz from "@/pages/Quiz";
import QuizResults from "@/pages/QuizResults";
import Analytics from "@/pages/Analytics";
import Planner from "@/pages/Planner";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tutor" component={AITutor} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/quiz/results" component={QuizResults} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/planner" component={Planner} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
