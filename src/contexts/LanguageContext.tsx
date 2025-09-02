import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  currency: string;
  setCurrency: (curr: string) => void;
  formatCurrency: (amount: number, fromCurrency?: string) => string;
  convertCurrency: (amount: number, from: string, to: string) => Promise<number>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.projects': 'Проекты',
    'nav.investments': 'Инвестиции',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'nav.pricing': 'Тарифы',
    'nav.login': 'Войти',
    'nav.dashboard': 'Кабинет',
    'nav.admin': 'Админ',
    
    // Hero Section
    'hero.title': 'Платформа для инвестиций и фриланса нового поколения',
    'hero.subtitle': 'Объединяем инвесторов, фрилансеров и предпринимателей для создания успешных проектов',
    'hero.cta.primary': 'Начать сейчас',
    'hero.cta.secondary': 'Узнать больше',
    
    // Stats
    'stats.users': 'Пользователей',
    'stats.projects': 'Проектов',
    'stats.investments': 'Инвестиций',
    'stats.funding': 'Привлечено средств',
    'stats.freelancers': 'Фрилансеров',
    'stats.investors': 'Инвесторов',
    'stats.success': 'Успешных проектов',
    
    // Roles
    'role.freelancer': 'Фрилансер',
    'role.investor': 'Инвестор',
    'role.founder': 'Фаундер',
    'role.outsourcer': 'Аутсорсер',
    'role.contractor': 'Подрядчик',
    'role.superadmin': 'Суперадмин',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Ошибка',
    'common.success': 'Успешно',
    'common.cancel': 'Отмена',
    'common.save': 'Сохранить',
    'common.delete': 'Удалить',
    'common.edit': 'Редактировать',
    'common.view': 'Просмотр',
    'common.create': 'Создать',
    'common.welcome': 'Добро пожаловать',
  },
  en: {
    // Navigation  
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.investments': 'Investments',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.pricing': 'Pricing',
    'nav.login': 'Login',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Next-generation platform for investments and freelancing',
    'hero.subtitle': 'Connecting investors, freelancers, and entrepreneurs to create successful projects',
    'hero.cta.primary': 'Get Started',
    'hero.cta.secondary': 'Learn More',
    
    // Stats
    'stats.users': 'Users',
    'stats.projects': 'Projects', 
    'stats.investments': 'Investments',
    'stats.funding': 'Funding Raised',
    'stats.freelancers': 'Freelancers',
    'stats.investors': 'Investors',
    'stats.success': 'Successful Projects',
    
    // Roles
    'role.freelancer': 'Freelancer',
    'role.investor': 'Investor',
    'role.founder': 'Founder',
    'role.outsourcer': 'Outsourcer',
    'role.contractor': 'Contractor',
    'role.superadmin': 'Superadmin',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.create': 'Create',
    'common.welcome': 'Welcome',
  }
};

const currencyRates: Record<string, Record<string, number>> = {
  USD: { RUB: 95.50, EUR: 0.92 },
  EUR: { RUB: 104.30, USD: 1.09 },
  RUB: { USD: 0.0105, EUR: 0.0096 }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('ru');
  const [currency, setCurrency] = useState<string>('RUB');

  useEffect(() => {
    const savedLang = localStorage.getItem('investex-language');
    const savedCurrency = localStorage.getItem('investex-currency');
    if (savedLang) setLanguage(savedLang);
    if (savedCurrency) setCurrency(savedCurrency);
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('investex-language', lang);
  };

  const changeCurrency = (curr: string) => {
    setCurrency(curr);
    localStorage.setItem('investex-currency', curr);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key; // Return key if translation not found
    }

    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => 
          str.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)),
        value
      );
    }

    return value;
  };

  const convertCurrency = async (amount: number, from: string, to: string): Promise<number> => {
    if (from === to) return amount;
    
    const rate = currencyRates[from as keyof typeof currencyRates]?.[to as keyof typeof currencyRates[typeof from]];
    if (rate) {
      return Math.ceil(amount * rate); // Round up to nearest integer
    }
    
    return amount; // Fallback if no rate found
  };

  const formatCurrency = (amount: number, fromCurrency?: string): string => {
    const symbols = { USD: '$', EUR: '€', RUB: '₽' };
    const targetCurrency = currency;
    const sourceCurrency = fromCurrency || currency;
    
    if (sourceCurrency === targetCurrency) {
      return `${amount.toLocaleString()}${symbols[targetCurrency as keyof typeof symbols]}`;
    }
    
    // Convert if different currencies
    const rate = currencyRates[sourceCurrency as keyof typeof currencyRates]?.[targetCurrency as keyof typeof currencyRates[typeof sourceCurrency]];
    if (rate) {
      const converted = Math.ceil(amount * rate);
      return `${converted.toLocaleString()}${symbols[targetCurrency as keyof typeof symbols]}`;
    }
    
    return `${amount.toLocaleString()}${symbols[sourceCurrency as keyof typeof symbols]}`;
  };

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    currency,
    setCurrency: changeCurrency,
    formatCurrency,
    convertCurrency,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};