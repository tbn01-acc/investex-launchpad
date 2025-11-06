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
import { Search, Eye, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import ProjectModal from '@/components/ProjectModal';
import { allProjects } from '@/data/projectsData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CreateProjectModal } from '@/components/CreateProjectModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';

const Projects = () => {
  const { toast } = useToast();
  const { currency } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleFavorite, isFavorite } = useFavorites('project');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [projectCategory, setProjectCategory] = useState('active');
  const [dbProjects, setDbProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [displayedItems, setDisplayedItems] = useState(15);
  const [investmentRange, setInvestmentRange] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
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

    // Filter by investment range
    const budgetValue = parseInt(project.budget.replace(/[^\d]/g, '')) || 0;
    let matchesInvestment = true;
    if (investmentRange === 'under_1m') {
      matchesInvestment = budgetValue < 1000000;
    } else if (investmentRange === '1m_to_5m') {
      matchesInvestment = budgetValue >= 1000000 && budgetValue < 5000000;
    } else if (investmentRange === '5m_to_10m') {
      matchesInvestment = budgetValue >= 5000000 && budgetValue < 10000000;
    } else if (investmentRange === '10m_to_50m') {
      matchesInvestment = budgetValue >= 10000000 && budgetValue < 50000000;
    } else if (investmentRange === '50m_to_100m') {
      matchesInvestment = budgetValue >= 50000000 && budgetValue < 100000000;
    } else if (investmentRange === 'over_100m') {
      matchesInvestment = budgetValue >= 100000000;
    }
    
    return matchesSearch && matchesCategory && matchesTab && matchesInvestment;
  });

  const paginatedProjects = filteredProjects.slice(0, displayedItems);

  const categories = ['Все категории', 'AI/ML', 'Blockchain', 'FinTech', 'HealthTech', 'EdTech', 'GreenTech', 'FoodTech', 'PropTech'];

  const getCategoryCount = (category: string) => {
    if (category === 'Все категории') {
      return allProjectsCombined.filter(p => {
        if (projectCategory === 'active') return (p.projectCategory === 'active' || !p.projectCategory);
        if (projectCategory === 'sandbox') return p.projectCategory === 'sandbox';
        if (projectCategory === 'gold_fund') return p.projectCategory === 'gold_fund';
        if (projectCategory === 'archived') return p.projectCategory === 'archived';
        if (projectCategory === 'pitch') return p.isPitch === true;
        return true;
      }).length;
    }
    return allProjectsCombined.filter(p => {
      const matchesCategory = p.category === category;
      let matchesTab = true;
      if (projectCategory === 'active') matchesTab = (p.projectCategory === 'active' || !p.projectCategory);
      else if (projectCategory === 'sandbox') matchesTab = p.projectCategory === 'sandbox';
      else if (projectCategory === 'gold_fund') matchesTab = p.projectCategory === 'gold_fund';
      else if (projectCategory === 'archived') matchesTab = p.projectCategory === 'archived';
      else if (projectCategory === 'pitch') matchesTab = p.isPitch === true;
      return matchesCategory && matchesTab;
    }).length;
  };

  const handleShowMore = () => {
    setDisplayedItems(prev => Math.min(prev + itemsPerPage, filteredProjects.length));
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setDisplayedItems(parseInt(value));
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleFavoriteClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    toggleFavorite(projectId);
  };

  const ProjectList = () => (
    <>
      <div className="mb-4 flex justify-between items-center">
        <p className="text-muted-foreground">
          Показано <span className="font-semibold">{paginatedProjects.length}</span> из <span className="font-semibold">{filteredProjects.length}</span> проектов
        </p>
        <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Показывать по" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">Показывать по 9</SelectItem>
            <SelectItem value="15">Показывать по 15</SelectItem>
            <SelectItem value="30">Показывать по 30</SelectItem>
            <SelectItem value="60">Показывать по 60</SelectItem>
            <SelectItem value="90">Показывать по 90</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {paginatedProjects.map((project) => (
          <Card 
            key={project.id} 
            className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
            onClick={() => handleProjectClick(project)}
          >
            <div className="relative h-48">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {project.category}
              </Badge>
              <Button
                size="icon"
                variant="secondary"
                className={cn(
                  "absolute top-4 right-4 rounded-full shadow-lg transition-all",
                  isFavorite(String(project.id)) 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-background/80 hover:bg-background"
                )}
                onClick={(e) => handleFavoriteClick(e, String(project.id))}
              >
                <Heart 
                  className={cn(
                    "w-5 h-5 transition-all",
                    isFavorite(String(project.id)) && "fill-current"
                  )} 
                />
              </Button>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <CardHeader className="p-0 mb-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <Badge variant="outline" className="shrink-0">{project.status}</Badge>
                </div>
                <CardDescription className="text-sm line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0 mt-auto">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Бюджет</p>
                    <p className="font-semibold text-sm">
                      {formatCurrency(parseInt(project.budget.replace(/[^\d]/g, '')) || 0, currency)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Команда</p>
                    <p className="font-semibold text-sm">{project.team}</p>
                  </div>
                </div>

                {project.technologies.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Link to={`/project/${project.id}`}>
                      Подробнее
                    </Link>
                  </Button>
                </div>
              </CardContent>
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

      {paginatedProjects.length < filteredProjects.length && (
        <div className="mt-8 text-center">
          <Button onClick={handleShowMore} size="lg">
            Показать еще
          </Button>
        </div>
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
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input 
                          placeholder="Поиск проектов..." 
                          className="pl-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ display: 'none' }}
                        />
                      </div>
                    </div>

                    {/* Category Tags Cloud */}
                    <div>
                      <p className="text-sm font-medium mb-2">Категории проектов:</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category}
                            variant={selectedCategory === (category === 'Все категории' ? 'all' : category) ? 'default' : 'outline'}
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors relative"
                            onClick={() => {
                              setSelectedCategory(category === 'Все категории' ? 'all' : category);
                              setDisplayedItems(itemsPerPage);
                            }}
                          >
                            {category}
                            <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-medium rounded-full bg-primary-foreground text-primary">
                              {getCategoryCount(category)}
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Investment Range Filters */}
                    <div>
                      <p className="text-sm font-medium mb-2">Диапазон инвестиций:</p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant={investmentRange === 'all' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('all');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          Все
                        </Button>
                        <Button
                          variant={investmentRange === 'under_1m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('under_1m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          &lt;1 млн ₽
                        </Button>
                        <Button
                          variant={investmentRange === '1m_to_5m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('1m_to_5m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          1-5 млн ₽
                        </Button>
                        <Button
                          variant={investmentRange === '5m_to_10m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('5m_to_10m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          5-10 млн ₽
                        </Button>
                        <Button
                          variant={investmentRange === '10m_to_50m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('10m_to_50m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          10-50 млн ₽
                        </Button>
                        <Button
                          variant={investmentRange === '50m_to_100m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('50m_to_100m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          50-100 млн ₽
                        </Button>
                        <Button
                          variant={investmentRange === 'over_100m' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => {
                            setInvestmentRange('over_100m');
                            setDisplayedItems(itemsPerPage);
                          }}
                        >
                          &gt;100 млн ₽
                        </Button>
                      </div>
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
