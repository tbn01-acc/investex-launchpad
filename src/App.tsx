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
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

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
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
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
