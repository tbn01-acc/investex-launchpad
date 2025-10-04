import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TimelinePage() {
  const navigate = useNavigate();

  const events = [
    { id: 1, date: "2025-10-05", title: "Запуск проекта Alpha", type: "milestone" },
    { id: 2, date: "2025-10-10", title: "Встреча с командой", type: "meeting" },
    { id: 3, date: "2025-10-15", title: "Релиз v1.0", type: "release" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold">Временная шкала</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              График событий
            </CardTitle>
            <CardDescription>Ключевые события и вехи проектов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start gap-4 border-l-2 border-primary pl-4 pb-4">
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
