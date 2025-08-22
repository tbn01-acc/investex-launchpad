import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, 
  Users, 
  FolderOpen, 
  DollarSign, 
  TrendingUp,
  Activity,
  Settings,
  BarChart3,
  Lock
} from "lucide-react";

interface AdminData {
  id: string;
  username: string;
  role: string;
  lastLogin?: string;
}

interface PlatformStats {
  total_users?: number;
  total_projects?: number;
  total_investments?: number;
  total_payments?: number;
  active_projects?: number;
  pending_investments?: number;
  users_by_role?: Record<string, number>;
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [stats, setStats] = useState<PlatformStats>({});
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          username: loginForm.username,
          password: loginForm.password,
          action: 'login'
        }
      });

      if (error) throw error;

      if (data.success) {
        setIsAuthenticated(true);
        setAdminData(data.admin);
        setStats(data.stats);
        toast({
          title: "Вход выполнен",
          description: `Добро пожаловать, ${data.admin.username}!`,
        });
      } else {
        throw new Error(data.error || "Ошибка входа");
      }
    } catch (error: any) {
      toast({
        title: "Ошибка входа",
        description: error.message || "Неверные данные для входа",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStats = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { action: 'getStats' }
      });

      if (error) throw error;
      setStats(data.stats);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статистику",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAdminData(null);
    setStats({});
    setLoginForm({ username: "", password: "" });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(refreshStats, 30000); // Обновляем каждые 30 секунд
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Панель Администратора</h1>
            <p className="text-muted-foreground">InvestEx Platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Логин</Label>
              <Input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                placeholder="admin"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Шапка */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Панель Администратора</h1>
              <p className="text-muted-foreground">
                Добро пожаловать, {adminData?.username}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">
              <Lock className="h-4 w-4 mr-2" />
              {adminData?.role}
            </Badge>
            <Button onClick={refreshStats} variant="outline" size="sm">
              <Activity className="h-4 w-4 mr-2" />
              Обновить
            </Button>
            <Button onClick={logout} variant="destructive" size="sm">
              Выйти
            </Button>
          </div>
        </div>

        {/* Статистические карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Пользователи</p>
                <p className="text-3xl font-bold">{stats.total_users || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Проекты</p>
                <p className="text-3xl font-bold">{stats.total_projects || 0}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.active_projects || 0} активных
                </p>
              </div>
              <FolderOpen className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Инвестиции</p>
                <p className="text-3xl font-bold">{stats.total_investments || 0}</p>
                <p className="text-xs text-muted-foreground">
                  {stats.pending_investments || 0} ожидают
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Платежи</p>
                <p className="text-3xl font-bold">{stats.total_payments || 0}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Детальная информация */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="projects">
              <FolderOpen className="h-4 w-4 mr-2" />
              Проекты
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="h-4 w-4 mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Распределение по ролям</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.users_by_role && Object.entries(stats.users_by_role).map(([role, count]) => (
                  <div key={role} className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-sm text-muted-foreground capitalize">{role}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Управление проектами</h3>
              <p className="text-muted-foreground">
                Функции модерации и управления проектами будут добавлены в следующих версиях.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Детальная аналитика</h3>
              <p className="text-muted-foreground">
                Расширенные графики и отчеты будут добавлены в следующих версиях.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Настройки платформы</h3>
              <p className="text-muted-foreground">
                Панель настроек платформы будет добавлена в следующих версиях.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}