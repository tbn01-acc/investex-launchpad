// Import blog images
import angelInvestBasics from '@/assets/blog/angel-invest-basics.jpg';
import dueDiligenceChecklist from '@/assets/blog/due-diligence-checklist.jpg';
import portfolioDiversification from '@/assets/blog/portfolio-diversification.jpg';
import fundraisingStrategy from '@/assets/blog/fundraising-strategy.jpg';
import scalingTeam from '@/assets/blog/scaling-team.jpg';
import productMarketFit from '@/assets/blog/product-market-fit.jpg';
import seriesATrends from '@/assets/blog/series-a-trends.jpg';
import vcDecisionProcess from '@/assets/blog/vc-decision-process.jpg';
import unicornTraits from '@/assets/blog/unicorn-traits.jpg';
import businessModelOptimization from '@/assets/blog/business-model-optimization.jpg';
import goToMarketStrategy from '@/assets/blog/go-to-market-strategy.jpg';
import turnaroundCase from '@/assets/blog/turnaround-case.jpg';
import mvpArchitecture from '@/assets/blog/mvp-architecture.jpg';
import techDebtManagement from '@/assets/blog/tech-debt-management.jpg';
import scalingInfrastructure from '@/assets/blog/scaling-infrastructure.jpg';

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articlesCount: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Short preview (15-20% for free users)
  fullContent?: string; // Full article (for premium users)
  author: BlogAuthor;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image: string;
  roleType: 'angel-investors' | 'founders' | 'vc-funds' | 'consultants' | 'developers';
  contentType: 'guides' | 'cases' | 'analytics' | 'trends';
  isPremium: boolean; // Whether full content requires premium access
}

export const blogAuthors: BlogAuthor[] = [
  {
    id: 'aleksey-petrov',
    name: 'Алексей Петров',
    role: 'Бизнес-ангел',
    bio: '15 лет в венчурных инвестициях, 30+ стартапов в портфеле',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    articlesCount: 12
  },
  {
    id: 'maria-ivanova',
    name: 'Мария Иванова',
    role: 'Основатель',
    bio: 'Co-founder трех успешных стартапов, эксперт по масштабированию',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    articlesCount: 8
  },
  {
    id: 'dmitry-sokolov',
    name: 'Дмитрий Соколов',
    role: 'VC Partner',
    bio: 'Partner в ведущем венчурном фонде, 50+ инвестиций на ранних стадиях',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    articlesCount: 15
  },
  {
    id: 'elena-kozlova',
    name: 'Елена Козлова',
    role: 'Консультант',
    bio: 'Эксперт по стратегическому развитию, помогла более 100 стартапам',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    articlesCount: 10
  },
  {
    id: 'igor-volkov',
    name: 'Игорь Волков',
    role: 'Tech Lead',
    bio: 'CTO в нескольких успешных tech стартапах, эксперт по MVP разработке',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    articlesCount: 9
  }
];

export const blogArticles: BlogArticle[] = [
  // Angel Investors Articles
  {
    id: 'angel-invest-basics',
    title: 'Основы бизнес-ангельского инвестирования в 2024',
    excerpt: 'Полное руководство для тех, кто хочет начать инвестировать в стартапы. Узнайте о критериях оценки и стратегиях портфеля.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[0],
    category: 'seed-funding',
    tags: ['инвестиции', 'стартапы', 'бизнес-ангелы'],
    publishedAt: '2024-01-15',
    readTime: 8,
    image: angelInvestBasics,
    roleType: 'angel-investors',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'due-diligence-checklist',
    title: 'Чек-лист due diligence от практикующего ангела',
    excerpt: 'Практический чек-лист для проверки стартапа перед инвестицией. Что важно проверить и на что обратить внимание.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[0],
    category: 'due-diligence',
    tags: ['due diligence', 'проверка', 'риски'],
    publishedAt: '2024-01-10',
    readTime: 10,
    image: dueDiligenceChecklist,
    roleType: 'angel-investors',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'portfolio-diversification',
    title: 'Диверсификация портфеля: мой опыт 30+ инвестиций',
    excerpt: 'Как я построил сбалансированный портфель из 30 стартапов и какие уроки извлек из успехов и неудач.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[0],
    category: 'seed-funding',
    tags: ['портфель', 'диверсификация', 'кейс'],
    publishedAt: '2024-01-05',
    readTime: 12,
    image: portfolioDiversification,
    roleType: 'angel-investors',
    contentType: 'cases',
    isPremium: false
  },

  // Founders Articles
  {
    id: 'fundraising-strategy',
    title: 'Стратегия фандрайзинга: как привлечь первый раунд',
    excerpt: 'Пошаговый план привлечения первых инвестиций. От подготовки питча до закрытия сделки.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[1],
    category: 'seed-funding',
    tags: ['фандрайзинг', 'инвестиции', 'питч'],
    publishedAt: '2024-01-18',
    readTime: 9,
    image: fundraisingStrategy,
    roleType: 'founders',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'scaling-team',
    title: 'Масштабирование команды: от 5 до 50 человек',
    excerpt: 'Мой опыт построения команды в трех стартапах. Ошибки, которые нужно избежать при росте.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[1],
    category: 'scaling',
    tags: ['команда', 'масштабирование', 'HR'],
    publishedAt: '2024-01-12',
    readTime: 11,
    image: scalingTeam,
    roleType: 'founders',
    contentType: 'cases',
    isPremium: false
  },
  {
    id: 'product-market-fit',
    title: 'Как найти product-market fit: практические методы',
    excerpt: 'Методология поиска PMF, которая работает. Метрики, эксперименты и инструменты для валидации.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[1],
    category: 'scaling',
    tags: ['product-market fit', 'валидация', 'метрики'],
    publishedAt: '2024-01-08',
    readTime: 10,
    image: productMarketFit,
    roleType: 'founders',
    contentType: 'analytics',
    isPremium: false
  },

  // VC Funds Articles
  {
    id: 'series-a-trends',
    title: 'Тренды Series A инвестиций в 2024',
    excerpt: 'Анализ рынка Series A: что изменилось в оценках, какие секторы привлекают больше всего внимания.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[2],
    category: 'series-a',
    tags: ['Series A', 'тренды', 'венчур'],
    publishedAt: '2024-01-20',
    readTime: 7,
    image: seriesATrends,
    roleType: 'vc-funds',
    contentType: 'trends',
    isPremium: false
  },
  {
    id: 'vc-decision-process',
    title: 'Как VC принимают решения: внутренняя кухня',
    excerpt: 'Раскрываем процесс принятия инвестиционных решений в венчурном фонде. От первой встречи до term sheet.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[2],
    category: 'series-a',
    tags: ['VC', 'процесс', 'инвестиции'],
    publishedAt: '2024-01-14',
    readTime: 13,
    image: vcDecisionProcess,
    roleType: 'vc-funds',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'unicorn-traits',
    title: 'Общие черты единорогов: 50 инвестиций спустя',
    excerpt: 'Анализ наших самых успешных инвестиций. Какие качества команд и продуктов приводят к успеху.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[2],
    category: 'scaling',
    tags: ['единороги', 'успех', 'анализ'],
    publishedAt: '2024-01-09',
    readTime: 15,
    image: unicornTraits,
    roleType: 'vc-funds',
    contentType: 'analytics',
    isPremium: false
  },

  // Consultants Articles
  {
    id: 'business-model-optimization',
    title: 'Оптимизация бизнес-модели стартапа',
    excerpt: 'Фреймворк для анализа и улучшения бизнес-модели. Проверенные методы увеличения unit-экономики.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[3],
    category: 'scaling',
    tags: ['бизнес-модель', 'оптимизация', 'юнит-экономика'],
    publishedAt: '2024-01-17',
    readTime: 9,
    image: businessModelOptimization,
    roleType: 'consultants',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'go-to-market-strategy',
    title: 'Go-to-market стратегия для B2B стартапов',
    excerpt: 'Как построить эффективную GTM стратегию. Выбор каналов, позиционирование и первые клиенты.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[3],
    category: 'scaling',
    tags: ['GTM', 'B2B', 'стратегия'],
    publishedAt: '2024-01-11',
    readTime: 11,
    image: goToMarketStrategy,
    roleType: 'consultants',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'turnaround-case',
    title: 'Кейс: как мы спасли стартап от банкротства',
    excerpt: 'История реального проекта: от критической ситуации к устойчивому росту за 6 месяцев.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[3],
    category: 'scaling',
    tags: ['кейс', 'антикризис', 'рост'],
    publishedAt: '2024-01-06',
    readTime: 14,
    image: turnaroundCase,
    roleType: 'consultants',
    contentType: 'cases',
    isPremium: false
  },

  // Developers Articles
  {
    id: 'mvp-architecture',
    title: 'Архитектура MVP: как не перестроить через месяц',
    excerpt: 'Принципы построения MVP, который можно масштабировать. Технологический стек и best practices.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[4],
    category: 'seed-funding',
    tags: ['MVP', 'архитектура', 'разработка'],
    publishedAt: '2024-01-19',
    readTime: 10,
    image: mvpArchitecture,
    roleType: 'developers',
    contentType: 'guides',
    isPremium: false
  },
  {
    id: 'tech-debt-management',
    title: 'Управление техническим долгом в стартапе',
    excerpt: 'Когда спешить нужно, а когда технический долг обойдется слишком дорого. Практические советы.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[4],
    category: 'scaling',
    tags: ['технический долг', 'разработка', 'качество'],
    publishedAt: '2024-01-13',
    readTime: 8,
    image: techDebtManagement,
    roleType: 'developers',
    contentType: 'analytics',
    isPremium: false
  },
  {
    id: 'scaling-infrastructure',
    title: 'От 100 до 1M пользователей: масштабирование инфраструктуры',
    excerpt: 'Кейс масштабирования инфраструктуры реального проекта. Проблемы, решения и стоимость.',
    content: 'Подробное содержание статьи...',
    author: blogAuthors[4],
    category: 'scaling',
    tags: ['инфраструктура', 'масштабирование', 'DevOps'],
    publishedAt: '2024-01-07',
    readTime: 12,
    image: scalingInfrastructure,
    roleType: 'developers',
    contentType: 'cases',
    isPremium: false
  }
];

