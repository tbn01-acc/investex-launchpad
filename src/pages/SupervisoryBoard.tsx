import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Shield, Award, FileText, Calendar, ExternalLink } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const SupervisoryBoard = () => {
  const boardMembers = [
    {
      name: 'Александр Иванов',
      role: 'Председатель совета',
      experience: '20+ лет в венчурном капитале',
      image: '',
      linkedin: '#',
      description: 'Основатель 3 успешных венчурных фондов, более 50 успешных выходов'
    },
    {
      name: 'Елена Петрова',
      role: 'Член совета',
      experience: '15+ лет в корпоративном управлении',
      image: '',
      linkedin: '#',
      description: 'Бывший CFO крупной технологической компании, эксперт по финансам'
    },
    {
      name: 'Михаил Сидоров',
      role: 'Член совета',
      experience: '12+ лет в технологическом предпринимательстве',
      image: '',
      linkedin: '#',
      description: 'Серийный предприниматель, 2 успешных exit'
    },
    {
      name: 'Ольга Кузнецова',
      role: 'Член совета',
      experience: '18+ лет в юриспруденции',
      image: '',
      linkedin: '#',
      description: 'Управляющий партнер юридической фирмы, специализация - M&A и венчур'
    }
  ];

  const functions = [
    'Стратегическое руководство развитием платформы',
    'Контроль соблюдения интересов всех участников экосистемы',
    'Утверждение ключевых изменений в политиках и правилах',
    'Разрешение конфликтов между участниками',
    'Надзор за финансовой прозрачностью и отчетностью',
    'Формирование стратегии развития экосистемы'
  ];

  const meetings = [
    {
      date: '15 января 2025',
      topic: 'Утверждение новых стандартов due diligence',
      status: 'Запланировано'
    },
    {
      date: '10 декабря 2024',
      topic: 'Квартальный отчет и анализ показателей платформы',
      status: 'Состоялось'
    },
    {
      date: '05 октября 2024',
      topic: 'Обновление правил участия для инвесторов',
      status: 'Состоялось'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-base px-4 py-2">
              <Shield className="h-4 w-4 mr-2 inline" />
              УПРАВЛЕНИЕ
            </Badge>
            <h1 className="text-5xl font-bold mb-6">
              Наблюдательный совет
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Независимый орган управления, обеспечивающий прозрачность, справедливость и стратегическое развитие платформы Invest-Ex
            </p>
          </div>

          {/* О совете */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Users className="h-8 w-8 text-primary" />
                О Наблюдательном совете
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-lg">
              <p>
                Наблюдательный совет Invest-Ex - это независимый орган, состоящий из опытных профессионалов 
                венчурной индустрии, предпринимателей и экспертов в области корпоративного управления.
              </p>
              <p className="text-muted-foreground">
                Совет создан для обеспечения баланса интересов всех участников экосистемы: инвесторов, 
                стартапов, экспертов и партнеров. Мы гарантируем прозрачность процессов, справедливость 
                правил и стратегическое развитие платформы.
              </p>
            </CardContent>
          </Card>

          {/* Функции совета */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <FileText className="h-8 w-8 text-primary" />
                Функции совета
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {functions.map((func, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <Award className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-base">{func}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Члены совета */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Члены совета</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {boardMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={member.image} />
                        <AvatarFallback className="text-2xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                        <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                        <p className="text-sm text-muted-foreground">{member.experience}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{member.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      LinkedIn профиль
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Заседания */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Calendar className="h-8 w-8 text-primary" />
                Заседания и отчеты
              </CardTitle>
              <CardDescription>
                Совет проводит регулярные заседания каждый квартал и по мере необходимости
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {meetings.map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">{meeting.topic}</p>
                      <p className="text-sm text-muted-foreground">{meeting.date}</p>
                    </div>
                    <Badge variant={meeting.status === 'Запланировано' ? 'default' : 'secondary'}>
                      {meeting.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Как стать членом */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Хотите присоединиться к совету?</CardTitle>
              <CardDescription className="text-base">
                Мы ищем опытных профессионалов для укрепления наблюдательного совета
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-3">Требования к кандидатам:</h3>
                <ul className="text-left max-w-2xl mx-auto space-y-2 text-muted-foreground">
                  <li>• Опыт работы в венчурной индустрии не менее 10 лет</li>
                  <li>• Успешные кейсы в инвестициях или предпринимательстве</li>
                  <li>• Репутация в профессиональном сообществе</li>
                  <li>• Готовность уделять время работе в совете (минимум 4 заседания в год)</li>
                  <li>• Отсутствие конфликта интересов</li>
                </ul>
              </div>
              <Button size="lg">
                Подать заявку в Наблюдательный совет
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SupervisoryBoard;
