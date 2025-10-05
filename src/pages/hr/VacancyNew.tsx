import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function VacancyNew() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary_range_min: "",
    salary_range_max: "",
    currency: "RUB",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        toast({
          title: "Ошибка",
          description: "Необходима авторизация",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("project_vacancies").insert({
        ...formData,
        salary_range_min: parseFloat(formData.salary_range_min) || null,
        salary_range_max: parseFloat(formData.salary_range_max) || null,
        created_by: userData.user.id,
        project_id: "00000000-0000-0000-0000-000000000000", // Replace with actual project ID
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Вакансия создана",
      });

      navigate("/project-management/hr/recruitment");
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/project-management/hr/recruitment")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к рекрутингу
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Создать новую вакансию</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Название вакансии</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary_min">Зарплата от</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    value={formData.salary_range_min}
                    onChange={(e) => setFormData({ ...formData, salary_range_min: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_max">Зарплата до</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    value={formData.salary_range_max}
                    onChange={(e) => setFormData({ ...formData, salary_range_max: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Валюта</Label>
                  <Input
                    id="currency"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Создание..." : "Создать вакансию"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/project-management/hr/recruitment")}
                >
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
