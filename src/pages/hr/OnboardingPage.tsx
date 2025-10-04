import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OnboardingPage() {
  const navigate = useNavigate();

  const checklists = [
    {
      id: 1,
      name: "Иван Петров",
      progress: 75,
      tasks: [
        { id: 1, title: "Заполнить профиль", completed: true },
        { id: 2, title: "Пройти вводное обучение", completed: true },
        { id: 3, title: "Настроить рабочее место", completed: true },
        { id: 4, title: "Встреча с командой", completed: false },
      ]
    },
    {
      id: 2,
      name: "Мария Смирнова",
      progress: 50,
      tasks: [
        { id: 1, title: "Заполнить профиль", completed: true },
        { id: 2, title: "Пройти вводное обучение", completed: true },
        { id: 3, title: "Настроить рабочее место", completed: false },
        { id: 4, title: "Встреча с командой", completed: false },
      ]
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-3xl font-bold">Онбординг</h1>
          </div>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Новый сотрудник
          </Button>
        </div>

        <div className="space-y-6">
          {checklists.map((checklist) => (
            <Card key={checklist.id}>
              <CardHeader>
                <CardTitle>{checklist.name}</CardTitle>
                <CardDescription>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Прогресс онбординга</span>
                      <span className="text-sm font-medium">{checklist.progress}%</span>
                    </div>
                    <Progress value={checklist.progress} />
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checklist.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <Checkbox checked={task.completed} />
                      <label className={task.completed ? "text-muted-foreground line-through" : ""}>
                        {task.title}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
