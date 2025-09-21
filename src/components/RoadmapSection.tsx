const RoadmapSection = () => {
  const roadmapItems = [
    {
      title: "Платформа MVP",
      description: "Запуск базового функционала для инвесторов и фаундеров",
      status: "done",
      quarter: "Q1 2024"
    },
    {
      title: "AI-Аналитика",
      description: "Внедрение системы анализа проектов и подбора команд",
      status: "done",
      quarter: "Q2 2024"
    },
    {
      title: "Вторичный рынок",
      description: "Запуск торговли токенизированными долями в стартапах",
      status: "in-progress",
      quarter: "Q3 2024"
    },
    {
      title: "Мобильное приложение",
      description: "Разработка iOS и Android приложений",
      status: "in-progress",
      quarter: "Q4 2024"
    },
    {
      title: "Международная экспансия",
      description: "Запуск в странах СНГ и Европе",
      status: "planned",
      quarter: "Q1 2025"
    },
    {
      title: "DeFi интеграция",
      description: "Внедрение децентрализованных финансовых инструментов",
      status: "planned",
      quarter: "Q2 2025"
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
      <div className="container mx-auto px-8">
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