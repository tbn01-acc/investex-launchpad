import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { UserRole, ROLE_CONFIGS } from '@/types/roles';
import { Link } from 'react-router-dom';

interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  roles: UserRole[];
}

const navigationStructure: Record<string, NavigationItem[]> = {
  'Для инвесторов': [
    {
      title: 'VIP Инвесторы',
      href: '/for-investors?type=vip',
      description: 'Эксклюзивные проекты от 10+ млн ₽',
      roles: ['investor']
    },
    {
      title: 'Субсидиарные инвесторы',
      href: '/for-investors?type=subsidiary',
      description: 'Проекты до 10 млн ₽',
      roles: ['subsidiary_investor']
    }
  ],
  'Для основателей проектов': [
    {
      title: 'Фаундеры',
      href: '/for-founders',
      description: 'Создание и развитие проектов',
      roles: ['founder']
    },
    {
      title: 'Ко-фаундеры',
      href: '/for-founders?type=co',
      description: 'Совместное управление проектами',
      roles: ['co_founder']
    },
    {
      title: 'Соучредители',
      href: '/for-founders?type=co-owner',
      description: 'Поиск проектов для участия',
      roles: ['co_owner']
    }
  ],
  'Для исполнителей': [
    {
      title: 'Подрядчики',
      href: '/for-contractors',
      description: 'Корпоративные услуги',
      roles: ['contractor']
    },
    {
      title: 'Аутсорсеры',
      href: '/for-outsourcers',
      description: 'Командные решения',
      roles: ['outsourcer']
    },
    {
      title: 'Фрилансеры',
      href: '/for-freelancers',
      description: 'Проектные задачи',
      roles: ['freelancer']
    },
    {
      title: 'Соискатели',
      href: '/for-job-seekers',
      description: 'Поиск работы',
      roles: ['job_seeker']
    }
  ]
};

interface RoleBasedNavigationProps {
  userRole?: UserRole;
}

const RoleBasedNavigation: React.FC<RoleBasedNavigationProps> = ({ userRole }) => {
  const getRelevantItems = (items: NavigationItem[]) => {
    if (!userRole) return items;
    return items.filter(item => item.roles.includes(userRole));
  };

  const hasRelevantItems = (items: NavigationItem[]) => {
    if (!userRole) return true;
    return items.some(item => item.roles.includes(userRole));
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {Object.entries(navigationStructure).map(([category, items]) => {
          if (userRole && !hasRelevantItems(items)) return null;
          
          return (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger className="text-sm font-medium">
                {category}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {getRelevantItems(items).map((item) => (
                    <NavigationMenuLink key={item.href} asChild>
                      <Link
                        to={item.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-center gap-2">
                          {item.roles.map(role => (
                            <span key={role} className="text-lg">
                              {ROLE_CONFIGS[role].icon}
                            </span>
                          ))}
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                        </div>
                        {item.description && (
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
        
        {/* Regular navigation items */}
        <NavigationMenuItem>
          <Link to="/projects" className="text-sm font-medium px-4 py-2 hover:text-primary">
            Проекты
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/about" className="text-sm font-medium px-4 py-2 hover:text-primary">
            О платформе
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/pricing" className="text-sm font-medium px-4 py-2 hover:text-primary">
            Тарифы
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default RoleBasedNavigation;