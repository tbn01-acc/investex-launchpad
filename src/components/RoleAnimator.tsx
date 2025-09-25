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

  const getRolodexCardStyle = (index: number) => {
    const totalCards = roles.length;
    const angleStep = (2 * Math.PI) / totalCards;
    const radius = 280;
    
    // Calculate position for this card
    const angle = index * angleStep - (activeIndex * angleStep);
    const x = Math.sin(angle) * radius;
    let z = Math.cos(angle) * radius;
    
    // Calculate rotation and scale
    const rotationY = (angle * 180) / Math.PI;
    const isActive = index === activeIndex;
    const scale = isActive ? 1.2 : 0.9;
    const elevationY = isActive ? -30 : 0;
    
    // Bring active card significantly forward
    if (isActive) {
      z = z + 150; // Push active card much closer to viewer
    }
    
    // Calculate opacity based on z-position (closer cards are more visible)
    const opacity = z > -100 ? 1 : Math.max(0.3, (z + 200) / 300);
    
    return {
      transform: `
        translateX(${x}px) 
        translateZ(${z}px) 
        translateY(${elevationY}px)
        rotateY(${rotationY}deg) 
        scale(${scale})
      `,
      opacity,
      zIndex: isActive ? 1000 : Math.round(z + 300),
    };
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-8">
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Platform base */}
          <div className="absolute bottom-8 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-muted/20 to-muted/40 border border-border/20" 
               style={{ transform: 'perspective(800px) rotateX(75deg)' }}>
            {/* Central axis */}
            <div className="absolute top-1/2 left-1/2 w-4 h-24 bg-gradient-to-t from-border to-muted-foreground/50 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                 style={{ transform: 'translate(-50%, -50%) perspective(800px) rotateX(-75deg)' }}></div>
          </div>
          
          {/* 3D Rolodex container */}
          <div 
            className="relative w-full h-[400px] flex items-center justify-center"
            style={{ 
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            <div 
              className="relative"
              style={{ 
                transformStyle: 'preserve-3d',
                transition: 'transform 0.7s ease-out'
              }}
            >
              {roles.map((role, index) => {
                const style = getRolodexCardStyle(index);
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={role.name}
                    className={`absolute cursor-pointer transition-all duration-700 ease-out rounded-xl border-2 shadow-2xl ${
                      isActive 
                        ? 'bg-primary text-primary-foreground border-primary shadow-primary/30' 
                        : 'bg-background text-foreground border-border hover:border-primary hover:shadow-lg'
                    }`}
                    style={{
                      ...style,
                      width: '280px',
                      height: '180px',
                      transformOrigin: 'center center',
                      backfaceVisibility: 'hidden',
                      left: '-140px',
                      top: '-90px'
                    }}
                    onClick={() => handleRoleClick(index)}
                  >
                    <div className="p-5 h-full flex flex-col justify-between relative">
                      {/* Card corner decoration */}
                      {isActive && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-primary-foreground/20 rounded-full"></div>
                      )}
                      
                      <div>
                        <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-primary-foreground' : 'text-primary'}`}>
                          {role.name}
                        </h3>
                        <p className={`text-xs leading-relaxed ${isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
                          {role.description}
                        </p>
                      </div>
                      
                      {isActive && (
                        <div className="flex items-center justify-between mt-3">
                          <div className="w-6 h-0.5 bg-primary-foreground/30 rounded"></div>
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
          </div>
          
          {/* Control handle */}
          <div className="absolute bottom-16 right-8 w-8 h-8 bg-primary rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
               onClick={() => handleRoleClick((activeIndex + 1) % roles.length)}>
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-foreground/20 to-transparent"></div>
          </div>
          
          {/* Navigation indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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