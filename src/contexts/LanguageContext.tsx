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
    'projects.search': 'Поиск проектов...',
    'projects.filter': 'Фильтр',
    'projects.create': 'Создать проект',
    'projects.viewDetails': 'Подробнее',
    
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
    
    // Breadcrumbs
    'breadcrumb.home': 'Главная',
    'breadcrumb.projects': 'Проекты',
    'breadcrumb.project': 'Проект',
    'breadcrumb.investments': 'Инвестиции',
    'breadcrumb.startups': 'Инвестиционные стартапы',
    'breadcrumb.ideas': 'Биржа идей',
    'breadcrumb.secondary': 'Вторичный рынок',
    'breadcrumb.franchises': 'Управленческие франшизы',
    'breadcrumb.managementFranchises': 'Управленческие франшизы',
    'breadcrumb.pricing': 'Тарифы',
    'breadcrumb.about': 'О платформе',
    'breadcrumb.profile': 'Профиль',
    'breadcrumb.dashboard': 'Личный кабинет',
    'breadcrumb.dashboards': 'Личные кабинеты',
    'breadcrumb.contacts': 'Контакты',
    'breadcrumb.partners': 'Партнеры',
    'breadcrumb.auth': 'Вход',
    'breadcrumb.forgotPassword': 'Восстановление пароля',
    'breadcrumb.resetPassword': 'Сброс пароля',
    'breadcrumb.admin': 'Админ панель',
    'breadcrumb.projectManagement': 'Управление проектами',
    'breadcrumb.projectManagementHub': 'Хаб управления',
    'breadcrumb.pm': 'Управление проектами',
    'breadcrumb.hr': 'HR',
    'breadcrumb.crm': 'CRM',
    'breadcrumb.kb': 'База знаний',
    'breadcrumb.bi': 'Аналитика',
    'breadcrumb.tasks': 'Задачи',
    'breadcrumb.recruitment': 'Подбор',
    'breadcrumb.team': 'Команда',
    'breadcrumb.onboarding': 'Онбординг',
    'breadcrumb.pipelines': 'Воронки',
    'breadcrumb.deals': 'Сделки',
    'breadcrumb.documentation': 'Документация',
    'breadcrumb.wiki': 'Wiki',
    'breadcrumb.files': 'Файлы',
    'breadcrumb.reports': 'Отчеты',
    'breadcrumb.analytics': 'Аналитика',
    'breadcrumb.superadmin': 'Суперадмин',
    'breadcrumb.projectsSandbox': 'Песочница проектов',
    'breadcrumb.staffManagement': 'Управление персоналом',
    'breadcrumb.freelancers': 'Фрилансерам',
    'breadcrumb.forFreelancers': 'Фрилансерам',
    'breadcrumb.outsourcers': 'Аутсорсерам',
    'breadcrumb.forOutsourcers': 'Аутсорсерам',
    'breadcrumb.founders': 'Фаундерам',
    'breadcrumb.forFounders': 'Фаундерам',
    'breadcrumb.investors': 'Инвесторам',
    'breadcrumb.forInvestors': 'Инвесторам',
    'breadcrumb.participants': 'Участникам',
    'breadcrumb.executors': 'Исполнителям',
    'breadcrumb.employees': 'Сотрудникам',
    'breadcrumb.terms': 'Условия использования',
    'breadcrumb.privacy': 'Политика конфиденциальности',
    'breadcrumb.cookies': 'Политика cookies',
    'breadcrumb.security': 'Безопасность',
    'breadcrumb.apiDocs': 'API документация',
    'breadcrumb.knowledgeBase': 'База знаний',
    'breadcrumb.contact': 'Контакты',
    'breadcrumb.payment': 'Оплата',
    'breadcrumb.franchiser': 'Франчайзер',
    'breadcrumb.new': 'Создать',
    'breadcrumb.blog': 'Блог',

    // Hero Section
    'hero.platformTag': 'Платформа №1 для стартапов и инвестиций',
    'hero.mainTitle': 'Invest-Ex',
    'hero.subtitle': 'Единая инвестиционная платформа стартапов и инвестиций',
    'hero.description': 'Объединяем инвесторов, фаундеров, исполнителей, партнеров - всех участников венчурного и инвестиционного рынка в единой платформе. От идеи до реализации проекта и привлечения инвестиций.',
    'hero.startNow': 'Начать сейчас',
    'hero.learnMore': 'Узнать больше',
    'hero.activeProjects': 'Активных проектов',
    'hero.invested': 'Инвестировано',
    'hero.participants': 'Участников',

    // Features
    'features.title': 'Мощные возможности',
    'features.subtitle': 'Все инструменты для эффективной работы с проектами и инвестициями в одной платформе',
    'features.methodology': 'Адаптивная методология',
    'features.methodologyDesc': 'Progressive Elaboration, Agile, Scrumban и гибридные подходы для различных типов проектов',
    'features.certification': 'Система аттестации',
    'features.certificationDesc': 'Многоуровневое тестирование навыков и верификация компетенций с получением сертификатов',
    'features.investmentExchange': 'Инвестиционная биржа',
    'features.investmentExchangeDesc': 'Площадка для размещения проектов, поиска инвесторов и проведения раундов финансирования',
    'features.dataSecurity': 'Безопасность данных',
    'features.dataSecurityDesc': 'Многоуровневая защита, соответствие GDPR и CCPA, шифрование на всех этапах',
    'features.international': 'Международная поддержка',
    'features.internationalDesc': 'Мультиязычность, различные валюты и интеграция с локальными платежными системами',
    'features.aiRecommendations': 'ИИ рекомендации',
    'features.aiRecommendationsDesc': 'Персонализированные предложения проектов и специалистов на основе машинного обучения',
    'features.escrowPayments': 'Escrow платежи',
    'features.escrowPaymentsDesc': 'Безопасное хранение средств с гарантией выплат при выполнении условий проекта',
    'features.knowledgeBase': 'База знаний',
    'features.knowledgeBaseDesc': 'Юридические шаблоны, регламенты и документы для различных юрисдикций',
    'features.ecosystem': 'Единая экосистема',
    'features.ecosystemDesc': 'Все участники проектного цикла в одной платформе с персонализированными интерфейсами',

    // Navigation
    'nav.community': 'Сообщество',
    'nav.investors': 'Инвесторы',
    'nav.investorsDesc': 'Инвестиции в проекты',
    'nav.coInvestors': 'Соинвесторы',
    'nav.coInvestorsDesc': 'Групповые инвестиции',
    'nav.franchisees': 'Франчайзи',
    'nav.franchiseesDesc': 'Покупка франшизы',
    'nav.startupFranchise': 'Стартап/Франшиза',
    'nav.founders': 'Фаундеры',
    'nav.foundersDesc': 'Создание стартапов',
    'nav.coFounders': 'Ко-фаундеры',
    'nav.coFoundersDesc': 'Партнерство в проектах',
    'nav.coOwners': 'Соучредители',
    'nav.coOwnersDesc': 'Совместное учредительство',
    'nav.franchisers': 'Франчайзеры',
    'nav.franchisersDesc': 'Франчайзинговый бизнес',
    'nav.executors': 'Исполнители',
    'nav.freelancersNav': 'Фрилансеры',
    'nav.freelancersDesc': 'Проекты и задачи',
    'nav.experts': 'Эксперты',
    'nav.expertsDesc': 'Консультации и экспертиза',
    'nav.consultants': 'Консультанты',
    'nav.consultantsDesc': 'Стратегические решения',
    'nav.outsourcers': 'Аутсорсеры',
    'nav.outsourcersDesc': 'Управление командами',
    'nav.contractors': 'Подрядчики',
    'nav.contractorsDesc': 'Специализированные работы',
    'nav.employees': 'Сотрудники',
    'nav.administrators': 'Администраторы',
    'nav.administratorsDesc': 'Управление проектами',
    'nav.employeesDesc': 'Участие в команде',
    'nav.jobSeekers': 'Соискатели',
    'nav.jobSeekersDesc': 'Поиск работы',
    'nav.partnersNav': 'Партнеры',
    'nav.partnersDesc': 'Стратегическое партнерство',
    'nav.ambassadors': 'Амбассадоры',
    'nav.ambassadorsDesc': 'Представительство бренда',
    'nav.bloggers': 'Блогеры',
    'nav.bloggersDesc': 'Контент и продвижение',
    'nav.startupsInvestment': 'Стартапы',
    'nav.startupsDesc': 'Песочница и золотой фонд проектов',
    'nav.ideaExchange': 'Биржа идей',
    'nav.ideaExchangeDesc': 'Для аккредитованных инвесторов',
    'nav.secondaryMarket': 'Вторичный рынок',
    'nav.secondaryMarketDesc': 'Для профессиональных инвесторов',
    'nav.managementFranchises': 'Управленческие франшизы',
    'nav.managementFranchisesDesc': 'Франшизные инвестиции',
    'nav.aboutPlatform': 'О платформе',
    'nav.loginRequired': 'Войдите на платформу',

    // Dashboard
    'dashboard.title': 'Личный кабинет',
    'dashboard.overview': 'Обзор',
    'dashboard.personalAnalytics': 'Персональная аналитика',
    'dashboard.selectRole': 'Выберите роль',
    'dashboard.activeRole': 'Активная роль',
    'dashboard.noRoleMessage': 'У вас пока нет назначенных ролей',
    'dashboard.contactAdminMessage': 'Пожалуйста, свяжитесь с администратором для назначения роли.',
    'dashboard.welcomeBack': 'С возвращением',
    'dashboard.quickActions': 'Быстрые действия',
    'dashboard.findProjects': 'Найти проекты',
    'dashboard.findProjectsDesc': 'Поиск новых заказов',
    'dashboard.joinTeam': 'Присоединиться к команде',
    'dashboard.joinTeamDesc': 'Стать частью команды',
    'dashboard.myProfile': 'Мой профиль',
    'dashboard.myProfileDesc': 'Редактировать информацию',
    'dashboard.offerServices': 'Предложить услуги',
    'dashboard.offerServicesDesc': 'Создать предложение',
    'dashboard.findExecutors': 'Найти исполнителей',
    'dashboard.findExecutorsDesc': 'Подобрать команду',
    'dashboard.myProjects': 'Мои проекты',
    'dashboard.myProjectsDesc': 'Управление проектами',
    'dashboard.createProject': 'Создать проект',
    'dashboard.createProjectDesc': 'Запустить новый проект',
    'dashboard.findInvestors': 'Найти инвесторов',
    'dashboard.findInvestorsDesc': 'Привлечь финансирование',
    'dashboard.assembleTeam': 'Собрать команду',
    'dashboard.assembleTeamDesc': 'Найти соучредителей',
    'dashboard.myPortfolio': 'Мой портфель',
    'dashboard.myPortfolioDesc': 'Текущие инвестиции',
    'dashboard.analyticsDesc': 'Отчеты и метрики',
  },
  en: {
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
    'projects.search': 'Search projects...',
    'projects.filter': 'Filter',
    'projects.create': 'Create Project',
    'projects.viewDetails': 'View Details',
    
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

    // Breadcrumbs EN
    'breadcrumb.home': 'Home',
    'breadcrumb.projects': 'Projects',
    'breadcrumb.project': 'Project',
    'breadcrumb.investments': 'Investments',
    'breadcrumb.startups': 'Investment Startups',
    'breadcrumb.ideas': 'Idea Exchange',
    'breadcrumb.secondary': 'Secondary Market',
    'breadcrumb.franchises': 'Management Franchises',
    'breadcrumb.managementFranchises': 'Management Franchises',
    'breadcrumb.pricing': 'Pricing',
    'breadcrumb.about': 'About Platform',
    'breadcrumb.profile': 'Profile',
    'breadcrumb.dashboard': 'Dashboard',
    'breadcrumb.dashboards': 'Dashboards',
    'breadcrumb.contacts': 'Contacts',
    'breadcrumb.partners': 'Partners',
    'breadcrumb.auth': 'Login',
    'breadcrumb.forgotPassword': 'Password Recovery',
    'breadcrumb.resetPassword': 'Reset Password',
    'breadcrumb.admin': 'Admin Panel',
    'breadcrumb.projectManagement': 'Project Management',
    'breadcrumb.projectManagementHub': 'Management Hub',
    'breadcrumb.pm': 'Project Management',
    'breadcrumb.hr': 'HR',
    'breadcrumb.crm': 'CRM',
    'breadcrumb.kb': 'Knowledge Base',
    'breadcrumb.bi': 'Analytics',
    'breadcrumb.tasks': 'Tasks',
    'breadcrumb.recruitment': 'Recruitment',
    'breadcrumb.team': 'Team',
    'breadcrumb.onboarding': 'Onboarding',
    'breadcrumb.pipelines': 'Pipelines',
    'breadcrumb.deals': 'Deals',
    'breadcrumb.documentation': 'Documentation',
    'breadcrumb.wiki': 'Wiki',
    'breadcrumb.files': 'Files',
    'breadcrumb.reports': 'Reports',
    'breadcrumb.analytics': 'Analytics',
    'breadcrumb.superadmin': 'Superadmin',
    'breadcrumb.projectsSandbox': 'Projects Sandbox',
    'breadcrumb.staffManagement': 'Staff Management',
    'breadcrumb.freelancers': 'For Freelancers',
    'breadcrumb.forFreelancers': 'For Freelancers',
    'breadcrumb.outsourcers': 'For Outsourcers',
    'breadcrumb.forOutsourcers': 'For Outsourcers',
    'breadcrumb.founders': 'For Founders',
    'breadcrumb.forFounders': 'For Founders',
    'breadcrumb.investors': 'For Investors',
    'breadcrumb.forInvestors': 'For Investors',
    'breadcrumb.participants': 'Participants',
    'breadcrumb.executors': 'Executors',
    'breadcrumb.employees': 'Employees',
    'breadcrumb.terms': 'Terms of Service',
    'breadcrumb.privacy': 'Privacy Policy',
    'breadcrumb.cookies': 'Cookie Policy',
    'breadcrumb.security': 'Security',
    'breadcrumb.apiDocs': 'API Documentation',
    'breadcrumb.knowledgeBase': 'Knowledge Base',
    'breadcrumb.contact': 'Contact',
    'breadcrumb.payment': 'Payment',
    'breadcrumb.franchiser': 'Franchiser',
    'breadcrumb.new': 'Create',
    'breadcrumb.blog': 'Blog',

    // Hero Section EN
    'hero.platformTag': '#1 Platform for Startups and Investments',
    'hero.mainTitle': 'Invest-Ex',
    'hero.subtitle': 'Unified Investment Platform for Startups and Investments',
    'hero.description': 'Connecting investors, founders, executors, partners - all participants of the venture and investment market in a single platform. From idea to project implementation and attracting investments.',
    'hero.startNow': 'Get Started',
    'hero.learnMore': 'Learn More',
    'hero.activeProjects': 'Active Projects',
    'hero.invested': 'Invested',
    'hero.participants': 'Participants',

    // Features EN
    'features.title': 'Powerful Features',
    'features.subtitle': 'All tools for efficient work with projects and investments in one platform',
    'features.methodology': 'Adaptive Methodology',
    'features.methodologyDesc': 'Progressive Elaboration, Agile, Scrumban and hybrid approaches for various project types',
    'features.certification': 'Certification System',
    'features.certificationDesc': 'Multi-level skill testing and competency verification with certification',
    'features.investmentExchange': 'Investment Exchange',
    'features.investmentExchangeDesc': 'Platform for project placement, investor search and funding rounds',
    'features.dataSecurity': 'Data Security',
    'features.dataSecurityDesc': 'Multi-layered protection, GDPR and CCPA compliance, encryption at all stages',
    'features.international': 'International Support',
    'features.internationalDesc': 'Multilingual, multiple currencies and integration with local payment systems',
    'features.aiRecommendations': 'AI Recommendations',
    'features.aiRecommendationsDesc': 'Personalized project and specialist suggestions based on machine learning',
    'features.escrowPayments': 'Escrow Payments',
    'features.escrowPaymentsDesc': 'Secure funds storage with guaranteed payouts when project conditions are met',
    'features.knowledgeBase': 'Knowledge Base',
    'features.knowledgeBaseDesc': 'Legal templates, regulations and documents for various jurisdictions',
    'features.ecosystem': 'Unified Ecosystem',
    'features.ecosystemDesc': 'All project cycle participants in one platform with personalized interfaces',

    // Navigation EN
    'nav.community': 'Community',
    'nav.investors': 'Investors',
    'nav.investorsDesc': 'Project investments',
    'nav.coInvestors': 'Co-Investors',
    'nav.coInvestorsDesc': 'Group investments',
    'nav.franchisees': 'Franchisees',
    'nav.franchiseesDesc': 'Franchise purchase',
    'nav.startupFranchise': 'Startup/Franchise',
    'nav.founders': 'Founders',
    'nav.foundersDesc': 'Startup creation',
    'nav.coFounders': 'Co-Founders',
    'nav.coFoundersDesc': 'Project partnership',
    'nav.coOwners': 'Co-Owners',
    'nav.coOwnersDesc': 'Joint co-founding',
    'nav.franchisers': 'Franchisers',
    'nav.franchisersDesc': 'Franchise business',
    'nav.executors': 'Executors',
    'nav.freelancersNav': 'Freelancers',
    'nav.freelancersDesc': 'Projects and tasks',
    'nav.experts': 'Experts',
    'nav.expertsDesc': 'Consulting and expertise',
    'nav.consultants': 'Consultants',
    'nav.consultantsDesc': 'Strategic solutions',
    'nav.outsourcers': 'Outsourcers',
    'nav.outsourcersDesc': 'Team management',
    'nav.contractors': 'Contractors',
    'nav.contractorsDesc': 'Specialized work',
    'nav.employees': 'Employees',
    'nav.administrators': 'Administrators',
    'nav.administratorsDesc': 'Project management',
    'nav.employeesDesc': 'Team participation',
    'nav.jobSeekers': 'Job Seekers',
    'nav.jobSeekersDesc': 'Job search',
    'nav.partnersNav': 'Partners',
    'nav.partnersDesc': 'Strategic partnership',
    'nav.ambassadors': 'Ambassadors',
    'nav.ambassadorsDesc': 'Brand representation',
    'nav.bloggers': 'Bloggers',
    'nav.bloggersDesc': 'Content and promotion',
    'nav.startupsInvestment': 'Startups',
    'nav.startupsDesc': 'Sandbox and gold fund projects',
    'nav.ideaExchange': 'Idea Exchange',
    'nav.ideaExchangeDesc': 'For accredited investors',
    'nav.secondaryMarket': 'Secondary Market',
    'nav.secondaryMarketDesc': 'For professional investors',
    'nav.managementFranchises': 'Management Franchises',
    'nav.managementFranchisesDesc': 'Franchise investments',
    'nav.aboutPlatform': 'About Platform',
    'nav.loginRequired': 'Please login',

    // Dashboard EN
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.personalAnalytics': 'Personal Analytics',
    'dashboard.selectRole': 'Select role',
    'dashboard.activeRole': 'Active role',
    'dashboard.noRoleMessage': 'You have no assigned roles yet',
    'dashboard.contactAdminMessage': 'Please contact administrator to assign a role.',
    'dashboard.welcomeBack': 'Welcome back',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.findProjects': 'Find Projects',
    'dashboard.findProjectsDesc': 'Search for new orders',
    'dashboard.joinTeam': 'Join Team',
    'dashboard.joinTeamDesc': 'Become part of a team',
    'dashboard.myProfile': 'My Profile',
    'dashboard.myProfileDesc': 'Edit information',
    'dashboard.offerServices': 'Offer Services',
    'dashboard.offerServicesDesc': 'Create an offer',
    'dashboard.findExecutors': 'Find Executors',
    'dashboard.findExecutorsDesc': 'Build a team',
    'dashboard.myProjects': 'My Projects',
    'dashboard.myProjectsDesc': 'Project management',
    'dashboard.createProject': 'Create Project',
    'dashboard.createProjectDesc': 'Launch new project',
    'dashboard.findInvestors': 'Find Investors',
    'dashboard.findInvestorsDesc': 'Attract financing',
    'dashboard.assembleTeam': 'Assemble Team',
    'dashboard.assembleTeamDesc': 'Find co-founders',
    'dashboard.myPortfolio': 'My Portfolio',
    'dashboard.myPortfolioDesc': 'Current investments',
    'dashboard.analyticsDesc': 'Reports and metrics',
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