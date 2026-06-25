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
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "@/pages/Analytics";
import Planner from "@/pages/Planner";
import Profile from "@/pages/Profile";
import UploadKnowledgePack from "@/pages/UploadKnowledgePack";

const handleGuest = () => {
  alert("Guest mode not available");
};
const queryClient = new QueryClient();


function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard"><ProtectedRoute><Dashboard /></ProtectedRoute></Route>
        <Route path="/tutor"><ProtectedRoute><AITutor/></ProtectedRoute></Route>
        <Route path="/marketplace"><ProtectedRoute><Marketplace /></ProtectedRoute></Route>
        <Route path="/quiz"><ProtectedRoute><Quiz/></ProtectedRoute></Route>
        <Route path="/quiz/results" component={QuizResults} />
         <Route path="/analytics"><ProtectedRoute><Analytics /></ProtectedRoute></Route>
         <Route path="/planner"><ProtectedRoute><Planner /></ProtectedRoute></Route>
        <Route path="/profile"><ProtectedRoute><Profile /></ProtectedRoute></Route>
         <Route path="/upload-pack"component={UploadKnowledgePack}/>
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
