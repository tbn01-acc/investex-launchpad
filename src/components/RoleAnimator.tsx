import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type RoleCategory = "investors" | "creators" | "executors" | "partners";

const roles = [
  { name: "Инвестор", description: "Ищу лучшие стартапы, отрасли, управляю портфелем и рисками.", category: "investors" as RoleCategory },
  { name: "Соинвестор", description: "Доступ к сделкам совместных инвестиций, приватным раундам, аналитике и аукционам.", category: "investors" as RoleCategory },
  { name: "Фаундер", description: "Запускаю стартап, управляю командой, презентуюсь инвесторам.", category: "creators" as RoleCategory },
  { name: "Ко-фаундер", description: "Вхожу в перспективные проекты, улучшаю профиль команды, развиваю идеи.", category: "creators" as RoleCategory },
  { name: "Соучредитель", description: "Вхожу в проекты, получая долю, работаю с лидерами, строю бизнес.", category: "creators" as RoleCategory },
  { name: "Франчайзер", description: "Создаю и управляю франшизами, строю сеть партнеров, масштабирую бизнес.", category: "creators" as RoleCategory },
  { name: "Фрилансер", description: "Работаю над проектами удаленно, выбираю интересные задачи, строю карьеру.", category: "executors" as RoleCategory },
  { name: "Эксперт", description: "Консультирую по узкой специализации, решаю сложные технические задачи.", category: "executors" as RoleCategory },
  { name: "Консультант", description: "Помогаю бизнесу в стратегических вопросах, оптимизирую процессы.", category: "executors" as RoleCategory },
  { name: "Аутсорсер", description: "Расширяю клиентскую базу, предлагаю сервисы проектам и корпорациям.", category: "executors" as RoleCategory },
  { name: "Подрядчик", description: "Подключаюсь к крупным заказам, B2B-кейсам, интегрируюсь в экосистему.", category: "executors" as RoleCategory },
  { name: "Администратор стартапа", description: "Управляю процессами, координирую команду, отвечаю за успех.", category: "executors" as RoleCategory },
  { name: "Сотрудник стартапа", description: "Влияю на успех, расту с командой, получаю репутацию, обучаюсь у лидеров.", category: "executors" as RoleCategory },
  { name: "Соискатель", description: "Ищу работу в перспективном стартапе, хочу строить карьеру в инновационной среде.", category: "executors" as RoleCategory },
  { name: "Партнёр (Affiliate)", description: "Развиваю интеграции, привлекаю трафик, получаю вознаграждение.", category: "partners" as RoleCategory },
  { name: "Амбассадор проекта", description: "Представляю бренд, повышаю лояльность, расширяю сообщество.", category: "partners" as RoleCategory },
  { name: "Лидер мнений/Блогер", description: "Создаю контент, делюсь экспертизой, влияю на аудиторию.", category: "partners" as RoleCategory }
];

const categories = [
  { id: "investors" as RoleCategory, label: "Инвесторы" },
  { id: "creators" as RoleCategory, label: "Создатели" },
  { id: "executors" as RoleCategory, label: "Исполнители" },
  { id: "partners" as RoleCategory, label: "Партнеры" }
];

