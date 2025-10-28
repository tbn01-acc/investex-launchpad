import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const segments = {
  "Инвесторы": {
    roles: [
      {
        name: "Инвестор",
        capabilities: [
          "Использовать AI-симулятор для прогнозирования успеха проектов и оценки рисков",
          "Наблюдать за развитием проектов в реальном времени через панели KPI",
          "Покупать и продавать доли в стартапах на Вторичном рынке для управления ликвидностью",
          "Получать доступ к эксклюзивным сделкам и проверенным стартапам"
        ],
        actions: [
          "Аккредитация",
          "Посевные раунды",
          "Синдикаты",
          "Вторичный рынок"
        ],
        requests: ["Найти проект", "Оценить риски", "Продать долю"]
      },
      {
        name: "Соинвестор",
        capabilities: [
          "Участвовать в синдицированных сделках и коллективных инвестициях с пониженным порогом входа",
          "Получать доступ к продвинутой AI-аналитике и отчетам для принятия взвешенных решений",
          "Торговать долями на Вторичном рынке для гибкого управления совместным портфелем",
          "Использовать отслеживание KPI в реальном времени для прозрачного мониторинга совместных инвестиций"
        ],
        actions: [
          "Вступление в клуб",
          "Сделки совместного инвестирования",
          "Приватные раунды",
          "Аукционы долей"
        ],
        requests: ["Найти синдикат", "Анализ отчета", "Купить на аукционе"]
      },
      {
        name: "Франчайзи",
        capabilities: [
          "Инвестировать в готовую бизнес-модель с проверенной концепцией и поддержкой франчайзера",
          "Использовать AI-помощника для оценки окупаемости и выбора оптимальной локации",
          "Получать доступ к корпоративным инструментам, обучению и маркетинговым материалам",
          "Управлять своей точкой через единую систему с интеграцией в сеть франчайзера"
        ],
        actions: [
          "Выбор франшизы",
          "Анализ окупаемости",
          "Открытие локации",
          "Масштабирование"
        ],
        requests: ["Найти франшизу", "Оценить ROI", "Получить поддержку"]
      }
    ]
  },
  "Создатели": {
    roles: [
      {
        name: "Фаундер",
        capabilities: [
          "Создавать профессиональный инвестиционный пакет с помощью Мастера (бизнес-план, финмодель, комната данных)",
          "Использовать AI-конструктор для подбора идеальной команды на основе навыков и синергии",
          "Управлять проектом, задачами и KPI в едином рабочем пространстве, обеспечивая прозрачность для инвесторов",
          "Получать прямой доступ к релевантным инвесторам и отслеживать их интерес к вашему проекту"
        ],
        actions: [
          "Создание проекта",
          "Сборка команды",
          "Привлечение Seed",
          "Выход на рынок"
        ],
        requests: ["Собрать пакет", "Найти инвестора", "Нанять эксперта"]
      },
      {
        name: "Ко-фаундер",
        capabilities: [
          "Находить проекты, идеально соответствующие вашим компетенциям, с помощью AI-подбора",
          "Анализировать потенциал стартапов, используя 'Симулятор Успеха' и панели KPI в реальном времени",
          "Интегрироваться в проекты с уже выстроенной системой управления и прозрачной отчетностью",
          "Получать юридическую поддержку и шаблоны для оформления партнерских отношений"
        ],
        actions: [
          "Поиск проекта",
          "Тех. аудит",
          "Вхождение в долю",
          "Рост с командой"
        ],
        requests: ["Найти команду", "Оценить идею", "Оформить партнерство"]
      },
      {
        name: "Соучредитель",
        capabilities: [
          "Находить проекты, ищущие стратегических партнеров с долевым участием",
          "Оценивать бизнес-модель и финансовые прогнозы с помощью встроенных AI-инструментов",
          "Использовать систему токенизации для прозрачного и юридически чистого оформления доли",
          "Присоединяться к командам, работающим в передовой системе управления проектами"
        ],
        actions: [
          "Стратег. партнерство",
          "Управление долей",
          "Развитие бизнеса",
          "Подготовка к продаже"
        ],
        requests: ["Найти проект для слияния", "Войти в совет", "Масштабировать бизнес"]
      },
      {
        name: "Франчайзер",
        capabilities: [
          "Создавать и управлять франчайзинговыми программами с помощью встроенных инструментов",
          "Использовать AI-подбор для поиска потенциальных франчайзи по всей стране",
          "Получать доступ к системе управления франчайзинговой сетью и CRM",
          "Размещать франшизы в каталоге инвестиционных возможностей для привлечения капитала"
        ],
        actions: [
          "Создание франшизы",
          "Поиск франчайзи",
          "Управление сетью",
          "Масштабирование"
        ],
        requests: ["Создать программу", "Найти партнера", "Подключить локацию"]
      }
    ]
  },
  "Исполнители": {
    roles: [
      {
        name: "Фрилансер",
        capabilities: [
          "Работать удаленно над проектами любой сложности с гибким графиком",
          "Получать задачи через интегрированную систему управления проектами",
          "Строить рейтинг и репутацию на основе выполненных проектов",
          "Получать оплату в токенах перспективных стартапов как дополнительный доход"
        ],
        actions: [
          "Создание профиля",
          "Поиск проектов",
          "Выполнение задач",
          "Получение отзывов"
        ],
        requests: ["Найти проект", "Настроить профиль", "Получить оплату"]
      },
      {
        name: "Эксперт",
        capabilities: [
          "Консультировать по узкой специализации в технических вопросах",
          "Получать доступ к сложным задачам, требующим глубокой экспертизы",
          "Участвовать в технических аудитах и оценке проектов",
          "Строить экспертную репутацию и повышать стоимость консультаций"
        ],
        actions: [
          "Экспертная оценка",
          "Технический аудит",
          "Консультирование",
          "Повышение статуса"
        ],
        requests: ["Провести аудит", "Дать экспертизу", "Повысить рейтинг"]
      },
      {
        name: "Консультант",
        capabilities: [
          "Помогать стартапам в решении бизнес-задач и стратегическом планировании",
          "Оптимизировать бизнес-процессы и повышать эффективность команд",
          "Получать доступ к аналитике и данным для качественных рекомендаций",
          "Развивать долгосрочные отношения с успешными проектами"
        ],
        actions: [
          "Бизнес-консультирование",
          "Стратегическое планирование",
          "Процессный аудит",
          "Менторство"
        ],
        requests: ["Найти клиента", "Провести анализ", "Составить стратегию"]
      },
      {
        name: "Аутсорсер",
        capabilities: [
          "Интегрировать свою команду в проекты как единое целое через нашу систему управления проектами и клиентами",
          "Получать долгосрочные контракты от проектов с подтвержденным финансированием",
          "Повышать рейтинг своей компании на основе реальных ключевых показателей и успешно завершенных спринтов",
          "Участвовать в тендерах, где AI помогает подобрать наиболее релевантные для вас проекты"
        ],
        actions: [
          "Профиль компании",
          "Участие в тендерах",
          "Долгосрочный контракт",
          "Партнерство"
        ],
        requests: ["Найти тендер", "Предложить услугу", "Собрать команду"]
      },
      {
        name: "Подрядчик",
        capabilities: [
          "Получать доступ к крупным B2B-заказам от всей экосистемы Invest-Ex",
          "Управлять выполнением контракта через прозрачную систему задач и отчетности",
          "Стать сертифицированным партнером, подтвердив свою надежность через нашу систему оценки",
          "Использовать платформу для поиска субподрядчиков и управления всей цепочкой работ"
        ],
        actions: [
          "Аккредитация",
          "Крупный B2B-заказ",
          "Сертификация",
          "Управление цепочкой"
        ],
        requests: ["Найти подряд", "Стать партнером", "Найти субподрядчика"]
      }
    ]
  },
  "Сотрудники": {
    roles: [
      {
        name: "Администратор стартапа",
        capabilities: [
          "Управлять всеми аспектами проекта в единой среде: задачи, KPI, CRM, финансы и комната данных",
          "Использовать AI-советника для выявления рисков и оптимизации распределения ресурсов",
          "Автоматизировать отчетность для инвесторов и стейкхолдеров на основе панелей KPI в реальном времени",
          "Развивать свои навыки управления по карьерному треку, становясь топ-менеджером"
        ],
        actions: [
          "Карьера менеджера",
          "Управление KPI",
          "Автоматизация отчетов",
          "Топ-менеджмент"
        ],
        requests: ["Настроить панель", "Оптимизировать ресурсы", "Повысить уровень"]
      },
      {
        name: "Сотрудник стартапа",
        capabilities: [
          "Строить свою карьеру по персональному треку, 'прокачивая' навыки и повышая свой уровень",
          "Получать часть вознаграждения в виде токенизированных долей (опционов) проекта",
          "Работать в прозрачной среде с четкими показателями и задачами",
          "Получать доступ к базе знаний и курсам для постоянного профессионального роста"
        ],
        actions: [
          "Карьерный трек",
          "Получение опциона",
          "Повышение уровня",
          "Менторство"
        ],
        requests: ["Найти вакансию", "Прокачать навык", "Получить долю"]
      },
      {
        name: "Соискатель",
        capabilities: [
          "Находить вакансии от лучших технологических компаний и стартапов",
          "Строить свою карьеру по персональному треку, повышая свой уровень",
          "Получать предложения, соответствующие вашим навыкам, с помощью AI-подбора",
          "Работать в прозрачной среде с четкими показателями и задачами"
        ],
        actions: [
          "Создание резюме",
          "Поиск вакансий",
          "Повышение уровня",
          "Получение оффера"
        ],
        requests: ["Найти вакансию", "Откликнуться", "Пройти аттестацию"]
      }
    ]
  },
  "Партнеры": {
    roles: [
      {
        name: "Партнёр (Affiliate)",
        capabilities: [
          "Получать вознаграждение за каждого активного пользователя, привлеченного в экосистему",
          "Использовать панель с аналитикой в реальном времени для отслеживания эффективности",
          "Предлагать своей аудитории уникальные инструменты, которых нет на других платформах",
          "Получать готовые материалы и поддержку персонального менеджера"
        ],
        actions: [
          "Партнерская программа",
          "Привлечение трафика",
          "Аналитика",
          "Рост сети"
        ],
        requests: ["Получить ссылку", "Смотреть панель", "Связаться с менеджером"]
      },
      {
        name: "Амбассадор проекта",
        capabilities: [
          "Стать лицом одного из прорывных проектов экосистемы Invest-Ex",
          "Получать вознаграждение, включая долю (токены) в представляемом проекте",
          "Использовать платформу для прямого общения с командой и инвесторами проекта",
          "Получать эксклюзивный доступ к мероприятиям и инсайтам всей экосистемы"
        ],
        actions: [
          "Выбор проекта",
          "Продвижение бренда",
          "Получение доли",
          "Участие в жизни проекта"
        ],
        requests: ["Найти проект", "Стать амбассадором", "Создать контент"]
      },
      {
        name: "Лидер мнений/Блогер",
        capabilities: [
          "Получать эксклюзивный доступ к данным и AI-аналитике для создания уникального контента",
          "Сотрудничать с самыми перспективными стартапами платформы для обзоров и спецпроектов",
          "Монетизировать свою экспертизу, становясь платным консультантом для проектов",
          "Участвовать в партнерской программе, получая доход от привлеченной аудитории"
        ],
        actions: [
          "Создание контента",
          "Сотрудничество",
          "Монетизация",
          "Рост аудитории"
        ],
        requests: ["Найти тему", "Сделать обзор", "Провести консультацию"]
      }
    ]
  }
};

