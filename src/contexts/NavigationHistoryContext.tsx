import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface NavigationHistoryContextType {
  history: BreadcrumbItem[];
  clearHistory: () => void;
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType | undefined>(undefined);

const titles: Record<string, string> = {
  '': 'Главная',
  projects: 'Проекты',
  project: 'Проект',
  investments: 'Инвестиции',
  startups: 'Инвестиционные стартапы',
  ideas: 'Биржа идей',
  secondary: 'Вторичный рынок',
  franchises: 'Управленческие франшизы',
  'management-franchises': 'Управленческие франшизы',
  pricing: 'Тарифы',
  about: 'О платформе',
  profile: 'Профиль',
  dashboard: 'Личный кабинет',
  dashboards: 'Личные кабинеты',
  contacts: 'Контакты',
  partners: 'Партнеры',
  auth: 'Вход',
  'forgot-password': 'Восстановление пароля',
  'reset-password': 'Сброс пароля',
  admin: 'Админ панель',
  'project-management': 'Управление проектами',
  'project-management-hub': 'Хаб управления',
  pm: 'Управление проектами',
  hr: 'HR',
  crm: 'CRM',
  kb: 'База знаний',
  bi: 'Аналитика',
  tasks: 'Задачи',
  recruitment: 'Подбор',
  team: 'Команда',
  onboarding: 'Онбординг',
  pipelines: 'Воронки',
  deals: 'Сделки',
  documentation: 'Документация',
  wiki: 'Wiki',
  files: 'Файлы',
  reports: 'Отчеты',
  analytics: 'Аналитика',
  superadmin: 'Суперадмин',
  'projects-sandbox': 'Песочница проектов',
  'staff-management': 'Управление персоналом',
  freelancers: 'Фрилансерам',
  'for-freelancers': 'Фрилансерам',
  outsourcers: 'Аутсорсерам',
  'for-outsourcers': 'Аутсорсерам',
  founders: 'Фаундерам',
  'for-founders': 'Фаундерам',
  investors: 'Инвесторам',
  'for-investors': 'Инвесторам',
  participants: 'Участникам',
  executors: 'Исполнителям',
  employees: 'Сотрудникам',
  terms: 'Условия использования',
  privacy: 'Политика конфиденциальности',
  cookies: 'Политика cookies',
  security: 'Безопасность',
  'api-docs': 'API документация',
  'knowledge-base': 'База знаний',
  contact: 'Контакты',
  payment: 'Оплата',
  franchiser: 'Франчайзер',
  new: 'Создать',
  blog: 'Блог',
  categories: 'Категории',
  'angel-investors': 'Бизнес-ангелы',
  'vc-funds': 'Венчурные фонды',
  'co-investors': 'Со-инвесторы',
  experts: 'Эксперты',
  article: 'Статья',
};

const getPathLabel = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return titles[''];
  
  const lastSegment = segments[segments.length - 1];
  const isId = /^[0-9a-fA-F-]{8,}$/.test(lastSegment);
  
  if (isId && segments.length > 1) {
    return titles[segments[segments.length - 2]] || 'Детали';
  }
  
  return titles[lastSegment] || decodeURIComponent(lastSegment);
};

export const NavigationHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [history, setHistory] = useState<BreadcrumbItem[]>(() => {
    const saved = sessionStorage.getItem('navigationHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [{ path: '/', label: titles[''] }];
      }
    }
    return [{ path: '/', label: titles[''] }];
  });

  useEffect(() => {
    const currentPath = location.pathname;
    const currentLabel = getPathLabel(currentPath);

    setHistory(prev => {
      // Если это главная страница, сбрасываем историю
      if (currentPath === '/') {
        const newHistory = [{ path: '/', label: titles[''] }];
        sessionStorage.setItem('navigationHistory', JSON.stringify(newHistory));
        return newHistory;
      }

      // Проверяем, есть ли уже этот путь в истории
      const existingIndex = prev.findIndex(item => item.path === currentPath);
      
      if (existingIndex !== -1) {
        // Если путь уже есть, обрезаем историю до этого элемента (возврат назад)
        const newHistory = prev.slice(0, existingIndex + 1);
        sessionStorage.setItem('navigationHistory', JSON.stringify(newHistory));
        return newHistory;
      }

      // Добавляем новый путь в историю
      const newHistory = [...prev, { path: currentPath, label: currentLabel }];
      sessionStorage.setItem('navigationHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, [location.pathname]);

  const clearHistory = () => {
    const newHistory = [{ path: '/', label: titles[''] }];
    setHistory(newHistory);
    sessionStorage.setItem('navigationHistory', JSON.stringify(newHistory));
  };

  return (
    <NavigationHistoryContext.Provider value={{ history, clearHistory }}>
      {children}
    </NavigationHistoryContext.Provider>
  );
};

export const useNavigationHistory = () => {
  const context = useContext(NavigationHistoryContext);
  if (context === undefined) {
    throw new Error('useNavigationHistory must be used within a NavigationHistoryProvider');
  }
  return context;
};
