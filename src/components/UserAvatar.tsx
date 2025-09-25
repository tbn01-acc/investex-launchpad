import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ApiConfigDialog } from '@/components/ApiConfigDialog';

const UserAvatar = () => {
  const { user, profile, signOut } = useAuth();

  if (!user) return null;

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
      
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{getUserDisplayName()}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
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