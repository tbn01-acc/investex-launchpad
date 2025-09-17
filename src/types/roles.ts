export type UserRole = 
  | 'investor'
  | 'subsidiary_investor'
  | 'founder'
  | 'co_founder'
  | 'co_owner'
  | 'job_seeker'
  | 'freelancer'
  | 'outsourcer'
  | 'contractor';

export type SubscriptionTier = 'start' | 'profi' | 'premium';

export interface RoleConfig {
  key: UserRole;
  name: string;
  description: string;
  category: 'key' | 'supporting' | 'executing';
  icon: string;
  minInvestment?: number;
  maxInvestment?: number;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  investor: {
    key: 'investor',
    name: 'Инвесторы',
    description: 'VIP-доступ к проектам от 10 млн ₽, максимальные привилегии, персональный менеджер',
    category: 'key',
    icon: '💎',
    minInvestment: 10000000
  },
  subsidiary_investor: {
    key: 'subsidiary_investor',
    name: 'Субсидиарные инвесторы',
    description: 'Доступ к проектам до 10 млн ₽, базовая аналитика и инструменты',
    category: 'key',
    icon: '💰',
    maxInvestment: 10000000
  },
  founder: {
    key: 'founder',
    name: 'Фаундеры',
    description: 'Полный пакет создания проектов, питчинг, управление командой',
    category: 'key',
    icon: '🚀'
  },
  co_founder: {
    key: 'co_founder',
    name: 'Ко-фаундеры',
    description: 'Расширенные возможности проектного участия и управления',
    category: 'key',
    icon: '🤝'
  },
  co_owner: {
    key: 'co_owner',
    name: 'Соучредители',
    description: 'Поиск проектов для долгосрочного участия, построение команд',
    category: 'supporting',
    icon: '🔗'
  },
  job_seeker: {
    key: 'job_seeker',
    name: 'Соискатели',
    description: 'Базовый бесплатный доступ, поиск работы и создание портфолио',
    category: 'supporting',
    icon: '👤'
  },
  freelancer: {
    key: 'freelancer',
    name: 'Фрилансеры',
    description: 'Проектные задачи, портфолио и рейтинговая система',
    category: 'executing',
    icon: '💼'
  },
  outsourcer: {
    key: 'outsourcer',
    name: 'Аутсорсеры',
    description: 'Витрина услуг команды, управление множественными проектами',
    category: 'executing',
    icon: '🏢'
  },
  contractor: {
    key: 'contractor',
    name: 'Подрядчики',
    description: 'Специализированные корпоративные услуги, ресурсная база',
    category: 'executing',
    icon: '🏭'
  }
};

export const ROLE_CATEGORIES = {
  key: {
    title: 'Ключевые субъекты',
    description: 'Основные участники инвестиционного процесса'
  },
  supporting: {
    title: 'Поддерживающие субъекты', 
    description: 'Участники поиска возможностей'
  },
  executing: {
    title: 'Исполнители',
    description: 'Поставщики услуг и решений'
  }
};