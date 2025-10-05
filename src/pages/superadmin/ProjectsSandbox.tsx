import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp,
  Eye,
  MessageSquare
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  owner_id: string;
  funding_goal?: number;
  current_funding?: number;
  industry?: string;
  project_category?: 'active' | 'sandbox' | 'gold_fund' | 'archived';
  moderation_status?: string;
}

export default function ProjectsSandbox() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [comment, setComment] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | "revision" | "move" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'active' | 'sandbox' | 'gold_fund' | 'archived'>('active');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
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

  const updateProjectCategory = async (projectId: string, category: 'active' | 'sandbox' | 'gold_fund' | 'archived') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Пользователь не авторизован");

      const { error } = await supabase
        .from("projects")
        .update({ project_category: category })
        .eq("id", projectId);

      if (error) throw error;

      await supabase.from("project_moderation").insert({
        project_id: projectId,
        moderator_id: user.id,
        action: "category_change",
        comment: `Категория изменена на: ${category}`,
        level_changed_to: category,
      });

      toast({
        title: "Успешно",
        description: "Категория проекта обновлена",
      });

      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAction = async () => {
    if (!selectedProject || !action) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Пользователь не авторизован");

      // If action is "move", update category instead
      if (action === "move") {
        await updateProjectCategory(selectedProject.id, selectedCategory);
        setSelectedProject(null);
        setAction(null);
        setComment("");
        return;
      }

      let newStatus = selectedProject.status;
      let actionText = "";

      switch (action) {
        case "approve":
          newStatus = "active";
          actionText = "approved";
          break;
        case "reject":
          newStatus = "rejected";
          actionText = "rejected";
          break;
        case "revision":
          newStatus = "needs_revision";
          actionText = "needs_revision";
          break;
          break;
      }

      // Update project status
      const { error: updateError } = await supabase
        .from("projects")
        .update({ status: newStatus })
        .eq("id", selectedProject.id);

      if (updateError) throw updateError;

      // Log moderation action
      const { error: logError } = await supabase
        .from("project_moderation")
        .insert({
          project_id: selectedProject.id,
          moderator_id: user.id,
          action: actionText,
          comment: comment,
          previous_status: selectedProject.status,
          new_status: newStatus,
        });

      if (logError) throw logError;

      // Log audit
      await supabase.from("superadmin_audit_log").insert({
        admin_id: user.id,
        action: `project_${actionText}`,
        target_type: "project",
        target_id: selectedProject.id,
        details: { comment, previous_status: selectedProject.status, new_status: newStatus },
      });

      toast({
        title: "Успешно",
        description: "Действие выполнено",
      });

      setSelectedProject(null);
      setComment("");
      setAction(null);
      fetchProjects();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "secondary",
      pending: "outline",
      active: "default",
      rejected: "destructive",
      needs_revision: "outline",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const pendingProjects = projects.filter(p => p.status === "pending" || p.status === "draft");
  const activeProjects = projects.filter(p => p.status === "active");
  const needsRevision = projects.filter(p => p.status === "needs_revision");
  const rejectedProjects = projects.filter(p => p.status === "rejected");

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Песочница проектов</h1>
          <p className="text-muted-foreground">Модерация и управление проектами платформы</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">На модерации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingProjects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активные</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProjects.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">На доработке</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{needsRevision.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Отклонено</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rejectedProjects.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">На модерации ({pendingProjects.length})</TabsTrigger>
            <TabsTrigger value="active">Активные ({activeProjects.length})</TabsTrigger>
            <TabsTrigger value="revision">На доработке ({needsRevision.length})</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные ({rejectedProjects.length})</TabsTrigger>
          </TabsList>

          {["pending", "active", "revision", "rejected"].map((tab) => {
            const projectsList = 
              tab === "pending" ? pendingProjects :
              tab === "active" ? activeProjects :
              tab === "revision" ? needsRevision :
              rejectedProjects;

            return (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {projectsList.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      Проектов нет
                    </CardContent>
                  </Card>
                ) : (
                  projectsList.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="flex items-center gap-2">
                              {project.title}
                              {getStatusBadge(project.status)}
                            </CardTitle>
                            <CardDescription className="mt-2">
                              {project.description?.substring(0, 150)}...
                            </CardDescription>
                            <div className="flex gap-2 mt-2">
                              {project.industry && (
                                <Badge variant="outline">{project.industry}</Badge>
                              )}
                              {project.project_category && (
                                <Badge variant="secondary">
                                  {project.project_category === 'active' && 'Активный'}
                                  {project.project_category === 'sandbox' && 'Песочница'}
                                  {project.project_category === 'gold_fund' && 'Золотой'}
                                  {project.project_category === 'archived' && 'Архив'}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/projects/${project.id}`)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            Просмотр
                          </Button>
                          {tab === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setAction("approve");
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Утвердить
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setAction("revision");
                                }}
                              >
                                <AlertCircle className="mr-2 h-4 w-4" />
                                На доработку
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setAction("reject");
                                }}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Отклонить
                              </Button>
                            </>
                          )}
                          {tab === "active" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedProject(project);
                                  setAction("move");
                                }}
                              >
                                <TrendingUp className="mr-2 h-4 w-4" />
                                Изменить категорию
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </main>

      <Footer />

      <Dialog open={!!selectedProject && !!action} onOpenChange={() => {
        setSelectedProject(null);
        setAction(null);
        setComment("");
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "approve" && "Утвердить проект"}
              {action === "reject" && "Отклонить проект"}
              {action === "revision" && "Отправить на доработку"}
              {action === "move" && "Изменить категорию проекта"}
            </DialogTitle>
            <DialogDescription>
              {selectedProject?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {action === "move" && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Выберите категорию
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={selectedCategory === 'active' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('active')}
                  >
                    Активный
                  </Button>
                  <Button
                    type="button"
                    variant={selectedCategory === 'sandbox' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('sandbox')}
                  >
                    Песочница
                  </Button>
                  <Button
                    type="button"
                    variant={selectedCategory === 'gold_fund' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('gold_fund')}
                  >
                    Золотой
                  </Button>
                  <Button
                    type="button"
                    variant={selectedCategory === 'archived' ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory('archived')}
                  >
                    Архив
                  </Button>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Комментарий
              </label>
              <Textarea
                placeholder="Добавьте комментарий..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setSelectedProject(null);
              setAction(null);
              setComment("");
            }}>
              Отмена
            </Button>
            <Button onClick={handleAction}>
              Подтвердить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}