import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InvestCTABanner from "@/components/InvestCTABanner";
import AboutUsSection from "@/components/AboutUsSection";
import VerificationSection from "@/components/VerificationSection";
import RoleAnimator from "@/components/RoleAnimator";
import PowerfulFeaturesSection from "@/components/PowerfulFeaturesSection";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import RolePathSection from "@/components/RolePathSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import WallOfFameSection from "@/components/WallOfFameSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InvestCTABanner />
      <AboutUsSection />
      <VerificationSection />
      <RoleAnimator />
      <PowerfulFeaturesSection />
      <InteractiveQuiz />
      <RolePathSection />
      <ProjectShowcase />
      <WallOfFameSection />
      <TestimonialsSection />
      
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
