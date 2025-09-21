const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Активных проектов" },
    { value: "₽2.5 млрд", label: "Инвестировано" },
    { value: "10,000+", label: "Участников экосистемы" },
    { value: "150+", label: "Успешных экзитов" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;