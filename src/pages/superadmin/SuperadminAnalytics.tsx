import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ArrowLeft, TrendingUp, Users, Briefcase, DollarSign, Activity, Download } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function SuperadminAnalytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalInvestments: 0,
    totalFunding: 0,
    activeUsers: 0,
    activeProjects: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [usersRes, projectsRes, investmentsRes, paymentsRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact" }),
        supabase.from("projects").select("*", { count: "exact" }),
        supabase.from("investments").select("*"),
        supabase.from("payments").select("*"),
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalProjects: projectsRes.count || 0,
        totalInvestments: investmentsRes.data?.length || 0,
        totalFunding: paymentsRes.data?.reduce((sum, p) => sum + Number(p.amount || 0), 0) || 0,
        activeUsers: usersRes.data?.filter(u => u.available_for_projects).length || 0,
        activeProjects: projectsRes.data?.filter(p => p.status === "active").length || 0,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for charts
  const monthlyData = [
    { month: "Янв", users: 120, projects: 45, investments: 30 },
    { month: "Фев", users: 145, projects: 52, investments: 38 },
    { month: "Мар", users: 178, projects: 61, investments: 45 },
    { month: "Апр", users: 195, projects: 68, investments: 52 },
    { month: "Май", users: 220, projects: 75, investments: 61 },
    { month: "Июн", users: 250, projects: 82, investments: 70 },
  ];

  const roleDistribution = [
    { name: "Founder", value: 45, color: "#3b82f6" },
    { name: "Investor", value: 35, color: "#10b981" },
    { name: "Freelancer", value: 60, color: "#f59e0b" },
    { name: "Job Seeker", value: 80, color: "#ef4444" },
    { name: "Other", value: 30, color: "#8b5cf6" },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Button>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Аналитика платформы</h1>
            <p className="text-muted-foreground">Подробная статистика и отчеты Invest-Ex</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Экспорт отчета
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">Активных: {stats.activeUsers}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Всего проектов</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">Активных: {stats.activeProjects}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Всего инвестиций</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInvestments}</div>
              <p className="text-xs text-muted-foreground">На сумму: ${stats.totalFunding.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Рост платформы</CardTitle>
              <CardDescription>Динамика ключевых показателей</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Пользователи" />
                  <Line type="monotone" dataKey="projects" stroke="#10b981" name="Проекты" />
                  <Line type="monotone" dataKey="investments" stroke="#f59e0b" name="Инвестиции" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Распределение по ролям</CardTitle>
              <CardDescription>Пользователи по типам</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Активность по месяцам</CardTitle>
            <CardDescription>Сравнение активности пользователей и проектов</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#3b82f6" name="Пользователи" />
                <Bar dataKey="projects" fill="#10b981" name="Проекты" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}