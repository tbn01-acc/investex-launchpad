const WallOfFameSection = () => {
  const achievements = [
    {
      title: "Проект \"Nova AI\"",
      subtitle: "AI-платформа для ритейла",
      metric: "₽ 80 млн",
      label: "Привлечено в посевном раунде"
    },
    {
      title: "Команда \"CyberGuard\"",
      subtitle: "Решение для кибербезопасности",
      metric: "х12",
      label: "Рост за 18 месяцев"
    },
    {
      title: "Сделка \"HealthTech\"",
      subtitle: "Поглощение корпорацией",
      metric: "₽ 1.2 млрд",
      label: "Сумма продажи"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Стена славы</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Гордимся результатами наших пользователей. Эти проекты — яркий пример того, чего можно достичь с Invest-Ex.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg border-t-4 border-primary">
              <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-muted-foreground mb-6">{achievement.subtitle}</p>
              <div className="text-4xl font-bold text-primary mb-2">{achievement.metric}</div>
              <p className="text-muted-foreground font-semibold">{achievement.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WallOfFameSection;