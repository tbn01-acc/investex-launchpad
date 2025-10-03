import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Upload, Video, FileText } from 'lucide-react';

interface PitchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId?: number;
  projectName?: string;
}

export const PitchModal = ({ open, onOpenChange, projectId, projectName }: PitchModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    elevator_pitch: '',
    problem: '',
    solution: '',
    market_size: '',
    business_model: '',
    competition: '',
    team: '',
    traction: '',
    financials: '',
    ask: '',
    pitch_deck_url: '',
    video_url: '',
  });

  const handleSubmit = () => {
    toast({
      title: "Питч создан",
      description: `Питч для проекта "${projectName}" успешно создан и отправлен на проверку`,
    });
    onOpenChange(false);
    setStep(1);
    setFormData({
      title: '',
      elevator_pitch: '',
      problem: '',
      solution: '',
      market_size: '',
      business_model: '',
      competition: '',
      team: '',
      traction: '',
      financials: '',
      ask: '',
      pitch_deck_url: '',
      video_url: '',
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Название питча</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Например: Революция в EdTech"
              />
            </div>
            <div>
              <Label htmlFor="elevator_pitch">Elevator Pitch (30 секунд)</Label>
              <Textarea
                id="elevator_pitch"
                value={formData.elevator_pitch}
                onChange={(e) => setFormData({ ...formData, elevator_pitch: e.target.value })}
                placeholder="Краткое описание вашего проекта в 2-3 предложениях"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="problem">Проблема</Label>
              <Textarea
                id="problem"
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                placeholder="Какую проблему решает ваш проект?"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="solution">Решение</Label>
              <Textarea
                id="solution"
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Как ваш продукт решает эту проблему?"
                rows={4}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="market_size">Размер рынка</Label>
              <Textarea
                id="market_size"
                value={formData.market_size}
                onChange={(e) => setFormData({ ...formData, market_size: e.target.value })}
                placeholder="TAM, SAM, SOM - опишите размер рынка"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="business_model">Бизнес-модель</Label>
              <Textarea
                id="business_model"
                value={formData.business_model}
                onChange={(e) => setFormData({ ...formData, business_model: e.target.value })}
                placeholder="Как вы зарабатываете деньги?"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="competition">Конкуренция</Label>
              <Textarea
                id="competition"
                value={formData.competition}
                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                placeholder="Кто ваши конкуренты и в чем ваше преимущество?"
                rows={4}
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="team">Команда</Label>
              <Textarea
                id="team"
                value={formData.team}
                onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                placeholder="Расскажите о ключевых членах команды и их опыте"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="traction">Тракция</Label>
              <Textarea
                id="traction"
                value={formData.traction}
                onChange={(e) => setFormData({ ...formData, traction: e.target.value })}
                placeholder="Метрики, достижения, пользователи, выручка"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="financials">Финансы</Label>
              <Textarea
                id="financials"
                value={formData.financials}
                onChange={(e) => setFormData({ ...formData, financials: e.target.value })}
                placeholder="Прогнозы, текущая выручка, расходы"
                rows={4}
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ask">Запрос инвестиций</Label>
              <Textarea
                id="ask"
                value={formData.ask}
                onChange={(e) => setFormData({ ...formData, ask: e.target.value })}
                placeholder="Сколько средств вы привлекаете и на что планируете их использовать?"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="pitch_deck_url">Ссылка на Pitch Deck</Label>
              <div className="flex gap-2">
                <Input
                  id="pitch_deck_url"
                  type="url"
                  value={formData.pitch_deck_url}
                  onChange={(e) => setFormData({ ...formData, pitch_deck_url: e.target.value })}
                  placeholder="https://..."
                />
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="video_url">Ссылка на видео-питч</Label>
              <div className="flex gap-2">
                <Input
                  id="video_url"
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Создание питча {projectName && `для "${projectName}"`}
          </DialogTitle>
          <DialogDescription>
            Шаг {step} из 4: {step === 1 ? 'Основная информация' : step === 2 ? 'Рынок и бизнес-модель' : step === 3 ? 'Команда и метрики' : 'Запрос и материалы'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress indicator */}
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-secondary'
                }`}
              />
            ))}
          </div>

          {renderStep()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Назад
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              {step < 4 ? (
                <Button onClick={() => setStep(step + 1)}>
                  Далее
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <FileText className="h-4 w-4 mr-2" />
                  Создать питч
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};