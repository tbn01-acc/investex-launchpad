import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const ROLE_LABELS: Record<string, string> = {
  founder: 'Фаундер',
  co_founder: 'Ко-фаундер',
  co_owner: 'Соучредитель',
  investor: 'Инвестор',
  co_investor: 'Соинвестор',
  partner: 'Партнер',
  co_partner: 'Со-партнер',
  franchiser: 'Франчайзер',
  // Исполнители
  freelancer: 'Фрилансер',
  expert: 'Эксперт',
  consultant: 'Консультант',
  outsourcer: 'Аутсорсер',
  contractor: 'Подрядчик',
  // Сотрудники и администрирование
  administrator: 'Администратор',
  project_admin: 'Администратор стартапа',
  employee: 'Сотрудник',
  job_seeker: 'Соискатель',
  // Партнеры и медиа
  ambassador: 'Амбассадор',
  blogger: 'Блогер',
  superadmin: 'Суперадмин'
};

export const RoleSelector = () => {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [currentRole, setCurrentRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserRoles();
  }, [user]);

  const fetchUserRoles = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role, is_current')
        .eq('user_id', user.id);

      if (error) throw error;

      if (data) {
        const roles = data.map(r => r.role);
        setUserRoles(roles);
        const current = data.find(r => r.is_current);
        if (current) setCurrentRole(current.role);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!user || !currentRole) return;
    
    setSaving(true);
    try {
      // Use secure RPC function for role switching
      const { error } = await (supabase.rpc as any)('switch_user_role', {
        p_role: currentRole
      });

      if (error) throw error;

      toast.success('Роль успешно изменена');
      
      // Перезагрузим страницу для применения изменений
      setTimeout(() => window.location.reload(), 500);
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast.error(error.message || 'Ошибка при изменении роли. Возможно, у вас нет доступа к этой роли.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (userRoles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Выбор роли</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            У вас пока нет дополнительных ролей. Добавьте роли в своем профиле.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Выбор активной роли</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Текущая роль</label>
          <Select value={currentRole} onValueChange={setCurrentRole}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите роль" />
            </SelectTrigger>
            <SelectContent>
              {userRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {ROLE_LABELS[role] || role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleRoleChange} disabled={saving} className="w-full">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            'Применить роль'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
