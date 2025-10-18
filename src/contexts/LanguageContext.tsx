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
    'nav.profile': 'Профиль',
    'nav.community': 'Сообщество',
    'nav.platform': 'О платформе',
    
    // Investments Pages
    'investments.startups': 'Стартапы',
    'investments.secondaryMarket': 'Вторичный рынок',
    'investments.ideaExchange': 'Биржа идей',
    'investments.franchises': 'Франшизы',
    'investments.showMore': 'Показать еще',
    'investments.showPer': 'Показывать по',
    'investments.showing': 'Показано',
    'investments.of': 'из',
    'investments.totalProjects': 'Всего проектов',
    'investments.averageROI': 'Средний ROI',
    'investments.totalInvestments': 'Всего инвестиций',
    'investments.successfulExits': 'Успешных выходов',
    'investments.activeNow': 'Активных сейчас',
    'investments.lastThreeYears': 'За последние 3 года',
    'investments.capitalRaised': 'Привлечено капитала',
    'investments.ipoMaDeals': 'IPO и M&A сделок',
    'investments.funding': 'Финансирование',
    'investments.stage': 'Этап',
    'investments.team': 'Команда',
    'investments.people': 'человек',
    'investments.price': 'Цена',
    'investments.shares': 'Доля',
    'investments.valuation': 'Оценка',
    'investments.votes': 'голосов',
    'investments.author': 'Автор',
    'investments.estimatedPrice': 'Ориентировочная цена',
    'investments.investment': 'Инвестиции',
    'investments.roi': 'ROI',
    'investments.locations': 'Локаций',
    'investments.buyShare': 'Купить долю',
    'investments.moreDetails': 'Подробнее',
    'investments.accessRestricted': 'Доступ ограничен для профессиональных инвесторов',
    'investments.becomeInvestor': 'Стать профессиональным инвестором',
    
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
    'role.coinvestor': 'Соинвестор',
    'role.cofounder': 'Ко-фаундер',
    'role.expert': 'Эксперт',
    'role.consultant': 'Консультант',
    'role.partner': 'Партнер',
    'role.ambassador': 'Амбассадор',
    'role.blogger': 'Блогер',
    
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
    'common.back': 'Назад',
    'common.next': 'Далее',
    'common.previous': 'Предыдущий',
    'common.close': 'Закрыть',
    'common.dashboard': 'Панель управления',
    'common.messages': 'Сообщения',
    'common.overview': 'Обзор',
    
    // Projects
    'projects.title': 'Проекты',
    'projects.active': 'Активные',
    'projects.sandbox': 'Песочница',
    'projects.goldFund': 'Золотой фонд',
    'projects.pitch': 'Питч-панель',
    'projects.archived': 'Архив',
    'projects.category': 'Категория',
    'projects.categories': 'Категории проектов',
    'projects.allCategories': 'Все категории',
    'projects.filter': 'Фильтр',
    'projects.create': 'Создать проект',
    'projects.viewDetails': 'Подробнее',
    'projects.investmentRange': 'Диапазон инвестиций',
    'projects.all': 'Все',
    'projects.budget': 'Бюджет',
    'projects.notFound': 'Проекты не найдены. Попробуйте изменить параметры поиска.',
    
    // Investments
    'investments.title': 'Инвестиции',
    'investments.portfolio': 'Портфель',
    'investments.secondary': 'Вторичный рынок',
    'investments.sandbox': 'Песочница',
    'investments.goldFund': 'Золотой фонд',
    'investments.analytics': 'Аналитика',
    'investments.dueDiligence': 'Due Diligence',
    
    // Superadmin
    'superadmin.title': 'Суперадминистратор',
    'superadmin.projectManagement': 'Управление проектами',
    'superadmin.staffManagement': 'Управление персоналом',
    'superadmin.analytics': 'Аналитика',
    'superadmin.settings': 'Настройки',
    'superadmin.approve': 'Одобрить',
    'superadmin.reject': 'Отклонить',
    'superadmin.revise': 'На доработку',
    'superadmin.changeCategory': 'Изменить категорию',
    'superadmin.moderationComment': 'Комментарий модератора',
    
    // Project Categories
    'category.active': 'Активный',
    'category.sandbox': 'Песочница',
    'category.gold': 'Золотой',
    'category.archived': 'Архив',
    
    // Auth
    'auth.login': 'Вход',
    'auth.register': 'Регистрация',
    'auth.logout': 'Выход',
    'auth.email': 'Email',
    'auth.password': 'Пароль',
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
    'nav.profile': 'Profile',
    'nav.community': 'Community',
    'nav.platform': 'About Platform',
    
    // Investments Pages
    'investments.startups': 'Startups',
    'investments.secondaryMarket': 'Secondary Market',
    'investments.ideaExchange': 'Idea Exchange',
    'investments.franchises': 'Franchises',
    'investments.showMore': 'Show More',
    'investments.showPer': 'Show per',
    'investments.showing': 'Showing',
    'investments.of': 'of',
    'investments.totalProjects': 'Total Projects',
    'investments.averageROI': 'Average ROI',
    'investments.totalInvestments': 'Total Investments',
    'investments.successfulExits': 'Successful Exits',
    'investments.activeNow': 'Active Now',
    'investments.lastThreeYears': 'Last 3 Years',
    'investments.capitalRaised': 'Capital Raised',
    'investments.ipoMaDeals': 'IPO & M&A Deals',
    'investments.funding': 'Funding',
    'investments.stage': 'Stage',
    'investments.team': 'Team',
    'investments.people': 'people',
    'investments.price': 'Price',
    'investments.shares': 'Shares',
    'investments.valuation': 'Valuation',
    'investments.votes': 'votes',
    'investments.author': 'Author',
    'investments.estimatedPrice': 'Estimated Price',
    'investments.investment': 'Investment',
    'investments.roi': 'ROI',
    'investments.locations': 'Locations',
    'investments.buyShare': 'Buy Share',
    'investments.moreDetails': 'More Details',
    'investments.accessRestricted': 'Access restricted to professional investors',
    'investments.becomeInvestor': 'Become Professional Investor',
    
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
    'role.coinvestor': 'Co-Investor',
    'role.cofounder': 'Co-Founder',
    'role.expert': 'Expert',
    'role.consultant': 'Consultant',
    'role.partner': 'Partner',
    'role.ambassador': 'Ambassador',
    'role.blogger': 'Blogger',
    
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
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close',
    'common.dashboard': 'Dashboard',
    'common.messages': 'Messages',
    'common.overview': 'Overview',
    
    // Projects
    'projects.title': 'Projects',
    'projects.active': 'Active',
    'projects.sandbox': 'Sandbox',
    'projects.goldFund': 'Gold Fund',
    'projects.pitch': 'Pitch Panel',
    'projects.archived': 'Archive',
    'projects.category': 'Category',
    'projects.categories': 'Project Categories',
    'projects.allCategories': 'All Categories',
    'projects.filter': 'Filter',
    'projects.create': 'Create Project',
    'projects.viewDetails': 'View Details',
    'projects.investmentRange': 'Investment Range',
    'projects.all': 'All',
    'projects.budget': 'Budget',
    'projects.notFound': 'No projects found. Try changing your search parameters.',
    
    // Investments
    'investments.title': 'Investments',
    'investments.portfolio': 'Portfolio',
    'investments.secondary': 'Secondary Market',
    'investments.sandbox': 'Sandbox',
    'investments.goldFund': 'Gold Fund',
    'investments.analytics': 'Analytics',
    'investments.dueDiligence': 'Due Diligence',
    
    // Superadmin
    'superadmin.title': 'Superadmin',
    'superadmin.projectManagement': 'Project Management',
    'superadmin.staffManagement': 'Staff Management',
    'superadmin.analytics': 'Analytics',
    'superadmin.settings': 'Settings',
    'superadmin.approve': 'Approve',
    'superadmin.reject': 'Reject',
    'superadmin.revise': 'Revise',
    'superadmin.changeCategory': 'Change Category',
    'superadmin.moderationComment': 'Moderator Comment',
    
    // Project Categories
    'category.active': 'Active',
    'category.sandbox': 'Sandbox',
    'category.gold': 'Gold',
    'category.archived': 'Archive',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
  }
};

const currencyRates: Record<string, Record<string, number>> = {
  USD: { RUB: 100, EUR: 0.92 },
  EUR: { RUB: 109, USD: 1.09 },
  RUB: { USD: 0.01, EUR: 0.0092 }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('ru');
  const [currency, setCurrency] = useState<string>('RUB');

  useEffect(() => {
    const savedLang = localStorage.getItem('investex-language');
    const savedCurrency = localStorage.getItem('investex-currency');
    if (savedLang) {
      const normalized = savedLang.replace(/[^a-z]/g, '');
      setLanguage((normalized === 'en' || normalized === 'ru') ? normalized : 'ru');
    }
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
    const dict = (translations as any)[language] || (translations as any)['ru'];
    let value: any = dict;
    
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