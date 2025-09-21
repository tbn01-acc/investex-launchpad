import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

const quizData = [
  {
    question: "Какая у вас основная цель на платформе?",
    answers: [
      { text: "Найти финансирование для своего проекта", scores: { founder: 3, investor: 0, freelancer: 0, expert: 1 } },
      { text: "Инвестировать в перспективные стартапы", scores: { founder: 0, investor: 3, freelancer: 0, expert: 1 } },
      { text: "Найти интересные проекты для работы", scores: { founder: 0, investor: 0, freelancer: 3, expert: 1 } },
      { text: "Консультировать и делиться опытом", scores: { founder: 1, investor: 1, freelancer: 1, expert: 3 } }
    ]
  },
  {
    question: "Какой у вас опыт в бизнесе?",
    answers: [
      { text: "У меня есть идея, но мало опыта", scores: { founder: 3, investor: 0, freelancer: 1, expert: 0 } },
      { text: "Успешно инвестировал/управлял капиталом", scores: { founder: 1, investor: 3, freelancer: 0, expert: 2 } },
      { text: "Работал в различных проектах как специалист", scores: { founder: 0, investor: 0, freelancer: 3, expert: 1 } },
      { text: "Большой опыт в определенной сфере", scores: { founder: 1, investor: 2, freelancer: 1, expert: 3 } }
    ]
  },
  {
    question: "Что вас больше всего мотивирует?",
    answers: [
      { text: "Создать что-то новое и изменить мир", scores: { founder: 3, investor: 1, freelancer: 1, expert: 1 } },
      { text: "Получить хорошую прибыль от инвестиций", scores: { founder: 0, investor: 3, freelancer: 0, expert: 1 } },
      { text: "Применить свои навыки в интересных задачах", scores: { founder: 1, investor: 0, freelancer: 3, expert: 2 } },
      { text: "Помочь другим достичь успеха", scores: { founder: 1, investor: 1, freelancer: 1, expert: 3 } }
    ]
  },
  {
    question: "Сколько времени готовы уделять проектам?",
    answers: [
      { text: "Полный рабочий день - это мой основной фокус", scores: { founder: 3, investor: 0, freelancer: 2, expert: 1 } },
      { text: "Периодически анализирую и принимаю решения", scores: { founder: 1, investor: 3, freelancer: 0, expert: 1 } },
      { text: "Несколько часов в день на конкретные задачи", scores: { founder: 0, investor: 0, freelancer: 3, expert: 2 } },
      { text: "Консультации по запросу", scores: { founder: 0, investor: 1, freelancer: 1, expert: 3 } }
    ]
  },
  {
    question: "Что для вас важнее всего в работе?",
    answers: [
      { text: "Контроль над процессом и стратегией", scores: { founder: 3, investor: 2, freelancer: 0, expert: 1 } },
      { text: "Стабильный доход и рост портфеля", scores: { founder: 1, investor: 3, freelancer: 1, expert: 1 } },
      { text: "Разнообразие задач и гибкий график", scores: { founder: 0, investor: 0, freelancer: 3, expert: 2 } },
      { text: "Признание экспертизы и влияние", scores: { founder: 1, investor: 1, freelancer: 1, expert: 3 } }
    ]
  }
];

const roleResults = {
  founder: { 
    name: "Фаундер", 
    description: "Вы прирожденный предприниматель! Ваша миссия — создавать инновационные продукты и строить команды для их реализации." 
  },
  investor: { 
    name: "Инвестор", 
    description: "У вас отличный нюх на перспективные проекты! Ваша роль — находить и финансировать следующие единороги." 
  },
  freelancer: { 
    name: "Фрилансер", 
    description: "Вы цените свободу и разнообразие! Ваш путь — работать над интересными проектами и развивать свои навыки." 
  },
  expert: { 
    name: "Эксперт", 
    description: "Ваш опыт — ваше главное преимущество! Помогайте другим достигать успеха и монетизируйте свою экспертизу." 
  }
};

const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ founder: 0, investor: 0, freelancer: 0, expert: 0 });
  const [showResult, setShowResult] = useState(false);
  const [hideQuiz, setHideQuiz] = useState(false);

  const handleAnswer = (answerScores: typeof scores) => {
    const newScores = {
      founder: scores.founder + answerScores.founder,
      investor: scores.investor + answerScores.investor,
      freelancer: scores.freelancer + answerScores.freelancer,
      expert: scores.expert + answerScores.expert
    };
    setScores(newScores);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ founder: 0, investor: 0, freelancer: 0, expert: 0 });
    setShowResult(false);
  };

  const getTopRole = () => {
    const maxScore = Math.max(...Object.values(scores));
    const topRole = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as keyof typeof roleResults;
    return roleResults[topRole];
  };

  const progress = ((currentQuestion) / quizData.length) * 100;

  if (hideQuiz) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-8">
        <div className="bg-white rounded-3xl shadow-xl relative max-w-4xl mx-auto">
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

            {!showResult ? (
              <div>
                <Progress value={progress} className="w-full mb-8 h-3" />
                
                <div>
                  <h3 className="text-2xl font-semibold mb-6">
                    {quizData[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {quizData[currentQuestion].answers.map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="w-full text-left justify-start p-6 h-auto text-lg font-medium hover:border-primary hover:bg-emerald-50"
                        onClick={() => handleAnswer(answer.scores)}
                      >
                        {answer.text}
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