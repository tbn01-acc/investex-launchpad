import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code, Copy, ExternalLink, Key, Book, Zap } from 'lucide-react';

const ApiDocs = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('auth');

  const apiEndpoints = {
    auth: {
      title: "Аутентификация",
      description: "Управление пользователями и сессиями",
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/login",
          description: "Авторизация пользователя",
          params: { email: "string", password: "string" },
          response: { token: "string", user: "object", expires_in: "number" }
        },
        {
          method: "POST", 
          path: "/api/auth/register",
          description: "Регистрация нового пользователя",
          params: { email: "string", password: "string", role: "string" },
          response: { user: "object", token: "string" }
        },
        {
          method: "POST",
          path: "/api/auth/refresh",
          description: "Обновление токена доступа",
          params: { refresh_token: "string" },
          response: { token: "string", expires_in: "number" }
        }
      ]
    },
    projects: {
      title: "Проекты",
      description: "Работа с проектами и заявками",
      endpoints: [
        {
          method: "GET",
          path: "/api/projects",
          description: "Получить список проектов",
          params: { page: "number", limit: "number", category: "string" },
          response: { projects: "array", total: "number", page: "number" }
        },
        {
          method: "POST",
          path: "/api/projects",
          description: "Создать новый проект",
          params: { title: "string", description: "string", budget: "object", skills: "array" },
          response: { project: "object", id: "string" }
        },
        {
          method: "GET",
          path: "/api/projects/{id}",
          description: "Получить проект по ID",
          params: { id: "string" },
          response: { project: "object", applications: "array" }
        }
      ]
    },
    investments: {
      title: "Инвестиции",
      description: "Управление инвестициями и портфелем",
      endpoints: [
        {
          method: "GET",
          path: "/api/investments",
          description: "Получить портфель инвестиций",
          params: { investor_id: "string" },
          response: { investments: "array", total_value: "number" }
        },
        {
          method: "POST",
          path: "/api/investments",
          description: "Создать новую инвестицию",
          params: { project_id: "string", amount: "number", equity_percentage: "number" },
          response: { investment: "object", transaction_id: "string" }
        }
      ]
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">API Документация</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Интегрируйте InvestEx API в ваши приложения для доступа к функциям платформы
            </p>
          </div>

          <Alert className="mb-8">
            <Key className="h-4 w-4" />
            <AlertDescription>
              Для использования API необходим API ключ. Получите его в настройках вашего аккаунта в разделе "API".
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Разделы API</CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <nav className="space-y-2">
                    <Button
                      variant={activeEndpoint === 'overview' ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveEndpoint('overview')}
                    >
                      <Book className="w-4 h-4 mr-2" />
                      Обзор
                    </Button>
                    {Object.entries(apiEndpoints).map(([key, section]) => (
                      <Button
                        key={key}
                        variant={activeEndpoint === key ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveEndpoint(key)}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        {section.title}
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Быстрый старт</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <h4 className="font-semibold mb-2">Base URL</h4>
                    <code className="bg-muted p-2 rounded text-xs block">
                      https://api.investex.com/v1
                    </code>
                  </div>
                  <div className="text-sm">
                    <h4 className="font-semibold mb-2">Аутентификация</h4>
                    <code className="bg-muted p-2 rounded text-xs block">
                      Authorization: Bearer {'{token}'}
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeEndpoint === 'overview' ? (
                <div className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Book className="w-5 h-5" />
                        Обзор API
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Возможности API</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Управление пользователями</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Регистрация и авторизация</li>
                              <li>• Управление профилями</li>
                              <li>• Система ролей</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Проекты</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Создание и редактирование</li>
                              <li>• Поиск и фильтрация</li>
                              <li>• Управление заявками</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Инвестиции</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Портфель инвестора</li>
                              <li>• Создание инвестиций</li>
                              <li>• Аналитика доходности</li>
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Платежи</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Обработка транзакций</li>
                              <li>• История платежей</li>
                              <li>• Escrow-сервис</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Ограничения</h3>
                        <div className="bg-muted p-4 rounded-lg">
                          <ul className="space-y-2 text-sm">
                            <li>• <strong>Rate Limit:</strong> 1000 запросов в час для обычных пользователей</li>
                            <li>• <strong>Rate Limit Pro:</strong> 10000 запросов в час для Pro пользователей</li>
                            <li>• <strong>Размер запроса:</strong> Максимум 10MB для загрузки файлов</li>
                            <li>• <strong>Timeout:</strong> 30 секунд для всех запросов</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Коды ответов</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="default">200</Badge>
                            <span className="text-sm">Успешный запрос</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">401</Badge>
                            <span className="text-sm">Неавторизован</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="destructive">403</Badge>
                            <span className="text-sm">Доступ запрещен</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">404</Badge>
                            <span className="text-sm">Ресурс не найден</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="destructive">429</Badge>
                            <span className="text-sm">Превышен лимит запросов</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="space-y-6">
                  {apiEndpoints[activeEndpoint as keyof typeof apiEndpoints] && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle>{apiEndpoints[activeEndpoint as keyof typeof apiEndpoints].title}</CardTitle>
                          <p className="text-muted-foreground">
                            {apiEndpoints[activeEndpoint as keyof typeof apiEndpoints].description}
                          </p>
                        </CardHeader>
                      </Card>

                      {apiEndpoints[activeEndpoint as keyof typeof apiEndpoints].endpoints.map((endpoint, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Badge 
                                  variant={endpoint.method === 'GET' ? 'default' : 
                                          endpoint.method === 'POST' ? 'secondary' : 'outline'}
                                >
                                  {endpoint.method}
                                </Badge>
                                <code className="text-sm font-mono">{endpoint.path}</code>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(endpoint.path)}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-muted-foreground">{endpoint.description}</p>
                          </CardHeader>
                          <CardContent>
                            <Tabs defaultValue="request">
                              <TabsList>
                                <TabsTrigger value="request">Запрос</TabsTrigger>
                                <TabsTrigger value="response">Ответ</TabsTrigger>
                                <TabsTrigger value="example">Пример</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="request" className="mt-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Параметры</h4>
                                  <div className="bg-muted p-4 rounded-lg">
                                    <pre className="text-sm">
                                      {JSON.stringify(endpoint.params, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="response" className="mt-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Структура ответа</h4>
                                  <div className="bg-muted p-4 rounded-lg">
                                    <pre className="text-sm">
                                      {JSON.stringify(endpoint.response, null, 2)}
                                    </pre>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="example" className="mt-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold">Пример запроса</h4>
                                  <div className="bg-muted p-4 rounded-lg">
                                    <pre className="text-sm">
{`curl -X ${endpoint.method} \\
  https://api.investex.com/v1${endpoint.path} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(endpoint.params, null, 2)}'`}
                                    </pre>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* SDK and Resources */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  SDK и библиотеки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">JavaScript/Node.js</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Python</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      PyPI
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">PHP</span>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Composer
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Поддержка</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Нужна помощь с интеграцией API? Обращайтесь к нашей команде поддержки.
                </p>
                <div className="space-y-2">
                  <div>
                    <strong>Email:</strong> api-support@investex.com
                  </div>
                  <div>
                    <strong>Документация:</strong> docs.investex.com
                  </div>
                  <div>
                    <strong>Сообщество:</strong> community.investex.com
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>API версия 1.0 • Последнее обновление: 15 сентября 2025 года</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ApiDocs;