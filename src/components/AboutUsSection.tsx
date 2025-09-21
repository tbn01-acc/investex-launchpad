import { Rocket, Users, TrendingUp } from "lucide-react";

const AboutUsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Что такое Invest-Ex?</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Это больше, чем просто платформа. Это комплексная среда, где каждая деталь работает на ваш успех.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl text-primary mb-4">
              <Rocket className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Прозрачные инвестиции</h3>
            <p className="text-muted-foreground">
              Мы обеспечиваем доступ к проверенным проектам и инструментам для управления портфелем, снижая риски и повышая доходность.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl text-primary mb-4">
              <Users className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Команды и компетенции</h3>
            <p className="text-muted-foreground">
              Наша система оценки и подбора помогает находить не просто сотрудников, а идеальных партнеров для реализации ваших идей.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <div className="text-5xl text-primary mb-4">
              <TrendingUp className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Экосистема для роста</h3>
            <p className="text-muted-foreground">
              От идеи до продажи — мы предоставляем юридическую, менторскую и технологическую поддержку на всех этапах развития проекта.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;