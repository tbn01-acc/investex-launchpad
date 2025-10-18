import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Users, Clock, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/data/projectsData';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/lib/utils';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, open, onOpenChange }) => {
  const { currency } = useLanguage();
  
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-72 object-cover rounded-lg"
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

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Описание проекта</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.fullDescription && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Подробное описание</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.budget && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Бюджет</p>
                    <p className="text-sm font-semibold">
                      {formatCurrency(parseInt(project.budget.replace(/[^\d]/g, '')) || 0, currency)}
                    </p>
                  </div>
                </div>
              )}
              
              {project.timeline && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Срок</p>
                    <p className="text-sm font-semibold">{project.timeline}</p>
                  </div>
                </div>
              )}
              
              {project.team && (
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Команда</p>
                    <p className="text-sm font-semibold">{project.team}</p>
                  </div>
                </div>
              )}
              
              {project.company && (
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Компания</p>
                    <p className="text-sm font-semibold">{project.company}</p>
                  </div>
                </div>
              )}
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Технологии</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Ключевые особенности</h3>
                <ul className="grid md:grid-cols-2 gap-2">
                  {project.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.metrics && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Метрики проекта</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-lg">
                  {project.metrics.expectedROI && (
                    <div>
                      <p className="text-xs text-muted-foreground">Ожидаемый ROI</p>
                      <p className="text-sm font-semibold">{project.metrics.expectedROI}</p>
                    </div>
                  )}
                  {project.metrics.marketSize && (
                    <div>
                      <p className="text-xs text-muted-foreground">Размер рынка</p>
                      <p className="text-sm font-semibold">{project.metrics.marketSize}</p>
                    </div>
                  )}
                  {project.metrics.riskLevel && (
                    <div>
                      <p className="text-xs text-muted-foreground">Уровень риска</p>
                      <Badge variant="outline">{project.metrics.riskLevel}</Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link to={`/project/${project.id}`} onClick={() => onOpenChange(false)}>
                  Подробнее
                </Link>
              </Button>
              <Button variant="outline" className="flex-1">
                Связаться
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;