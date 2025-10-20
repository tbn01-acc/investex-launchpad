import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Имя обязательно" }),
  lastName: z.string().trim().min(1, { message: "Фамилия обязательна" }),
  email: z.string().trim().email({ message: "Неверный email" }),
  phone: z.string().trim().min(1, { message: "Телефон обязателен" }),
  subject: z.string().trim().min(1, { message: "Тема обязательна" }),
  message: z.string().trim()
    .min(100, { message: "Сообщение должно содержать минимум 100 символов" })
    .max(1000, { message: "Сообщение не может превышать 1000 символов" }),
});

const Contact = () => {
  const { toast } = useToast();
  const [sendCopy, setSendCopy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    try {
      const validated = contactSchema.parse(data);
      
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...validated,
          sendCopy,
        },
      });

      toast({
        title: "Спасибо!",
        description: "Ваше сообщение успешно отправлено.\nМы ответим вам не позднее 48 часов в рабочее время.",
        duration: 10000,
      });

      e.currentTarget.reset();
      setSendCopy(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Ошибка",
          description: "Не удалось отправить сообщение. Попробуйте позже.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'invest.exch@gmail.com',
      description: 'Ответим в течение 48 часов'
    },
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (936) 111-22-77',
      description: 'Техническая поддержка: 24/7'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'Россия, Москва',
      description: 'Офис открыт для встреч'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Есть вопросы о платформе? Хотите стать партнером? 
              Мы всегда готовы к диалогу и новым возможностям.
            </p>
          </section>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Напишите нам</CardTitle>
                <CardDescription>
                  Заполните форму, и мы свяжемся с вами в ближайшее время
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input id="firstName" name="firstName" required />
                      {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input id="lastName" name="lastName" required />
                      {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" required />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input id="phone" name="phone" type="tel" required />
                    {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема обращения *</Label>
                    <Input id="subject" name="subject" required />
                    {errors.subject && <p className="text-sm text-destructive">{errors.subject}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение * (100-1000 символов)</Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      rows={6} 
                      required 
                      placeholder="Расскажите подробнее о вашем запросе..."
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sendCopy" 
                      checked={sendCopy}
                      onCheckedChange={(checked) => setSendCopy(checked as boolean)}
                    />
                    <Label 
                      htmlFor="sendCopy" 
                      className="text-sm font-normal cursor-pointer"
                    >
                      Отправить копию себе
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              {contactInfo.map((contact, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <contact.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{contact.title}</h3>
                        <p className="font-medium">{contact.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* FAQ Link */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">Часто задаваемые вопросы</h3>
                  <p className="text-muted-foreground mb-4">
                    Возможно, ответ на ваш вопрос уже есть в нашей базе знаний
                  </p>
                  <Button variant="outline" className="w-full">
                    Посмотреть FAQ
                  </Button>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Часы работы</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Понедельник - Пятница</span>
                      <span className="font-medium">10:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Суббота</span>
                      <span className="font-medium">11:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Воскресенье</span>
                      <span className="text-muted-foreground">Выходной</span>
                    </div>
                    <div className="border-t pt-2 mt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">Техническая поддержка</span>
                        <span className="font-medium">24/7</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Без выходных</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partnership Section */}
          <section className="py-16 mt-16">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Станьте нашим партнером</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Если вы представляете инвестиционный фонд, акселератор или 
                  образовательное учреждение, давайте обсудим сотрудничество
                </p>
                <Button size="lg" variant="outline">
                  Узнать о партнерстве
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;