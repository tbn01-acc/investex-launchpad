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
    <section className="py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Что о нас говорят</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Доверие — наша главная ценность. Вот мнения тех, кто уже использует Invest-Ex для своего роста.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="relative mb-6">
                <p className="text-muted-foreground italic text-lg leading-relaxed pl-8 relative">
                  <span className="absolute left-0 top-0 text-5xl text-primary opacity-50 leading-none">
                    "
                  </span>
                  {testimonial.text}
                </p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
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