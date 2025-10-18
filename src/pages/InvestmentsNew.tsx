import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Lightbulb, Building2, Shuffle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';

const InvestmentsNew = () => {
  const { currency } = useLanguage();
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItemsStartups, setDisplayedItemsStartups] = useState(9);
  const [displayedItemsSecondary, setDisplayedItemsSecondary] = useState(9);
  const [displayedItemsIdeas, setDisplayedItemsIdeas] = useState(9);
  const [displayedItemsFranchises, setDisplayedItemsFranchises] = useState(9);

  // Mock data with real details similar to project cards
  const mockStartups = [
    { id: 1, title: 'HealthTech AI Диагностика', category: 'HealthTech', funding: 35000000, stage: 'MVP', description: 'ИИ-платформа для ранней диагностики заболеваний', team: 12, image: '/src/assets/projects/healthtech-platform.jpg' },
    { id: 2, title: 'FinTech Платежная Система', category: 'FinTech', funding: 50000000, stage: 'Масштабирование', description: 'Мобильное приложение для быстрых платежей', team: 25, image: '/src/assets/projects/fintech-mobile-app.jpg' },
    { id: 3, title: 'EdTech Онлайн-Платформа', category: 'EdTech', funding: 28000000, stage: 'Рост', description: 'Платформа для дистанционного образования', team: 18, image: '/src/assets/projects/edtech-platform.jpg' },
    { id: 4, title: 'GreenTech Энергия', category: 'GreenTech', funding: 75000000, stage: 'Масштабирование', description: 'Возобновляемые источники энергии', team: 35, image: '/src/assets/projects/greentech-energy.jpg' },
    { id: 5, title: 'AI Marketing E-commerce', category: 'AI/ML', funding: 42000000, stage: 'MVP', description: 'ИИ для персонализации e-commerce', team: 15, image: '/src/assets/projects/ai-marketing-ecommerce.jpg' },
    { id: 6, title: 'Blockchain Логистика', category: 'Blockchain', funding: 60000000, stage: 'Рост', description: 'Блокчейн-решение для логистики', team: 28, image: '/src/assets/projects/blockchain-logistics.jpg' },
    { id: 7, title: 'FoodTech Автоматизация', category: 'FoodTech', funding: 32000000, stage: 'MVP', description: 'Автоматизация ресторанного бизнеса', team: 14, image: '/src/assets/projects/foodtech-automation.jpg' },
    { id: 8, title: 'PropTech Решение', category: 'PropTech', funding: 48000000, stage: 'Масштабирование', description: 'Цифровизация недвижимости', team: 22, image: '/src/assets/projects/proptech-solution.jpg' },
    { id: 9, title: 'IoT Smart Home', category: 'IoT', funding: 38000000, stage: 'Рост', description: 'Умный дом следующего поколения', team: 20, image: '/src/assets/projects/iot-smart-home.jpg' },
  ];

  const mockSecondary = [
    { id: 1, company: 'SaaS PM Платформа', sector: 'SaaS', price: 85000000, shares: '15%', valuation: '566M₽', image: '/src/assets/projects/saas-project-management.jpg' },
    { id: 2, company: 'Криптовалютная Биржа', sector: 'Crypto', price: 120000000, shares: '10%', valuation: '1.2B₽', image: '/src/assets/projects/crypto-exchange.jpg' },
    { id: 3, company: 'Платформа Удаленной Работы', sector: 'SaaS', price: 65000000, shares: '20%', valuation: '325M₽', image: '/src/assets/projects/remote-work-platform.jpg' },
    { id: 4, company: 'Фриланс Маркетплейс', sector: 'Marketplace', price: 55000000, shares: '18%', valuation: '305M₽', image: '/src/assets/projects/freelance-marketplace.jpg' },
    { id: 5, company: 'AI Код-Ассистент', sector: 'AI/ML', price: 95000000, shares: '12%', valuation: '791M₽', image: '/src/assets/projects/ai-code-assistant.jpg' },
    { id: 6, company: 'Виртуальные События', sector: 'Events', price: 45000000, shares: '22%', valuation: '204M₽', image: '/src/assets/projects/virtual-events.jpg' },
    { id: 7, company: 'AgriTech Фермерство', sector: 'AgriTech', price: 72000000, shares: '16%', valuation: '450M₽', image: '/src/assets/projects/agritech-farming.jpg' },
    { id: 8, company: 'Детское Образование', sector: 'EdTech', price: 38000000, shares: '25%', valuation: '152M₽', image: '/src/assets/projects/kids-education.jpg' },
    { id: 9, company: 'AI Фитнес-Тренер', sector: 'HealthTech', price: 52000000, shares: '19%', valuation: '273M₽', image: '/src/assets/projects/ai-fitness-trainer.jpg' },
  ];

  const mockIdeas = [
    { id: 1, title: 'NFT Маркетплейс для Искусства', category: 'Blockchain', votes: 342, author: 'Алексей М.', price: 5000000, image: '/src/assets/projects/nft-marketplace.jpg' },
    { id: 2, title: 'Платформа Кибербезопасности', category: 'Security', votes: 289, author: 'Мария К.', price: 8000000, image: '/src/assets/projects/cybersecurity-platform.jpg' },
    { id: 3, title: 'Устойчивая Упаковка', category: 'GreenTech', votes: 256, author: 'Иван П.', price: 6500000, image: '/src/assets/projects/sustainable-packaging.jpg' },
    { id: 4, title: 'Платформа Ментального Здоровья', category: 'HealthTech', votes: 412, author: 'Ольга С.', price: 7200000, image: '/src/assets/projects/mental-health-platform.jpg' },
    { id: 5, title: 'Гейминг и Киберспорт', category: 'Gaming', votes: 378, author: 'Дмитрий Л.', price: 9500000, image: '/src/assets/projects/gaming-esports.jpg' },
    { id: 6, title: 'IoT Умный Город', category: 'IoT', votes: 325, author: 'Анна В.', price: 12000000, image: '/src/assets/projects/smart-city-iot.jpg' },
    { id: 7, title: 'LegalTech Решение', category: 'LegalTech', votes: 298, author: 'Сергей Н.', price: 5800000, image: '/src/assets/projects/legal-tech.jpg' },
    { id: 8, title: 'Музыкальный Стриминг', category: 'Entertainment', votes: 445, author: 'Елена Т.', price: 11000000, image: '/src/assets/projects/music-streaming.jpg' },
    { id: 9, title: 'Fashion AR Технология', category: 'FashionTech', votes: 367, author: 'Павел Ж.', price: 8500000, image: '/src/assets/projects/fashion-tech-ar.jpg' },
  ];

  const mockFranchises = [
    { id: 1, name: 'Краудфандинг Платформа', category: 'FinTech', investment: 45000000, roi: '35%', locations: 12, image: '/src/assets/projects/crowdfunding-platform.jpg' },
    { id: 2, name: 'AI Тревел Ассистент', category: 'Travel', investment: 38000000, roi: '42%', locations: 8, image: '/src/assets/projects/travel-ai-assistant.jpg' },
    { id: 3, name: 'Торговля Энергией', category: 'GreenTech', investment: 65000000, roi: '28%', locations: 15, image: '/src/assets/projects/renewable-energy-trading.jpg' },
    { id: 4, name: 'Платформа Ухода за Питомцами', category: 'PetTech', investment: 32000000, roi: '38%', locations: 10, image: '/src/assets/projects/pet-care-platform.jpg' },
    { id: 5, name: 'Карьерное Наставничество', category: 'EdTech', investment: 28000000, roi: '45%', locations: 6, image: '/src/assets/projects/career-mentorship.jpg' },
    { id: 6, name: 'VR Медицинское Обучение', category: 'HealthTech', investment: 55000000, roi: '32%', locations: 9, image: '/src/assets/projects/vr-medical-training.jpg' },
    { id: 7, name: 'Социальная Коммерция', category: 'E-commerce', investment: 42000000, roi: '40%', locations: 14, image: '/src/assets/projects/social-commerce.jpg' },
    { id: 8, name: 'Трекинг Углеродного Следа', category: 'GreenTech', investment: 35000000, roi: '36%', locations: 7, image: '/src/assets/projects/carbon-tracking-app.jpg' },
    { id: 9, name: 'InsurTech Платформа', category: 'InsurTech', investment: 48000000, roi: '33%', locations: 11, image: '/src/assets/projects/insurance-tech.jpg' },
  ];

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
    const converted = formatCurrency(amount, currency);
    const numericValue = parseInt(converted.replace(/[^\d]/g, '')) || 0;
    const symbol = converted.replace(/[\d,\s]/g, '');
    
    if (numericValue >= 1000000) {
      return (numericValue / 1000000).toFixed(1) + 'M' + symbol;
    }
    return numericValue.toLocaleString() + symbol;
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
                    <SelectItem value="9">Показывать по 9</SelectItem>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockStartups.slice(0, displayedItemsStartups).map((startup) => (
                  <Card key={startup.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <img 
                        src={startup.image} 
                        alt={startup.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {startup.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{startup.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{startup.description}</p>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Финансирование</p>
                          <p className="font-semibold text-sm">{formatAmount(startup.funding)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Этап</p>
                          <p className="font-semibold text-sm">{startup.stage}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Команда</p>
                          <p className="font-semibold text-sm">{startup.team} человек</p>
                        </div>
                      </div>
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
                    <SelectItem value="9">Показывать по 9</SelectItem>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockSecondary.slice(0, displayedItemsSecondary).map((deal) => (
                  <Card key={deal.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <img 
                        src={deal.image} 
                        alt={deal.company}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                        {deal.sector}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold mb-4 line-clamp-2">{deal.company}</h3>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Цена пакета</p>
                          <p className="font-semibold text-sm">{formatAmount(deal.price)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Доля</p>
                          <p className="font-semibold text-sm">{deal.shares}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Оценка компании</p>
                          <p className="font-semibold text-sm">{deal.valuation}</p>
                        </div>
                      </div>
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
                    <SelectItem value="9">Показывать по 9</SelectItem>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockIdeas.slice(0, displayedItemsIdeas).map((idea) => (
                  <Card key={idea.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <img 
                        src={idea.image} 
                        alt={idea.title}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {idea.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold mb-4 line-clamp-2">{idea.title}</h3>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Автор</p>
                          <p className="font-semibold text-sm">{idea.author}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Голосов</p>
                          <p className="font-semibold text-sm">{idea.votes}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Оценка идеи</p>
                          <p className="font-semibold text-sm">{formatAmount(idea.price)}</p>
                        </div>
                      </div>
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
                    <SelectItem value="9">Показывать по 9</SelectItem>
                    <SelectItem value="15">Показывать по 15</SelectItem>
                    <SelectItem value="30">Показывать по 30</SelectItem>
                    <SelectItem value="60">Показывать по 60</SelectItem>
                    <SelectItem value="90">Показывать по 90</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockFranchises.slice(0, displayedItemsFranchises).map((franchise) => (
                  <Card key={franchise.id} className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                    <div className="relative h-48">
                      <img 
                        src={franchise.image} 
                        alt={franchise.name}
                        className="w-full h-full object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                        {franchise.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-semibold mb-4 line-clamp-2">{franchise.name}</h3>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Инвестиции</p>
                          <p className="font-semibold text-sm">{formatAmount(franchise.investment)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">ROI</p>
                          <p className="font-semibold text-sm">{franchise.roi}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-xs text-muted-foreground mb-1">Локаций</p>
                          <p className="font-semibold text-sm">{franchise.locations}</p>
                        </div>
                      </div>
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
