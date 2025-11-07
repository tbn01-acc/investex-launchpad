import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import { useSEO, useDevDomainSetter } from '@/hooks/useSEO';
import HeroSection from "@/components/HeroSection";
import InvestCTABanner from "@/components/InvestCTABanner";
import KeySearchSection from "@/components/KeySearchSection";
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
  useSEO('/');
  useDevDomainSetter();
  
  const [quizRole, setQuizRole] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const rolePathRef = useRef<HTMLDivElement>(null);

  const handleQuizComplete = (role: string) => {
    setQuizRole(role);
    setSelectedRole(role);
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
      <KeySearchSection />
      <AboutUsSection />
      <VerificationSection />
      <RoleAnimator />
      <PowerfulFeaturesSection />
      <InteractiveQuiz onComplete={handleQuizComplete} />
      <div ref={rolePathRef}>
        <RolePathSection initialRole={quizRole} onRoleChange={setSelectedRole} />
      </div>
      <ProjectShowcase />
      <SuccessStoriesSection filterByRole={selectedRole || undefined} />
      <TestimonialsSection filterByRole={selectedRole || undefined} />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
