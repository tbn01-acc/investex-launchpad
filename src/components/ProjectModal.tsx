import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Users, Clock, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '@/data/projectsData';

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, open, onOpenChange }) => {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
              {project.category}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Описание проекта</h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
            </div>

            <div className="flex gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link to={`/project/${project.id}`}>
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