// Маппинг ключей ролей на отображаемые названия
const roleKeyToName: Record<string, string> = {
  investor: "Инвестор",
  coinvestor: "Соинвестор",
  franchisee: "Франчайзи",
  founder: "Фаундер",
  cofounder: "Ко-фаундер",
  partner: "Партнёр (Affiliate)",
  copartner: "Соучредитель",
  expert: "Эксперт",
  consultant: "Консультант",
  jobseeker: "Соискатель",
  employee: "Сотрудник стартапа",
  blogger: "Лидер мнений/Блогер",
  ambassador: "Амбассадор проекта",
  freelancer: "Фрилансер",
  outsourcer: "Аутсорсер",
  contractor: "Подрядчик",
  franchiser: "Франчайзер",
  administrator: "Администратор стартапа"
};

// Маппинг названий ролей на их группы
const roleToGroup: Record<string, string> = {
  "Инвестор": "Инвесторы",
  "Соинвестор": "Инвесторы",
  "Франчайзи": "Инвесторы",
  "Фаундер": "Создатели",
  "Ко-фаундер": "Создатели",
  "Соучредитель": "Создатели",
  "Франчайзер": "Создатели",
  "Фрилансер": "Исполнители",
  "Эксперт": "Исполнители",
  "Консультант": "Исполнители",
  "Аутсорсер": "Исполнители",
  "Подрядчик": "Исполнители",
  "Администратор стартапа": "Сотрудники",
  "Сотрудник стартапа": "Сотрудники",
  "Соискатель": "Сотрудники",
  "Партнёр (Affiliate)": "Партнеры",
  "Амбассадор проекта": "Партнеры",
  "Лидер мнений/Блогер": "Партнеры"
};

interface RolePathSectionProps {
  initialRole?: string | null;
}

const RolePathSection = ({ initialRole }: RolePathSectionProps) => {
  // Преобразуем initialRole из ключа в отображаемое название
  const initialRoleName = initialRole ? roleKeyToName[initialRole] || null : null;
  const initialGroupName = initialRoleName ? roleToGroup[initialRoleName] || "Инвесторы" : "Инвесторы";
  
  // Находим данные начальной роли
  const getInitialRoleData = () => {
    if (!initialRoleName || !initialGroupName) return segments["Инвесторы"].roles[0];
    const group = segments[initialGroupName as keyof typeof segments];
    return group?.roles?.find(role => role.name === initialRoleName) || segments["Инвесторы"].roles[0];
  };
  
  const [activeGroup, setActiveGroup] = useState<string | null>(initialGroupName);
  const [activeRole, setActiveRole] = useState<string | null>(initialRoleName || "Инвестор");
  const [selectedRoleData, setSelectedRoleData] = useState<any>(getInitialRoleData());

  // Обновляем выбранную роль при изменении initialRole (после прохождения квиза)
  useEffect(() => {
    if (initialRole) {
      const roleName = roleKeyToName[initialRole] || null;
      const groupName = roleName ? roleToGroup[roleName] || "Инвесторы" : "Инвесторы";
      
      if (roleName && groupName) {
        const group = segments[groupName as keyof typeof segments];
        const roleData = group?.roles?.find(role => role.name === roleName);
        
        if (roleData) {
          setActiveGroup(groupName);
          setActiveRole(roleName);
          setSelectedRoleData(roleData);
        }
      }
    }
  }, [initialRole]);

  const handleGroupClick = (groupName: string) => {
    if (activeGroup === groupName) {
      setActiveGroup(null);
      setActiveRole(null);
      setSelectedRoleData(null);
    } else {
      setActiveGroup(groupName);
      const group = segments[groupName as keyof typeof segments];
      const firstRole = group?.roles?.[0];
      if (firstRole) {
        setActiveRole(firstRole.name);
        setSelectedRoleData(firstRole);
      }
    }
  };

  const handleRoleClick = (roleName: string, roleData: any) => {
    setActiveRole(roleName);
    setSelectedRoleData(roleData);
  };

  // Function to get reordered roles with selected role at the top
  const getReorderedRoles = (roles: any[]) => {
    if (!activeRole) return roles;
    const activeRoleIndex = roles.findIndex(role => role.name === activeRole);
    if (activeRoleIndex === -1) return roles;
    
    const activeRoleData = roles[activeRoleIndex];
    const otherRoles = roles.filter((_, index) => index !== activeRoleIndex);
    return [activeRoleData, ...otherRoles];
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Ваш путь к успеху</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Invest-Ex создан для каждого, кто стремится к развитию. Выберите, кто вы, и узнайте, как мы можем помочь вам достичь целей.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
          {/* Левая колонка - Аккордеон */}
          <div className="w-full lg:flex-1 space-y-4">
            {Object.entries(segments).map(([groupName, group]) => (
              <div 
                key={groupName}
                className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 ${
                  activeGroup === groupName ? 'border-primary shadow-card' : 'border-border'
                }`}
              >
                <div 
                  className={`p-4 cursor-pointer font-semibold text-lg flex justify-between items-center transition-all duration-300 ${
                    activeGroup === groupName && activeRole ? 'hidden lg:flex' : 'flex'
                  } hover:bg-muted/50`}
                  onClick={() => handleGroupClick(groupName)}
                >
                  {groupName}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                    activeGroup === groupName ? 'rotate-180' : ''
                  }`} />
                </div>
                
                <div className={`transition-all duration-400 overflow-hidden ${
                  activeGroup === groupName ? 'max-h-[2000px]' : 'max-h-0'
                }`}>
                  <div className="p-2 space-y-2">
                    {group.roles.map((role) => (
                      <div key={role.name}>
                        <div 
                          className={`p-2 md:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            activeRole === role.name 
                              ? 'bg-primary text-primary-foreground font-semibold text-base'
                              : 'bg-background border border-border hover:border-primary hover:bg-muted/50 text-base'
                          }`}
                          onClick={() => handleRoleClick(role.name, role)}
                        >
                          {role.name}
                        </div>
                        
                        {/* Mobile content - показывается сразу под выбранной ролью */}
                        {activeRole === role.name && (
                          <div className="lg:hidden bg-card p-4 mt-2 rounded-lg shadow-card">
                            <h3 className="text-xl font-bold text-foreground mb-4">Вы сможете</h3>
                            
                            <ul className="space-y-2 mb-6">
                              {role.capabilities.map((capability: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                                  <span className="text-sm text-foreground">{capability}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="border-t border-border pt-4 mb-4">
                              <h4 className="text-base font-semibold mb-3 text-foreground">Возможности</h4>
                              <div className="text-center space-y-2">
                                <div className="bg-secondary/10 border border-secondary/20 p-2 rounded-lg text-sm font-medium text-foreground">
                                  {role.actions[0]}
                                </div>
                                <div className="flex justify-center gap-2 flex-wrap">
                                  {role.actions.slice(1).map((action: string, index: number) => (
                                    <div key={index} className="bg-muted border border-border p-2 rounded-lg text-xs text-foreground">
                                      {action}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="text-center">
                              <h4 className="text-base font-semibold mb-3 text-foreground">Популярное</h4>
                              <div className="flex justify-center gap-2 flex-wrap">
                                {role.requests.map((request: string, index: number) => (
                                  <Button 
                                    key={index}
                                    variant="outline"
                                    size="sm" 
                                    className="rounded-full px-3 text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                                  >
                                    {request}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Правая колонка - Детали роли (только на desktop) */}
          <div className="hidden lg:block w-full lg:flex-1 bg-card p-4 sm:p-6 lg:p-8 rounded-lg shadow-card min-h-[400px] lg:min-h-[600px] lg:sticky lg:top-24">
            {selectedRoleData ? (
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Вы сможете</h3>
                
                <ul className="space-y-3 mb-8">
                  {selectedRoleData.capabilities.map((capability: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary mt-1 flex-shrink-0" size={18} />
                      <span className="text-base text-foreground">{capability}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6 mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Возможности</h4>
                  <div className="text-center space-y-3">
                    <div className="bg-secondary/10 border border-secondary/20 p-3 rounded-lg text-base font-medium text-foreground">
                      {selectedRoleData.actions[0]}
                    </div>
                    <div className="flex justify-center gap-3 flex-wrap">
                      {selectedRoleData.actions.slice(1).map((action: string, index: number) => (
                        <div key={index} className="bg-muted border border-border p-2 rounded-lg text-sm text-foreground">
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Популярное</h4>
                  <div className="flex justify-center gap-3 flex-wrap">
                    {selectedRoleData.requests.map((request: string, index: number) => (
                      <Button 
                        key={index}
                        variant="outline"
                        size="sm" 
                        className="rounded-full px-4 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                      >
                        {request}
                      </Button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <h3 className="text-2xl font-bold text-muted-foreground mb-4">
                    Выберите роль
                  </h3>
                  <p className="text-muted-foreground">
                    Откройте группу и выберите роль, чтобы увидеть подробную информацию
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolePathSection;