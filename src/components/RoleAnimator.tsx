import { useState, useEffect, useRef } from "react";

const roles = [
  { name: "Инвестор", description: "Ищу лучшие стартапы, отрасли, управляю портфелем и рисками." },
  { name: "Коллективный инвестор", description: "Доступ к сделкам совместных инвестиций, приватным раундам, аналитике и аукционам." },
  { name: "Фаундер", description: "Запускаю стартап, управляю командой, презентуюсь инвесторам." },
  { name: "Ко-фаундер", description: "Вхожу в перспективные проекты, улучшаю профиль команды, развиваю идеи." },
  { name: "Соучредитель", description: "Вхожу в проекты, получая долю, работаю с лидерами, строю бизнес." },
  { name: "Фрилансер/Эксперт/Консультант", description: "Получаю уникальные задачи, выстраиваю портфолио, расту с проектами." },
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
    const radius = 360; // Увеличено на 20% (300 * 1.2 = 360)
    
    const x = Math.cos(currentAngle - Math.PI / 2) * radius;
    const y = Math.sin(currentAngle - Math.PI / 2) * radius;
    
    return {
      x: x + 400, // центр контейнера (увеличен пропорционально)
      y: y + 400,
      rotation: 0 // Плашки всегда горизонтальны
    };
  };

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-8">
        <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-purple-primary to-blue-primary bg-clip-text text-transparent">
          Экосистема ролей
        </h2>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Каждая роль в нашей экосистеме важна. Выберите свою роль для подробного описания
        </p>
        
        <div className="relative w-[800px] h-[800px] mx-auto flex items-center justify-center">
          {/* Вращающееся колесо с ролями */}
          <div className="absolute inset-0">
            {roles.map((role, index) => {
              const position = calculatePosition(index);
              const isActive = index === activeIndex;
              
              return (
                <div
                  key={role.name}
                  className={`absolute cursor-pointer transition-all duration-500 ease-out rounded-full px-6 py-3 whitespace-nowrap text-sm font-semibold backdrop-blur-sm ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-primary to-blue-primary text-white scale-115 font-bold z-10 shadow-xl' 
                      : 'bg-white/80 text-slate-dark border border-slate-light/30 hover:bg-white hover:border-purple-primary/50 hover:shadow-lg hover:scale-105'
                  }`}
                  style={{
                    left: `${position.x - 60}px`,
                    top: `${position.y - 20}px`,
                    transform: `rotate(${position.rotation}deg)`,
                    boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-soft)',
                  }}
                  onClick={() => handleRoleClick(index)}
                >
                  {role.name}
                </div>
              );
            })}
          </div>

          {/* Центральная сфера с описанием */}
          <div className="relative w-[400px] h-[400px] bg-gradient-to-br from-purple-primary via-blue-primary to-green-accent rounded-full flex flex-col items-center justify-center p-10 text-center shadow-xl z-20">
            <div className="backdrop-blur-sm bg-white/10 rounded-full p-8 w-full h-full flex flex-col items-center justify-center border border-white/20">
              <h3 className="text-3xl font-bold mb-6 text-white">{roles[activeIndex].name}</h3>
              <p className="text-lg text-white/90 leading-relaxed">
                {roles[activeIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleAnimator;