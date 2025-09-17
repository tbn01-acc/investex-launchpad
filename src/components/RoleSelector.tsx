import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { UserRole, ROLE_CONFIGS, ROLE_CATEGORIES } from '@/types/roles';

interface RoleSelectorProps {
  selectedRole?: UserRole;
  onRoleSelect: (role: UserRole) => void;
  showDescription?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  selectedRole, 
  onRoleSelect,
  showDescription = true 
}) => {
  const [hoveredRole, setHoveredRole] = useState<UserRole | null>(null);

  const groupedRoles = Object.values(ROLE_CONFIGS).reduce((acc, role) => {
    if (!acc[role.category]) {
      acc[role.category] = [];
    }
    acc[role.category].push(role);
    return acc;
  }, {} as Record<string, typeof ROLE_CONFIGS[UserRole][]>);

  return (
    <div className="space-y-8">
      {showDescription && (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Выберите вашу роль</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Invest-Ex объединяет 9 типов участников инвестиционной экосистемы. 
            Выберите роль, которая лучше всего описывает ваши цели на платформе.
          </p>
        </div>
      )}
      
      {Object.entries(groupedRoles).map(([category, roles]) => (
        <div key={category} className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{ROLE_CATEGORIES[category as keyof typeof ROLE_CATEGORIES].title}</h3>
            <p className="text-sm text-muted-foreground">
              {ROLE_CATEGORIES[category as keyof typeof ROLE_CATEGORIES].description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card 
                key={role.key}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role.key 
                    ? 'ring-2 ring-primary shadow-lg' 
                    : hoveredRole === role.key 
                      ? 'shadow-md' 
                      : ''
                }`}
                onMouseEnter={() => setHoveredRole(role.key)}
                onMouseLeave={() => setHoveredRole(null)}
                onClick={() => onRoleSelect(role.key)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{role.icon}</div>
                    {selectedRole === role.key && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  {role.minInvestment && (
                    <Badge variant="secondary" className="w-fit">
                      от {(role.minInvestment / 1000000).toFixed(0)} млн ₽
                    </Badge>
                  )}
                  {role.maxInvestment && (
                    <Badge variant="outline" className="w-fit">
                      до {(role.maxInvestment / 1000000).toFixed(0)} млн ₽
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelector;