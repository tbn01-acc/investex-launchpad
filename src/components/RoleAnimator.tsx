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
      }, 3500); // 3 секунды на роль + 0.5 сек анимация
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
    setTimeout(() => setIsRunning(true), 5000); // Возобновить через 5 секунд
  };

  const calculatePosition = (index: number) => {
    const angleStep = (360 / roles.length) * (Math.PI / 180);
    const currentAngle = angleStep * (index - activeIndex);
    const radius = 360; // Увеличено на 20% (300 * 1.2)
    
    const x = Math.cos(currentAngle - Math.PI / 2) * radius;
    const y = Math.sin(currentAngle - Math.PI / 2) * radius;
    
    return {
      x: x + 350, // центр контейнера
      y: y + 350,
      rotation: 0 // Плашки всегда горизонтальны
    };
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="relative w-[700px] h-[700px] mx-auto flex items-center justify-center">
          {/* Вращающееся колесо с ролями */}
          <div className="absolute inset-0">
            {roles.map((role, index) => {
              const position = calculatePosition(index);
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={role.name}
                  className={`absolute cursor-pointer transition-all duration-500 ease-out rounded-full px-6 py-3 whitespace-nowrap text-lg font-medium border shadow-md ${
                    isActive 
                      ? 'bg-primary text-primary-foreground border-primary scale-115 font-bold z-10' 
                      : 'bg-background text-foreground border-border hover:border-primary'
                  }`}
                  style={{
                    left: `${position.x - 50}px`,
                    top: `${position.y - 20}px`,
                    transform: `rotate(${position.rotation}deg)`
                  }}
                  onClick={() => handleRoleClick(index)}
                >
                  {role.name}
                </div>
              );
            })}
          </div>

          {/* Центральная сфера с описанием */}
          <div className="relative w-[350px] h-[350px] bg-primary text-primary-foreground rounded-full flex flex-col items-center justify-center p-8 text-center shadow-2xl z-20">
            <h3 className="text-2xl font-bold mb-4">{roles[activeIndex].name}</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              {roles[activeIndex].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleAnimator;