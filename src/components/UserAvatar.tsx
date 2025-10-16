import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ApiConfigDialog } from '@/components/ApiConfigDialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const UserAvatar = () => {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState(profile?.role || '');

  React.useEffect(() => {
    if (profile?.role) {
      setSelectedRole(profile.role);
    }
  }, [profile]);

  if (!user) return null;

  const handleRoleChange = async (newRole: string) => {
    try {
      // Сбрасываем текущую роль и устанавливаем новую в user_roles
      const { error: clearErr } = await supabase
        .from('user_roles')
        .update({ is_current: false })
        .eq('user_id', user.id);
      if (clearErr) throw clearErr;

      const { error: setErr } = await supabase
        .from('user_roles')
        .update({ is_current: true })
        .eq('user_id', user.id)
        .eq('role', newRole as any);
      if (setErr) throw setErr;

      // Синхронизируем profiles.role для совместимости
      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ role: newRole as any })
        .eq('user_id', user.id);
      if (profileErr) throw profileErr;

      setSelectedRole(newRole);
      await refreshProfile();
      
      toast({
        title: "Роль обновлена",
        description: `Ваша роль изменена на ${getRoleDisplayName(newRole)}`,
      });
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль",
        variant: "destructive",
      });
    }
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      // Участники
      investor: 'Инвестор',
      co_investor: 'Соинвестор',
      founder: 'Фаундер',
      co_founder: 'Ко-фаундер',
      co_owner: 'Соучредитель',
      // Исполнители
      freelancer: 'Фрилансер',
      expert: 'Эксперт',
      consultant: 'Консультант',
      outsourcer: 'Аутсорсер',
      contractor: 'Подрядчик',
      // Сотрудники
      administrator: 'Администратор',
      employee: 'Сотрудник',
      job_seeker: 'Соискатель',
      // Партнеры
      ambassador: 'Амбассадор',
      partner: 'Партнер',
      blogger: 'Блогер',
      superadmin: 'Суперадмин'
    };
    return roleMap[role] || 'Пользователь';
  };

  // Генерируем инициалы для аватара
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    if (profile?.first_name) {
      return profile.first_name[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  // Генерируем аватар на основе имени пользователя
  const getAvatarUrl = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    
    // Используем DiceBear API для генерации аватара
    const seed = profile?.first_name || user.email || 'user';
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50`;
  };

  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user.email;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar className="h-8 w-8">
            <AvatarImage src={getAvatarUrl()} alt={getUserDisplayName()} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:block text-sm font-medium">
            {getUserDisplayName()}
          </span>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64 max-h-[500px] overflow-y-auto">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{getUserDisplayName()}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Текущая роль</DropdownMenuLabel>
        <div className="px-2 py-2">
          <Select value={selectedRole} onValueChange={handleRoleChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Участники</div>
              <SelectItem value="investor">Инвестор</SelectItem>
              <SelectItem value="co_investor">Соинвестор</SelectItem>
              <SelectItem value="founder">Фаундер</SelectItem>
              <SelectItem value="co_founder">Ко-фаундер</SelectItem>
              <SelectItem value="co_owner">Соучредитель</SelectItem>
              
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Исполнители</div>
              <SelectItem value="freelancer">Фрилансер</SelectItem>
              <SelectItem value="expert">Эксперт</SelectItem>
              <SelectItem value="consultant">Консультант</SelectItem>
              <SelectItem value="outsourcer">Аутсорсер</SelectItem>
              <SelectItem value="contractor">Подрядчик</SelectItem>
              
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Сотрудники</div>
              <SelectItem value="administrator">Администратор</SelectItem>
              <SelectItem value="employee">Сотрудник</SelectItem>
              <SelectItem value="job_seeker">Соискатель</SelectItem>
              
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Партнеры</div>
              <SelectItem value="ambassador">Амбассадор</SelectItem>
              <SelectItem value="partner">Партнер</SelectItem>
              <SelectItem value="blogger">Блогер</SelectItem>
              
              {profile?.role === 'superadmin' && (
                <>
                  <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground mt-2">Администрация</div>
                  <SelectItem value="superadmin">Суперадмин</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Профиль
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Личный кабинет
          </Link>
        </DropdownMenuItem>

        {profile?.role === 'superadmin' && (
          <DropdownMenuItem asChild>
            <Link to="/admin" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Администрирование
            </Link>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <ApiConfigDialog>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Settings className="mr-2 h-4 w-4" />
            API Настройки
          </DropdownMenuItem>
        </ApiConfigDialog>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выход
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;