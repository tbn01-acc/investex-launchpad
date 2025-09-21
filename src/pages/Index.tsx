import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutUsSection from "@/components/AboutUsSection";
import RoleAnimator from "@/components/RoleAnimator";
import PowerfulFeaturesSection from "@/components/PowerfulFeaturesSection";
import VerificationSection from "@/components/VerificationSection";
import InteractiveQuiz from "@/components/InteractiveQuiz";
import RolePathSection from "@/components/RolePathSection";
import ProjectShowcase from "@/components/ProjectShowcase";
import WallOfFameSection from "@/components/WallOfFameSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import RoadmapSection from "@/components/RoadmapSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-['Inter']">
      <Navigation />
      <HeroSection />
      <AboutUsSection />
      <RoleAnimator />
      <PowerfulFeaturesSection />
      <VerificationSection />
      <InteractiveQuiz />
      <RolePathSection />
      <ProjectShowcase />
      <WallOfFameSection />
      <TestimonialsSection />
      <RoadmapSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
