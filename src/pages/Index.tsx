import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AudienceSection from "@/components/AudienceSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import RoleSelector from "@/components/RoleSelector";
import { useState } from "react";
import { UserRole } from "@/types/roles";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    // Navigate to registration with pre-selected role
    navigate('/auth', { state: { role, action: 'signup' } });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      {showRoleSelector ? (
        <div className="py-20">
          <div className="container mx-auto px-4">
            <RoleSelector 
              onRoleSelect={handleRoleSelect}
              showDescription={true}
            />
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowRoleSelector(false)}
                className="text-primary hover:underline"
              >
                ← Вернуться на главную
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <HeroSection />
          <AudienceSection />
          <FeaturesSection />
          
          {/* Role-based Call to Action */}
          <section className="py-20 bg-muted/50">
            <div className="container mx-auto px-4 text-center space-y-8">
              <h2 className="text-3xl font-bold">Начните работу с Invest-Ex</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Выберите свою роль в экосистеме и получите персонализированные инструменты для достижения целей
              </p>
              <button 
                onClick={() => setShowRoleSelector(true)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Выбрать роль и начать
              </button>
            </div>
          </section>
          
          <PricingSection />
        </>
      )}
      <Footer />
    </div>
  );
};

export default Index;
