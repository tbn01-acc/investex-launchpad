import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    billingAddress: '',
    city: '',
    country: 'RU',
    postalCode: ''
  });

  const planName = searchParams.get('plan') || 'PRO';
  const price = searchParams.get('price') || '$49';
  const period = searchParams.get('period') || 'monthly';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    alert(`Обработка платежа для тарифа "${planName}" на сумму ${price}. Форма оплаты будет интегрирована позже.`);
  };

  const features = {
    'Базовый': [
      'Создание базового профиля',
      'Поиск проектов с ограничениями', 
      'До 3 активных проектов',
      'Базовая версия базы знаний'
    ],
    'PRO': [
      'Все возможности Базового тарифа',
      'Неограниченный поиск и фильтры',
      'До 15 активных проектов',
      'Расширенная аналитика',
      'Приоритет в поиске'
    ],
    'BUSINESS': [
      'Все возможности PRO тарифа',
      'Управление командой до 50 человек',
      'Неограниченные проекты',
      'Расширенные финансовые инструменты',
      'Белая маркировка'
    ]
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Оформление подписки</h1>
            <p className="text-xl text-muted-foreground">
              Завершите оплату и получите доступ ко всем возможностям
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Детали заказа
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{planName}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {period === 'monthly' ? 'Ежемесячно' : 
                         period === 'quarterly' ? 'Раз в 3 месяца' :
                         period === 'biannual' ? 'Раз в 6 месяцев' : 'Ежегодно'}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{price}</div>
                      <div className="text-sm text-muted-foreground">
                        {period === 'quarterly' && '5% скидка'}
                        {period === 'biannual' && '10% скидка'}  
                        {period === 'annual' && '20% скидка'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Включено в тариф:</h4>
                    <ul className="space-y-1">
                      {(features[planName as keyof typeof features] || []).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Security Info */}
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Lock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-sm">Безопасная оплата</p>
                    <p className="text-xs text-muted-foreground">
                      Ваши данные защищены SSL шифрованием
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Способ оплаты
                </CardTitle>
                <CardDescription>
                  Введите данные карты для завершения покупки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Card Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Номер карты</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Срок действия</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/ГГ"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          placeholder="123"
                          maxLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardName">Имя на карте</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        placeholder="IVAN PETROV"
                        required
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Адрес плательщика</h4>
                    
                    <div>
                      <Label htmlFor="billingAddress">Адрес</Label>
                      <Input
                        id="billingAddress"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        placeholder="ул. Примерная, д. 123"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Город</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Москва"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Индекс</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="123456"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Страна</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RU">Россия</SelectItem>
                          <SelectItem value="US">США</SelectItem>
                          <SelectItem value="EU">Европа</SelectItem>
                          <SelectItem value="OTHER">Другое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" className="w-full" size="lg">
                    <Lock className="h-4 w-4 mr-2" />
                    Оплатить {price}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая "Оплатить", вы соглашаетесь с{' '}
                    <a href="/terms" className="underline">условиями использования</a> и{' '}
                    <a href="/privacy" className="underline">политикой конфиденциальности</a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;