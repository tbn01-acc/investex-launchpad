import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, Search, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WikiPage() {
  const navigate = useNavigate();

  const articles = [
    { id: 1, title: "Начало работы", category: "Руководства", views: 245 },
    { id: 2, title: "API документация", category: "Техническое", views: 182 },
    { id: 3, title: "Часто задаваемые вопросы", category: "Поддержка", views: 456 },
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
            <h1 className="text-3xl font-bold">База знаний</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новая статья
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Поиск в базе знаний..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm">{article.views} просмотров</span>
                      </CardDescription>
                    </div>
                  </div>
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
