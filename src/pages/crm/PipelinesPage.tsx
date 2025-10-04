import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PipelinesPage() {
  const navigate = useNavigate();

  const pipelines = [
    {
      id: 1,
      name: "Продажи",
      stages: ["Лид", "Квалификация", "Предложение", "Закрытие"],
      deals: 15,
      value: 5400000
    },
    {
      id: 2,
      name: "Партнерство",
      stages: ["Контакт", "Обсуждение", "Договор", "Активация"],
      deals: 8,
      value: 2100000
    }
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
            <h1 className="text-3xl font-bold">Воронки продаж</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новая воронка
          </Button>
        </div>

        <div className="grid gap-6">
          {pipelines.map((pipeline) => (
            <Card key={pipeline.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{pipeline.name}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span>{pipeline.deals} сделок</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {pipeline.value.toLocaleString('ru-RU')} ₽
                      </span>
                    </CardDescription>
                  </div>
                  <Button variant="outline">Настроить</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {pipeline.stages.map((stage, idx) => (
                    <Badge key={idx} variant="secondary">{stage}</Badge>
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
