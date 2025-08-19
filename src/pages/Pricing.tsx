import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24">
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;