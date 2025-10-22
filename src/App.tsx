import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import GoToTop from "@/components/GoToTop";
import Index from "./pages/Index";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import About from "./pages/About";
import ForFreelancers from "./pages/ForFreelancers";
import ForOutsourcers from "./pages/ForOutsourcers";
import ForFounders from "./pages/ForFounders";
import ForInvestors from "./pages/ForInvestors";
import Participants from "./pages/Participants";
import Executors from "./pages/Executors";
import Employees from "./pages/Employees";
import Partners from "./pages/Partners";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Investments from "./pages/Investments";
import InvestmentStartups from "./pages/InvestmentStartups";
import InvestmentsNew from "./pages/InvestmentsNew";
import IdeaExchange from "./pages/IdeaExchange";
import SecondaryMarket from "./pages/SecondaryMarket";
import ManagementFranchises from "./pages/ManagementFranchises";
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
import ProjectManagementHub from "./pages/ProjectManagementHub";
import TasksPage from "./pages/pm/TasksPage";
import RecruitmentPage from "./pages/hr/RecruitmentPage";
import ContactsPage from "./pages/crm/ContactsPage";
import DocumentationPage from "./pages/kb/DocumentationPage";
import DashboardPage from "./pages/bi/DashboardPage";
import ProjectsSandbox from "./pages/superadmin/ProjectsSandbox";
import StaffManagement from "./pages/superadmin/StaffManagement";
import SuperadminAnalytics from "./pages/superadmin/SuperadminAnalytics";
import FranchiserDashboard from "./pages/dashboards/FranchiserDashboard";
import ProjectsOverviewPage from "./pages/pm/ProjectsOverviewPage";
import TimelinePage from "./pages/pm/TimelinePage";
import TeamPage from "./pages/hr/TeamPage";
import OnboardingPage from "./pages/hr/OnboardingPage";
import PipelinesPage from "./pages/crm/PipelinesPage";
import DealsPage from "./pages/crm/DealsPage";
import WikiPage from "./pages/kb/WikiPage";
import FilesPage from "./pages/kb/FilesPage";
import ReportsPage from "./pages/bi/ReportsPage";
import AnalyticsPage from "./pages/bi/AnalyticsPage";
import TaskNew from './pages/pm/TaskNew';
import VacancyNew from './pages/hr/VacancyNew';
import ContactNew from './pages/crm/ContactNew';
import ArticleNew from './pages/kb/ArticleNew';
import IVIIndex from './pages/IVIIndex';
import SupervisoryBoard from './pages/SupervisoryBoard';
import MediationCenter from './pages/MediationCenter';
import Favorites from './pages/Favorites';

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
              <ScrollToTop />
              <GoToTop />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/community" element={<Community />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/about" element={<About />} />
                <Route path="/ivi-index" element={<IVIIndex />} />
                <Route path="/supervisory-board" element={<SupervisoryBoard />} />
                <Route path="/mediation-center" element={<MediationCenter />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/freelancers" element={<ForFreelancers />} />
                <Route path="/for-freelancers" element={<ForFreelancers />} />
                <Route path="/outsourcers" element={<ForOutsourcers />} />
                <Route path="/for-outsourcers" element={<ForOutsourcers />} />
                <Route path="/founders" element={<ForFounders />} />
                <Route path="/for-founders" element={<ForFounders />} />
                <Route path="/investors" element={<ForInvestors />} />
                <Route path="/for-investors" element={<ForInvestors />} />
                <Route path="/participants" element={<Participants />} />
                <Route path="/executors" element={<Executors />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/investments" element={<InvestmentsNew />} />
                <Route path="/investments/startups" element={<InvestmentStartups />} />
                <Route path="/investments/ideas" element={<IdeaExchange />} />
                <Route path="/investments/secondary" element={<SecondaryMarket />} />
                <Route path="/investments/franchises" element={<ManagementFranchises />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboards/franchiser" element={<FranchiserDashboard />} />
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
                <Route path="/project-management-hub" element={<ProjectManagementHub />} />
                <Route path="/project-management/pm/tasks" element={<TasksPage />} />
                <Route path="/project-management/hr/recruitment" element={<RecruitmentPage />} />
                <Route path="/project-management/crm/contacts" element={<ContactsPage />} />
                <Route path="/project-management/kb/docs" element={<DocumentationPage />} />
                <Route path="/project-management/bi/dashboard" element={<DashboardPage />} />
                <Route path="/pm/tasks" element={<TasksPage />} />
                <Route path="/hr/recruitment" element={<RecruitmentPage />} />
                <Route path="/crm/contacts" element={<ContactsPage />} />
                <Route path="/kb/documentation" element={<DocumentationPage />} />
                <Route path="/bi/dashboard" element={<DashboardPage />} />
                <Route path="/superadmin/projects-sandbox" element={<ProjectsSandbox />} />
                <Route path="/superadmin/staff-management" element={<StaffManagement />} />
                <Route path="/superadmin/analytics" element={<SuperadminAnalytics />} />
                
                {/* Project Management Module Routes */}
                <Route path="/project-management/pm" element={<TasksPage />} />
                <Route path="/project-management/pm/projects" element={<ProjectsOverviewPage />} />
                <Route path="/project-management/pm/timeline" element={<TimelinePage />} />
                <Route path="/project-management/hr" element={<RecruitmentPage />} />
                <Route path="/project-management/hr/team" element={<TeamPage />} />
                <Route path="/project-management/hr/onboarding" element={<OnboardingPage />} />
                <Route path="/project-management/crm" element={<ContactsPage />} />
                <Route path="/project-management/crm/pipelines" element={<PipelinesPage />} />
                <Route path="/project-management/crm/deals" element={<DealsPage />} />
                <Route path="/project-management/kb" element={<DocumentationPage />} />
                <Route path="/project-management/kb/wiki" element={<WikiPage />} />
                <Route path="/project-management/kb/files" element={<FilesPage />} />
                <Route path="/project-management/bi" element={<DashboardPage />} />
                <Route path="/project-management/bi/reports" element={<ReportsPage />} />
                <Route path="/project-management/bi/analytics" element={<AnalyticsPage />} />
                
                {/* Project Management Modal Routes */}
                <Route path="/project-management/pm/tasks/new" element={<TaskNew />} />
                <Route path="/project-management/hr/vacancies/new" element={<VacancyNew />} />
                <Route path="/project-management/crm/contacts/new" element={<ContactNew />} />
                <Route path="/project-management/kb/articles/new" element={<ArticleNew />} />
                
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
