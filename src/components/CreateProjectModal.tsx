import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { formatCurrency } = useLanguage();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_type: 'startup',
    industry: 'fintech',
    project_stage: 'idea',
    funding_stage: 'pre_seed',
    funding_goal: '',
    min_investment: '',
    executive_summary: '',
    value_proposition: '',
    target_market: '',
    business_model: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Необходимо войти в систему"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('projects').insert([{
        owner_id: user.id,
        title: formData.title,
        description: formData.description,
        project_type: formData.project_type,
        industry: formData.industry as any,
        project_stage: formData.project_stage as any,
        funding_stage: formData.funding_stage as any,
        funding_goal: parseFloat(formData.funding_goal) || 0,
        min_investment: parseFloat(formData.min_investment) || 50000,
        executive_summary: formData.executive_summary,
        value_proposition: formData.value_proposition,
        target_market: formData.target_market,
        business_model: formData.business_model,
        is_sandbox: true, // Проект создается в песочнице
        status: 'draft'
      }]);

      if (error) throw error;

      toast({
        title: "Успешно!",
        description: "Проект создан и отправлен на модерацию. После одобрения суперадминистратором он появится в разделе проектов.",
      });

      onOpenChange(false);
      setStep(1);
      setFormData({
        title: '',
        description: '',
        project_type: 'startup',
        industry: 'fintech',
        project_stage: 'idea',
        funding_stage: 'pre_seed',
        funding_goal: '',
        min_investment: '',
        executive_summary: '',
        value_proposition: '',
        target_market: '',
        business_model: '',
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.description;
      case 2:
        return formData.project_type && formData.industry;
      case 3:
        return formData.funding_goal && formData.min_investment;
      case 4:
        return formData.executive_summary && formData.value_proposition;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Создать новый проект</DialogTitle>
          <DialogDescription>
            Шаг {step} из 4: {
              step === 1 ? 'Основная информация' :
              step === 2 ? 'Категория и стадия' :
              step === 3 ? 'Финансирование' :
              'Описание проекта'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Шаг 1: Основная информация */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Название проекта *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Введите название проекта"
                />
              </div>
              <div>
                <Label htmlFor="description">Краткое описание *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Опишите ваш проект в нескольких предложениях"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Шаг 2: Категория и стадия */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="project_type">Тип проекта *</Label>
                <Select 
                  value={formData.project_type} 
                  onValueChange={(value) => handleInputChange('project_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Стартап</SelectItem>
                    <SelectItem value="investment">Инвестиционный проект</SelectItem>
                    <SelectItem value="freelance">Фриланс проект</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="industry">Индустрия *</Label>
                <Select 
                  value={formData.industry} 
                  onValueChange={(value) => handleInputChange('industry', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fintech">Fintech</SelectItem>
                    <SelectItem value="healthtech">Healthtech</SelectItem>
                    <SelectItem value="edtech">Edtech</SelectItem>
                    <SelectItem value="greentech">Greentech</SelectItem>
                    <SelectItem value="e_commerce">E-commerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ai_ml">AI/ML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project_stage">Стадия проекта *</Label>
                <Select 
                  value={formData.project_stage} 
                  onValueChange={(value) => handleInputChange('project_stage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">Идея</SelectItem>
                    <SelectItem value="mvp">MVP</SelectItem>
                    <SelectItem value="traction">Traction</SelectItem>
                    <SelectItem value="scale">Масштабирование</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="funding_stage">Стадия финансирования *</Label>
                <Select 
                  value={formData.funding_stage} 
                  onValueChange={(value) => handleInputChange('funding_stage', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre_seed">Pre-seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series_a">Series A</SelectItem>
                    <SelectItem value="series_b">Series B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Шаг 3: Финансирование */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="funding_goal">Цель финансирования (₽) *</Label>
                <Input
                  id="funding_goal"
                  type="number"
                  value={formData.funding_goal}
                  onChange={(e) => handleInputChange('funding_goal', e.target.value)}
                  placeholder="1000000"
                />
              </div>
              <div>
                <Label htmlFor="min_investment">Минимальная инвестиция (₽) *</Label>
                <Input
                  id="min_investment"
                  type="number"
                  value={formData.min_investment}
                  onChange={(e) => handleInputChange('min_investment', e.target.value)}
                  placeholder="50000"
                />
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 <strong>Совет:</strong> Укажите реалистичную цель финансирования и минимальную сумму инвестиции, 
                  которая позволит инвесторам участвовать в вашем проекте.
                </p>
              </div>
            </div>
          )}

          {/* Шаг 4: Детальное описание */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="executive_summary">Краткое резюме *</Label>
                <Textarea
                  id="executive_summary"
                  value={formData.executive_summary}
                  onChange={(e) => handleInputChange('executive_summary', e.target.value)}
                  placeholder="Кратко опишите суть вашего проекта, проблему которую он решает и уникальность решения"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="value_proposition">Ценностное предложение *</Label>
                <Textarea
                  id="value_proposition"
                  value={formData.value_proposition}
                  onChange={(e) => handleInputChange('value_proposition', e.target.value)}
                  placeholder="Что делает ваш продукт уникальным? Какую ценность он предоставляет клиентам?"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="target_market">Целевой рынок</Label>
                <Textarea
                  id="target_market"
                  value={formData.target_market}
                  onChange={(e) => handleInputChange('target_market', e.target.value)}
                  placeholder="Опишите вашу целевую аудиторию и размер рынка"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="business_model">Бизнес-модель</Label>
                <Textarea
                  id="business_model"
                  value={formData.business_model}
                  onChange={(e) => handleInputChange('business_model', e.target.value)}
                  placeholder="Как вы планируете зарабатывать деньги?"
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            )}
          </div>
          
          <div className="flex gap-2">
            {step < 4 ? (
              <Button onClick={nextStep} disabled={!isStepValid()}>
                Далее
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading || !isStepValid()}>
                <Check className="h-4 w-4 mr-2" />
                {loading ? 'Создание...' : 'Создать проект'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}