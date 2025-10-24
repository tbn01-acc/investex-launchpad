import { useState, useRef } from "react";
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
import SuccessStoriesSection from "@/components/SuccessStoriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  const [quizRole, setQuizRole] = useState<string | null>(null);
  const rolePathRef = useRef<HTMLDivElement>(null);

  const handleQuizComplete = (role: string) => {
    setQuizRole(role);
    // Прокручиваем к секции выбора роли после завершения квиза
    setTimeout(() => {
      rolePathRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <InvestCTABanner />
      <AboutUsSection />
      <VerificationSection />
      <RoleAnimator />
      <PowerfulFeaturesSection />
      <InteractiveQuiz onComplete={handleQuizComplete} />
      <div ref={rolePathRef}>
        <RolePathSection initialRole={quizRole} />
      </div>
      <ProjectShowcase />
      <SuccessStoriesSection filterByRole={quizRole || undefined} />
      <TestimonialsSection filterByRole={quizRole || undefined} />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
