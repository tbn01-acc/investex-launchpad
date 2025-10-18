import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Lightbulb, Building2, Shuffle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InvestmentsNew = () => {
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItemsStartups, setDisplayedItemsStartups] = useState(15);
  const [displayedItemsSecondary, setDisplayedItemsSecondary] = useState(15);
  const [displayedItemsIdeas, setDisplayedItemsIdeas] = useState(15);
  const [displayedItemsFranchises, setDisplayedItemsFranchises] = useState(15);

  // Mock data for demonstration
  const mockStartups = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    title: `Стартап ${i + 1}`,
    category: 'AI/ML',
    funding: 25000000,
    stage: 'MVP'
  }));

  const mockSecondary = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    company: `Компания ${i + 1}`,
    sector: 'FinTech',
    price: 15000000
  }));

  const mockIdeas = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    title: `Идея ${i + 1}`,
    category: 'EdTech',
    votes: 127
  }));

  const mockFranchises = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Франшиза ${i + 1}`,
    category: 'Общепит',
    investment: 25000000
  }));

  const handleShowMore = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => prev + itemsPerPage);
  };

  const handleItemsPerPageChange = (value: string) => {
    const newValue = parseInt(value);
    setItemsPerPage(newValue);
    setDisplayedItemsStartups(newValue);
    setDisplayedItemsSecondary(newValue);
    setDisplayedItemsIdeas(newValue);
    setDisplayedItemsFranchises(newValue);
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + 'M₽';
    }
    return amount.toLocaleString() + '₽';
  };

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
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Показано {displayedItemsStartups} из {mockStartups.length}
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Показывать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockStartups.slice(0, displayedItemsStartups).map((startup) => (
                  <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-2">{startup.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{startup.title}</h3>
                      <div className="text-sm text-muted-foreground mb-2">Этап: {startup.stage}</div>
                      <div className="text-xl font-bold text-primary">{formatAmount(startup.funding)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {displayedItemsStartups < mockStartups.length && (
                <div className="mt-8 text-center">
                  <Button onClick={() => handleShowMore(setDisplayedItemsStartups)} size="lg">
                    Показать еще
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="secondary">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Показано {displayedItemsSecondary} из {mockSecondary.length}
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Показывать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockSecondary.slice(0, displayedItemsSecondary).map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-2">{deal.sector}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{deal.company}</h3>
                      <div className="text-xl font-bold text-primary">{formatAmount(deal.price)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {displayedItemsSecondary < mockSecondary.length && (
                <div className="mt-8 text-center">
                  <Button onClick={() => handleShowMore(setDisplayedItemsSecondary)} size="lg">
                    Показать еще
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ideas">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Показано {displayedItemsIdeas} из {mockIdeas.length}
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Показывать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockIdeas.slice(0, displayedItemsIdeas).map((idea) => (
                  <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-2">{idea.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{idea.title}</h3>
                      <div className="text-sm text-muted-foreground">Голосов: {idea.votes}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {displayedItemsIdeas < mockIdeas.length && (
                <div className="mt-8 text-center">
                  <Button onClick={() => handleShowMore(setDisplayedItemsIdeas)} size="lg">
                    Показать еще
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="franchises">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Показано {displayedItemsFranchises} из {mockFranchises.length}
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Показывать по" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockFranchises.slice(0, displayedItemsFranchises).map((franchise) => (
                  <Card key={franchise.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-2">{franchise.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2">{franchise.name}</h3>
                      <div className="text-xl font-bold text-primary">{formatAmount(franchise.investment)}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {displayedItemsFranchises < mockFranchises.length && (
                <div className="mt-8 text-center">
                  <Button onClick={() => handleShowMore(setDisplayedItemsFranchises)} size="lg">
                    Показать еще
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InvestmentsNew;
