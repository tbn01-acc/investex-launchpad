import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Calendar } from 'lucide-react';

const RoadmapSection = () => {
  const roadmapItems = [
    {
      title: "Платформа MVP",
      description: "Запуск базового функционала для инвесторов и фаундеров",
      status: "done",
      quarter: "Q4 2025"
    },
    {
      title: "AI-Аналитика",
      description: "Внедрение AI-системы анализа проектов и подбора команд",
      status: "in-progress",
      quarter: "Q1-Q2 2026"
    },
    {
      title: "Вторичный рынок",
      description: "Запуск торговли токенизированными долями в стартапах",
      status: "in-progress",
      quarter: "Q1-Q2 2026"
    },
    {
      title: "Блокчейн и Смартконтракты",
      description: "Реализация реестра данных на Блокчейне и унификация сделок через Смартконтракты",
      status: "planned",
      quarter: "Q1-Q3 2026"
    },
    {
      title: "Мультиязычная версия и регистрация",
      description: "Выпуск полнофункциональной мультиязычной версии, регистрация холдинга (Эстония), запуск в России",
      status: "planned",
      quarter: "Q2-Q3 2026"
    },
    {
      title: "Экспансия СНГ и мобильные приложения",
      description: "Расширение в СНГ (Казахстан, Беларусь, Грузия). Создание мобильных приложений (Android, iOS)",
      status: "planned",
      quarter: "Q2 2026 - Q3 2027"
    },
    {
      title: "Хаб ОАЭ и глобальные рынки",
      description: "Открытие хаба в ОАЭ, запуск рынков EMEA, NA, LATAM",
      status: "planned",
      quarter: "Q3 2026 - Q3 2027"
    },
    {
      title: "IPO/Exit и APAC",
      description: "Подготовка к IPO/Exit, выход на рынок APAC",
      status: "planned",
      quarter: "Q3 2027 - Q2 2029"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Завершено
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            В процессе
          </Badge>
        );
      case 'planned':
        return (
          <Badge variant="outline">
            <Calendar className="w-3 h-3 mr-1" />
            Запланировано
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Дорожная карта</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Мы постоянно развиваемся и добавляем новые возможности. Вот что нас ждет в ближайшем будущем.
        </p>
      </div>
      
      <div className="relative">
        {/* Вертикальная линия на мобильных */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        
        <div className="space-y-8">
          {roadmapItems.map((item, index) => (
            <div key={index} className={`relative flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
              <Card className={`w-full md:w-[48%] ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-[52%]' : 'md:ml-[52%]'} hover:shadow-lg transition-shadow`}>
                {/* Точка на линии */}
                <div className={`absolute top-8 w-4 h-4 rounded-full border-4 border-primary bg-background ${
                  index % 2 === 0 ? '-left-14 md:-right-[3.25rem] md:left-auto' : '-left-14'
                }`} />
                
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    {getStatusBadge(item.status)}
                    <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {item.quarter}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Итоговая карточка */}
      <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 mt-12">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Наша цель</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Стать глобальной платформой №1 для венчурных инвестиций с присутствием в 50+ странах 
              и обработкой сделок на $10B+ к 2029 году
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoadmapSection;