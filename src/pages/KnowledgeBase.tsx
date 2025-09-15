import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, Book, Users, DollarSign, Shield, Lightbulb, MessageCircle, Star } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'getting-started',
      title: 'Начало работы',
      icon: Lightbulb,
      description: 'Основы использования платформы',
      articles: 15,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'freelancers',
      title: 'Для фрилансеров',
      icon: Users,
      description: 'Как найти проекты и клиентов',
      articles: 12,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'investors',
      title: 'Для инвесторов',
      icon: DollarSign,
      description: 'Инвестирование в проекты',
      articles: 8,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'security',
      title: 'Безопасность',
      icon: Shield,
      description: 'Защита аккаунта и данных',
      articles: 6,
      color: 'bg-red-100 text-red-600'
    }
  ];

  const faqData = [
    {
      category: 'general',
      question: 'Как зарегистрироваться на платформе?',
      answer: 'Для регистрации нажмите кнопку "Регистрация" в правом верхнем углу сайта. Выберите свою роль (фрилансер, инвестор, фаундер и т.д.) и заполните необходимые данные. После подтверждения email вы сможете пользоваться всеми функциями платформы.'
    },
    {
      category: 'general',
      question: 'Какие комиссии взимает платформа?',
      answer: 'Платформа взимает комиссию 5% с каждой завершенной транзакции. Дополнительно доступны премиум-услуги: Escrow-сервис (3%), ускоренные платежи (1%), продвижение проектов (от $25/неделя).'
    },
    {
      category: 'freelancers',
      question: 'Как найти подходящие проекты?',
      answer: 'Используйте фильтры поиска по категориям, бюджету, срокам и навыкам. Настройте уведомления о новых проектах в вашей области. Регулярно обновляйте профиль и портфолио для повышения видимости.'
    },
    {
      category: 'freelancers',
      question: 'Как увеличить шансы получить проект?',
      answer: 'Заполните профиль полностью, добавьте примеры работ, получите положительные отзывы, быстро откликайтесь на проекты, персонализируйте заявки и поддерживайте высокий рейтинг.'
    },
    {
      category: 'investors',
      question: 'Как оценить риски инвестиций?',
      answer: 'Используйте наши инструменты due diligence: анализ команды, бизнес-модели, финансовых показателей. Изучайте отзывы о фаундерах, диверсифицируйте портфель и начинайте с небольших сумм.'
    },
    {
      category: 'investors',
      question: 'Какие документы нужны для инвестирования?',
      answer: 'Для физических лиц: паспорт и ИНН. Для юридических лиц: учредительные документы, выписка из ЕГРЮЛ, документы о полномочиях. Дополнительно может потребоваться справка о доходах.'
    },
    {
      category: 'security',
      question: 'Как защитить свой аккаунт?',
      answer: 'Используйте уникальный сложный пароль, включите двухфакторную аутентификацию, не сообщайте данные доступа третьим лицам, регулярно проверяйте активность аккаунта и обновляйте пароль.'
    },
    {
      category: 'security',
      question: 'Что делать при подозрении на взлом?',
      answer: 'Немедленно смените пароль, проверьте активность аккаунта, отзовите все активные сессии, свяжитесь с поддержкой через security@investex.com, проверьте финансовые операции.'
    }
  ];

  const popularArticles = [
    {
      title: 'Полное руководство по созданию профиля фрилансера',
      category: 'Фрилансерам',
      readTime: '10 мин',
      rating: 4.8,
      views: 2547
    },
    {
      title: 'Как провести due diligence стартапа перед инвестированием',
      category: 'Инвесторам',
      readTime: '15 мин',
      rating: 4.9,
      views: 1893
    },
    {
      title: 'Лучшие практики ценообразования для IT-проектов',
      category: 'Фрилансерам',
      readTime: '8 мин',
      rating: 4.7,
      views: 3241
    },
    {
      title: 'Создание презентации проекта для инвесторов',
      category: 'Фаундерам',
      readTime: '12 мин',
      rating: 4.6,
      views: 1567
    }
  ];

  const filteredFAQ = searchQuery 
    ? faqData.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">База знаний InvestEx</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Найдите ответы на вопросы, изучите руководства и освойте все возможности платформы
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Поиск в базе знаний..."
                className="pl-12 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="categories" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="categories">Категории</TabsTrigger>
              <TabsTrigger value="popular">Популярное</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="guides">Руководства</TabsTrigger>
            </TabsList>

            <TabsContent value="categories">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{category.articles} статей</Badge>
                          <Button variant="ghost" size="sm">Перейти</Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="popular">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Популярные статьи</h2>
                <div className="grid gap-6">
                  {popularArticles.map((article, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline">{article.category}</Badge>
                              <span className="text-sm text-muted-foreground">{article.readTime}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{article.rating}</span>
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">{article.views} просмотров</p>
                          </div>
                          <Button variant="ghost">
                            <Book className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Часто задаваемые вопросы</h2>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFAQ.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {item.category === 'general' ? 'Общее' : 
                             item.category === 'freelancers' ? 'Фрилансерам' :
                             item.category === 'investors' ? 'Инвесторам' : 'Безопасность'}
                          </Badge>
                          <span>{item.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pt-2 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {filteredFAQ.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
                    <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Пошаговые руководства</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Руководство для фрилансеров</CardTitle>
                      <p className="text-muted-foreground">От регистрации до получения первого заказа</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                          <span className="text-sm">Создание профиля</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">2</div>
                          <span className="text-sm">Заполнение портфолио</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">3</div>
                          <span className="text-sm">Поиск проектов</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">4</div>
                          <span className="text-sm">Подача заявок</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">5</div>
                          <span className="text-sm">Выполнение работ</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Начать руководство</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Руководство для инвесторов</CardTitle>
                      <p className="text-muted-foreground">Как начать инвестировать в стартапы</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                          <span className="text-sm">Верификация аккаунта</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">2</div>
                          <span className="text-sm">Изучение проектов</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">3</div>
                          <span className="text-sm">Due diligence</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">4</div>
                          <span className="text-sm">Первая инвестиция</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs font-bold">5</div>
                          <span className="text-sm">Мониторинг портфеля</span>
                        </div>
                      </div>
                      <Button className="w-full mt-4">Начать руководство</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Contact Support */}
          <div className="mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Не нашли ответ?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Наша служба поддержки работает круглосуточно и готова помочь с любыми вопросами
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg">Связаться с поддержкой</Button>
                  <Button variant="outline" size="lg">Задать вопрос сообществу</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KnowledgeBase;