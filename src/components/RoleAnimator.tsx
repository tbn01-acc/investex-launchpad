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
    const baseRadius = 280;
    const maxInactiveZ = baseRadius * 1.875; // maximum Z any inactive card can reach
    
    // Calculate position for this card
    const angle = index * angleStep - (activeIndex * angleStep);
    const isActive = index === activeIndex;
    
    // Use different radius for active vs inactive cards
    const radius = isActive ? baseRadius : baseRadius * 1.875; // 1.5 * 1.25 = 1.875
    let x = Math.sin(angle) * radius;
    let z = Math.cos(angle) * radius;
    
    // Calculate rotation and scale
    const rotationY = (angle * 180) / Math.PI;
    const scale = 1; // Same size for all cards
    const elevationY = isActive ? -30 : 0;
    
    // Bring active card significantly forward and center it
    if (isActive) {
      z = maxInactiveZ + 200; // Ensure active always has the highest Z
      x = 0; // Center active card horizontally
    }
    
    // Calculate opacity based on z-position (closer cards are more visible)
    const opacity = z > -100 ? 1 : Math.max(0.3, (z + 200) / 300);
    
    return {
      transform: `
        translateX(${x}px) 
        translateZ(${z}px) 
        translateY(${elevationY}px)
        rotateY(${isActive ? 0 : rotationY}deg) 
        scale(${scale})
      `,
      opacity,
      zIndex: isActive ? 2000 : Math.round(z + 300), // Higher z-index for active
    };
  };

  const handleNavigation = (direction: 'prev' | 'next' | 'first' | 'last') => {
    setIsRunning(false);
    
    switch (direction) {
      case 'prev':
        setActiveIndex((prev) => (prev - 1 + roles.length) % roles.length);
        break;
      case 'next':
        setActiveIndex((prev) => (prev + 1) % roles.length);
        break;
      case 'first':
        setActiveIndex(0);
        break;
      case 'last':
        setActiveIndex(roles.length - 1);
        break;
    }
    
    setTimeout(() => setIsRunning(true), 5000);
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
          
          
          {/* Bottom Navigation Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            <button
              onClick={() => handleNavigation('first')}
              className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="В начало"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('prev')}
              className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Назад"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="mx-8 px-4 py-2 bg-muted rounded-full">
              <span className="text-sm font-medium text-muted-foreground">
                {activeIndex + 1} / {roles.length}
              </span>
            </div>
            
            <button
              onClick={() => handleNavigation('next')}
              className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Вперед"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('last')}
              className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="В конец"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 17 5-5-5-5M13 17l5-5-5-5"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoleAnimator;