import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Target, User, TrendingUp, Eye,
  MapPin, Clock, DollarSign, Star, Send,
  BookOpen, Award, Calendar, FileText,
  MessageSquare, Filter, CheckCircle
} from 'lucide-react';

const JobSeekerDashboardPro = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');

  const stats = {
    profileViews: 342,
    applications: 28,
    interviews: 8,
    offers: 2,
    profileRating: 4.2,
    responseRate: 35
  };

  const opportunities = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '200,000 - 300,000 ₽',
      experience: '3-5 лет',
      skills: ['React', 'TypeScript', 'Next.js'],
      posted: '2 дня назад',
      aiMatch: 94,
      applied: false
    },
    {
      id: 2,
      title: 'Full-Stack Developer',
      company: 'StartupInc',
      location: 'Санкт-Петербург',
      type: 'Удаленно',
      salary: '150,000 - 250,000 ₽',
      experience: '2-4 года',
      skills: ['React', 'Node.js', 'PostgreSQL'],
      posted: '1 день назад',
      aiMatch: 87,
      applied: true
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'DigitalSolutions',
      location: 'Москва',
      type: 'Гибрид',
      salary: '180,000 - 220,000 ₽',
      experience: '2-3 года',
      skills: ['React', 'Redux', 'JavaScript'],
      posted: '3 дня назад',
      aiMatch: 91,
      applied: false
    }
  ];

  const applications = [
    {
      id: 1,
      position: 'Senior Frontend Developer',
      company: 'TechCorp',
      appliedDate: '2024-01-20',
      status: 'interview-scheduled',
      stage: 'Техническое интервью',
      feedback: 'Положительная оценка резюме, назначено техническое интервью'
    },
    {
      id: 2,
      position: 'Full-Stack Developer',
      company: 'StartupInc',
      appliedDate: '2024-01-18',
      status: 'under-review',
      stage: 'Рассмотрение резюме',
      feedback: 'Ваше резюме рассматривается HR-отделом'
    },
    {
      id: 3,
      position: 'React Developer',
      company: 'WebStudio',
      appliedDate: '2024-01-15',
      status: 'offer',
      stage: 'Оффер получен',
      feedback: 'Поздравляем! Вам сделали предложение о работе'
    }
  ];

  const skillsProgress = [
    { name: 'React', level: 85, target: 90 },
    { name: 'TypeScript', level: 70, target: 85 },
    { name: 'Node.js', level: 60, target: 75 },
    { name: 'System Design', level: 45, target: 70 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview-scheduled': return 'default';
      case 'under-review': return 'secondary';
      case 'offer': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'interview-scheduled': return 'Интервью назначено';
      case 'under-review': return 'На рассмотрении';
      case 'offer': return 'Оффер получен';
      case 'rejected': return 'Отказ';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Target className="h-8 w-8 text-green-500" />
            Поиск работы
          </h1>
          <p className="text-muted-foreground">AI-рекомендации и трекинг карьерного роста</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <User className="h-4 w-4 mr-2" />
            Редактировать профиль
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Резюме
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Просмотры</p>
              <p className="text-2xl font-bold text-blue-600">{stats.profileViews}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Отклики</p>
              <p className="text-2xl font-bold text-purple-600">{stats.applications}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Интервью</p>
              <p className="text-2xl font-bold text-orange-600">{stats.interviews}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Офферы</p>
              <p className="text-2xl font-bold text-green-600">{stats.offers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Рейтинг</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.profileRating}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Отклик</p>
              <p className="text-2xl font-bold">{stats.responseRate}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="opportunities">
            <Search className="h-4 w-4 mr-2" />
            Вакансии
          </TabsTrigger>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="applications">
            <Send className="h-4 w-4 mr-2" />
            Отклики
          </TabsTrigger>
          <TabsTrigger value="growth">
            <TrendingUp className="h-4 w-4 mr-2" />
            Развитие
          </TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>🤖 AI-рекомендации вакансий</CardTitle>
              <CardDescription>Персонализированный подбор на основе вашего профиля и предпочтений</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск по должности, компании или навыкам..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Локация" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все города</SelectItem>
                      <SelectItem value="moscow">Москва</SelectItem>
                      <SelectItem value="spb">Санкт-Петербург</SelectItem>
                      <SelectItem value="remote">Удаленно</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Зарплата" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Любая</SelectItem>
                      <SelectItem value="100k">от 100k ₽</SelectItem>
                      <SelectItem value="150k">от 150k ₽</SelectItem>
                      <SelectItem value="200k">от 200k ₽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Opportunities */}
          <div className="space-y-4">
            {opportunities.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant="outline">AI Match: {job.aiMatch}%</Badge>
                        {job.applied && <Badge variant="secondary">Откликнулись</Badge>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{job.experience}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Опубликовано: {job.posted}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Подробнее
                        </Button>
                        {!job.applied ? (
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Откликнуться
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Отправлено
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Builder</CardTitle>
                <CardDescription>Профессиональные шаблоны резюме</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Современный шаблон</h4>
                    <p className="text-sm text-muted-foreground">Минималистичный дизайн для IT-специалистов</p>
                    <Button size="sm" className="mt-2">Использовать</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Классический шаблон</h4>
                    <p className="text-sm text-muted-foreground">Традиционный формат для корпоративных позиций</p>
                    <Button size="sm" variant="outline" className="mt-2">Использовать</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Оптимизация профиля</CardTitle>
                <CardDescription>Рекомендации для улучшения видимости</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Заполненность профиля</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="w-full" />
                  
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Фото профиля добавлено</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Навыки указаны</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4 border rounded-full" />
                      <span>Добавьте портфолио</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4 border rounded-full" />
                      <span>Получите рекомендации</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Трекинг откликов</CardTitle>
              <CardDescription>Статус всех ваших заявок на позиции</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{app.position}</h4>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                        <p className="text-xs text-muted-foreground">Подано: {app.appliedDate}</p>
                      </div>
                      <Badge variant={getStatusColor(app.status)}>
                        {getStatusText(app.status)}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm font-medium">Текущий этап: {app.stage}</p>
                      <p className="text-sm text-muted-foreground mt-1">{app.feedback}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Связаться
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Детали
                      </Button>
                      {app.status === 'interview-scheduled' && (
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Календарь
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Развитие навыков</CardTitle>
                <CardDescription>Ваш прогресс и рекомендации по обучению</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsProgress.map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}% / {skill.target}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="w-full" />
                      <div className="text-xs text-muted-foreground">
                        Цель: {skill.target}% • Осталось: {skill.target - skill.level}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендации по карьере</CardTitle>
                <CardDescription>AI-советы для роста</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">📚 Изучите TypeScript</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Спрос на TypeScript вырос на 65% среди React-разработчиков
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">💼 Добавьте проекты</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      2-3 проекта в портфолио увеличат отклики на 40%
                    </p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">🎯 Сертификация</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      AWS или Google Cloud сертификация повысит зарплату на 15-20%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobSeekerDashboardPro;