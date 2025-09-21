import { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const segments = {
  "Участники": {
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
        name: "Коллективный инвестор",
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
      }
    ]
  },
  "Исполнители": {
    roles: [
      {
        name: "Фрилансер/Эксперт/Консультант",
        capabilities: [
          "Развиваться по карьерному треку, повышая свой уровень и открывая доступ к премиум-проектам",
          "Получать задачи через интегрированную систему управления проектами",
          "Создавать портфолио, подкрепленное реальными показателями и отзывами из проектов",
          "Получать оплату в виде доли (токенов) в перспективных стартапах"
        ],
        actions: [
          "Профиль эксперта",
          "Проектная работа",
          "Повышение уровня",
          "Консультации"
        ],
        requests: ["Найти заказ", "Пройти аттестацию", "Получить долю"]
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
        name: "Администратор проекта",
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
        name: "Сотрудник проекта",
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

const RolePathSection = () => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<string | null>(null);
  const [selectedRoleData, setSelectedRoleData] = useState<any>(null);

  const handleGroupClick = (groupName: string) => {
    if (activeGroup === groupName) {
      setActiveGroup(null);
      setActiveRole(null);
      setSelectedRoleData(null);
    } else {
      setActiveGroup(groupName);
      setActiveRole(null);
      setSelectedRoleData(null);
    }
  };

  const handleRoleClick = (roleName: string, roleData: any) => {
    setActiveRole(roleName);
    setSelectedRoleData(roleData);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Выберите свой путь к успеху</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Invest-Ex создан для каждого, кто стремится к развитию. Выберите, кто вы, и узнайте, как мы можем помочь вам достичь целей.
        </p>
        
        <div className="flex gap-10 items-start">
          {/* Левая колонка - Аккордеон */}
          <div className="flex-1 space-y-4">
            {Object.entries(segments).map(([groupName, group]) => (
              <div 
                key={groupName}
                className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 ${
                  activeGroup === groupName ? 'border-primary shadow-lg' : 'border-border'
                }`}
              >
                <div 
                  className={`p-6 cursor-pointer font-bold text-xl flex justify-between items-center transition-all duration-300 ${
                    activeGroup === groupName && activeRole ? 'hidden' : 'block'
                  }`}
                  onClick={() => handleGroupClick(groupName)}
                >
                  {groupName}
                  <ChevronDown className={`transition-transform duration-300 ${
                    activeGroup === groupName ? 'rotate-180' : ''
                  }`} />
                </div>
                
                <div className={`transition-all duration-400 overflow-hidden ${
                  activeGroup === groupName ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="p-2 space-y-2">
                    {group.roles.map((role) => (
                      <div 
                        key={role.name}
                        className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                          activeRole === role.name 
                            ? 'bg-primary text-primary-foreground font-bold text-xl'
                            : 'bg-background border border-border hover:border-primary text-lg'
                        }`}
                        onClick={() => handleRoleClick(role.name, role)}
                      >
                        {role.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Правая колонка - Детали роли */}
          <div className="flex-1 bg-white p-10 rounded-3xl shadow-lg min-h-[600px] sticky top-24">
            {selectedRoleData ? (
              <div>
                <h3 className="text-3xl font-bold text-primary mb-6">Вы сможете</h3>
                
                <ul className="space-y-4 mb-8">
                  {selectedRoleData.capabilities.map((capability: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                      <span className="text-lg">{capability}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-8 mb-8">
                  <h4 className="text-xl font-semibold mb-4">Варианты действий</h4>
                  <div className="text-center space-y-4">
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-lg font-medium">
                      {selectedRoleData.actions[0]}
                    </div>
                    <div className="flex justify-center gap-4">
                      {selectedRoleData.actions.slice(1).map((action: string, index: number) => (
                        <div key={index} className="bg-white border border-border p-3 rounded-xl text-sm">
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-4">Популярные запросы</h4>
                  <div className="flex justify-center gap-4 flex-wrap">
                    {selectedRoleData.requests.map((request: string, index: number) => (
                      <Button 
                        key={index}
                        variant="default"
                        size="sm" 
                        className="rounded-full px-6 hover:-translate-y-1 transition-all duration-200"
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