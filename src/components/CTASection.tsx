import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <div className="bg-card border border-border rounded-lg p-8 shadow-card">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Готовы начать свой путь к успеху?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Присоединяйтесь к экосистеме Invest-Ex уже сегодня и откройте новые возможности для роста и развития.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="px-6 py-3">
              Зарегистрироваться бесплатно
            </Button>
            <Button variant="outline" size="lg" className="px-6 py-3">
              Узнать больше
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;