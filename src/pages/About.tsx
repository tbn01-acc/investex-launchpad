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

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">О платформе InvestEx</h1>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-8">
            Революционизируем весь венчурный рынок
          </p>

          <Tabs defaultValue="about" className="w-full" id="invest">
            <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full mb-8">
              <TabsTrigger value="about" className="gap-2">
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">О проекте</span>
              </TabsTrigger>
              <TabsTrigger value="advantages" className="gap-2">
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Преимущества</span>
              </TabsTrigger>
              <TabsTrigger value="investment" className="gap-2 text-lg sm:text-xl font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Инвестиционное предложение</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="gap-2">
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Дорожная карта</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart className="w-4 h-4" />
                <span className="hidden sm:inline">Аналитика</span>
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