import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, Briefcase, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function RecruitmentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vacancies, setVacancies] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchVacancies();
    fetchApplications();
  }, []);

  const fetchVacancies = async () => {
    const { data, error } = await supabase
      .from("project_vacancies")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setVacancies(data);
    }
  };

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("project_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      open: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
      on_hold: "bg-yellow-100 text-yellow-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-management-hub")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к управлению
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Рекрутинг</h1>
              <p className="text-muted-foreground">
                Управление вакансиями и кандидатами
              </p>
            </div>
            <Button onClick={() => navigate("/project-management/hr/vacancies/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Новая вакансия
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск вакансий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="vacancies" className="space-y-6">
          <TabsList>
            <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
            <TabsTrigger value="applications">Заявки</TabsTrigger>
          </TabsList>

          <TabsContent value="vacancies" className="space-y-4">
            {vacancies.map((vacancy) => (
              <Card key={vacancy.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        {vacancy.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {vacancy.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(vacancy.status)}>
                      {vacancy.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      {vacancy.salary_range_min && (
                        <p className="text-sm text-muted-foreground">
                          Зарплата: {vacancy.salary_range_min} - {vacancy.salary_range_max} {vacancy.currency}
                        </p>
                      )}
                      {vacancy.requirements && vacancy.requirements.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {vacancy.requirements.slice(0, 3).map((req: string, idx: number) => (
                            <Badge key={idx} variant="outline">{req}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="outline">Просмотр</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {vacancies.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                  Нет активных вакансий
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Заявка на проект
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {application.message}
                      </CardDescription>
                    </div>
                    <Badge>
                      {application.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Бюджет: {application.proposed_budget}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Срок: {application.estimated_duration} дней
                      </p>
                    </div>
                    <Button variant="outline">Просмотр</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {applications.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                  Нет заявок
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}