export const blogCategories = [
  {
    id: 'seed-funding',
    name: 'Seed финансирование',
    description: 'Всё о привлечении первых инвестиций',
    articlesCount: 5
  },
  {
    id: 'series-a',
    name: 'Series A',
    description: 'Раунды Series A и дальше',
    articlesCount: 4
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence',
    description: 'Проверка стартапов перед инвестицией',
    articlesCount: 3
  },
  {
    id: 'scaling',
    name: 'Масштабирование',
    description: 'Рост и развитие компании',
    articlesCount: 8
  }
];

export const roleBlogs = [
  {
    id: 'angel-investors',
    name: 'Блог бизнес-ангелов',
    description: 'Экспертные статьи от практикующих бизнес-ангелов',
    path: '/blog/angel-investors'
  },
  {
    id: 'founders',
    name: 'Блог основателей',
    description: 'Опыт и советы от успешных фаундеров',
    path: '/blog/founders'
  },
  {
    id: 'vc-funds',
    name: 'Блог VC',
    description: 'Инсайты от партнеров венчурных фондов',
    path: '/blog/vc-funds'
  },
  {
    id: 'consultants',
    name: 'Блог консультантов',
    description: 'Стратегические советы от экспертов',
    path: '/blog/consultants'
  },
  {
    id: 'developers',
    name: 'Блог разработчиков',
    description: 'Технические решения для стартапов',
    path: '/blog/developers'
  }
];
