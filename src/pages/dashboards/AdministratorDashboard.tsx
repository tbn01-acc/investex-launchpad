import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Users, Settings, FileText, Activity, Shield, AlertCircle } from 'lucide-react';

const AdministratorDashboard = () => {
  const { user } = useAuth();

  const [stats] = useState({
    totalUsers: 1250,
    activeProjects: 87,
    pendingApprovals: 12,
    systemHealth: 98,
    activeAdmins: 5,
    recentAlerts: 3
  });

  const [pendingItems] = useState([
    {
      id: 1,
      type: 'Project',
      title: 'New AI Platform',
      submittedBy: 'John Doe',
      date: '2025-10-01',
      status: 'Pending Review'
    },
    {
      id: 2,
      type: 'User Verification',
      title: 'Investor Profile',
      submittedBy: 'Jane Smith',
      date: '2025-10-02',
      status: 'Pending'
    },
    {
      id: 3,
      type: 'Content',
      title: 'Blog Post',
      submittedBy: 'Alice Johnson',
      date: '2025-10-03',
      status: 'Review Required'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Project':
        return 'bg-blue-100 text-blue-800';
      case 'User Verification':
        return 'bg-green-100 text-green-800';
      case 'Content':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Администратор</h2>
        <p className="text-muted-foreground">Управление платформой и модерация</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего пользователей</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные проекты</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">На модерации</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Здоровье системы</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.systemHealth}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные админы</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAdmins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Уведомления</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.recentAlerts}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">На модерации</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
          <TabsTrigger value="logs">Логи</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ожидают модерации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(item.type)}>{item.type}</Badge>
                        <p className="font-medium">{item.title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Отправитель: {item.submittedBy}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Дата: {item.date}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Управление пользователями</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Управление учетными записями и правами доступа</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Управление проектами</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Модерация и управление проектами на платформе</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки платформы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Общие настройки и конфигурация</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Системные логи</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">История действий и событий системы</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdministratorDashboard;