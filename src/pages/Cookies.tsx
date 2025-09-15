import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const Cookies = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Политика использования Cookie</h1>
            <p className="text-lg text-muted-foreground">
              Информация о том, как мы используем файлы cookie на нашем сайте
            </p>
          </div>

          <Alert className="mb-8">
            <Cookie className="h-4 w-4" />
            <AlertDescription>
              Мы используем файлы cookie для улучшения вашего опыта использования платформы. 
              Продолжая использовать сайт, вы соглашаетесь с нашей политикой использования cookie.
            </AlertDescription>
          </Alert>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Что такое файлы cookie?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
                  при посещении веб-сайтов. Они помогают сайтам "запоминать" информацию о вашем визите, 
                  что может сделать ваше следующее посещение более удобным и полезным.
                </p>
                <p>
                  Cookie не содержат вирусов и не могут получить доступ к файлам на вашем компьютере. 
                  Они не могут быть использованы для идентификации вас лично.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Какие типы cookie мы используем</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 text-primary">Обязательные cookie</h4>
                  <p className="mb-2">
                    Эти файлы cookie необходимы для функционирования сайта и не могут быть отключены:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Аутентификация и безопасность сессии</li>
                    <li>Запоминание предпочтений языка</li>
                    <li>Корзина покупок и состояние форм</li>
                    <li>Защита от мошенничества</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-secondary">Функциональные cookie</h4>
                  <p className="mb-2">
                    Эти файлы cookie улучшают функциональность сайта:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Запоминание настроек интерфейса</li>
                    <li>Сохранение выбранной валюты</li>
                    <li>Предпочтения уведомлений</li>
                    <li>Недавно просмотренные проекты</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-accent">Аналитические cookie</h4>
                  <p className="mb-2">
                    Эти файлы cookie помогают нам понять, как используется сайт:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Google Analytics для анализа трафика</li>
                    <li>Статистика использования функций</li>
                    <li>Информация о производительности сайта</li>
                    <li>Анализ пользовательского поведения</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-destructive">Рекламные cookie</h4>
                  <p className="mb-2">
                    Эти файлы cookie используются для показа релевантной рекламы:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ретаргетинг в социальных сетях</li>
                    <li>Персонализированная реклама</li>
                    <li>Отслеживание эффективности рекламных кампаний</li>
                    <li>Интеграция с рекламными сетями</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сторонние сервисы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Мы используем следующие сторонние сервисы, которые могут устанавливать свои cookie:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Google Analytics</h4>
                    <p className="text-sm text-muted-foreground">
                      Анализ трафика и поведения пользователей
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Stripe</h4>
                    <p className="text-sm text-muted-foreground">
                      Обработка платежей и финансовых операций
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Supabase</h4>
                    <p className="text-sm text-muted-foreground">
                      Аутентификация и хранение данных
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Intercom</h4>
                    <p className="text-sm text-muted-foreground">
                      Система поддержки и чат
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Управление файлами cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Вы можете контролировать использование файлов cookie несколькими способами:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Настройки браузера</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Большинство браузеров позволяют управлять файлами cookie через настройки:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie</li>
                      <li>Firefox: Настройки → Приватность и защита → Файлы cookie</li>
                      <li>Safari: Настройки → Конфиденциальность → Файлы cookie</li>
                      <li>Edge: Настройки → Конфиденциальность → Файлы cookie</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Центр управления cookie</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Вы можете настроить предпочтения cookie для нашего сайта:
                    </p>
                    <Button variant="outline">
                      Открыть настройки cookie
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Последствия отключения cookie</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Отключение определенных типов cookie может повлиять на функциональность сайта:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Необходимость повторной авторизации при каждом посещении</li>
                  <li>Сброс языковых настроек и предпочтений</li>
                  <li>Невозможность запомнить товары в корзине</li>
                  <li>Ограниченная персонализация контента</li>
                  <li>Невозможность анализа эффективности сайта</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Обновления политики</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Мы можем периодически обновлять данную политику использования cookie. 
                  О существенных изменениях мы будем уведомлять через:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Уведомления на сайте</li>
                  <li>Электронную почту</li>
                  <li>Push-уведомления</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Если у вас есть вопросы о нашей политике использования cookie, обращайтесь:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Email: cookies@investex.com</li>
                  <li>Форма обратной связи на сайте</li>
                  <li>Служба поддержки: support@investex.com</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="mr-4">
              Принять все cookie
            </Button>
            <Button variant="outline" size="lg">
              Настроить предпочтения
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Последнее обновление: 15 сентября 2025 года</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cookies;