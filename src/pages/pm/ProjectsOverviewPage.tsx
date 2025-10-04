import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, Plus, MoreVertical, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectsOverviewPage() {
  const navigate = useNavigate();
  const [projects] = useState([
    { id: 1, name: "Проект Alpha", progress: 75, team: 5, deadline: "2025-12-31", status: "active" },
    { id: 2, name: "Проект Beta", progress: 45, team: 3, deadline: "2025-11-15", status: "active" },
    { id: 3, name: "Проект Gamma", progress: 90, team: 7, deadline: "2025-10-20", status: "review" },
  ]);

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
            <h1 className="text-3xl font-bold">Проекты</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Новый проект
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {project.team}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {project.deadline}
                        </span>
                      </div>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Прогресс</span>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                </div>
                <Badge variant={project.status === "active" ? "default" : "secondary"}>
                  {project.status === "active" ? "Активен" : "На проверке"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
