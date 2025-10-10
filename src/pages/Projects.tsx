import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Eye } from 'lucide-react';
import ProjectModal from '@/components/ProjectModal';
import { allProjects } from '@/data/projectsData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Projects = () => {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projectCategory, setProjectCategory] = useState('active');
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .in('moderation_status', ['approved'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDbProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({ 
        title: 'Ошибка загрузки проектов', 
        description: error.message, 
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const allProjectsCombined = [
    ...allProjects,
    ...dbProjects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description || '',
      category: p.industry || 'Прочее',
      status: p.status || 'active',
      budget: `${(p.funding_goal || 0).toLocaleString()} ₽`,
      timeline: p.project_stage || 'Неизвестно',
      team: p.team_size || 1,
      image: '/placeholder.svg',
      technologies: [],
      projectCategory: p.project_category || 'active',
      isPitch: p.project_category === 'pitch',
    }))
  ];

  const filteredProjects = allProjectsCombined.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    // Filter by project category based on active tab
    let matchesTab = true;
    if (projectCategory === 'active') {
      matchesTab = (project.projectCategory === 'active' || !project.projectCategory);
    } else if (projectCategory === 'sandbox') {
      matchesTab = project.projectCategory === 'sandbox';
    } else if (projectCategory === 'gold_fund') {
      matchesTab = project.projectCategory === 'gold_fund';
    } else if (projectCategory === 'archived') {
      matchesTab = project.projectCategory === 'archived';
    } else if (projectCategory === 'pitch') {
      matchesTab = project.isPitch === true;
    }
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const ProjectList = () => (
    <>
      <div className="mb-4">
        <p className="text-muted-foreground">
          Найдено проектов: <span className="font-semibold">{filteredProjects.length}</span>
        </p>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleProjectClick(project)}
          >
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative md:col-span-1">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-l-lg"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {project.category}
                </Badge>
              </div>

              <div className="md:col-span-3 p-6">
                <CardHeader className="p-0 mb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-base">
                        {project.description}
                      </CardDescription>
                    </div>
                    
                    <div className="text-right">
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Бюджет</p>
                      <p className="font-semibold">{project.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Срок</p>
                      <p className="font-semibold">{project.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Команда</p>
                      <p className="font-semibold">{project.team}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Технологии:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 5).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      asChild 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Link to={`/project/${project.id}`}>
                        <Eye className="w-4 w-4 mr-2" />
                        Подробнее
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                    >
                      Быстрый просмотр
                    </Button>
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              Проекты не найдены. Попробуйте изменить параметры поиска.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Проекты</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Найдите подходящий проект для инвестиций или участия
              </p>
            </div>

            <Tabs defaultValue="active" className="w-full" onValueChange={setProjectCategory}>
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="sandbox">Песочница</TabsTrigger>
                <TabsTrigger value="gold_fund">Золотой фонд</TabsTrigger>
                <TabsTrigger value="pitch">Питч-панель</TabsTrigger>
                <TabsTrigger value="archived">Архив</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                {/* Search and Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск проектов..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Категория" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все категории</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Blockchain">Blockchain</SelectItem>
                          <SelectItem value="FinTech">FinTech</SelectItem>
                          <SelectItem value="HealthTech">HealthTech</SelectItem>
                          <SelectItem value="EdTech">EdTech</SelectItem>
                          <SelectItem value="GreenTech">GreenTech</SelectItem>
                          <SelectItem value="FoodTech">FoodTech</SelectItem>
                          <SelectItem value="PropTech">PropTech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <ProjectList />
              </TabsContent>

              <TabsContent value="sandbox" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск проектов..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ProjectList />
              </TabsContent>

              <TabsContent value="gold_fund" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск проектов..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ProjectList />
              </TabsContent>

              <TabsContent value="pitch" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск питчей..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ProjectList />
              </TabsContent>

              <TabsContent value="archived" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                      <div className="relative lg:col-span-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск проектов..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <ProjectList />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      
      <ProjectModal 
        project={selectedProject}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
      
      <Footer />
    </div>
  );
};

export default Projects;
