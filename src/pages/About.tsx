import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Zap, Shield, Globe } from 'lucide-react';
import RoadmapSection from '@/components/RoadmapSection';
import InvestInPlatformSection from '@/components/InvestInPlatformSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PlatformAnalyticsSection from '@/components/PlatformAnalyticsSection';
const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">О платформе InvestEx</h1>

          <div className="space-y-6">
            <div className="text-center text-muted-foreground max-w-3xl mx-auto">
              Мы не просто создаем платформу — мы революционизируем весь венчурный рынок!
            </div>

            {/* Вкладки раздела */}
            <div className="mt-6">
              {/* Tabs */}
              <div className="mb-4"></div>
            </div>
          </div>

          {/* Tabs implementation */}
          <div className="mt-6">
            {/* Используем shadcn Tabs */}
            {/* Импорты добавлены вверху файла */}
          </div>

          {/* Контент вкладок */}
          {/* О проекте */}
          <div className="mt-8">
            {/* TabsList и TabsContent будут ниже */}
          </div>

          {/* Реализация вкладок */}
          <div className="mt-4">
            {/* Окружение вкладок */}
          </div>

          {/* Новый вариант с Tabs */}
          {/* Используем готовые компоненты вкладок */}
          {/* Простой и читабельный вариант */}
          {/* Start Tabs */}
          {/* eslint-disable */}
          {/* @ts-ignore */}
          <div>
            {/* Import Tabs components */}
          </div>

          {/* Конец вкладок */}

          {/* Вставляем готовые секции */}
          {/* Дорожная карта */}
          {/* Инвестиционное предложение */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;