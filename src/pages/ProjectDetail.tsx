import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, Clock, Building, ArrowLeft, Star, Share2 } from 'lucide-react';
import { getProjectById, Project as LocalProject } from '@/data/projectsData';
import { supabase } from '@/integrations/supabase/client';

// ViewModel to render both local demo projects and DB projects uniformly
type ProjectVM = {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category?: string;
  image?: string;
  budget?: string;
  timeline?: string;
  team?: string;
  status?: string;
  company?: string;
  technologies?: string[];
  features?: string[];
  milestones?: { title: string; status: 'completed' | 'in-progress' | 'planned'; date: string }[];
};

const mapLocalToVM = (p: LocalProject): ProjectVM => ({
  id: String(p.id),
  title: p.title,
  description: p.description,
  fullDescription: p.fullDescription,
  category: p.category,
  image: p.image,
  budget: p.budget,
  timeline: p.timeline,
  team: p.team,
  status: p.status,
  company: p.company,
  technologies: p.technologies,
  features: p.features,
  milestones: p.milestones,
});

const mapDbToVM = (p: any): ProjectVM => ({
  id: String(p.id),
  title: p.title,
  description: p.description || 'Описание будет добавлено',
  fullDescription: p.long_description || undefined,
  category: p.industry || 'Прочее',
  image: p.cover_image_url || '/placeholder.svg',
  budget: p.funding_goal ? `${Number(p.funding_goal).toLocaleString()} ₽` : undefined,
  timeline: p.project_stage || undefined,
  team: p.team_size ? String(p.team_size) : undefined,
  status: p.status || 'active',
  company: p.company || undefined,
  technologies: p.technologies || [],
  features: p.features || [],
  milestones: p.milestones || [],
});

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [dbRecord, setDbRecord] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Try to load from local demo data first if numeric id
  const localProject = useMemo(() => {
    if (!id) return null;
    const numeric = Number(id);
    if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
      return getProjectById(numeric) || null;
    }
    return null;
  }, [id]);

  useEffect(() => {
    let active = true;

    const setSeo = (p?: ProjectVM) => {
      if (!p) return;
      document.title = `${p.title} — Проект`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', p.description?.slice(0, 150) || 'Проект');
      }
    };

    const loadDb = async () => {
      if (!id || localProject) {
        setLoading(false);
        setSeo(localProject ? mapLocalToVM(localProject) : undefined);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .in('moderation_status', ['approved'])
          .single();
        if (!active) return;
        if (error) {
          setDbRecord(null);
        } else {
          setDbRecord(data);
          setSeo(mapDbToVM(data));
        }
      } catch (e) {
        if (!active) return;
        setDbRecord(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    loadDb();
    return () => {
      active = false;
    };
  }, [id, localProject]);

  const projectVM: ProjectVM | null = localProject
    ? mapLocalToVM(localProject)
    : dbRecord
    ? mapDbToVM(dbRecord)
    : null;

  if (!projectVM && !loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
            <Button asChild>
              <Link to="/projects">Вернуться к проектам</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!projectVM) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <p className="text-muted-foreground">Загрузка проекта…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const project = projectVM;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/projects">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к проектам
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="relative">
                <img 
                  src={project.image || '/placeholder.svg'} 
                  alt={project.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.category && (
                    <Badge className="bg-primary text-primary-foreground">
                      {project.category}
                    </Badge>
                  )}
                  {project.status && (
                    <Badge variant="outline" className="bg-background">
                      {project.status}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Project Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  {project.description && (
                    <CardDescription className="text-lg">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.fullDescription && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Подробное описание</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.fullDescription}
                        </p>
                      </div>
                    )}

                    {project.features && project.features.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Ключевые особенности</h3>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {project.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {project.technologies && project.technologies.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold mb-3">Технологии</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
              {project.milestones && project.milestones.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Дорожная карта проекта</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in-progress' ? 'bg-yellow-500' :
                            'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <div className="font-medium">{milestone.title}</div>
                            <div className="text-sm text-muted-foreground">{milestone.date}</div>
                          </div>
                          <Badge variant={
                            milestone.status === 'completed' ? 'default' :
                            milestone.status === 'in-progress' ? 'secondary' :
                            'outline'
                          }>
                            {milestone.status === 'completed' ? 'Завершено' :
                             milestone.status === 'in-progress' ? 'В процессе' :
                             'Запланировано'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Информация о проекте</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.budget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Бюджет: {project.budget}</span>
                    </div>
                  )}
                  {project.timeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Срок: {project.timeline}</span>
                    </div>
                  )}
                  {project.team && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Команда: {project.team}</span>
                    </div>
                  )}
                  {project.company && (
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Компания: {project.company}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card>
                <CardContent className="p-6 space-y-3">
                  <Button className="w-full">
                    Присоединиться к проекту
                  </Button>
                  <Button variant="outline" className="w-full">
                    Связаться с командой
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Поделиться
                  </Button>
                </CardContent>
              </Card>

              {/* Rating */}
              <Card>
                <CardHeader>
                  <CardTitle>Рейтинг проекта</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">4.8 (24 отзыва)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Высокий рейтинг от экспертов и инвесторов
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;