import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">
          Готовы начать свой путь к успеху?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Присоединяйтесь к экосистеме Invest-Ex уже сегодня и откройте новые возможности для роста и развития.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="px-8 py-3 text-lg">
            Зарегистрироваться бесплатно
          </Button>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
            Узнать больше
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;