import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, TrendingUp, DollarSign, Users, Target, BarChart3 } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const navigate = useNavigate();

  // Mock data for charts
  const revenueData = [
    { month: "Янв", revenue: 4000, target: 3500 },
    { month: "Фев", revenue: 3000, target: 3500 },
    { month: "Мар", revenue: 5000, target: 4500 },
    { month: "Апр", revenue: 4500, target: 4500 },
    { month: "Май", revenue: 6000, target: 5000 },
    { month: "Июн", revenue: 7000, target: 5500 },
  ];

  const teamData = [
    { name: "Разработка", value: 40 },
    { name: "Дизайн", value: 25 },
    { name: "Маркетинг", value: 20 },
    { name: "Менеджмент", value: 15 },
  ];

  const tasksData = [
    { week: "Нед 1", completed: 12, planned: 15 },
    { week: "Нед 2", completed: 19, planned: 20 },
    { week: "Нед 3", completed: 15, planned: 18 },
    { week: "Нед 4", completed: 22, planned: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-management-hub")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к управлению
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">BI Dashboard</h1>
              <p className="text-muted-foreground">
                Ключевые показатели и аналитика проекта
              </p>
            </div>
            <Button onClick={() => navigate("/project-management/bi/reports/new")}>
              Создать отчет
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Выручка</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$29,500</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +20.1% от прошлого месяца
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Активные задачи</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <p className="text-xs text-muted-foreground">
                24 в работе, 44 запланировано
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Команда</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 за последнюю неделю
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.5% от прошлого месяца
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-6">
          <TabsList>
            <TabsTrigger value="revenue">Выручка</TabsTrigger>
            <TabsTrigger value="team">Команда</TabsTrigger>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="investors">Для инвесторов</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Динамика выручки</CardTitle>
                <CardDescription>Сравнение фактической выручки с целевыми показателями</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Выручка" strokeWidth={2} />
                    <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Цель" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение команды</CardTitle>
                  <CardDescription>По департаментам</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={teamData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {teamData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Производительность</CardTitle>
                  <CardDescription>Члены команды</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Алексей И.", "Мария С.", "Иван П.", "Елена К."].map((name, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-secondary h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-primary h-full" 
                              style={{ width: `${Math.random() * 40 + 60}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 20 + 80)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Выполнение задач</CardTitle>
                <CardDescription>Запланировано vs Выполнено</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={tasksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="planned" fill="#8884d8" name="Запланировано" />
                    <Bar dataKey="completed" fill="#82ca9d" name="Выполнено" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>Ключевые достижения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Рост выручки</h4>
                    <p className="text-sm text-muted-foreground">
                      Выручка выросла на 45% за последний квартал, превысив прогнозные показатели на 12%.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Расширение команды</h4>
                    <p className="text-sm text-muted-foreground">
                      Привлечено 8 ключевых специалистов, что позволило ускорить разработку продукта на 30%.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Выход на новые рынки</h4>
                    <p className="text-sm text-muted-foreground">
                      Начата экспансия в 3 новых региона с потенциальной аудиторией 2.5M пользователей.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ROI & Финансы</CardTitle>
                  <CardDescription>Инвестиционные показатели</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ROI</span>
                    <span className="text-lg font-bold text-green-600">+127%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Burn Rate</span>
                    <span className="text-lg font-bold">$45K/мес</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Runway</span>
                    <span className="text-lg font-bold">18 мес</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Оценка</span>
                    <span className="text-lg font-bold">$2.5M</span>
                  </div>
                  <Button className="w-full mt-4">
                    Скачать полный отчет
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}