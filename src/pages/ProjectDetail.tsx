import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, DollarSign, Users, Clock, Building, ArrowLeft, Star, Share2 } from 'lucide-react';
import { getProjectById } from '@/data/projectsData';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0');
  const project = getProjectById(projectId);

  if (!project) {
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
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    {project.category}
                  </Badge>
                  <Badge variant="outline" className="bg-background">
                    {project.status}
                  </Badge>
                </div>
              </div>

              {/* Project Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl">{project.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Подробное описание</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.fullDescription}
                      </p>
                    </div>

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
                  </div>
                </CardContent>
              </Card>

              {/* Milestones */}
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Информация о проекте</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Бюджет: {project.budget}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Срок: {project.timeline}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Команда: {project.team}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Компания: {project.company}</span>
                  </div>
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