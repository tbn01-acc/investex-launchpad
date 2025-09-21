import { useState } from "react";
import { ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const segments = {
  "Участники": {
    roles: [
      {
        name: "Инвестор",
        capabilities: [
          "Анализировать проекты и их потенциал",
          "Управлять инвестиционным портфелем",
          "Получать инсайды от команд проектов",
          "Участвовать в принятии стратегических решений"
        ],
        actions: [
          "Просмотр активных проектов",
          "Инвестирование через токенизацию",
          "Торговля долями на вторичном рынке"
        ],
        requests: ["Due Diligence", "ROI анализ", "Диверсификация портфеля"]
      },
      {
        name: "Фаундер",
        capabilities: [
          "Привлекать инвестиции для своего проекта",
          "Находить и собирать команду специалистов",
          "Управлять всеми аспектами развития стартапа",
          "Масштабировать бизнес с поддержкой экспертов"
        ],
        actions: [
          "Создание инвест-пакета",
          "Поиск команды и инвесторов",
          "Управление проектом через платформу"
        ],
        requests: ["Питч-дек", "Бизнес-план", "Поиск CTO"]
      }
    ]
  },
  "Исполнители": {
    roles: [
      {
        name: "Фрилансер",
        capabilities: [
          "Работать над разнообразными проектами",
          "Развивать навыки и повышать рейтинг",
          "Получать доступ к премиум-задачам",
          "Строить долгосрочные отношения с клиентами"
        ],
        actions: [
          "Поиск и отклик на задачи",
          "Портфолио и рейтинговая система",
          "Безопасные сделки через эскроу"
        ],
        requests: ["UI/UX дизайн", "Веб-разработка", "Копирайтинг"]
      },
      {
        name: "Аутсорсер",
        capabilities: [
          "Предоставлять готовые команды под проекты",
          "Управлять ресурсами и распределением задач",
          "Обеспечивать качество и соблюдение сроков",
          "Масштабировать команды под растущие потребности"
        ],
        actions: [
          "Создание и управление командами",
          "Участие в тендерах на проекты",
          "Долгосрочное партнерство"
        ],
        requests: ["Команда разработчиков", "Маркетинговое агентство", "DevOps команда"]
      }
    ]
  },
  "Эксперты": {
    roles: [
      {
        name: "Ментор",
        capabilities: [
          "Направлять стартапы на пути к успеху",
          "Делиться практическим опытом и инсайтами",
          "Помогать избегать типичных ошибок",
          "Строить долгосрочные наставнические отношения"
        ],
        actions: [
          "Менторские сессии и консультации",
          "Участие в стратегических решениях",
          "Networking и связи"
        ],
        requests: ["Стратегический анализ", "Антикризисное управление", "Выход на рынки"]
      },
      {
        name: "Эксперт",
        capabilities: [
          "Консультировать по узкоспециализированным вопросам",
          "Проводить аудиты и оценки",
          "Обучать команды новым технологиям",
          "Участвовать в стратегическом планировании"
        ],
        actions: [
          "Экспертные консультации",
          "Аудит и техническая оценка",
          "Обучение и воркшопы"
        ],
        requests: ["Технический аудит", "Compliance проверка", "AI внедрение"]
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