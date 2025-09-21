import { Button } from "@/components/ui/button";

const HeroSectionNew = () => {
  return (
    <section className="py-16 text-center bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 max-w-5xl mx-auto text-4xl font-bold leading-tight">
          <div className="md:text-left">
            <div>Единая</div>
            <div>Инвестиционная</div>
            <div>платформа для:</div>
          </div>
          <div className="md:text-left">
            <div>Создания и Запуска,</div>
            <div>Управления и Масштабирования,</div>
            <div>Финансирования и Инвестирования</div>
          </div>
          <div className="md:col-span-2 text-center text-primary mt-2">
            <div>Перспективных Проектов</div>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground mt-8 mb-8 max-w-4xl mx-auto leading-relaxed">
          Объединяем инвесторов, фаундеров и экспертов на единой платформе для создания прорывных продуктов. 
          Найдите финансирование, соберите команду мечты или вложитесь в будущее уже сегодня.
        </p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg" className="px-10 py-3 text-lg">
            Начать свой путь
          </Button>
          <Button variant="outline" size="lg" className="px-10 py-3 text-lg">
            Смотреть проекты
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionNew;