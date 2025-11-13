import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { DomainProvider } from "@/contexts/DomainContext";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import ScrollToTop from "@/components/ScrollToTop";
import GoToTop from "@/components/GoToTop";
import { useAuthListener } from "@/hooks/useAuthListener";

// Page imports
import Index from "./pages/Index";
import Community from "./pages/Community";
import Auth from "./pages/Auth";
import About from "./pages/About";
import ForFreelancers from "./pages/ForFreelancers";
import ForOutsourcers from "./pages/ForOutsourcers";
import ForFounders from "./pages/ForFounders";
import ForInvestors from "./pages/ForInvestors";
import Participants from "./pages/Participants";
import Investors from "./pages/Investors";
import Startup from "./pages/Startup";
import Franchises from "./pages/Franchises";
import Franchisers from "./pages/Franchisers";
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
import TaskNew from "./pages/pm/TaskNew";
import VacancyNew from "./pages/hr/VacancyNew";
import ContactNew from "./pages/crm/ContactNew";
import ArticleNew from "./pages/kb/ArticleNew";
import IVIIndex from "./pages/IVIIndex";
import SupervisoryBoard from "./pages/SupervisoryBoard";
import MediationCenter from "./pages/MediationCenter";
import Favorites from "./pages/Favorites";
import BlogIndex from "./pages/blog/BlogIndex";
import RoleBlog from "./pages/blog/RoleBlog";
import CategoryBlog from "./pages/blog/CategoryBlog";
import AuthorProfile from "./pages/blog/AuthorProfile";
import ArticleDetail from "./pages/blog/ArticleDetail";

const queryClient = new QueryClient();

export default function App() {
  // Р’РђР–РќРћ: Р’С‹Р·РѕРІРёС‚Рµ hook РЅР° СЃР°РјРѕРј РїРµСЂРІРѕРј СѓСЂРѕРІРЅРµ
  useAuthListener();

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LanguageProvider>
            <DomainProvider>
              <GoogleAnalytics>
                <TooltipProvider>
                  <BrowserRouter>
                    <ScrollToTop />
                    <GoToTop />
                    <Routes>
                      {/* Main routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/for-freelancers" element={<ForFreelancers />} />
                      <Route path="/for-outsourcers" element={<ForOutsourcers />} />
                      <Route path="/for-founders" element={<ForFounders />} />
                      <Route path="/for-investors" element={<ForInvestors />} />
                      <Route path="/participants" element={<Participants />} />
                      <Route path="/investors" element={<Investors />} />
                      <Route path="/startup" element={<Startup />} />
                      <Route path="/franchises" element={<Franchises />} />
                      <Route path="/franchisers" element={<Franchisers />} />
                      <Route path="/executors" element={<Executors />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/partners" element={<Partners />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:id" element={<ProjectDetail />} />
                      <Route path="/investments" element={<Investments />} />
                      <Route path="/investment-startups" element={<InvestmentStartups />} />
                      <Route path="/investments-new" element={<InvestmentsNew />} />
                      <Route path="/idea-exchange" element={<IdeaExchange />} />
                      <Route path="/secondary-market" element={<SecondaryMarket />} />
                      <Route path="/management-franchises" element={<ManagementFranchises />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password" element={<ResetPassword />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/cookies" element={<Cookies />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/api-docs" element={<ApiDocs />} />
                      <Route path="/knowledge-base" element={<KnowledgeBase />} />
                      <Route path="/project-management" element={<ProjectManagement />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/project-management-hub" element={<ProjectManagementHub />} />
                      <Route path="/ivi-index" element={<IVIIndex />} />
                      <Route path="/supervisory-board" element={<SupervisoryBoard />} />
                      <Route path="/mediation-center" element={<MediationCenter />} />
                      <Route path="/favorites" element={<Favorites />} />

                      {/* Blog Routes */}
                      <Route path="/blog" element={<BlogIndex />} />
                      <Route path="/blog/role/:role" element={<RoleBlog />} />
                      <Route path="/blog/category/:category" element={<CategoryBlog />} />
                      <Route path="/blog/author/:author" element={<AuthorProfile />} />
                      <Route path="/blog/article/:id" element={<ArticleDetail />} />

                      {/* Project Management Module Routes */}
                      <Route path="/pm/tasks" element={<TasksPage />} />
                      <Route path="/pm/projects" element={<ProjectsOverviewPage />} />
                      <Route path="/pm/timeline" element={<TimelinePage />} />
                      <Route path="/pm/task-new" element={<TaskNew />} />

                      {/* HR Module Routes */}
                      <Route path="/hr/recruitment" element={<RecruitmentPage />} />
                      <Route path="/hr/team" element={<TeamPage />} />
                      <Route path="/hr/onboarding" element={<OnboardingPage />} />
                      <Route path="/hr/vacancy-new" element={<VacancyNew />} />

                      {/* CRM Module Routes */}
                      <Route path="/crm/contacts" element={<ContactsPage />} />
                      <Route path="/crm/pipelines" element={<PipelinesPage />} />
                      <Route path="/crm/deals" element={<DealsPage />} />
                      <Route path="/crm/contact-new" element={<ContactNew />} />

                      {/* Knowledge Base Routes */}
                      <Route path="/kb/documentation" element={<DocumentationPage />} />
                      <Route path="/kb/wiki" element={<WikiPage />} />
                      <Route path="/kb/files" element={<FilesPage />} />
                      <Route path="/kb/article-new" element={<ArticleNew />} />

                      {/* BI/Analytics Routes */}
                      <Route path="/bi/dashboard" element={<DashboardPage />} />
                      <Route path="/bi/reports" element={<ReportsPage />} />
                      <Route path="/bi/analytics" element={<AnalyticsPage />} />

                      {/* Superadmin Routes */}
                      <Route path="/superadmin/projects" element={<ProjectsSandbox />} />
                      <Route path="/superadmin/staff" element={<StaffManagement />} />
                      <Route path="/superadmin/analytics" element={<SuperadminAnalytics />} />

                      {/* Franchiser Dashboard */}
                      <Route path="/franchiser-dashboard" element={<FranchiserDashboard />} />

                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </BrowserRouter>
                  <Toaster />
                  <Sonner />
                </TooltipProvider>
              </GoogleAnalytics>
            </DomainProvider>
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
