import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, DollarSign, Clock, User, Building, Award } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface ProjectApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: number;
    title: string;
    budget: { min: number; max: number; currency: string };
    timeline: string;
    category: string;
  } | null;
}

const ProjectApplicationModal: React.FC<ProjectApplicationModalProps> = ({ 
  open, 
  onOpenChange, 
  project 
}) => {
  const { user, profile } = useAuth();
  const [formData, setFormData] = useState({
    message: '',
    proposedBudget: '',
    estimatedDuration: '',
    experience: '',
    portfolio: '',
    additionalInfo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь будет логика отправки заявки
    toast({
      title: "Заявка отправлена!",
      description: "Ваша заявка на проект успешно отправлена. Заказчик свяжется с вами в ближайшее время.",
    });
    
    setFormData({
      message: '',
      proposedBudget: '',
      estimatedDuration: '',
      experience: '',
      portfolio: '',
      additionalInfo: ''
    });
    
    onOpenChange(false);
  };

  const getFormFields = () => {
    const role = profile?.role;
    
    switch (role) {
      case 'freelancer':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Сопроводительное письмо *
              </Label>
              <Textarea
                id="message"
                placeholder="Расскажите, почему вы подходите для этого проекта..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proposedBudget" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Предложенная цена (₽)
                </Label>
                <Input
                  id="proposedBudget"
                  type="number"
                  placeholder="500000"
                  value={formData.proposedBudget}
                  onChange={(e) => setFormData({ ...formData, proposedBudget: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Срок выполнения
                </Label>
                <Input
                  id="estimatedDuration"
                  placeholder="2 месяца"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Релевантный опыт
              </Label>
              <Textarea
                id="experience"
                placeholder="Опишите ваш опыт в подобных проектах..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Ссылки на портфолио</Label>
              <Input
                id="portfolio"
                placeholder="https://portfolio.com"
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
              />
            </div>
          </>
        );

      case 'outsourcer':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Предложение от компании *
              </Label>
              <Textarea
                id="message"
                placeholder="Расскажите о вашей компании и команде..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proposedBudget" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Стоимость проекта (₽)
                </Label>
                <Input
                  id="proposedBudget"
                  type="number"
                  placeholder="1000000"
                  value={formData.proposedBudget}
                  onChange={(e) => setFormData({ ...formData, proposedBudget: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Время выполнения
                </Label>
                <Input
                  id="estimatedDuration"
                  placeholder="3-4 месяца"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Команда и экспертиза</Label>
              <Textarea
                id="experience"
                placeholder="Опишите вашу команду и опыт в данной области..."
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Дополнительные услуги</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Какие дополнительные услуги вы можете предложить?"
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={2}
              />
            </div>
          </>
        );

      case 'investor':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Инвестиционное предложение *
              </Label>
              <Textarea
                id="message"
                placeholder="Опишите ваше инвестиционное предложение..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="proposedBudget" className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Сумма инвестиций (₽)
                </Label>
                <Input
                  id="proposedBudget"
                  type="number"
                  placeholder="5000000"
                  value={formData.proposedBudget}
                  onChange={(e) => setFormData({ ...formData, proposedBudget: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Доля участия (%)</Label>
                <Input
                  id="experience"
                  placeholder="10-15%"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Условия инвестирования</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Укажите особые условия, требования к due diligence..."
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Опыт инвестирования</Label>
              <Textarea
                id="portfolio"
                placeholder="Расскажите о вашем опыте инвестирования в подобные проекты..."
                value={formData.portfolio}
                onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                rows={2}
              />
            </div>
          </>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="message">Сообщение *</Label>
            <Textarea
              id="message"
              placeholder="Напишите ваше сообщение..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
            />
          </div>
        );
    }
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Откликнуться на проект
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Информация о проекте */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="font-semibold mb-2">{project.title}</h3>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                <span>{(project.budget.min / 1000).toFixed(0)}K - {(project.budget.max / 1000).toFixed(0)}K ₽</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{project.timeline}</span>
              </div>
              <Badge variant="secondary">{project.category}</Badge>
            </div>
          </div>

          {/* Форма отклика */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {getFormFields()}

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Отправить заявку
              </Button>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectApplicationModal;