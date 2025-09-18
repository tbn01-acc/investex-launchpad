import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InvestmentMarketplace from '@/components/InvestmentMarketplace';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar, DollarSign, Users, Clock } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Разработка мобильного приложения для FinTech стартапа',
      description: 'Необходимо создать MVP мобильного приложения для управления личными финансами с интеграцией банковских API.',
      budget: { min: 800000, max: 1200000, currency: 'RUB' },
      deadline: '3 месяца',
      skills: ['React Native', 'Node.js', 'PostgreSQL', 'Banking API'],
      category: 'Разработка',
      type: 'MVP',
      applicants: 12,
      posted: '2 дня назад'
    },
    {
      id: 2,
      title: 'UI/UX дизайн для платформы электронной коммерции',
      description: 'Требуется полный редизайн интерфейса существующей платформы электронной коммерции с фокусом на UX.',
      budget: { min: 300000, max: 500000, currency: 'RUB' },
      deadline: '6 недель',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      category: 'Дизайн',
      type: 'Редизайн',
      applicants: 8,
      posted: '4 дня назад'
    },
    {
      id: 3,
      title: 'Блокчейн разработчик для DeFi проекта',
      description: 'Ищем опытного разработчика для создания смарт-контрактов и DeFi протоколов на Ethereum.',
      budget: { min: 1500000, max: 2500000, currency: 'RUB' },
      deadline: '4 месяца',
      skills: ['Solidity', 'Web3.js', 'Ethereum', 'DeFi'],
      category: 'Blockchain',
      type: 'Полная разработка',
      applicants: 5,
      posted: '1 неделя назад'
    },
    {
      id: 4,
      title: 'Маркетинговая стратегия для EdTech стартапа',
      description: 'Разработка комплексной маркетинговой стратегии для запуска образовательной платформы.',
      budget: { min: 400000, max: 700000, currency: 'RUB' },
      deadline: '2 месяца',
      skills: ['Digital Marketing', 'Content Strategy', 'SEO', 'Analytics'],
      category: 'Маркетинг',
      type: 'Стратегия',
      applicants: 15,
      posted: '3 дня назад'
    },
    {
      id: 5,
      title: 'DevOps инженер для облачной инфраструктуры',
      description: 'Настройка и оптимизация CI/CD пайплайнов, контейнеризация приложений, мониторинг производительности.',
      budget: { min: 600000, max: 900000, currency: 'RUB' },
      deadline: '2 месяца',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform'],
      category: 'DevOps',
      type: 'Инфраструктура',
      applicants: 7,
      posted: '1 день назад'
    },
    {
      id: 6,
      title: 'Интеграция платежных систем для интернет-магазина',
      description: 'Подключение различных платежных шлюзов (Stripe, PayPal, Яндекс.Касса) к существующему сайту.',
      budget: { min: 200000, max: 350000, currency: 'RUB' },
      deadline: '1 месяц',
      skills: ['PHP', 'Laravel', 'Payment APIs', 'MySQL'],
      category: 'Разработка',
      type: 'Интеграция',
      applicants: 18,
      posted: '5 дней назад'
    },
    {
      id: 7,
      title: 'Создание корпоративного сайта для юридической фирмы',
      description: 'Разработка современного сайта с CMS, формами обратной связи и интеграцией с CRM системой.',
      budget: { min: 250000, max: 400000, currency: 'RUB' },
      deadline: '6 недель',
      skills: ['WordPress', 'PHP', 'JavaScript', 'CRM Integration'],
      category: 'Веб-разработка',
      type: 'Корпоративный сайт',
      applicants: 14,
      posted: '1 неделя назад'
    },
    {
      id: 8,
      title: 'Data Science проект для анализа клиентских данных',
      description: 'Создание модели машинного обучения для предсказания поведения клиентов и сегментации.',
      budget: { min: 700000, max: 1100000, currency: 'RUB' },
      deadline: '3 месяца',
      skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'SQL'],
      category: 'Data Science',
      type: 'ML модель',
      applicants: 6,
      posted: '4 дня назад'
    },
    {
      id: 9,
      title: 'Мобильная игра на Unity для iOS и Android',
      description: 'Разработка 2D аркадной игры с монетизацией через рекламу и внутриигровые покупки.',
      budget: { min: 1000000, max: 1800000, currency: 'RUB' },
      deadline: '5 месяцев',
      skills: ['Unity', 'C#', 'Game Design', 'Mobile Development'],
      category: 'Геймдев',
      type: 'Мобильная игра',
      applicants: 9,
      posted: '6 дней назад'
    },
    {
      id: 10,
      title: 'SEO оптимизация и продвижение сайта',
      description: 'Комплексная SEO оптимизация сайта, создание контент-стратегии, линкбилдинг.',
      budget: { min: 150000, max: 300000, currency: 'RUB' },
      deadline: '3 месяца',
      skills: ['SEO', 'Google Analytics', 'Content Marketing', 'Link Building'],
      category: 'Маркетинг',
      type: 'SEO',
      applicants: 22,
      posted: '2 дня назад'
    },
    {
      id: 11,
      title: 'Система управления складом (WMS)',
      description: 'Разработка веб-приложения для управления складскими операциями с интеграцией 1С.',
      budget: { min: 900000, max: 1400000, currency: 'RUB' },
      deadline: '4 месяца',
      skills: ['Java', 'Spring', 'PostgreSQL', '1C Integration', 'REST API'],
      category: 'Enterprise',
      type: 'Корпоративная система',
      applicants: 5,
      posted: '1 неделя назад'
    },
    {
      id: 12,
      title: 'Чат-бот для Telegram с ИИ функциями',
      description: 'Создание умного чат-бота для автоматизации клиентской поддержки с использованием GPT.',
      budget: { min: 350000, max: 550000, currency: 'RUB' },
      deadline: '2 месяца',
      skills: ['Python', 'Telegram API', 'OpenAI API', 'NLP'],
      category: 'ИИ/ML',
      type: 'Чат-бот',
      applicants: 13,
      posted: '3 дня назад'
    },
    {
      id: 13,
      title: 'Аудит безопасности веб-приложения',
      description: 'Проведение пентеста и анализа безопасности веб-приложения, устранение уязвимостей.',
      budget: { min: 400000, max: 600000, currency: 'RUB' },
      deadline: '1 месяц',
      skills: ['Penetration Testing', 'OWASP', 'Security Audit', 'Vulnerability Assessment'],
      category: 'Безопасность',
      type: 'Аудит',
      applicants: 4,
      posted: '2 дня назад'
    },
    {
      id: 14,
      title: 'Анимированные видео для YouTube канала',
      description: 'Создание серии образовательных анимированных роликов для IT канала длительностью 5-10 минут.',
      budget: { min: 300000, max: 500000, currency: 'RUB' },
      deadline: '2 месяца',
      skills: ['After Effects', 'Illustrator', 'Animation', 'Video Production'],
      category: 'Видеопродакшн',
      type: 'Анимация',
      applicants: 11,
      posted: '5 дней назад'
    },
    {
      id: 15,
      title: 'ERP система для производственного предприятия',
      description: 'Разработка модульной ERP системы для управления производством, кадрами и финансами.',
      budget: { min: 2000000, max: 3500000, currency: 'RUB' },
      deadline: '8 месяцев',
      skills: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL', 'Microservices'],
      category: 'Enterprise',
      type: 'ERP система',
      applicants: 3,
      posted: '1 неделя назад'
    },
    {
      id: 16,
      title: 'Разработка API для IoT устройств',
      description: 'Создание RESTful API для сбора и обработки данных с IoT сенсоров в реальном времени.',
      budget: { min: 500000, max: 800000, currency: 'RUB' },
      deadline: '3 месяца',
      skills: ['Node.js', 'Express', 'MongoDB', 'MQTT', 'WebSocket'],
      category: 'IoT',
      type: 'API разработка',
      applicants: 8,
      posted: '4 дня назад'
    },
    {
      id: 17,
      title: 'Дизайн мобильного приложения для фитнеса',
      description: 'UI/UX дизайн мобильного приложения с трекингом тренировок, планами питания и социальными функциями.',
      budget: { min: 250000, max: 400000, currency: 'RUB' },
      deadline: '6 недель',
      skills: ['Figma', 'Mobile UI/UX', 'Prototyping', 'User Research'],
      category: 'Дизайн',
      type: 'Mobile UI/UX',
      applicants: 16,
      posted: '3 дня назад'
    },
    {
      id: 18,
      title: 'Блокчейн-кошелек для криптовалют',
      description: 'Разработка веб-кошелька с поддержкой множественных криптовалют и DeFi функций.',
      budget: { min: 1200000, max: 2000000, currency: 'RUB' },
      deadline: '5 месяцев',
      skills: ['React', 'Web3.js', 'Solidity', 'MetaMask', 'DeFi'],
      category: 'Blockchain',
      type: 'Криптокошелек',
      applicants: 7,
      posted: '1 неделя назад'
    },
    {
      id: 19,
      title: 'Система видеоконференций на WebRTC',
      description: 'Создание веб-платформы для видеоконференций с возможностью записи, чата и совместной работы.',
      budget: { min: 800000, max: 1300000, currency: 'RUB' },
      deadline: '4 месяца',
      skills: ['WebRTC', 'Node.js', 'Socket.io', 'React', 'Media Streaming'],
      category: 'Разработка',
      type: 'Видеоплатформа',
      applicants: 6,
      posted: '2 дня назад'
    }
  ];

  const formatBudget = (budget: any) => {
    const min = (budget.min / 1000).toFixed(0);
    const max = (budget.max / 1000).toFixed(0);
    return `${min}K - ${max}K ₽`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Разработка': 'bg-primary text-primary-foreground',
      'Дизайн': 'bg-secondary text-secondary-foreground', 
      'Blockchain': 'bg-accent text-accent-foreground',
      'Маркетинг': 'bg-muted text-muted-foreground',
      'DevOps': 'bg-orange-500 text-white',
      'Веб-разработка': 'bg-blue-500 text-white',
      'Data Science': 'bg-purple-500 text-white',
      'Геймдев': 'bg-green-500 text-white',
      'Enterprise': 'bg-gray-700 text-white',
      'ИИ/ML': 'bg-indigo-500 text-white',
      'Безопасность': 'bg-red-500 text-white',
      'Видеопродакшн': 'bg-pink-500 text-white',
      'IoT': 'bg-teal-500 text-white'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Биржа проектов</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Найдите идеальный проект для вашей команды или предложите свои услуги
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Поиск проектов..." className="pl-10" />
                  </div>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Разработка</SelectItem>
                      <SelectItem value="design">Дизайн</SelectItem>
                      <SelectItem value="marketing">Маркетинг</SelectItem>
                      <SelectItem value="blockchain">Blockchain</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Бюджет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-500">До 500K ₽</SelectItem>
                      <SelectItem value="500-1000">500K - 1M ₽</SelectItem>
                      <SelectItem value="1000+">Свыше 1M ₽</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      // Apply filters (demo functionality)
                      alert('Фильтры применены!');
                    }}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Применить фильтры
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Project List */}
          <section>
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getCategoryColor(project.category)}>
                            {project.category}
                          </Badge>
                          <Badge variant="outline">{project.type}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                        <CardDescription className="text-base">
                          {project.description}
                        </CardDescription>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          {formatBudget(project.budget)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project.posted}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{project.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{project.applicants} откликов</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>Фиксированная цена</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          // Show success message for demo purposes
                          alert(`Отклик на проект "${project.title}" отправлен!`);
                        }}
                      >
                        Откликнуться на проект
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Show project details modal (for demo)
                          alert(`Показать детали проекта: ${project.title}`);
                        }}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => {
                  // Simulate loading more projects
                  alert('Загружаем дополнительные проекты...');
                }}
              >
                Загрузить еще проекты
              </Button>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Есть проект? Разместите его!</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Опубликуйте свой проект и найдите лучших исполнителей из нашего сообщества профессионалов
                </p>
                <Button 
                  size="lg"
                  onClick={() => {
                    // Navigate to project creation or login
                    window.location.href = '/auth?mode=signup';
                  }}
                >
                  Разместить проект
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;