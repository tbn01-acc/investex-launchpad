const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Платформа превзошла все ожидания. За месяц мы нашли двух ключевых инвесторов и закрыли раунд. Аналитика и поддержка на высшем уровне!",
      author: "Анна Ветрова",
      role: "CEO, \"Nova AI\"",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b601?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Благодаря Invest-Ex я смог диверсифицировать портфель и найти проекты с отличным потенциалом. Прозрачность процессов впечатляет.",
      author: "Михаил Орлов",
      role: "Частный инвестор",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      text: "Как фрилансер, я нашел здесь проекты мечты. Команда платформы действительно заботится о качестве взаимодействия между всеми участниками.",
      author: "Елена Соколова",
      role: "UX/UI Дизайнер",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">Что о нас говорят</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Доверие — наша главная ценность. Вот мнения тех, кто уже использует Invest-Ex для своего роста.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
              <div className="relative mb-4">
                <p className="text-muted-foreground text-base leading-relaxed pl-6 relative">
                  <span className="absolute left-0 top-0 text-3xl text-primary opacity-50 leading-none">
                    "
                  </span>
                  {testimonial.text}
                </p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;