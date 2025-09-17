import React, { useState } from 'react';
import RoleSelector from './RoleSelector';
import PricingCalculator from './PricingCalculator';
import { UserRole } from '@/types/roles';
import pricingIllustration from '@/assets/pricing-illustration.jpg';

const PricingSection = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('job_seeker');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowCalculator(true);
  };

  const handleBackToRoles = () => {
    setShowCalculator(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4">
        {!showCalculator ? (
          // Role Selection Phase
          <div className="space-y-12">
            <div className="text-center mb-16 space-y-6">
              <div className="flex justify-center mb-8">
                <img 
                  src={pricingIllustration} 
                  alt="Тарифы" 
                  className="w-32 h-32 object-cover rounded-full border-4 border-primary/20"
                />
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Тарифы Invest-Ex
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Персонализированная трёхуровневая система тарифов для каждого типа участников экосистемы
              </p>
            </div>
            
            <RoleSelector onRoleSelect={handleRoleSelect} selectedRole={selectedRole} />
          </div>
        ) : (
          // Pricing Calculator Phase
          <div className="space-y-8">
            <PricingCalculator 
              selectedRole={selectedRole} 
              onRoleChange={handleBackToRoles}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;