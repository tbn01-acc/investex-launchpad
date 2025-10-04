import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  ArrowLeft, 
  UserPlus, 
  Shield, 
  Edit,
  Trash2,
  Search
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StaffMember {
  id: string;
  user_id: string;
  staff_role: string;
  is_active: boolean;
  created_at: string;
  profiles?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function StaffManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffRole, setNewStaffRole] = useState("moderator");

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const { data, error } = await supabase
        .from("platform_staff")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch profiles separately
      if (data && data.length > 0) {
        const userIds = data.map(s => s.user_id);
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("user_id, first_name, last_name, email")
          .in("user_id", userIds);

        const staffWithProfiles = data.map(staff => ({
          ...staff,
          profiles: profilesData?.find(p => p.user_id === staff.user_id) || {
            first_name: "",
            last_name: "",
            email: ""
          }
        }));

        setStaff(staffWithProfiles as StaffMember[]);
      } else {
        setStaff([]);
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Пользователь не авторизован");

      // Find user by email
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", newStaffEmail)
        .single();

      if (profileError) throw new Error("Пользователь с таким email не найден");

      // Add to staff
      const { error: insertError } = await supabase
        .from("platform_staff")
        .insert({
          user_id: profiles.user_id,
          staff_role: newStaffRole,
          assigned_by: user.id,
        });

      if (insertError) throw insertError;

      // Log audit
      await supabase.from("superadmin_audit_log").insert({
        admin_id: user.id,
        action: "staff_added",
        target_type: "staff",
        target_id: profiles.user_id,
        details: { email: newStaffEmail, role: newStaffRole },
      });

      toast({
        title: "Успешно",
        description: "Сотрудник добавлен",
      });

      setShowAddDialog(false);
      setNewStaffEmail("");
      setNewStaffRole("moderator");
      fetchStaff();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (staffId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("platform_staff")
        .update({ is_active: !currentStatus })
        .eq("id", staffId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: `Сотрудник ${!currentStatus ? "активирован" : "деактивирован"}`,
      });

      fetchStaff();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredStaff = staff.filter((member) => {
    const fullName = `${member.profiles?.first_name || ""} ${member.profiles?.last_name || ""}`.toLowerCase();
    const email = member.profiles?.email?.toLowerCase() || "";
    return fullName.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
  });

  const getRoleBadge = (role: string) => {
    const colors: Record<string, "default" | "secondary" | "destructive"> = {
      administrator: "destructive",
      moderator: "default",
      editor: "secondary",
    };
    return <Badge variant={colors[role] || "default"}>{role}</Badge>;
  };

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
            <h1 className="text-4xl font-bold mb-2">Управление персоналом</h1>
            <p className="text-muted-foreground">Администраторы, модераторы и редакторы платформы</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Добавить сотрудника
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Всего сотрудников</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staff.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Активных</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staff.filter(s => s.is_active).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Администраторов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staff.filter(s => s.staff_role === "administrator").length}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени или email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {filteredStaff.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Сотрудников не найдено
              </CardContent>
            </Card>
          ) : (
            filteredStaff.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {member.profiles?.first_name} {member.profiles?.last_name}
                        {getRoleBadge(member.staff_role)}
                        {!member.is_active && <Badge variant="outline">Неактивен</Badge>}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {member.profiles?.email}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={member.is_active ? "outline" : "default"}
                        onClick={() => handleToggleActive(member.id, member.is_active)}
                      >
                        {member.is_active ? "Деактивировать" : "Активировать"}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </main>

      <Footer />

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить сотрудника</DialogTitle>
            <DialogDescription>
              Введите email пользователя и выберите роль
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email пользователя</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={newStaffEmail}
                onChange={(e) => setNewStaffEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Роль</Label>
              <Select value={newStaffRole} onValueChange={setNewStaffRole}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">Администратор</SelectItem>
                  <SelectItem value="moderator">Модератор</SelectItem>
                  <SelectItem value="editor">Редактор</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddStaff}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}