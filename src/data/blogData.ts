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
  content: string;
  author: BlogAuthor;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  image: string;
  roleType: 'angel-investors' | 'founders' | 'vc-funds' | 'consultants' | 'developers';
  contentType: 'guides' | 'cases' | 'analytics' | 'trends';
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
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    roleType: 'angel-investors',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    roleType: 'angel-investors',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    roleType: 'angel-investors',
    contentType: 'cases'
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
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800',
    roleType: 'founders',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    roleType: 'founders',
    contentType: 'cases'
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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    roleType: 'founders',
    contentType: 'analytics'
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
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    roleType: 'vc-funds',
    contentType: 'trends'
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
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
    roleType: 'vc-funds',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    roleType: 'vc-funds',
    contentType: 'analytics'
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
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    roleType: 'consultants',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    roleType: 'consultants',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800',
    roleType: 'consultants',
    contentType: 'cases'
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
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    roleType: 'developers',
    contentType: 'guides'
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
    image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800',
    roleType: 'developers',
    contentType: 'analytics'
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
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    roleType: 'developers',
    contentType: 'cases'
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
