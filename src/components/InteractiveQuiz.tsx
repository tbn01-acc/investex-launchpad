import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Глобальные категории и конкретные роли
const GLOBAL_CATEGORIES = {
  CAPITAL: "Капитал",
  BUSINESS: "Бизнес", 
  TALENT: "Талант",
  ECOSYSTEM: "Экосистема"
};

const ROLES = {
  // Капитал (4 роли)
  investor: { name: "Инвестор", category: "CAPITAL", description: "Профессиональный инвестор с большим капиталом и опытом в венчурных сделках", leadMagnet: "Эксклюзивный доступ к deal flow топ-проектов", cjm: "/investments/start" },
  coinvestor: { name: "Соинвестор", category: "CAPITAL", description: "Инвестор, участвующий в синдицированных сделках", leadMagnet: "Доступ к закрытым инвестиционным синдикатам", cjm: "/investments/syndicates" },
  collective: { name: "Коллективный инвестор", category: "CAPITAL", description: "Инвестор с небольшим капиталом, инвестирующий через пулы", leadMagnet: "Возможность инвестировать от $100 в лучшие проекты", cjm: "/investments/projects" },
  franchiser: { name: "Франчайзер", category: "CAPITAL", description: "Инвестор в готовые бизнес-модели и франшизы", leadMagnet: "Каталог прибыльных франшиз с проверенной моделью", cjm: "/management-franchises" },
  
  // Бизнес (5 ролей)
  founder: { name: "Фаундер", category: "BUSINESS", description: "Основатель стартапа, создающий новый бизнес с нуля", leadMagnet: "Пошаговое руководство привлечения первых инвестиций", cjm: "/startups/fundraise" },
  cofounder: { name: "Ко-фаундер", category: "BUSINESS", description: "Соучредитель, присоединяющийся к команде стартапа", leadMagnet: "База перспективных стартапов, ищущих ко-фаундеров", cjm: "/startups/find-investors" },
  outsourcer: { name: "Аутсорсер", category: "BUSINESS", description: "Компания, предоставляющая услуги для стартапов", leadMagnet: "Доступ к 500+ растущим стартапам как клиентам", cjm: "/executors" },
  contractor: { name: "Подрядчик", category: "BUSINESS", description: "Исполнитель крупных проектов и контрактов", leadMagnet: "Тендеры и запросы на крупные контракты", cjm: "/executors" },
  partner: { name: "Партнёр", category: "BUSINESS", description: "Стратегический партнер экосистемы", leadMagnet: "Партнерская программа с выгодными условиями", cjm: "/partners" },
  
  // Талант (5 ролей)
  employee: { name: "Сотрудник проекта", category: "TALENT", description: "Специалист, работающий в стартапе", leadMagnet: "Вакансии в стартапах с опционами и equity", cjm: "/employees" },
  jobseeker: { name: "Соискатель", category: "TALENT", description: "Профессионал, ищущий работу в стартапах", leadMagnet: "Карьерный гайд по работе в стартапах", cjm: "/employees" },
  freelancer: { name: "Фрилансер/Эксперт", category: "TALENT", description: "Независимый специалист, предоставляющий услуги", leadMagnet: "Проектная работа в инновационных стартапах", cjm: "/executors" },
  consultant: { name: "Консультант", category: "TALENT", description: "Эксперт, оказывающий консультационные услуги", leadMagnet: "Клиентская база из 200+ стартапов", cjm: "/executors" },
  admin: { name: "Администратор проекта", category: "TALENT", description: "Менеджер, управляющий операциями проекта", leadMagnet: "Обучение проектному управлению в стартапах", cjm: "/project-management" },
  
  // Экосистема (3 роли)
  ambassador: { name: "Амбассадор", category: "ECOSYSTEM", description: "Представитель бренда в экосистеме", leadMagnet: "Программа амбассадорства с вознаграждением", cjm: "/community" },
  blogger: { name: "Лидер мнений/Блогер", category: "ECOSYSTEM", description: "Влиятельный создатель контента", leadMagnet: "Доступ к эксклюзивным историям стартапов", cjm: "/community" },
  superadmin: { name: "Суперадминистратор", category: "ECOSYSTEM", description: "Управляющий платформой", leadMagnet: "Панель управления экосистемой", cjm: "/dashboard" }
};

// Расширенные вопросы на основе SOPRANO и BANT
const quizData = [
  {
    stage: "Ситуация (SOPRANO)",
    question: "Опишите вашу текущую ситуацию:",
    answers: [
      { text: "У меня есть капитал для инвестиций и я ищу перспективные возможности", scores: { investor: 5, coinvestor: 4, collective: 3 } },
      { text: "У меня есть идея/проект и мне нужны ресурсы для развития", scores: { founder: 5, cofounder: 4 } },
      { text: "У меня есть навыки/услуги, которые я могу предложить растущим компаниям", scores: { freelancer: 4, consultant: 4, outsourcer: 3, employee: 3 } },
      { text: "Я хочу быть частью инновационной экосистемы и влиять на её развитие", scores: { ambassador: 4, blogger: 4, partner: 3 } }
    ]
  },
  {
    stage: "Бюджет (BANT)",
    question: "Какими финансовыми ресурсами вы располагаете для инвестиций/участия?",
    answers: [
      { text: "Более $50,000 - готов к крупным венчурным инвестициям", scores: { investor: 5, franchiser: 3 } },
      { text: "$10,000 - $50,000 - рассматриваю умеренные инвестиции", scores: { coinvestor: 5, investor: 2 } },
      { text: "$100 - $10,000 - хочу начать с небольших сумм", scores: { collective: 5 } },
      { text: "Без инвестиций - хочу предложить свои навыки/услуги", scores: { freelancer: 4, employee: 4, consultant: 3, jobseeker: 4 } },
      { text: "У меня есть бизнес и я ищу партнерства", scores: { outsourcer: 5, contractor: 4, partner: 3 } }
    ]
  },
  {
    stage: "Полномочия (BANT)",
    question: "Какой уровень ответственности и влияния вам подходит?",
    answers: [
      { text: "Хочу быть полноценным основателем и принимать все ключевые решения", scores: { founder: 5 } },
      { text: "Готов быть партнером с разделенной ответственностью", scores: { cofounder: 5, partner: 4 } },
      { text: "Предпочитаю роль советника/инвестора без операционной нагрузки", scores: { investor: 5, consultant: 3 } },
      { text: "Хочу работать как исполнитель конкретных задач", scores: { freelancer: 5, contractor: 4, employee: 4 } },
      { text: "Интересует управление процессами и командой", scores: { admin: 5, outsourcer: 3 } }
    ]
  },
  {
    stage: "Потребность (BANT)",
    question: "Какая задача для вас наиболее актуальна прямо сейчас?",
    answers: [
      { text: "Найти качественные проекты для инвестирования", scores: { investor: 5, coinvestor: 4, collective: 3 } },
      { text: "Привлечь инвестиции в свой проект", scores: { founder: 5, cofounder: 4 } },
      { text: "Найти клиентов для моих услуг/бизнеса", scores: { outsourcer: 5, contractor: 4, freelancer: 4, consultant: 3 } },
      { text: "Найти интересную работу или проекты", scores: { jobseeker: 5, employee: 4, freelancer: 3 } },
      { text: "Расширить сеть контактов и влияние", scores: { ambassador: 5, blogger: 4, partner: 3 } }
    ]
  },
  {
    stage: "Временные рамки (BANT)",
    question: "В какие сроки вы планируете достичь результатов?",
    answers: [
      { text: "Срочно, в течение 1-3 месяцев", scores: { jobseeker: 4, freelancer: 3, collective: 2 } },
      { text: "В ближайшие 3-6 месяцев", scores: { founder: 4, coinvestor: 3, employee: 3 } },
      { text: "В течение года", scores: { investor: 4, outsourcer: 3, partner: 3 } },
      { text: "Долгосрочная перспектива (1-3 года)", scores: { investor: 5, franchiser: 4, cofounder: 3 } },
      { text: "Постоянное участие без жестких дедлайнов", scores: { ambassador: 4, blogger: 4, consultant: 3 } }
    ]
  },
  {
    stage: "Опыт (SOPRANO)",
    question: "Какой у вас опыт в венчурной экосистеме?",
    answers: [
      { text: "Опытный инвестор/предприниматель с успешными кейсами", scores: { investor: 5, founder: 4, consultant: 3 } },
      { text: "Есть опыт в бизнесе, но новичок в стартапах", scores: { coinvestor: 4, outsourcer: 4, franchiser: 3 } },
      { text: "Профессионал в своей области, начинающий в венчуре", scores: { freelancer: 4, employee: 4, consultant: 3 } },
      { text: "Полный новичок, хочу начать с малого", scores: { collective: 5, jobseeker: 4, ambassador: 3 } },
      { text: "У меня широкая сеть и влияние в индустрии", scores: { blogger: 5, partner: 4, ambassador: 3 } }
    ]
  },
  {
    stage: "Риски (SOPRANO)",
    question: "Как вы относитесь к рискам?",
    answers: [
      { text: "Готов к высоким рискам ради высокой доходности", scores: { founder: 5, investor: 4 } },
      { text: "Предпочитаю умеренные риски с диверсификацией", scores: { coinvestor: 5, collective: 3 } },
      { text: "Минимизирую риски через проверенные модели", scores: { franchiser: 5, outsourcer: 3 } },
      { text: "Избегаю финансовых рисков, предпочитаю получать стабильный доход", scores: { employee: 5, freelancer: 4, contractor: 4 } },
      { text: "Риски не критичны, т.к. участвую без больших вложений", scores: { ambassador: 4, blogger: 4, admin: 3 } }
    ]
  },
  {
    stage: "Приоритеты (SOPRANO)",
    question: "Что для вас наиболее важно?",
    answers: [
      { text: "Максимальная финансовая отдача от инвестиций", scores: { investor: 5, coinvestor: 4 } },
      { text: "Реализация моей идеи и создание продукта", scores: { founder: 5, cofounder: 4 } },
      { text: "Стабильный доход и карьерный рост", scores: { employee: 5, jobseeker: 4, admin: 3 } },
      { text: "Гибкость, разнообразие проектов и свобода", scores: { freelancer: 5, consultant: 4, contractor: 3 } },
      { text: "Влияние, репутация и нетворкинг", scores: { blogger: 5, ambassador: 4, partner: 3 } }
    ]
  }
];

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (answerScores: Record<string, number>) => {
    const newScores = { ...scores };
    Object.entries(answerScores).forEach(([role, score]) => {
      newScores[role] = (newScores[role] || 0) + score;
    });
    setScores(newScores);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({});
    setShowResult(false);
  };

  const getTopRole = () => {
    const maxScore = Math.max(...Object.values(scores));
    const topRoleKey = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0];
    return ROLES[topRoleKey as keyof typeof ROLES] || ROLES.founder;
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  if (hideQuiz) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-5xl mx-auto shadow-2xl border-2">
          <div className="absolute top-5 right-5 z-10">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox 
                checked={hideQuiz} 
                onCheckedChange={(checked) => setHideQuiz(checked as boolean)}
              />
              <span className="text-sm text-muted-foreground">Больше не показывать</span>
            </label>
          </div>
          
          <div className="p-8 md:p-12">
            {!showResult ? (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Найдите свою роль в экосистеме
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Пройдите квалификационный тест на основе методологий SOPRANO и BANT
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    Этап {currentQuestion + 1} из {quizData.length}: {quizData[currentQuestion].stage}
                  </Badge>
                </div>

                <Progress value={progress} className="w-full mb-8 h-3" />
                
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
                    {quizData[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3 max-w-3xl mx-auto">
                    {quizData[currentQuestion].answers.map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="w-full text-left justify-start p-6 h-auto text-base font-medium hover:border-primary hover:bg-primary/5 hover:scale-[1.02] transition-all leading-relaxed whitespace-normal"
                        onClick={() => handleAnswer(answer.scores)}
                      >
                        <span className="break-words">{answer.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in text-center max-w-3xl mx-auto">
                <Badge variant="outline" className="mb-4 text-base px-4 py-2">
                  {GLOBAL_CATEGORIES[getTopRole().category as keyof typeof GLOBAL_CATEGORIES]}
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  {getTopRole().name}
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  {getTopRole().description}
                </p>
                
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-2">🎁 Ваш персональный лид-магнит:</h3>
                  <p className="text-muted-foreground">{getTopRole().leadMagnet}</p>
                </Card>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" onClick={() => navigate(getTopRole().cjm)} className="text-base px-8">
                    Начать путь → {getTopRole().name}
                  </Button>
                  <Button variant="outline" size="lg" onClick={resetQuiz} className="text-base px-8">
                    Пройти заново
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-6">
                  Результат основан на ваших ответах и методологиях SOPRANO/BANT для точной квалификации
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
