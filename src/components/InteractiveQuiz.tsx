import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const quizData = [
  {
    question: "Какова ваша основная цель в мире технологий и стартапов?",
    answers: [
      { text: "Приумножить капитал, инвестируя в перспективные идеи", scores: { "Инвестор": 3, "Соинвестор": 2 } },
      { text: "Воплотить собственную идею в жизнь, создав продукт с нуля", scores: { "Фаундер": 3, "Ко-фаундер": 2 } },
      { text: "Применить свои профессиональные навыки в интересных проектах", scores: { "Фрилансер/Эксперт/Консультант": 3, "Сотрудник проекта": 2, "Соискатель": 3 } },
      { text: "Оказывать услуги и находить крупных клиентов для своей компании", scores: { "Аутсорсер": 3, "Подрядчик": 2 } }
    ]
  },
  {
    question: "Какой стиль работы вам ближе?",
    answers: [
      { text: "Стратегическое планирование и принятие ключевых решений", scores: { "Фаундер": 2, "Инвестор": 2, "Администратор проекта": 1 } },
      { text: "Глубокое погружение в свою область экспертизы и выполнение конкретных задач", scores: { "Фрилансер/Эксперт/Консультант": 2, "Сотрудник проекта": 2, "Соискатель": 2 } },
      { text: "Поиск партнеров и развитие деловых связей", scores: { "Ко-фаундер": 2, "Партнёр (Affiliate)": 2, "Амбассадор проекта": 1 } },
      { text: "Анализ рынка и оценка финансовых рисков", scores: { "Инвестор": 3, "Соинвестор": 2 } }
    ]
  },
  {
    question: "Как вы относитесь к риску?",
    answers: [
      { text: "Я готов к высоким рискам ради прорывного результата", scores: { "Фаундер": 3, "Инвестор": 2 } },
      { text: "Я предпочитаю работать с проверенными командами и понятными бизнес-моделями", scores: { "Соинвестор": 2, "Соучредитель": 2 } },
      { text: "Я минимизирую риски, опираясь на свой опыт и репутацию", scores: { "Фрилансер/Эксперт/Консультант": 2, "Аутсорсер": 1 } },
      { text: "Я ищу стабильность и возможность карьерного роста", scores: { "Сотрудник проекта": 3, "Администратор проекта": 2, "Соискатель": 3 } }
    ]
  },
  {
    question: "Что для вас важнее в команде?",
    answers: [
      { text: "Возможность быть лидером и вести команду за собой", scores: { "Фаундер": 3, "Администратор проекта": 2 } },
      { text: "Быть ключевым партнером, влияющим на стратегию", scores: { "Ко-фаундер": 3, "Соучредитель": 2 } },
      { text: "Быть ценным специалистом в сильной команде", scores: { "Сотрудник проекта": 3, "Фрилансер/Эксперт/Консультант": 2, "Соискатель": 3 } },
      { text: "Наблюдать за работой команды со стороны, доверяя ее экспертизе", scores: { "Инвестор": 3 } }
    ]
  },
  {
    question: "Какой результат на платформе был бы для вас идеальным?",
    answers: [
      { text: "Найти 'единорога' и получить десятикратную прибыль", scores: { "Инвестор": 3, "Соинвестор": 2 } },
      { text: "Запустить свой проект и привлечь инвестиции", scores: { "Фаундер": 3 } },
      { text: "Найти работу мечты в инновационной компании", scores: { "Сотрудник проекта": 2, "Соискатель": 3 } },
      { text: "Расширить свою сеть контактов и найти новые возможности для бизнеса", scores: { "Партнёр (Affiliate)": 3, "Лидер мнений/Блогер": 2 } }
    ]
  }
];

const roleResults = {
  "Инвестор": { name: "Инвестор", description: "Ищу лучшие стартапы, отрасли, управляю портфелем и рисками." },
  "Соинвестор": { name: "Соинвестор", description: "Доступ к сделкам совместных инвестиций, приватным раундам, аналитике и аукционам." },
  "Фаундер": { name: "Фаундер", description: "Запускаю стартап, управляю командой, презентуюсь инвесторам." },
  "Ко-фаундер": { name: "Ко-фаундер", description: "Вхожу в перспективные проекты, улучшаю профиль команды, развиваю идеи." },
  "Соучредитель": { name: "Соучредитель", description: "Вхожу в проекты, получая долю, работаю с лидерами, строю бизнес." },
  "Фрилансер/Эксперт/Консультант": { name: "Фрилансер/Эксперт/Консультант", description: "Получаю уникальные задачи, выстраиваю портфолио, расту с проектами." },
  "Аутсорсер": { name: "Аутсорсер", description: "Расширяю клиентскую базу, предлагаю сервисы проектам и корпорациям." },
  "Подрядчик": { name: "Подрядчик", description: "Подключаюсь к крупным заказам, B2B-кейсам, интегрируюсь в экосистему." },
  "Администратор проекта": { name: "Администратор проекта", description: "Управляю процессами, координирую команду, отвечаю за успех." },
  "Сотрудник проекта": { name: "Сотрудник проекта", description: "Влияю на успех, расту с командой, получаю репутацию, обучаюсь у лидеров." },
  "Соискатель": { name: "Соискатель", description: "Ищу работу в перспективном стартапе, хочу строить карьеру в инновационной среде." },
  "Партнёр (Affiliate)": { name: "Партнёр (Affiliate)", description: "Развиваю интеграции, привлекаю трафик, получаю вознаграждение." },
  "Амбассадор проекта": { name: "Амбассадор проекта", description: "Представляю бренд, повышаю лояльность, расширяю сообщество." },
  "Лидер мнений/Блогер": { name: "Лидер мнений/Блогер", description: "Создаю контент, делюсь экспертизой, влияю на аудиторию." }
};

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);

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
    const topRole = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0];
    return roleResults[topRole as keyof typeof roleResults] || roleResults["Фаундер"];
  };

  const progress = ((currentQuestion) / quizData.length) * 100;

  if (hideQuiz) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl relative max-w-4xl mx-auto overflow-hidden">
          <div className="absolute top-5 right-5 text-sm text-muted-foreground">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox 
                checked={hideQuiz} 
                onCheckedChange={(checked) => setHideQuiz(checked as boolean)}
              />
              <span>Больше не показывать</span>
            </label>
          </div>
          
          <div className="p-8 text-center min-h-[400px]">
            <h2 className="text-4xl font-bold mb-4">Не знаете, с чего начать?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ответьте на 5 вопросов, и мы определим ваш идеальный путь в экосистеме Invest-Ex.
            </p>
            <div className="mb-8"></div>

            {!showResult ? (
              <div>
                <Progress value={progress} className="w-full mb-8 h-3" />
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    {quizData[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-4 max-w-2xl mx-auto px-4">
                    {quizData[currentQuestion].answers.map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="w-full text-left justify-start p-4 sm:p-6 h-auto text-sm sm:text-base font-medium hover:border-primary hover:bg-emerald-50 leading-relaxed whitespace-normal"
                        onClick={() => handleAnswer(answer.scores)}
                      >
                        <span className="break-words hyphens-auto">{answer.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <h3 className="text-xl text-muted-foreground mb-2">Ваш результат:</h3>
                <h2 className="text-4xl font-bold text-primary mb-4">
                  {getTopRole().name}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  {getTopRole().description}
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button size="lg">
                    Узнать больше о пути
                  </Button>
                  <Button variant="outline" size="lg" onClick={resetQuiz}>
                    Пройти заново
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveQuiz;