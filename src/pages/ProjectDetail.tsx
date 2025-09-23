import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Users, Clock, Building, ArrowLeft, Star, Share2 } from 'lucide-react';

// Объединенные данные проектов из разных источников
const allProjects = [
  {
    id: 1,
    title: "AI-Маркетинг для E-commerce",
    description: "Революционное решение для персонализации пользовательского опыта с использованием машинного обучения и анализа поведения клиентов.",
    fullDescription: "Наш проект представляет собой комплексную AI-платформу для электронной коммерции, которая революционизирует способ взаимодействия брендов с клиентами. Используя передовые алгоритмы машинного обучения, мы анализируем поведение пользователей в реальном времени и предоставляем персонализированные рекомендации, которые увеличивают конверсию на 40-60%.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=400&fit=crop",
    budget: "$500K - $1M",
    timeline: "6 месяцев",
    team: "15 человек",
    status: "В разработке",
    company: "TechVision AI",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL"],
    features: [
      "Персонализированные рекомендации товаров",
      "Прогнозирование поведения клиентов",
      "Автоматическая оптимизация цен",
      "Анализ sentiment'а отзывов",
      "A/B тестирование в реальном времени"
    ],
    milestones: [
      { title: "MVP разработка", status: "completed", date: "Q1 2024" },
      { title: "Бета-тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Запуск продукта", status: "planned", date: "Q3 2024" },
      { title: "Масштабирование", status: "planned", date: "Q4 2024" }
    ]
  },
  {
    id: 2,
    title: "Блокчейн для логистики",
    description: "Прозрачное отслеживание поставок от производителя до потребителя",
    fullDescription: "Инновационная блокчейн-платформа для логистической отрасли, обеспечивающая полную прозрачность и неизменяемость данных о поставках. Наше решение устраняет проблемы фальсификации документов, потери грузов и непрозрачности в цепи поставок.",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
    budget: "$800K - $1.2M",
    timeline: "8 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "LogiChain Solutions",
    technologies: ["Ethereum", "Solidity", "IPFS", "React", "Node.js"],
    features: [
      "Отслеживание грузов в реальном времени",
      "Смарт-контракты для автоматизации",
      "Цифровые сертификаты качества",
      "Интеграция с IoT датчиками",
      "Мультимодальная логистика"
    ],
    milestones: [
      { title: "Техническое ТЗ", status: "completed", date: "Q4 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотный проект", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ]
  },
  {
    id: 3,
    title: "FinTech мобильное приложение",
    description: "Современное решение для управления личными финансами",
    fullDescription: "Комплексное мобильное приложение для управления личными финансами, объединяющее банковские услуги, инвестиции и планирование бюджета в одной платформе. Наше решение помогает пользователям принимать обоснованные финансовые решения.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    budget: "$300K - $600K",
    timeline: "4 месяца",
    team: "8 человек",
    status: "Готов к запуску",
    company: "FinFlow Inc",
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe API"],
    features: [
      "Агрегация банковских счетов",
      "Автоматическая категоризация трат",
      "Инвестиционный портфель",
      "Планирование бюджета",
      "Уведомления и аналитика"
    ],
    milestones: [
      { title: "Дизайн и прототип", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "completed", date: "Q4 2023" },
      { title: "Тестирование", status: "completed", date: "Q1 2024" },
      { title: "Запуск в App Store", status: "in-progress", date: "Q2 2024" }
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0');
  const project = allProjects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
            <Button asChild>
              <Link to="/projects">Вернуться к проектам</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к проектам
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="relative">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {project.category}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Project Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Подробное описание</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Ключевые особенности</h3>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Технологии</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle>Дорожная карта проекта</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-gray-300'
                        }`}></div>
                        <div className="flex-1">
                          <div className="font-medium">{milestone.title}</div>
                          <div className="text-sm text-muted-foreground">{milestone.date}</div>
                        </div>
                        <Badge variant={
                          milestone.status === 'completed' ? 'default' :
                          milestone.status === 'in-progress' ? 'secondary' :
                          'outline'
                        }>
                          {milestone.status === 'completed' ? 'Завершено' :
                           milestone.status === 'in-progress' ? 'В процессе' :
                           'Запланировано'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Информация о проекте</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Бюджет: {project.budget}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Срок: {project.timeline}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Команда: {project.team}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Компания: {project.company}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Button className="w-full">
                    Присоединиться к проекту
                  </Button>
                  <Button variant="outline" className="w-full">
                    Связаться с командой
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                </CardContent>
              </Card>

              {/* Rating */}
              <Card>
                <CardHeader>
                  <CardTitle>Рейтинг проекта</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">4.8 (24 отзыва)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Высокий рейтинг от экспертов и инвесторов
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;