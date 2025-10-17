import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Lightbulb, Building2, Shuffle } from 'lucide-react';

const InvestmentsNew = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Инвестиции</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Эксклюзивный доступ к инвестиционным возможностям
            </p>
          </section>

          <section className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Всего проектов</div>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">325</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Активных сейчас
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Средний ROI</div>
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold">+280%</div>
                <div className="text-xs text-secondary mt-1">
                  За последние 3 года
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Всего инвестиций</div>
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold">12.5B₽</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Привлечено капитала
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">Успешных выходов</div>
                  <TrendingUp className="w-4 h-4 text-secondary" />
                </div>
                <div className="text-2xl font-bold">87</div>
                <div className="text-xs text-muted-foreground mt-1">
                  IPO и M&A сделок
                </div>
              </CardContent>
            </Card>
          </section>

          <Tabs defaultValue="startups" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="startups">
                <TrendingUp className="w-4 h-4 mr-2" />
                Стартапы
              </TabsTrigger>
              <TabsTrigger value="secondary">
                <Shuffle className="w-4 h-4 mr-2" />
                Вторичный рынок
              </TabsTrigger>
              <TabsTrigger value="ideas">
                <Lightbulb className="w-4 h-4 mr-2" />
                Биржа идей
              </TabsTrigger>
              <TabsTrigger value="franchises">
                <Building2 className="w-4 h-4 mr-2" />
                Франшизы
              </TabsTrigger>
            </TabsList>

            <TabsContent value="startups">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Инвестиционные стартапы</h3>
                  <p className="text-muted-foreground">
                    Раздел в разработке. Здесь будут отображаться инвестиционные стартапы.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="secondary">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Вторичный рынок</h3>
                  <p className="text-muted-foreground">
                    Раздел в разработке. Здесь будут отображаться предложения вторичного рынка.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ideas">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Биржа идей</h3>
                  <p className="text-muted-foreground">
                    Раздел в разработке. Здесь будут отображаться идеи для инвестиций.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="franchises">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Управленческие франшизы</h3>
                  <p className="text-muted-foreground">
                    Раздел в разработке. Здесь будут отображаться франшизы.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestmentsNew;