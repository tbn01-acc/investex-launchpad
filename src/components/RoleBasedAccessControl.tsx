import React from 'react';
import { UserRole, ROLE_CONFIGS } from '@/types/roles';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, AlertCircle } from 'lucide-react';

interface RoleBasedAccessControlProps {
  userRole?: UserRole;
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showMessage?: boolean;
}

interface FeatureAccessProps {
  userRole?: UserRole;
  requiredRole: UserRole;
  subscriptionTier?: 'start' | 'profi' | 'premium';
  requiredTier?: 'start' | 'profi' | 'premium';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Role hierarchy for access control
const ROLE_HIERARCHY: Record<UserRole, number> = {
  job_seeker: 1,
  freelancer: 2,
  co_owner: 3,
  outsourcer: 4,
  contractor: 5,
  subsidiary_investor: 6,
  co_founder: 7,
  founder: 8,
  investor: 9
};

const TIER_HIERARCHY = {
  start: 1,
  profi: 2,
  premium: 3
};

export const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({
  userRole,
  allowedRoles,
  children,
  fallback,
  showMessage = true
}) => {
  const hasAccess = userRole && allowedRoles.includes(userRole);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (showMessage) {
    const roleNames = allowedRoles.map(role => ROLE_CONFIGS[role]?.name).join(', ');
    
    return (
      <Alert className="my-4">
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Доступ ограничен для ролей: {roleNames}
          {userRole && (
            <span className="block mt-1 text-sm">
              Ваша роль: {ROLE_CONFIGS[userRole]?.name}
            </span>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export const FeatureAccess: React.FC<FeatureAccessProps> = ({
  userRole,
  requiredRole,
  subscriptionTier = 'start',
  requiredTier = 'start',
  children,
  fallback
}) => {
  const hasRoleAccess = userRole && ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
  const hasTierAccess = TIER_HIERARCHY[subscriptionTier] >= TIER_HIERARCHY[requiredTier];

  if (hasRoleAccess && hasTierAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const requiredRoleName = ROLE_CONFIGS[requiredRole]?.name;
  
  return (
    <Alert className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        Для доступа к этой функции требуется:
        <ul className="mt-1 ml-4 list-disc text-sm">
          {!hasRoleAccess && <li>Роль: {requiredRoleName} или выше</li>}
          {!hasTierAccess && <li>Тариф: {requiredTier} или выше</li>}
        </ul>
      </AlertDescription>
    </Alert>
  );
};

// Hook for checking permissions
export const useRolePermissions = (userRole?: UserRole) => {
  const canCreateProjects = () => {
    return userRole && ['founder', 'co_founder', 'co_owner'].includes(userRole);
  };

  const canInvest = () => {
    return userRole && ['investor', 'subsidiary_investor'].includes(userRole);
  };

  const canTakeProjects = () => {
    return userRole && ['freelancer', 'outsourcer', 'contractor'].includes(userRole);
  };

  const canSearchJobs = () => {
    return userRole === 'job_seeker';
  };

  const canAccessAdvancedAnalytics = (tier: string) => {
    return tier === 'premium' || (tier === 'profi' && userRole && ['investor', 'founder'].includes(userRole));
  };

  const canAccessDutchAuction = (tier: string) => {
    return userRole === 'investor' && tier === 'premium';
  };

  const canManageTeam = () => {
    return userRole && ['founder', 'co_founder', 'outsourcer'].includes(userRole);
  };

  const getMaxInvestmentAmount = () => {
    if (userRole === 'investor') return Infinity;
    if (userRole === 'subsidiary_investor') return 10000000;
    return 0;
  };

  const getMinInvestmentAmount = () => {
    if (userRole === 'investor') return 10000000;
    if (userRole === 'subsidiary_investor') return 50000;
    return 0;
  };

  return {
    canCreateProjects,
    canInvest,
    canTakeProjects,
    canSearchJobs,
    canAccessAdvancedAnalytics,
    canAccessDutchAuction,
    canManageTeam,
    getMaxInvestmentAmount,
    getMinInvestmentAmount,
    roleHierarchy: userRole ? ROLE_HIERARCHY[userRole] : 0
  };
};

export default RoleBasedAccessControl;