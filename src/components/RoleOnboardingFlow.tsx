import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UserRole, ROLE_CONFIGS } from '@/types/roles';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface RoleOnboardingFlowProps {
  userRole: UserRole;
  userId: string;
  onComplete: () => void;
}

interface VerificationRequirement {
  verification_type: string;
  required_documents: string[];
  verification_criteria: any;
}

const RoleOnboardingFlow: React.FC<RoleOnboardingFlowProps> = ({
  userRole,
  userId,
  onComplete
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [documents, setDocuments] = useState<Record<string, File>>({});
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [requirements, setRequirements] = useState<VerificationRequirement[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const roleConfig = ROLE_CONFIGS[userRole];

  useEffect(() => {
    fetchVerificationRequirements();
  }, [userRole]);

  const fetchVerificationRequirements = async () => {
    try {
      const { data, error } = await supabase
        .from('role_verification_requirements')
        .select('*')
        .eq('role', userRole);

      if (error) throw error;
      setRequirements(data || []);
    } catch (error) {
      console.error('Error fetching verification requirements:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить требования верификации",
        variant: "destructive"
      });
    }
  };

  const getOnboardingSteps = (): OnboardingStep[] => {
    const baseSteps: OnboardingStep[] = [
      {
        id: 'welcome',
        title: 'Добро пожаловать',
        description: `Настройка профиля ${roleConfig.name}`,
        completed: false
      },
      {
        id: 'identity',
        title: 'Верификация личности',
        description: 'Подтверждение личных данных',
        completed: false
      }
    ];

    // Add role-specific steps
    if (['investor', 'subsidiary_investor'].includes(userRole)) {
      baseSteps.push({
        id: 'financial',
        title: 'Финансовая верификация',
        description: 'Подтверждение инвестиционных возможностей',
        completed: false
      });
    }

    if (['founder', 'co_founder', 'co_owner', 'outsourcer', 'contractor'].includes(userRole)) {
      baseSteps.push({
        id: 'business',
        title: 'Бизнес-верификация',
        description: 'Подтверждение деловой деятельности',
        completed: false
      });
    }

    if (['freelancer'].includes(userRole)) {
      baseSteps.push({
        id: 'professional',
        title: 'Профессиональная верификация',
        description: 'Подтверждение навыков и опыта',
        completed: false
      });
    }

    baseSteps.push({
      id: 'complete',
      title: 'Завершение',
      description: 'Финализация регистрации',
      completed: false
    });

    return baseSteps;
  };

  const steps = getOnboardingSteps();
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleFileUpload = (documentType: string, file: File) => {
    setDocuments(prev => ({
      ...prev,
      [documentType]: file
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderDocumentUpload = (documentType: string, label: string) => {
    const hasFile = documents[documentType];
    
    return (
      <div key={documentType} className="space-y-2">
        <Label htmlFor={documentType}>{label}</Label>
        <div className="flex items-center gap-2">
          <Input
            id={documentType}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(documentType, file);
            }}
            className="flex-1"
          />
          {hasFile && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Загружен
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const renderWelcomeStep = () => (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-6xl mb-4">{roleConfig.icon}</div>
        <h2 className="text-2xl font-bold">{roleConfig.name}</h2>
        <p className="text-muted-foreground mt-2">{roleConfig.description}</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            value={formData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Введите ваше имя"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            value={formData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Введите вашу фамилию"
          />
        </div>
        <div>
          <Label htmlFor="bio">О себе</Label>
          <Textarea
            id="bio"
            value={formData.bio || ''}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Расскажите о себе"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  const renderIdentityStep = () => {
    const identityReq = requirements.find(r => r.verification_type === 'identity');
    const documents = identityReq?.required_documents || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Документы для верификации личности</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Загрузите следующие документы для подтверждения личности
          </p>
        </div>
        <div className="space-y-4">
          {documents.map(doc => {
            const labels: Record<string, string> = {
              'passport': 'Паспорт',
              'proof_of_address': 'Справка о регистрации',
              'professional_references': 'Профессиональные рекомендации',
              'professional_cv': 'Резюме',
              'cv': 'Резюме'
            };
            return renderDocumentUpload(doc, labels[doc] || doc);
          })}
        </div>
      </div>
    );
  };

  const renderFinancialStep = () => {
    const financialReq = requirements.find(r => r.verification_type === 'financial');
    const documents = financialReq?.required_documents || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Финансовая верификация</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Подтвердите вашу инвестиционную способность
          </p>
        </div>
        <div className="space-y-4">
          {documents.map(doc => {
            const labels: Record<string, string> = {
              'bank_statement': 'Справка из банка',
              'investment_portfolio': 'Инвестиционное портфолио',
              'income_proof': 'Справка о доходах'
            };
            return renderDocumentUpload(doc, labels[doc] || doc);
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="investmentCapacity">Инвестиционная емкость (₽)</Label>
            <Input
              id="investmentCapacity"
              type="number"
              value={formData.investmentCapacity || ''}
              onChange={(e) => handleInputChange('investmentCapacity', e.target.value)}
              placeholder="Например: 1000000"
            />
          </div>
          <div>
            <Label htmlFor="riskTolerance">Толерантность к риску</Label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.riskTolerance || ''}
              onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
            >
              <option value="">Выберите уровень</option>
              <option value="low">Низкий</option>
              <option value="medium">Средний</option>
              <option value="high">Высокий</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderBusinessStep = () => {
    const businessReq = requirements.find(r => r.verification_type === 'business');
    const documents = businessReq?.required_documents || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Бизнес-верификация</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Подтвердите вашу деловую деятельность
          </p>
        </div>
        <div className="space-y-4">
          {documents.map(doc => {
            const labels: Record<string, string> = {
              'business_plan': 'Бизнес-план',
              'company_registration': 'Регистрация компании',
              'tax_documents': 'Налоговые документы',
              'partnership_agreement': 'Соглашение о партнерстве',
              'contribution_proof': 'Подтверждение вклада',
              'investment_intent': 'Намерение инвестировать',
              'due_diligence_report': 'Отчет по анализу',
              'team_profiles': 'Профили команды',
              'service_portfolio': 'Портфолио услуг',
              'business_license': 'Бизнес-лицензия',
              'insurance_docs': 'Страховые документы',
              'compliance_certificates': 'Сертификаты соответствия'
            };
            return renderDocumentUpload(doc, labels[doc] || doc);
          })}
        </div>
      </div>
    );
  };

  const renderProfessionalStep = () => {
    const professionalReq = requirements.find(r => r.verification_type === 'professional');
    const documents = professionalReq?.required_documents || [];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Профессиональная верификация</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Подтвердите ваши навыки и опыт
          </p>
        </div>
        <div className="space-y-4">
          {documents.map(doc => {
            const labels: Record<string, string> = {
              'portfolio': 'Портфолио',
              'skill_certificates': 'Сертификаты навыков',
              'work_samples': 'Образцы работ'
            };
            return renderDocumentUpload(doc, labels[doc] || doc);
          })}
        </div>
      </div>
    );
  };

  const renderCompleteStep = () => (
    <div className="text-center space-y-4">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
      <h3 className="text-xl font-semibold">Регистрация завершена!</h3>
      <p className="text-muted-foreground">
        Ваш профиль {roleConfig.name} создан. Документы отправлены на верификацию.
      </p>
      <Badge variant="outline" className="mx-auto">
        Ожидает модерации
      </Badge>
    </div>
  );

  const renderCurrentStep = () => {
    const step = steps[currentStep];
    
    switch (step.id) {
      case 'welcome':
        return renderWelcomeStep();
      case 'identity':
        return renderIdentityStep();
      case 'financial':
        return renderFinancialStep();
      case 'business':
        return renderBusinessStep();
      case 'professional':
        return renderProfessionalStep();
      case 'complete':
        return renderCompleteStep();
      default:
        return null;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Update profile with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          bio: formData.bio,
          onboarding_completed_at: new Date().toISOString(),
          role_specific_data: {
            investmentCapacity: formData.investmentCapacity,
            riskTolerance: formData.riskTolerance,
            ...formData
          },
          verification_documents: Object.keys(documents),
          documents_status: 'pending',
          kyc_status: 'submitted'
        })
        .eq('user_id', userId);

      if (error) throw error;

      toast({
        title: "Успешно!",
        description: "Регистрация завершена. Документы отправлены на проверку."
      });

      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось завершить регистрацию",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Регистрация {roleConfig.name}</span>
            <Badge variant="outline">
              {currentStep + 1} из {steps.length}
            </Badge>
          </CardTitle>
          <CardDescription>
            {steps[currentStep]?.description}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          {renderCurrentStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Назад
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={loading}
              className="min-w-[100px]"
            >
              {currentStep === steps.length - 1 ? 'Завершить' : 'Далее'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleOnboardingFlow;