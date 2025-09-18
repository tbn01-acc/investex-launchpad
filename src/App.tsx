import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import About from "./pages/About";
import ForFreelancers from "./pages/ForFreelancers";
import ForOutsourcers from "./pages/ForOutsourcers";
import ForFounders from "./pages/ForFounders";
import ForInvestors from "./pages/ForInvestors";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Investments from "./pages/Investments";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import Security from "./pages/Security";
import ApiDocs from "./pages/ApiDocs";
import KnowledgeBase from "./pages/KnowledgeBase";
import ProjectManagement from "./pages/ProjectManagement";
import Payment from "./pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/freelancers" element={<ForFreelancers />} />
                <Route path="/for-freelancers" element={<ForFreelancers />} />
                <Route path="/outsourcers" element={<ForOutsourcers />} />
                <Route path="/for-outsourcers" element={<ForOutsourcers />} />
                <Route path="/founders" element={<ForFounders />} />
                <Route path="/for-founders" element={<ForFounders />} />
                <Route path="/investors" element={<ForInvestors />} />
                <Route path="/for-investors" element={<ForInvestors />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/security" element={<Security />} />
                <Route path="/api-docs" element={<ApiDocs />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/project-management" element={<ProjectManagement />} />
                <Route path="/payment" element={<Payment />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
