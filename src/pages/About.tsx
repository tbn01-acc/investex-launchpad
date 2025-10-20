import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AboutProjectSection from '@/components/AboutProjectSection';
import AdvantagesSection from '@/components/AdvantagesSection';
import InvestInPlatformSection from '@/components/InvestInPlatformSection';
import RoadmapSection from '@/components/RoadmapSection';
import PlatformAnalyticsSection from '@/components/PlatformAnalyticsSection';
import { Info, Award, TrendingUp, Map, BarChart } from 'lucide-react';
import logoBlue from '@/assets/logo_blue.png';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img src={logoBlue} alt="Invest-Ex Logo" className="w-48 h-auto" />
          </div>
          <h1 className="text-4xl font-bold text-center mb-4">О платформе Invest-Ex</h1>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Революционизируем весь венчурный рынок
          </p>

          <Tabs defaultValue="about" className="w-full" id="invest">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full mb-8 gap-2 h-auto p-2">
              <TabsTrigger value="about" className="text-xs sm:text-sm">
                О проекте
              </TabsTrigger>
              <TabsTrigger value="advantages" className="text-xs sm:text-sm">
                Преимущества
              </TabsTrigger>
              <TabsTrigger value="investment" className="text-xs sm:text-sm lg:text-lg font-semibold">
                Инвестиции
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="text-xs sm:text-sm">
                Дорожная карта
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <AboutProjectSection />
            </TabsContent>

            <TabsContent value="advantages">
              <AdvantagesSection />
            </TabsContent>

            <TabsContent value="investment">
              <InvestInPlatformSection />
            </TabsContent>

            <TabsContent value="roadmap">
              <RoadmapSection />
            </TabsContent>

            <TabsContent value="analytics">
              <PlatformAnalyticsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;