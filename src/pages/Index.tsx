import React, { useState } from 'react';
import Navigation from "@/components/Navigation";
import HeroSectionPersonalized from "@/components/HeroSectionPersonalized";
import AudienceSection from "@/components/AudienceSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import RoleSelector from "@/components/RoleSelector";
import { UserRole } from "@/types/roles";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, profile } = useAuth();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(profile?.role);
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    if (user) {
      // If user is logged in, just set the role for preview
      setSelectedRole(role);
      setShowRoleSelector(false);
    } else {
      // If not logged in, navigate to registration with pre-selected role
      navigate('/auth', { state: { role, action: 'signup' } });
    }
  };

  const openRoleSelector = () => {
    setShowRoleSelector(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main>
        {/* Personalized Hero Section */}
        <HeroSectionPersonalized 
          userRole={selectedRole} 
          onRoleSelect={openRoleSelector}
        />
        
        {/* Role Selector Dialog */}
        <Dialog open={showRoleSelector} onOpenChange={setShowRoleSelector}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Выберите вашу роль в экосистеме Invest-Ex</DialogTitle>
            </DialogHeader>
            <RoleSelector 
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
              showDescription={true}
              showPricing={true}
            />
          </DialogContent>
        </Dialog>

        {/* Existing sections */}
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
              onClick={openRoleSelector}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {selectedRole ? 'Изменить роль' : 'Выбрать роль и начать'}
            </button>
          </div>
        </section>
        
        <PricingSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
