import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@investex.ru',
      description: 'Ответим в течение 24 часов'
    },
    {
      icon: Phone,
      title: 'Телефон',
      value: '+7 (495) 123-45-67',
      description: 'Ежедневно с 9:00 до 20:00'
    },
    {
      icon: MapPin,
      title: 'Адрес',
      value: 'Москва, ул. Тверская, 1',
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
                      <Label htmlFor="firstName">Имя</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Тема обращения</Label>
                    <Input id="subject" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      required 
                      placeholder="Расскажите подробнее о вашем запросе..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Отправить сообщение
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
                        <p className="font-medium mb-1">{contact.value}</p>
                        <p className="text-muted-foreground text-sm">{contact.description}</p>
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
                      <span className="font-medium">9:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Суббота</span>
                      <span className="font-medium">10:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Воскресенье</span>
                      <span className="text-muted-foreground">Выходной</span>
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