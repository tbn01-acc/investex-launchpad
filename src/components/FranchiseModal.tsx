import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Store, MapPin, DollarSign, Users } from 'lucide-react';

interface FranchiseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  franchise?: any;
}

const FranchiseModal = ({ open, onOpenChange, franchise }: FranchiseModalProps) => {
  const [formData, setFormData] = useState({
    name: franchise?.name || '',
    category: franchise?.category || '',
    description: franchise?.description || '',
    initialInvestment: franchise?.initialInvestment || '',
    monthlyProfit: franchise?.monthlyProfit || '',
    paybackPeriod: franchise?.paybackPeriod || '',
    locations: franchise?.locations?.join(', ') || '',
    supportLevel: franchise?.supportLevel || 'Стандартная',
    roi: franchise?.roi || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь будет логика сохранения в Supabase
    console.log('Franchise data:', formData);
    
    toast.success(franchise ? 'Франшиза обновлена!' : 'Франшиза создана!');
    onOpenChange(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {franchise ? 'Редактировать франшизу' : 'Создать франшизу'}
          </DialogTitle>
          <DialogDescription>
            Заполните информацию о вашей франшизе
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Основная информация */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Название франшизы *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Название вашей франшизы"
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Категория *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Общепит">Общепит</SelectItem>
                  <SelectItem value="Фитнес">Фитнес</SelectItem>
                  <SelectItem value="Образование">Образование</SelectItem>
                  <SelectItem value="Автосервис">Автосервис</SelectItem>
                  <SelectItem value="Ритейл">Ритейл</SelectItem>
                  <SelectItem value="Красота">Красота</SelectItem>
                  <SelectItem value="Услуги">Услуги</SelectItem>
                  <SelectItem value="Технологии">Технологии</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Подробное описание франшизы..."
                rows={4}
                required
              />
            </div>
          </div>

          {/* Финансовая информация */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Финансовые показатели
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="initialInvestment">Первоначальные инвестиции (₽) *</Label>
                <Input
                  id="initialInvestment"
                  type="number"
                  value={formData.initialInvestment}
                  onChange={(e) => handleChange('initialInvestment', e.target.value)}
                  placeholder="5000000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="monthlyProfit">Ежемесячная прибыль (₽) *</Label>
                <Input
                  id="monthlyProfit"
                  type="number"
                  value={formData.monthlyProfit}
                  onChange={(e) => handleChange('monthlyProfit', e.target.value)}
                  placeholder="300000"
                  required
                />
              </div>

              <div>
                <Label htmlFor="paybackPeriod">Срок окупаемости (мес) *</Label>
                <Input
                  id="paybackPeriod"
                  type="number"
                  value={formData.paybackPeriod}
                  onChange={(e) => handleChange('paybackPeriod', e.target.value)}
                  placeholder="18"
                  required
                />
              </div>

              <div>
                <Label htmlFor="roi">ROI (%) *</Label>
                <Input
                  id="roi"
                  type="number"
                  value={formData.roi}
                  onChange={(e) => handleChange('roi', e.target.value)}
                  placeholder="25"
                  required
                />
              </div>
            </div>
          </div>

          {/* Локации и поддержка */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="locations" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Локации (через запятую)
              </Label>
              <Input
                id="locations"
                value={formData.locations}
                onChange={(e) => handleChange('locations', e.target.value)}
                placeholder="Москва, Санкт-Петербург, Казань"
              />
            </div>

            <div>
              <Label htmlFor="supportLevel" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Уровень поддержки
              </Label>
              <Select value={formData.supportLevel} onValueChange={(value) => handleChange('supportLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Базовая">Базовая</SelectItem>
                  <SelectItem value="Стандартная">Стандартная</SelectItem>
                  <SelectItem value="Расширенная">Расширенная</SelectItem>
                  <SelectItem value="Полная">Полная</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button type="submit">
              {franchise ? 'Обновить' : 'Создать франшизу'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FranchiseModal;
