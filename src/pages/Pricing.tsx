import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PricingSectionNew from '@/components/PricingSectionNew';

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24">
        <PricingSectionNew />
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;