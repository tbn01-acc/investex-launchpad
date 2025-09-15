import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Eye, Users, Server, CheckCircle } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "Шифрование данных",
      description: "Все данные шифруются с использованием AES-256 при хранении и TLS 1.3 при передаче",
      status: "Активно"
    },
    {
      icon: Shield,
      title: "Двухфакторная аутентификация",
      description: "Защита аккаунтов с помощью SMS, email или приложений-аутентификаторов",
      status: "Доступно"
    },
    {
      icon: Eye,
      title: "Мониторинг безопасности",
      description: "Круглосуточное отслеживание подозрительной активности и попыток взлома",
      status: "24/7"
    },
    {
      icon: Users,
      title: "Проверка пользователей",
      description: "Верификация личности и компаний для повышения доверия на платформе",
      status: "Обязательно"
    },
    {
      icon: Server,
      title: "Защищенная инфраструктура",
      description: "Размещение на сертифицированных серверах с соблюдением стандартов безопасности",
      status: "ISO 27001"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Безопасность InvestEx</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы используем передовые технологии и лучшие практики для защиты ваших данных, 
              средств и конфиденциальности
            </p>
          </div>

          <Alert className="mb-12">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Наша команда безопасности работает круглосуточно для защиты вашей информации. 
              Обо всех инцидентах безопасности мы уведомляем в течение 24 часов.
            </AlertDescription>
          </Alert>

          {/* Security Features Grid */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-16">
            {securityFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary">{feature.status}</Badge>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Защита данных
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Шифрование</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• AES-256 для хранения данных</li>
                    <li>• TLS 1.3 для передачи данных</li>
                    <li>• End-to-end шифрование сообщений</li>
                    <li>• Безопасное хранение паролей (bcrypt)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Доступ к данным</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Принцип минимальных привилегий</li>
                    <li>• Логирование всех обращений к данным</li>
                    <li>• Регулярный аудит доступов</li>
                    <li>• Немедленное блокирование при подозрениях</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Финансовая безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Платежи</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• PCI DSS сертификация</li>
                    <li>• Escrow-сервис для проектов</li>
                    <li>• Мониторинг подозрительных транзакций</li>
                    <li>• Двойная проверка крупных операций</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Противодействие мошенничеству</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• ML-алгоритмы для выявления аномалий</li>
                    <li>• Проверка личности инвесторов</li>
                    <li>• Анализ поведенческих паттернов</li>
                    <li>• Автоматическая блокировка рисков</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Сертификации и соответствие стандартам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-1">ISO 27001</h4>
                    <p className="text-sm text-muted-foreground">Информационная безопасность</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-1">PCI DSS</h4>
                    <p className="text-sm text-muted-foreground">Безопасность платежей</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-1">GDPR</h4>
                    <p className="text-sm text-muted-foreground">Защита персональных данных</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold mb-1">152-ФЗ</h4>
                    <p className="text-sm text-muted-foreground">Российское законодательство</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Процедуры безопасности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Регулярные проверки</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Еженедельное тестирование на проникновение</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Ежемесячная ротация ключей шифрования</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Квартальный аудит кода</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Годовая сертификация безопасности</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Реагирование на инциденты</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Детекция угроз в реальном времени</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Автоматическая изоляция угроз</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Уведомление пользователей в течение 24ч</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Полный отчет об инциденте</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Рекомендации по безопасности для пользователей</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Защита аккаунта</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Используйте уникальный сложный пароль</li>
                      <li>• Включите двухфакторную аутентификацию</li>
                      <li>• Регулярно обновляйте пароль</li>
                      <li>• Не используйте пароль на других сайтах</li>
                      <li>• Выходите из аккаунта на чужих устройствах</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Безопасное поведение</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Проверяйте URL сайта перед вводом данных</li>
                      <li>• Не переходите по подозрительным ссылкам</li>
                      <li>• Никому не сообщайте данные аккаунта</li>
                      <li>• Сообщайте о подозрительной активности</li>
                      <li>• Регулярно проверяйте историю операций</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Связаться с отделом безопасности</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Если вы обнаружили уязвимость или подозрительную активность, немедленно свяжитесь с нами:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Экстренная связь</h4>
                    <p className="text-sm text-muted-foreground">security@investex.com</p>
                    <p className="text-sm text-muted-foreground">+7 (xxx) xxx-xx-xx</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Bug Bounty</h4>
                    <p className="text-sm text-muted-foreground">bugbounty@investex.com</p>
                    <p className="text-sm text-muted-foreground">Вознаграждение до $10,000</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Общие вопросы</h4>
                    <p className="text-sm text-muted-foreground">support@investex.com</p>
                    <p className="text-sm text-muted-foreground">Ответ в течение 4 часов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>Последнее обновление: 15 сентября 2025 года</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Security;