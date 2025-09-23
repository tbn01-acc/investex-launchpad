const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Активных проектов" },
    { value: "₽2.5 млрд", label: "Инвестировано" },
    { value: "10,000+", label: "Участников экосистемы" },
    { value: "150+", label: "Успешных экзитов" }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;