const RoleAnimator = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const filteredRoles = selectedCategory 
    ? roles.filter(role => role.category === selectedCategory)
    : roles;

  useEffect(() => {
    if (isRunning && !isMobile) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredRoles.length);
      }, 3500);
    } else if (isRunning && isMobile && carouselApi) {
      intervalRef.current = setInterval(() => {
        carouselApi.scrollNext();
      }, 3500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isMobile, carouselApi, filteredRoles.length]);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setActiveIndex(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  const handleRoleClick = (index: number) => {
    if (isMobile && carouselApi) {
      carouselApi.scrollTo(index);
    } else {
      setActiveIndex(index);
    }
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 5000);
  };

  const getRolodexCardStyle = (index: number) => {
    const totalCards = filteredRoles.length;
    const angleStep = (2 * Math.PI) / totalCards;
    const baseRadius = 280;
    
    // Calculate position for this card
    const angle = index * angleStep - (activeIndex * angleStep);
    const isActive = index === activeIndex;
    
    // Use different radius for active vs inactive cards
    const radius = isActive ? baseRadius : baseRadius * 1.875; // 1.5 * 1.25 = 1.875
    let x = Math.sin(angle) * radius;
    let z = Math.cos(angle) * radius;
    
    // Calculate rotation and scale
    const rotationY = (angle * 180) / Math.PI;
    const scale = isActive ? 0.67 : 1; // Active card smaller (1/1.5 = 0.67)
    const elevationY = 0; // Remove elevation for active card
    
    // Bring active card forward and center it, but don't elevate
    if (isActive) {
      z = baseRadius * 2.5; // Fixed forward position
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
    
    if (isMobile && carouselApi) {
      switch (direction) {
        case 'prev':
          carouselApi.scrollPrev();
          break;
        case 'next':
          carouselApi.scrollNext();
          break;
        case 'first':
          carouselApi.scrollTo(0);
          break;
        case 'last':
          carouselApi.scrollTo(filteredRoles.length - 1);
          break;
      }
    } else {
      switch (direction) {
        case 'prev':
          setActiveIndex((prev) => (prev - 1 + filteredRoles.length) % filteredRoles.length);
          break;
        case 'next':
          setActiveIndex((prev) => (prev + 1) % filteredRoles.length);
          break;
        case 'first':
          setActiveIndex(0);
          break;
        case 'last':
          setActiveIndex(filteredRoles.length - 1);
          break;
      }
    }
    
    setTimeout(() => setIsRunning(true), 5000);
  };

  const handleCategorySelect = (category: RoleCategory | null) => {
    setSelectedCategory(category);
    setActiveIndex(0);
    setIsRunning(false);
    if (isMobile && carouselApi) {
      carouselApi.scrollTo(0);
    }
    setTimeout(() => setIsRunning(true), 5000);
  };

  if (isMobile) {
    return (
      <section className="py-12 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Сообщество профессионалов</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto">
              От идеи до реализации — каждая роль важна для успеха проектов
            </p>
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => handleCategorySelect(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Все роли
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <Carousel
            setApi={setCarouselApi}
            className="w-full max-w-xs mx-auto"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {filteredRoles.map((role, index) => (
                <CarouselItem key={role.name}>
                  <div className="p-1">
                    <div className="bg-background border-2 border-border rounded-xl shadow-lg p-4 h-[160px] flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-primary text-center">
                          {role.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground text-center">
                          {role.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center mt-4">
                        <div className="w-12 h-1 bg-primary/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Сообщество профессионалов</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto">
            От идеи до реализации — каждая роль важна для успеха проектов
          </p>
        </div>

        {/* Category filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-6 py-3 rounded-xl text-base font-semibold transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground shadow-xl scale-105'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
            }`}
          >
            Все роли
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-6 py-3 rounded-xl text-base font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-primary text-primary-foreground shadow-xl scale-105'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Platform base */}
          <div className="absolute bottom-20 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-muted/20 to-muted/40 border border-border/20" 
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
              {filteredRoles.map((role, index) => {
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
                              {index + 1} / {filteredRoles.length}
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
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6">
            <button
              onClick={() => handleNavigation('first')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="В начало"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m11 17-5-5 5-5M18 17l-5-5 5-5"/>
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('prev')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Назад"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            
            <div className="mx-4 sm:mx-8 px-3 py-1 sm:px-4 sm:py-2 bg-muted rounded-full">
              <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                {activeIndex + 1} / {filteredRoles.length}
              </span>
            </div>
            
            <button
              onClick={() => handleNavigation('next')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="Вперед"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button
              onClick={() => handleNavigation('last')}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
              title="В конец"
            >
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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