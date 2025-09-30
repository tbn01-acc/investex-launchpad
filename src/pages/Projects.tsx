import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye } from 'lucide-react';
import ProjectModal from '@/components/ProjectModal';
import { allProjects } from '@/data/projectsData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Биржа проектов</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Найдите идеальный проект для вашей команды или предложите свои услуги
              </p>
            </div>

            {/* Search and Filters */}
            <Card className="mb-8">
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
          </section>

          {/* Project List */}
          <section>
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
                              <Eye className="w-4 h-4 mr-2" />
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
