import { useState, useEffect, useRef } from "react";

const roles = [
  { name: "Инвестор", description: "Ищу лучшие стартапы, отрасли, управляю портфелем и рисками." },
  { name: "Коллективный инвестор", description: "Доступ к сделкам совместных инвестиций, приватным раундам, аналитике и аукционам." },
  { name: "Фаундер", description: "Запускаю стартап, управляю командой, презентуюсь инвесторам." },
  { name: "Ко-фаундер", description: "Вхожу в перспективные проекты, улучшаю профиль команды, развиваю идеи." },
  { name: "Соучредитель", description: "Вхожу в проекты, получая долю, работаю с лидерами, строю бизнес." },
  { name: "Фрилансер", description: "Работаю над проектами удаленно, выбираю интересные задачи, строю карьеру." },
  { name: "Эксперт", description: "Консультирую по узкой специализации, решаю сложные технические задачи." },
  { name: "Консультант", description: "Помогаю бизнесу в стратегических вопросах, оптимизирую процессы." },
  { name: "Аутсорсер", description: "Расширяю клиентскую базу, предлагаю сервисы проектам и корпорациям." },
  { name: "Подрядчик", description: "Подключаюсь к крупным заказам, B2B-кейсам, интегрируюсь в экосистему." },
  { name: "Администратор проекта", description: "Управляю процессами, координирую команду, отвечаю за успех." },
  { name: "Сотрудник проекта", description: "Влияю на успех, расту с командой, получаю репутацию, обучаюсь у лидеров." },
  { name: "Соискатель", description: "Ищу работу в перспективном стартапе, хочу строить карьеру в инновационной среде." },
  { name: "Партнёр (Affiliate)", description: "Развиваю интеграции, привлекаю трафик, получаю вознаграждение." },
  { name: "Амбассадор проекта", description: "Представляю бренд, повышаю лояльность, расширяю сообщество." },
  { name: "Лидер мнений/Блогер", description: "Создаю контент, делюсь экспертизой, влияю на аудиторию." }
];

const RoleAnimator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % roles.length);
      }, 3500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleRoleClick = (index: number) => {
    setActiveIndex(index);
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 5000);
  };

  const getCardPosition = (index: number) => {
    const offset = index - activeIndex;
    const cardWidth = 320;
    const spacing = 40;
    const totalWidth = cardWidth + spacing;
    
    return {
      x: offset * totalWidth,
      scale: Math.abs(offset) === 0 ? 1 : 0.85,
      opacity: Math.abs(offset) <= 2 ? (Math.abs(offset) === 0 ? 1 : 0.6) : 0,
      zIndex: Math.abs(offset) === 0 ? 10 : 5 - Math.abs(offset)
    };
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="relative h-[400px] flex items-center justify-center">
          <div className="relative w-full max-w-6xl h-[300px] flex items-center justify-center">
            {roles.map((role, index) => {
              const position = getCardPosition(index);
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={role.name}
                  className={`absolute cursor-pointer transition-all duration-700 ease-out rounded-2xl border shadow-xl ${
                    isActive 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background text-foreground border-border hover:border-primary'
                  }`}
                  style={{
                    transform: `translateX(${position.x}px) scale(${position.scale})`,
                    opacity: position.opacity,
                    zIndex: position.zIndex,
                    width: '320px',
                    height: '200px'
                  }}
                  onClick={() => handleRoleClick(index)}
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <h3 className={`text-xl font-bold mb-3 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}>
                        {role.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                        {role.description}
                      </p>
                    </div>
                    {isActive && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="w-8 h-0.5 bg-primary-foreground/30 rounded"></div>
                        <span className="text-xs font-medium text-primary-foreground/70">
                          {index + 1} / {roles.length}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Navigation indicators */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {roles.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => handleRoleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleAnimator;