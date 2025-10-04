import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DealsPage() {
  const navigate = useNavigate();

  const deals = [
    { id: 1, title: "Проект для ООО \"Техно\"", value: 850000, stage: "Предложение", closeDate: "2025-11-30" },
    { id: 2, title: "Консалтинг ИП Петров", value: 320000, stage: "Квалификация", closeDate: "2025-10-15" },
    { id: 3, title: "Разработка для Старт", value: 1200000, stage: "Закрытие", closeDate: "2025-10-10" },
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
            <h1 className="text-3xl font-bold">Сделки</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новая сделка
          </Button>
        </div>

        <div className="space-y-4">
          {deals.map((deal) => (
            <Card key={deal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{deal.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {deal.value.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {deal.closeDate}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{deal.stage}</Badge>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
