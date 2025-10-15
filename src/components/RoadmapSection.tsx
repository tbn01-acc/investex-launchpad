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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'planned': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'done': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'planned': return 'Запланировано';
      default: return 'Запланировано';
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Дорожная карта</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Мы постоянно развиваемся и добавляем новые возможности. Вот что нас ждет в ближайшем будущем.
        </p>
        
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border"></div>
          
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg relative">
                    <div className={`absolute top-5 w-5 h-5 rounded-full border-4 border-primary bg-white ${
                      index % 2 === 0 ? '-right-2.5' : '-left-2.5'
                    }`}></div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold mb-3 ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground mb-2">{item.description}</p>
                    <div className="text-sm font-semibold text-primary">{item.quarter}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;