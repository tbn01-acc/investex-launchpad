// Comprehensive project data with full descriptions for all projects

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  image: string;
  budget: string;
  timeline: string;
  team: string;
  status: string;
  company: string;
  technologies: string[];
  features: string[];
  projectCategory?: 'active' | 'sandbox' | 'gold_fund' | 'archived';
  isPitch?: boolean;
  milestones: {
    title: string;
    status: 'completed' | 'in-progress' | 'planned';
    date: string;
  }[];
  metrics?: {
    expectedROI?: string;
    marketSize?: string;
    riskLevel?: 'Низкий' | 'Средний' | 'Высокий';
  };
}

export const allProjects: Project[] = [
  {
    id: 1,
    title: "AI-Маркетинг для E-commerce",
    description: "Революционное решение для персонализации пользовательского опыта с использованием машинного обучения и анализа поведения клиентов.",
    fullDescription: "Наш проект представляет собой комплексную AI-платформу для электронной коммерции, которая революционизирует способ взаимодействия брендов с клиентами. Используя передовые алгоритмы машинного обучения, мы анализируем поведение пользователей в реальном времени и предоставляем персонализированные рекомендации, которые увеличивают конверсию на 40-60%. Наша платформа интегрируется с существующими CMS и предоставляет детальную аналитику для оптимизации продаж.",
    category: "AI/ML",
    image: "/src/assets/projects/ai-marketing-ecommerce.jpg",
    budget: "2500000 ₽",
    timeline: "6 месяцев",
    team: "15 человек",
    status: "В разработке",
    company: "TechVision AI",
    projectCategory: "active",
    isPitch: false,
    technologies: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL"],
    features: [
      "Персонализированные рекомендации товаров",
      "Прогнозирование поведения клиентов",
      "Автоматическая оптимизация цен",
      "Анализ sentiment'а отзывов",
      "A/B тестирование в реальном времени"
    ],
    milestones: [
      { title: "MVP разработка", status: "completed", date: "Q1 2024" },
      { title: "Бета-тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Запуск продукта", status: "planned", date: "Q3 2024" },
      { title: "Масштабирование", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "300-500%",
      marketSize: "$50B",
      riskLevel: "Средний"
    }
  },
  {
    id: 2,
    title: "Блокчейн для логистики",
    description: "Прозрачное отслеживание поставок от производителя до потребителя",
    fullDescription: "Инновационная блокчейн-платформа для логистической отрасли, обеспечивающая полную прозрачность и неизменяемость данных о поставках. Наше решение устраняет проблемы фальсификации документов, потери грузов и непрозрачности в цепи поставок. Платформа использует смарт-контракты для автоматизации процессов и IoT-сенсоры для отслеживания грузов в реальном времени.",
    category: "Blockchain",
    image: "/src/assets/projects/blockchain-logistics.jpg",
    budget: "50000000 ₽",
    timeline: "8 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "LogiChain Solutions",
    projectCategory: "sandbox",
    isPitch: false,
    technologies: ["Ethereum", "Solidity", "IPFS", "React", "Node.js"],
    features: [
      "Отслеживание грузов в реальном времени",
      "Смарт-контракты для автоматизации",
      "Цифровые сертификаты качества",
      "Интеграция с IoT датчиками",
      "Мультимодальная логистика"
    ],
    milestones: [
      { title: "Техническое ТЗ", status: "completed", date: "Q4 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотный проект", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "200-400%",
      marketSize: "$15B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 3,
    title: "FinTech мобильное приложение",
    description: "Современное решение для управления личными финансами",
    fullDescription: "Комплексное мобильное приложение для управления личными финансами, объединяющее банковские услуги, инвестиции и планирование бюджета в одной платформе. Наше решение помогает пользователям принимать обоснованные финансовые решения с помощью AI-советника и предоставляет удобные инструменты для отслеживания доходов и расходов.",
    category: "FinTech",
    image: "/src/assets/projects/fintech-mobile-app.jpg",
    budget: "3500000 ₽",
    timeline: "4 месяца",
    team: "8 человек",
    status: "Готов к запуску",
    company: "FinFlow Inc",
    projectCategory: "gold_fund",
    isPitch: false,
    technologies: ["React Native", "Node.js", "MongoDB", "Stripe API"],
    features: [
      "Агрегация банковских счетов",
      "Автоматическая категоризация трат",
      "Инвестиционный портфель",
      "Планирование бюджета",
      "Уведомления и аналитика"
    ],
    milestones: [
      { title: "Дизайн и прототип", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "completed", date: "Q4 2023" },
      { title: "Тестирование", status: "completed", date: "Q1 2024" },
      { title: "Запуск в App Store", status: "in-progress", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "250-350%",
      marketSize: "$8B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 4,
    title: "Медтех платформа",
    description: "Телемедицина и мониторинг здоровья с использованием IoT",
    fullDescription: "Инновационная платформа телемедицины, которая объединяет врачей и пациентов в цифровой экосистеме. Используя IoT-устройства для мониторинга здоровья, AI для анализа данных и удобный интерфейс для видеоконсультаций, мы делаем качественную медицинскую помощь доступной для всех. Платформа поддерживает интеграцию с медицинскими учреждениями и страховыми компаниями.",
    category: "HealthTech",
    image: "/src/assets/projects/healthtech-platform.jpg",
    budget: "45000000 ₽",
    timeline: "10 месяцев",
    team: "18 человек",
    status: "В разработке",
    company: "HealthTech Solutions",
    projectCategory: "active",
    isPitch: true,
    technologies: ["React", "Node.js", "WebRTC", "Python", "TensorFlow"],
    features: [
      "Видеоконсультации с врачами",
      "IoT мониторинг показателей здоровья",
      "AI-анализ медицинских данных",
      "Электронная медицинская карта",
      "Интеграция со страховыми компаниями"
    ],
    milestones: [
      { title: "Исследование рынка", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Клинические испытания", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "400-600%",
      marketSize: "$25B",
      riskLevel: "Средний"
    }
  },
  {
    id: 5,
    title: "EdTech платформа",
    description: "Персонализированное обучение с использованием машинного обучения",
    fullDescription: "Революционная образовательная платформа, которая использует искусственный интеллект для создания персонализированных учебных планов. Наша система анализирует стиль обучения каждого студента и адаптирует контент для максимальной эффективности. Платформа включает интерактивные курсы, виртуальные лаборатории и систему оценки прогресса.",
    category: "EdTech",
    image: "/src/assets/projects/edtech-platform.jpg",
    budget: "25000000 ₽",
    timeline: "7 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "EduTech Innovations",
    projectCategory: "archived",
    isPitch: false,
    technologies: ["React", "Python", "TensorFlow", "PostgreSQL", "WebRTC"],
    features: [
      "Персонализированные учебные планы",
      "AI-оценка знаний студентов",
      "Виртуальные лаборатории",
      "Интерактивные курсы",
      "Система прогресса и аналитики"
    ],
    milestones: [
      { title: "Концепция и исследование", status: "completed", date: "Q2 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q4 2023" },
      { title: "Бета-тестирование", status: "planned", date: "Q1 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "300-450%",
      marketSize: "$12B",
      riskLevel: "Средний"
    }
  },
  {
    id: 6,
    title: "GreenTech стартап",
    description: "Умные решения для экологически чистой энергетики",
    fullDescription: "Инновационная платформа для управления возобновляемыми источниками энергии, которая использует IoT-сенсоры и машинное обучение для оптимизации производства и потребления энергии. Наше решение помогает снизить углеродный след и повысить эффективность энергетических систем. Платформа поддерживает интеграцию с солнечными панелями, ветрогенераторами и системами накопления энергии.",
    category: "GreenTech",
    image: "/src/assets/projects/greentech-energy.jpg",
    budget: "120000000 ₽",
    timeline: "12 месяцев",
    team: "25 человек",
    status: "Привлечение инвестиций",
    company: "Green Energy Corp",
    technologies: ["Python", "IoT", "Machine Learning", "React", "Node.js"],
    features: [
      "IoT мониторинг энергетических систем",
      "AI-оптимизация производства энергии",
      "Система управления батареями",
      "Прогнозирование потребления",
      "Интеграция с Smart Grid"
    ],
    milestones: [
      { title: "Исследование и разработка", status: "completed", date: "Q1 2023" },
      { title: "Создание прототипа", status: "completed", date: "Q3 2023" },
      { title: "Пилотное тестирование", status: "in-progress", date: "Q1 2024" },
      { title: "Коммерциализация", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "500-800%",
      marketSize: "$30B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 7,
    title: "FoodTech инновации",
    description: "Автоматизация ресторанного бизнеса и доставки еды",
    fullDescription: "Комплексная платформа для автоматизации ресторанного бизнеса, включающая систему заказов, управление кухней, логистику доставки и аналитику продаж. Наше решение использует AI для оптимизации меню, прогнозирования спроса и управления запасами. Платформа интегрируется с популярными сервисами доставки и платежными системами.",
    category: "FoodTech",
    image: "/src/assets/projects/foodtech-automation.jpg",
    budget: "32000000 ₽",
    timeline: "6 месяцев",
    team: "14 человек",
    status: "В разработке",
    company: "FoodTech Solutions",
    technologies: ["React", "Node.js", "MongoDB", "Python", "Docker"],
    features: [
      "Система онлайн-заказов",
      "AI-оптимизация меню",
      "Управление доставкой",
      "Аналитика продаж",
      "Интеграция с POS-системами"
    ],
    milestones: [
      { title: "Анализ требований", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Тестирование в ресторанах", status: "planned", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "200-350%",
      marketSize: "$6B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 8,
    title: "PropTech решение",
    description: "Цифровизация процессов покупки и аренды недвижимости",
    fullDescription: "Инновационная платформа для рынка недвижимости, которая упрощает процессы поиска, просмотра и покупки недвижимости. Используя VR-туры, AI-оценку стоимости и блокчейн для безопасных транзакций, мы делаем рынок недвижимости более прозрачным и удобным. Платформа включает инструменты для агентов, покупателей и продавцов.",
    category: "PropTech",
    image: "/src/assets/projects/proptech-solution.jpg",
    budget: "55000000 ₽",
    timeline: "9 месяцев",
    team: "16 человек",
    status: "Поиск инвестиций",
    company: "PropTech Innovations",
    technologies: ["React", "Node.js", "Blockchain", "VR/AR", "Python"],
    features: [
      "VR-туры по недвижимости",
      "AI-оценка стоимости",
      "Блокчейн-транзакции",
      "CRM для агентов",
      "Мобильное приложение"
    ],
    milestones: [
      { title: "Исследование рынка", status: "completed", date: "Q2 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q4 2023" },
      { title: "Пилотный запуск", status: "planned", date: "Q1 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "350-500%",
      marketSize: "$18B",
      riskLevel: "Средний"
    }
  },
  {
    id: 9,
    title: "Платформа IoT для умного дома",
    description: "Комплексное решение для автоматизации домашнего пространства",
    fullDescription: "Инновационная платформа для управления умным домом, объединяющая различные IoT-устройства в единую экосистему. Наша система использует машинное обучение для предсказания потребностей пользователей и автоматизации рутинных задач. Поддержка голосового управления, мобильного приложения и веб-интерфейса делает управление домом максимально удобным.",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop",
    budget: "$450K - $750K",
    timeline: "8 месяцев",
    team: "14 человек",
    status: "В разработке",
    company: "SmartHome Tech",
    technologies: ["Python", "IoT", "React Native", "AWS IoT", "TensorFlow"],
    features: [
      "Централизованное управление устройствами",
      "AI-автоматизация сценариев",
      "Голосовое управление",
      "Энергомониторинг",
      "Безопасность и оповещения"
    ],
    milestones: [
      { title: "Прототип системы", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Тестирование пользователей", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "280-420%",
      marketSize: "$22B",
      riskLevel: "Средний"
    }
  },
  {
    id: 10,
    title: "SaaS для управления проектами",
    description: "Облачная платформа для совместной работы команд",
    fullDescription: "Современная SaaS-платформа для управления проектами, которая объединяет планирование, коммуникацию и отчетность в одном инструменте. Используя AI для прогнозирования сроков и рисков, мы помогаем командам работать эффективнее. Интеграции с популярными инструментами и гибкая настройка под любые процессы.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
    budget: "$350K - $600K",
    timeline: "6 месяцев",
    team: "10 человек",
    status: "Готов к запуску",
    company: "ProjectFlow",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
    features: [
      "Kanban и Gantt диаграммы",
      "Управление ресурсами",
      "Отчетность и аналитика",
      "Интеграции с Git, Slack",
      "API для расширений"
    ],
    milestones: [
      { title: "MVP разработка", status: "completed", date: "Q4 2023" },
      { title: "Бета-тестирование", status: "completed", date: "Q1 2024" },
      { title: "Запуск продукта", status: "in-progress", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "320-480%",
      marketSize: "$9B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 11,
    title: "Криптовалютная биржа",
    description: "Безопасная платформа для торговли цифровыми активами",
    fullDescription: "Новое поколение криптовалютной биржи с фокусом на безопасность и удобство использования. Поддержка spot и futures торговли, стейкинг, DeFi интеграции. Продвинутые инструменты анализа рынка и автоматизированные торговые стратегии.",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=400&fit=crop",
    budget: "$1.2M - $2M",
    timeline: "12 месяцев",
    team: "22 человек",
    status: "Привлечение инвестиций",
    company: "CryptoTrade Platform",
    technologies: ["Go", "React", "PostgreSQL", "WebSocket", "Kubernetes"],
    features: [
      "Spot и futures торговля",
      "Стейкинг и DeFi",
      "Продвинутые графики",
      "API для трейдинг-ботов",
      "Холодное хранение активов"
    ],
    milestones: [
      { title: "Техническая архитектура", status: "completed", date: "Q4 2023" },
      { title: "Разработка ядра", status: "in-progress", date: "Q2 2024" },
      { title: "Получение лицензий", status: "in-progress", date: "Q2 2024" },
      { title: "Бета-запуск", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "600-1000%",
      marketSize: "$45B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 12,
    title: "Платформа для удаленной работы",
    description: "Виртуальный офис для распределенных команд",
    fullDescription: "Инновационная платформа для удаленной работы, создающая эффект присутствия в офисе. Виртуальные переговорные, совместная работа с документами в реальном времени, интегрированные инструменты коммуникации и управления задачами.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop",
    budget: "$400K - $700K",
    timeline: "7 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "RemoteHub",
    technologies: ["React", "WebRTC", "Node.js", "MongoDB", "Socket.io"],
    features: [
      "Виртуальные офисы",
      "Видеоконференции",
      "Совместная работа",
      "Интеграция с календарями",
      "Метрики продуктивности"
    ],
    milestones: [
      { title: "Прототипирование", status: "completed", date: "Q3 2023" },
      { title: "Alpha версия", status: "completed", date: "Q4 2023" },
      { title: "Beta тестирование", status: "in-progress", date: "Q1 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "290-440%",
      marketSize: "$11B",
      riskLevel: "Средний"
    }
  },
  {
    id: 13,
    title: "Маркетплейс фрилансеров",
    description: "Платформа для поиска специалистов и заказов",
    fullDescription: "Современный маркетплейс, соединяющий заказчиков и исполнителей. AI-подбор специалистов, система эскроу, встроенные инструменты для совместной работы. Гарантии качества и прозрачная система рейтингов.",
    category: "Marketplace",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    budget: "$550K - $900K",
    timeline: "8 месяцев",
    team: "16 человек",
    status: "Поиск инвестиций",
    company: "FreelanceConnect",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redis"],
    features: [
      "AI-подбор исполнителей",
      "Система эскроу",
      "Встроенный чат и видео",
      "Управление контрактами",
      "Аналитика для заказчиков"
    ],
    milestones: [
      { title: "Исследование рынка", status: "completed", date: "Q2 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q4 2023" },
      { title: "Запуск MVP", status: "planned", date: "Q1 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "310-490%",
      marketSize: "$14B",
      riskLevel: "Средний"
    }
  },
  {
    id: 14,
    title: "AI-ассистент для разработчиков",
    description: "Умный помощник для написания и отладки кода",
    fullDescription: "Революционный AI-помощник для разработчиков, использующий большие языковые модели для генерации кода, объяснения сложных концепций и автоматической отладки. Интеграция с популярными IDE и поддержка множества языков программирования.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
    budget: "$650K - $1M",
    timeline: "9 месяцев",
    team: "18 человек",
    status: "В разработке",
    company: "CodeAI Labs",
    technologies: ["Python", "GPT-4", "TypeScript", "VSCode Extension API"],
    features: [
      "Генерация кода на лету",
      "Автоматическая отладка",
      "Рефакторинг кода",
      "Документация кода",
      "Code review помощник"
    ],
    milestones: [
      { title: "Исследование и разработка", status: "completed", date: "Q3 2023" },
      { title: "Создание MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Alpha тестирование", status: "planned", date: "Q2 2024" },
      { title: "Публичный релиз", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "450-650%",
      marketSize: "$28B",
      riskLevel: "Средний"
    }
  },
  {
    id: 15,
    title: "Платформа для онлайн-мероприятий",
    description: "Виртуальные конференции и нетворкинг",
    fullDescription: "Комплексное решение для проведения онлайн-мероприятий любого масштаба. Виртуальные залы, нетворкинг-зоны, выставочные стенды, интерактивные сессии. AI-рекомендации для нетворкинга и детальная аналитика мероприятий.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
    budget: "$500K - $850K",
    timeline: "7 месяцев",
    team: "15 человек",
    status: "Готов к запуску",
    company: "VirtualEvent Platform",
    technologies: ["React", "WebRTC", "Node.js", "PostgreSQL", "AWS"],
    features: [
      "Виртуальные залы",
      "Нетворкинг-зоны",
      "Выставочные стенды",
      "Интерактивные сессии",
      "Аналитика мероприятий"
    ],
    milestones: [
      { title: "Разработка платформы", status: "completed", date: "Q4 2023" },
      { title: "Тестирование", status: "completed", date: "Q1 2024" },
      { title: "Первые мероприятия", status: "in-progress", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "340-520%",
      marketSize: "$10B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 16,
    title: "Агротех стартап",
    description: "Умные решения для сельского хозяйства",
    fullDescription: "Инновационная платформа для умного земледелия, использующая IoT-сенсоры, дроны и AI для оптимизации урожайности. Мониторинг состояния почвы, прогнозирование погоды, автоматизация полива и удобрений.",
    category: "AgriTech",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=400&fit=crop",
    budget: "$800K - $1.3M",
    timeline: "10 месяцев",
    team: "19 человек",
    status: "Привлечение инвестиций",
    company: "AgriSmart Solutions",
    technologies: ["Python", "IoT", "Drones", "Machine Learning", "React"],
    features: [
      "IoT-мониторинг полей",
      "Дроны для анализа урожая",
      "AI-прогнозирование",
      "Автоматизация полива",
      "Управление удобрениями"
    ],
    milestones: [
      { title: "Исследование и разработка", status: "completed", date: "Q2 2023" },
      { title: "Создание прототипа", status: "completed", date: "Q4 2023" },
      { title: "Полевые испытания", status: "in-progress", date: "Q1 2024" },
      { title: "Коммерциализация", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "420-680%",
      marketSize: "$35B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 17,
    title: "Платформа для онлайн-образования детей",
    description: "Интерактивные курсы для детей 6-16 лет",
    fullDescription: "Образовательная платформа, делающая обучение увлекательным приключением. Геймификация, интерактивные уроки, персональные траектории обучения. Поддержка родителей в отслеживании прогресса и выборе курсов.",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    budget: "$450K - $750K",
    timeline: "8 месяцев",
    team: "14 человек",
    status: "В разработке",
    company: "KidsLearn Platform",
    technologies: ["React", "Node.js", "MongoDB", "WebGL", "Python"],
    features: [
      "Геймификация обучения",
      "Интерактивные уроки",
      "Персональные траектории",
      "Родительский контроль",
      "Сертификаты достижений"
    ],
    milestones: [
      { title: "Разработка контента", status: "completed", date: "Q3 2023" },
      { title: "Создание платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотное тестирование", status: "planned", date: "Q2 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "300-470%",
      marketSize: "$16B",
      riskLevel: "Средний"
    }
  },
  {
    id: 18,
    title: "Персональный AI-тренер по фитнесу",
    description: "Умное приложение для здорового образа жизни",
    fullDescription: "Революционное фитнес-приложение с AI-тренером, который создает персональные программы тренировок и питания. Анализ прогресса, мотивация, интеграция с носимыми устройствами.",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop",
    budget: "$380K - $620K",
    timeline: "6 месяцев",
    team: "11 человек",
    status: "Готов к запуску",
    company: "FitAI",
    technologies: ["React Native", "TensorFlow", "Node.js", "MongoDB"],
    features: [
      "AI-персонализация тренировок",
      "Планы питания",
      "Трекинг прогресса",
      "Интеграция с носимыми",
      "Социальные челленджи"
    ],
    milestones: [
      { title: "MVP разработка", status: "completed", date: "Q4 2023" },
      { title: "Бета-тестирование", status: "completed", date: "Q1 2024" },
      { title: "Запуск в сторах", status: "in-progress", date: "Q2 2024" },
      { title: "Маркетинговая кампания", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "270-400%",
      marketSize: "$7B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 19,
    title: "Платформа для NFT и цифрового искусства",
    description: "Маркетплейс для создания и продажи NFT",
    fullDescription: "Современная платформа для создания, покупки и продажи NFT. Низкие комиссии, поддержка множества блокчейнов, инструменты для художников, галереи и аукционы.",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
    budget: "$600K - $1M",
    timeline: "8 месяцев",
    team: "17 человек",
    status: "Поиск инвестиций",
    company: "ArtChain Marketplace",
    technologies: ["React", "Solidity", "IPFS", "Node.js", "Web3.js"],
    features: [
      "Создание NFT без кода",
      "Мультичейн поддержка",
      "Виртуальные галереи",
      "Аукционы и розыгрыши",
      "Роялти для авторов"
    ],
    milestones: [
      { title: "Техническая разработка", status: "completed", date: "Q3 2023" },
      { title: "Создание смарт-контрактов", status: "in-progress", date: "Q1 2024" },
      { title: "Beta запуск", status: "planned", date: "Q2 2024" },
      { title: "Полный запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "400-650%",
      marketSize: "$20B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 20,
    title: "Система управления запасами с AI",
    description: "Умное управление складом и логистикой",
    fullDescription: "AI-платформа для оптимизации управления запасами и логистикой. Прогнозирование спроса, автоматизация заказов, оптимизация маршрутов доставки, интеграция с ERP-системами.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=400&fit=crop",
    budget: "$500K - $850K",
    timeline: "9 месяцев",
    team: "15 человек",
    status: "В разработке",
    company: "SmartStock AI",
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Docker"],
    features: [
      "AI-прогнозирование спроса",
      "Автоматизация заказов",
      "Оптимизация логистики",
      "Интеграция с ERP",
      "Аналитика и отчеты"
    ],
    milestones: [
      { title: "Исследование алгоритмов", status: "completed", date: "Q3 2023" },
      { title: "Разработка ядра", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотное внедрение", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "330-510%",
      marketSize: "$13B",
      riskLevel: "Средний"
    }
  },
  {
    id: 21,
    title: "Платформа для подписок на контент",
    description: "Монетизация для создателей контента",
    fullDescription: "Современная платформа для создателей контента, желающих монетизировать свою аудиторию через подписки. Инструменты для эксклюзивного контента, прямых эфиров, членских зон и аналитики.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    budget: "$420K - $700K",
    timeline: "7 месяцев",
    team: "12 человек",
    status: "Привлечение инвестиций",
    company: "CreatorHub",
    technologies: ["React", "Node.js", "Stripe", "AWS", "PostgreSQL"],
    features: [
      "Многоуровневые подписки",
      "Эксклюзивный контент",
      "Прямые трансляции",
      "Членские зоны",
      "Аналитика аудитории"
    ],
    milestones: [
      { title: "Анализ рынка", status: "completed", date: "Q2 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q4 2023" },
      { title: "Запуск бета-версии", status: "planned", date: "Q1 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "310-480%",
      marketSize: "$12B",
      riskLevel: "Средний"
    }
  },
  {
    id: 22,
    title: "Платформа для аренды транспорта",
    description: "P2P каршеринг и аренда транспорта",
    fullDescription: "Инновационная платформа для аренды транспорта между частными лицами. Страхование, верификация пользователей, GPS-трекинг, удобная оплата. Поддержка различных видов транспорта от автомобилей до электросамокатов.",
    category: "Marketplace",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=400&fit=crop",
    budget: "$550K - $950K",
    timeline: "9 месяцев",
    team: "16 человек",
    status: "В разработке",
    company: "ShareRide",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Maps API"],
    features: [
      "P2P аренда транспорта",
      "Встроенное страхование",
      "GPS-трекинг",
      "Верификация пользователей",
      "Мгновенное бронирование"
    ],
    milestones: [
      { title: "Юридическое оформление", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотный запуск", status: "planned", date: "Q2 2024" },
      { title: "Расширение географии", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "360-550%",
      marketSize: "$19B",
      riskLevel: "Средний"
    }
  },
  {
    id: 23,
    title: "AI-платформа для рекрутинга",
    description: "Умный подбор персонала на основе AI",
    fullDescription: "Революционная платформа для подбора персонала, использующая AI для анализа резюме, оценки кандидатов и прогнозирования успешности. Автоматизация скрининга, видеособеседования с AI, культурный фит-анализ.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
    budget: "$480K - $800K",
    timeline: "8 месяцев",
    team: "14 человек",
    status: "Поиск инвестиций",
    company: "TalentAI",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
    features: [
      "AI-скрининг резюме",
      "Автоматические собеседования",
      "Культурный фит-анализ",
      "Прогнозирование успеха",
      "ATS интеграции"
    ],
    milestones: [
      { title: "Обучение моделей", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Beta тестирование", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "340-520%",
      marketSize: "$15B",
      riskLevel: "Средний"
    }
  },
  {
    id: 24,
    title: "Платформа для онлайн-терапии",
    description: "Доступная психологическая помощь онлайн",
    fullDescription: "Платформа, делающая психологическую помощь доступной и удобной. Подбор терапевта по критериям, видео и чат-сессии, безопасное хранение данных, интеграция с медицинскими системами.",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=800&h=400&fit=crop",
    budget: "$400K - $680K",
    timeline: "7 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "MindCare Online",
    technologies: ["React", "WebRTC", "Node.js", "PostgreSQL", "HIPAA"],
    features: [
      "Подбор терапевта",
      "Видео и чат-сессии",
      "Безопасность данных",
      "Дневник эмоций",
      "Экстренная поддержка"
    ],
    milestones: [
      { title: "Получение лицензий", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Набор специалистов", status: "in-progress", date: "Q1 2024" },
      { title: "Мягкий запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "290-450%",
      marketSize: "$9B",
      riskLevel: "Средний"
    }
  },
  {
    id: 25,
    title: "Платформа для B2B продаж",
    description: "CRM и автоматизация B2B-процессов",
    fullDescription: "Комплексная платформа для B2B продаж, объединяющая CRM, автоматизацию маркетинга, аналитику и управление сделками. AI-скоринг лидов, предсказательная аналитика, интеграции с популярными инструментами.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    budget: "$520K - $880K",
    timeline: "9 месяцев",
    team: "16 человек",
    status: "Готов к запуску",
    company: "SalesForce Pro",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AI/ML"],
    features: [
      "CRM для B2B",
      "Автоматизация маркетинга",
      "AI-скоринг лидов",
      "Предиктивная аналитика",
      "Интеграции"
    ],
    milestones: [
      { title: "Разработка ядра", status: "completed", date: "Q4 2023" },
      { title: "Бета-тестирование", status: "completed", date: "Q1 2024" },
      { title: "Запуск продукта", status: "in-progress", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "380-570%",
      marketSize: "$17B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 26,
    title: "Платформа для создания мобильных приложений",
    description: "No-code конструктор мобильных приложений",
    fullDescription: "Революционный no-code конструктор для создания мобильных приложений без программирования. Визуальный редактор, готовые компоненты, интеграции с API, публикация в сторы.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    budget: "$600K - $1M",
    timeline: "10 месяцев",
    team: "18 человек",
    status: "Привлечение инвестиций",
    company: "AppBuilder",
    technologies: ["React", "React Native", "Node.js", "MongoDB", "Docker"],
    features: [
      "Визуальный редактор",
      "Готовые компоненты",
      "API интеграции",
      "Публикация в сторы",
      "Backend без кода"
    ],
    milestones: [
      { title: "Прототип редактора", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Beta версия", status: "planned", date: "Q2 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "420-640%",
      marketSize: "$21B",
      riskLevel: "Средний"
    }
  },
  {
    id: 27,
    title: "Платформа для доставки еды на заказ",
    description: "Маркетплейс доставки готовых блюд",
    fullDescription: "Инновационный сервис доставки еды с фокусом на качество и скорость. AI-оптимизация маршрутов, прогнозирование спроса, партнерская программа для ресторанов, программа лояльности.",
    category: "FoodTech",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=400&fit=crop",
    budget: "$450K - $750K",
    timeline: "7 месяцев",
    team: "14 человек",
    status: "В разработке",
    company: "FoodExpress",
    technologies: ["React Native", "Node.js", "PostgreSQL", "Maps API"],
    features: [
      "Быстрая доставка",
      "Программа лояльности",
      "Подписки на питание",
      "Трекинг заказов",
      "Рейтинги и отзывы"
    ],
    milestones: [
      { title: "Набор партнеров", status: "completed", date: "Q3 2023" },
      { title: "Разработка приложения", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск в городе", status: "planned", date: "Q2 2024" },
      { title: "Расширение географии", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "310-480%",
      marketSize: "$8B",
      riskLevel: "Средний"
    }
  },
  {
    id: 28,
    title: "Платформа для онлайн-курсов",
    description: "Создание и продажа онлайн-курсов",
    fullDescription: "Полноценная LMS-платформа для создания, хостинга и продажи онлайн-курсов. Конструктор курсов, видеохостинг, тесты и задания, сертификаты, маркетинговые инструменты.",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop",
    budget: "$380K - $640K",
    timeline: "8 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "LearnPlatform",
    technologies: ["React", "Node.js", "PostgreSQL", "Video CDN", "Stripe"],
    features: [
      "Конструктор курсов",
      "Видеохостинг",
      "Тесты и задания",
      "Сертификаты",
      "Аналитика обучения"
    ],
    milestones: [
      { title: "Разработка LMS", status: "completed", date: "Q3 2023" },
      { title: "Интеграция платежей", status: "completed", date: "Q4 2023" },
      { title: "Beta тестирование", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "300-460%",
      marketSize: "$11B",
      riskLevel: "Средний"
    }
  },
  {
    id: 29,
    title: "Платформа для инвестиций в стартапы",
    description: "Краудинвестинг и альтернативные инвестиции",
    fullDescription: "Платформа для краудинвестинга в стартапы и малый бизнес. Due diligence, защита инвесторов, прозрачность сделок, вторичный рынок для ликвидности.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&h=400&fit=crop",
    budget: "$700K - $1.2M",
    timeline: "10 месяцев",
    team: "19 человек",
    status: "Привлечение инвестиций",
    company: "StartupInvest Platform",
    technologies: ["React", "Node.js", "Blockchain", "PostgreSQL"],
    features: [
      "Краудинвестинг",
      "Due diligence",
      "Вторичный рынок",
      "Портфельная аналитика",
      "Защита инвесторов"
    ],
    milestones: [
      { title: "Получение лицензий", status: "in-progress", date: "Q1 2024" },
      { title: "Разработка платформы", status: "in-progress", date: "Q2 2024" },
      { title: "Набор стартапов", status: "planned", date: "Q2 2024" },
      { title: "Первые сделки", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "450-700%",
      marketSize: "$26B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 30,
    title: "Платформа для умного дома",
    description: "Единая экосистема для управления умным домом",
    fullDescription: "Универсальная платформа для управления устройствами умного дома разных производителей. Сценарии автоматизации, голосовое управление, энергомониторинг, безопасность.",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop",
    budget: "$500K - $850K",
    timeline: "9 месяцев",
    team: "15 человек",
    status: "В разработке",
    company: "HomeHub",
    technologies: ["Python", "IoT", "React", "MQTT", "Cloud"],
    features: [
      "Мультибренд поддержка",
      "Автоматизация сценариев",
      "Голосовое управление",
      "Энергомониторинг",
      "Безопасность дома"
    ],
    milestones: [
      { title: "Прототип хаба", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Партнерства", status: "in-progress", date: "Q1 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "360-550%",
      marketSize: "$18B",
      riskLevel: "Средний"
    }
  },
  {
    id: 31,
    title: "Платформа для управления репутацией",
    description: "Мониторинг и управление онлайн-репутацией",
    fullDescription: "Комплексная платформа для мониторинга и управления онлайн-репутацией брендов. Отслеживание упоминаний, sentiment анализ, управление отзывами, crisis management.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    budget: "$420K - $700K",
    timeline: "7 месяцев",
    team: "13 человек",
    status: "Готов к запуску",
    company: "ReputationGuard",
    technologies: ["Python", "NLP", "React", "Node.js", "Elasticsearch"],
    features: [
      "Мониторинг упоминаний",
      "Sentiment анализ",
      "Управление отзывами",
      "Crisis management",
      "Конкурентный анализ"
    ],
    milestones: [
      { title: "Разработка алгоритмов", status: "completed", date: "Q4 2023" },
      { title: "Создание платформы", status: "completed", date: "Q1 2024" },
      { title: "Beta тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "320-490%",
      marketSize: "$10B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 32,
    title: "Платформа для аренды офисов",
    description: "Гибкие офисные пространства и коворкинги",
    fullDescription: "Платформа для поиска и аренды гибких офисных пространств. Онлайн-бронирование, виртуальные туры, управление доступом, дополнительные сервисы.",
    category: "PropTech",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop",
    budget: "$480K - $800K",
    timeline: "8 месяцев",
    team: "14 человек",
    status: "Поиск инвестиций",
    company: "FlexSpace",
    technologies: ["React", "Node.js", "PostgreSQL", "VR", "IoT"],
    features: [
      "Онлайн-бронирование",
      "Виртуальные туры",
      "Умный доступ",
      "Дополнительные сервисы",
      "Управление членством"
    ],
    milestones: [
      { title: "Исследование рынка", status: "completed", date: "Q2 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q4 2023" },
      { title: "Партнерства с площадками", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск в городе", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "340-520%",
      marketSize: "$14B",
      riskLevel: "Средний"
    }
  },
  {
    id: 33,
    title: "AI-платформа для генерации контента",
    description: "Автоматическое создание текстов и медиа",
    fullDescription: "Платформа на базе AI для автоматической генерации контента: тексты, изображения, видео. Множество шаблонов, стилевые настройки, интеграции с CMS.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
    budget: "$550K - $950K",
    timeline: "9 месяцев",
    team: "16 человек",
    status: "В разработке",
    company: "ContentAI Studio",
    technologies: ["Python", "GPT-4", "Stable Diffusion", "React", "FastAPI"],
    features: [
      "Генерация текстов",
      "Создание изображений",
      "Видео контент",
      "Шаблоны и стили",
      "CMS интеграции"
    ],
    milestones: [
      { title: "Обучение моделей", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Alpha тестирование", status: "planned", date: "Q2 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "410-630%",
      marketSize: "$23B",
      riskLevel: "Средний"
    }
  },
  {
    id: 34,
    title: "Платформа для онлайн-консультаций",
    description: "Видеоконсультации с экспертами в разных областях",
    fullDescription: "Платформа, соединяющая пользователей с экспертами для видеоконсультаций. Юристы, врачи, психологи, бизнес-консультанты. Расписание, оплата, записи сессий.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=400&fit=crop",
    budget: "$400K - $680K",
    timeline: "7 месяцев",
    team: "12 человек",
    status: "Привлечение инвестиций",
    company: "ExpertConnect",
    technologies: ["React", "WebRTC", "Node.js", "PostgreSQL", "Stripe"],
    features: [
      "Видеоконсультации",
      "Расписание и бронирование",
      "Безопасные платежи",
      "Записи сессий",
      "Рейтинги экспертов"
    ],
    milestones: [
      { title: "Разработка платформы", status: "completed", date: "Q4 2023" },
      { title: "Набор экспертов", status: "in-progress", date: "Q1 2024" },
      { title: "Beta запуск", status: "planned", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "300-470%",
      marketSize: "$12B",
      riskLevel: "Средний"
    }
  },
  {
    id: 35,
    title: "Платформа для управления подрядчиками",
    description: "Управление внешними исполнителями и фрилансерами",
    fullDescription: "B2B платформа для управления пулом подрядчиков и фрилансеров. Поиск специалистов, контракты, тайм-трекинг, оплата, отчетность.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
    budget: "$460K - $780K",
    timeline: "8 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "ContractorHub",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe Connect"],
    features: [
      "База подрядчиков",
      "Управление контрактами",
      "Тайм-трекинг",
      "Автоматизация оплат",
      "Отчетность и аналитика"
    ],
    milestones: [
      { title: "Анализ требований", status: "completed", date: "Q3 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотное внедрение", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "330-510%",
      marketSize: "$13B",
      riskLevel: "Средний"
    }
  },
  {
    id: 36,
    title: "Платформа для peer-to-peer кредитования",
    description: "P2P кредитование и микрофинансирование",
    fullDescription: "Финтех-платформа для прямого кредитования между частными лицами. Скоринг заемщиков, диверсификация рисков, автоматизированное взыскание, вторичный рынок долгов.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    budget: "$650K - $1.1M",
    timeline: "10 месяцев",
    team: "17 человек",
    status: "Поиск инвестиций",
    company: "P2PLend",
    technologies: ["React", "Node.js", "PostgreSQL", "ML", "Blockchain"],
    features: [
      "P2P кредитование",
      "AI-скоринг",
      "Диверсификация рисков",
      "Вторичный рынок",
      "Автоматизированное взыскание"
    ],
    milestones: [
      { title: "Получение лицензий", status: "in-progress", date: "Q1 2024" },
      { title: "Разработка платформы", status: "in-progress", date: "Q2 2024" },
      { title: "Пилотный запуск", status: "planned", date: "Q3 2024" },
      { title: "Масштабирование", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "420-680%",
      marketSize: "$27B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 37,
    title: "Платформа для онлайн-тестирования",
    description: "Создание и проведение онлайн-экзаменов",
    fullDescription: "Платформа для создания, проведения и автоматической проверки онлайн-тестов. Антиплагиат, прокторинг, разные типы вопросов, детальная аналитика.",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    budget: "$380K - $640K",
    timeline: "7 месяцев",
    team: "11 человек",
    status: "Готов к запуску",
    company: "TestPlatform",
    technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "AI"],
    features: [
      "Конструктор тестов",
      "Онлайн-прокторинг",
      "Антиплагиат",
      "Автопроверка",
      "Аналитика результатов"
    ],
    milestones: [
      { title: "Разработка платформы", status: "completed", date: "Q4 2023" },
      { title: "Интеграция прокторинга", status: "completed", date: "Q1 2024" },
      { title: "Тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "280-430%",
      marketSize: "$8B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 38,
    title: "Платформа для управления событиями",
    description: "Комплексное решение для event-менеджмента",
    fullDescription: "Полнофункциональная платформа для организации и управления событиями. Регистрация участников, продажа билетов, check-in, нетворкинг, аналитика.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    budget: "$440K - $740K",
    timeline: "8 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "EventManager Pro",
    technologies: ["React", "Node.js", "PostgreSQL", "QR Codes", "Stripe"],
    features: [
      "Регистрация участников",
      "Продажа билетов",
      "Мобильный check-in",
      "Нетворкинг",
      "Аналитика мероприятий"
    ],
    milestones: [
      { title: "Разработка ядра", status: "completed", date: "Q3 2023" },
      { title: "Мобильное приложение", status: "in-progress", date: "Q1 2024" },
      { title: "Beta тестирование", status: "planned", date: "Q2 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "310-480%",
      marketSize: "$11B",
      riskLevel: "Средний"
    }
  },
  {
    id: 39,
    title: "AI-платформа для обслуживания клиентов",
    description: "Умные чат-боты и автоматизация поддержки",
    fullDescription: "AI-платформа для автоматизации клиентской поддержки. Умные чат-боты, анализ обращений, автоматизация ответов, интеграция с CRM и helpdesk системами.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop",
    budget: "$490K - $820K",
    timeline: "9 месяцев",
    team: "15 человек",
    status: "Привлечение инвестиций",
    company: "SupportAI",
    technologies: ["Python", "GPT-4", "React", "Node.js", "NLP"],
    features: [
      "Умные чат-боты",
      "Анализ обращений",
      "Автоответы",
      "Мультиканальность",
      "Интеграции"
    ],
    milestones: [
      { title: "Обучение моделей", status: "completed", date: "Q3 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотное внедрение", status: "planned", date: "Q2 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "360-550%",
      marketSize: "$16B",
      riskLevel: "Средний"
    }
  },
  {
    id: 40,
    title: "Платформа для цифрового маркетинга",
    description: "All-in-one решение для digital-маркетинга",
    fullDescription: "Комплексная платформа для управления digital-маркетингом. Email-рассылки, SMM, автоматизация, аналитика, A/B тесты, интеграции с рекламными платформами.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    budget: "$500K - $850K",
    timeline: "9 месяцев",
    team: "16 человек",
    status: "В разработке",
    company: "MarketingHub",
    technologies: ["React", "Node.js", "PostgreSQL", "Redis", "AI/ML"],
    features: [
      "Email-маркетинг",
      "SMM автоматизация",
      "Маркетинг-воронки",
      "A/B тестирование",
      "Омниканальная аналитика"
    ],
    milestones: [
      { title: "Разработка ядра", status: "completed", date: "Q4 2023" },
      { title: "Интеграции", status: "in-progress", date: "Q1 2024" },
      { title: "Beta тестирование", status: "planned", date: "Q2 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "380-570%",
      marketSize: "$19B",
      riskLevel: "Средний"
    }
  },
  {
    id: 41,
    title: "Платформа для аренды оборудования",
    description: "Маркетплейс аренды промышленного оборудования",
    fullDescription: "P2P и B2B платформа для аренды промышленного и строительного оборудования. Онлайн-каталог, бронирование, страхование, логистика, контроль состояния.",
    category: "Marketplace",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=400&fit=crop",
    budget: "$540K - $900K",
    timeline: "9 месяцев",
    team: "15 человек",
    status: "Поиск инвестиций",
    company: "EquipmentShare",
    technologies: ["React", "Node.js", "PostgreSQL", "IoT", "Maps API"],
    features: [
      "Каталог оборудования",
      "Онлайн-бронирование",
      "Страхование сделок",
      "Логистика",
      "IoT-мониторинг"
    ],
    milestones: [
      { title: "Анализ рынка", status: "completed", date: "Q2 2023" },
      { title: "Разработка платформы", status: "in-progress", date: "Q4 2023" },
      { title: "Набор партнеров", status: "in-progress", date: "Q1 2024" },
      { title: "Пилотный запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "350-540%",
      marketSize: "$17B",
      riskLevel: "Средний"
    }
  },
  {
    id: 42,
    title: "AI-платформа для анализа данных",
    description: "Автоматический анализ больших данных",
    fullDescription: "AI-платформа для автоматического анализа больших данных без навыков программирования. Визуализация, прогнозирование, паттерны, рекомендации.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    budget: "$580K - $980K",
    timeline: "10 месяцев",
    team: "17 человек",
    status: "В разработке",
    company: "DataAI Analytics",
    technologies: ["Python", "TensorFlow", "React", "D3.js", "Spark"],
    features: [
      "Автоанализ данных",
      "Интерактивная визуализация",
      "Прогнозирование",
      "Поиск паттернов",
      "Natural language queries"
    ],
    milestones: [
      { title: "Разработка алгоритмов", status: "completed", date: "Q3 2023" },
      { title: "Создание платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Alpha тестирование", status: "planned", date: "Q2 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "440-670%",
      marketSize: "$24B",
      riskLevel: "Средний"
    }
  },
  {
    id: 43,
    title: "Платформа для видеомаркетинга",
    description: "Создание и распространение видеоконтента",
    fullDescription: "Комплексная платформа для создания, редактирования и распространения видеомаркетингового контента. AI-редактирование, шаблоны, многоканальная публикация, аналитика.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=400&fit=crop",
    budget: "$460K - $780K",
    timeline: "8 месяцев",
    team: "14 человек",
    status: "Готов к запуску",
    company: "VideoMarketing Pro",
    technologies: ["React", "FFmpeg", "Node.js", "AWS", "AI/ML"],
    features: [
      "AI-редактор видео",
      "Библиотека шаблонов",
      "Многоканальная публикация",
      "Аналитика просмотров",
      "Совместная работа"
    ],
    milestones: [
      { title: "Разработка редактора", status: "completed", date: "Q4 2023" },
      { title: "Интеграции", status: "completed", date: "Q1 2024" },
      { title: "Beta тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "320-490%",
      marketSize: "$12B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 44,
    title: "Платформа для управления подписками",
    description: "Автоматизация subscription-бизнеса",
    fullDescription: "Платформа для управления подписочным бизнесом. Биллинг, управление планами, аналитика churn, автоматизация, интеграции с платежными системами.",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=400&fit=crop",
    budget: "$420K - $700K",
    timeline: "7 месяцев",
    team: "12 человек",
    status: "Привлечение инвестиций",
    company: "SubsManager",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Webhooks"],
    features: [
      "Гибкий биллинг",
      "Управление планами",
      "Аналитика MRR/Churn",
      "Автоматизация",
      "Dunning management"
    ],
    milestones: [
      { title: "Разработка ядра", status: "completed", date: "Q3 2023" },
      { title: "Интеграции платежей", status: "completed", date: "Q4 2023" },
      { title: "Beta тестирование", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "340-520%",
      marketSize: "$14B",
      riskLevel: "Средний"
    }
  },
  {
    id: 45,
    title: "Платформа для онлайн-перевода",
    description: "Профессиональные переводческие услуги онлайн",
    fullDescription: "Маркетплейс для поиска профессиональных переводчиков. AI-ассистирование, CAT-tools, управление проектами, гарантия качества.",
    category: "Marketplace",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    budget: "$400K - $680K",
    timeline: "8 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "TranslationHub",
    technologies: ["React", "Node.js", "PostgreSQL", "NLP", "CAT Tools"],
    features: [
      "Поиск переводчиков",
      "AI-ассистирование",
      "CAT-tools интеграция",
      "Управление проектами",
      "Контроль качества"
    ],
    milestones: [
      { title: "Разработка платформы", status: "completed", date: "Q3 2023" },
      { title: "Набор переводчиков", status: "in-progress", date: "Q1 2024" },
      { title: "Beta запуск", status: "planned", date: "Q2 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "290-450%",
      marketSize: "$9B",
      riskLevel: "Средний"
    }
  },
  {
    id: 46,
    title: "Платформа для управления франшизой",
    description: "Комплексное управление франшизной сетью",
    fullDescription: "Платформа для управления франшизной сетью. Онбординг партнеров, обучение, контроль качества, отчетность, коммуникации.",
    category: "SaaS",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    budget: "$480K - $800K",
    timeline: "9 месяцев",
    team: "14 человек",
    status: "Поиск инвестиций",
    company: "FranchiseManager",
    technologies: ["React", "Node.js", "PostgreSQL", "LMS", "BI Tools"],
    features: [
      "Управление партнерами",
      "Обучающая платформа",
      "Контроль качества",
      "Финансовая отчетность",
      "Централизованные закупки"
    ],
    milestones: [
      { title: "Анализ требований", status: "completed", date: "Q2 2023" },
      { title: "Разработка MVP", status: "in-progress", date: "Q4 2023" },
      { title: "Пилотное внедрение", status: "planned", date: "Q1 2024" },
      { title: "Коммерческий запуск", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "350-530%",
      marketSize: "$15B",
      riskLevel: "Средний"
    }
  },
  {
    id: 47,
    title: "Платформа для социального импакта",
    description: "Отслеживание и управление ESG-метриками",
    fullDescription: "Платформа для отслеживания и управления социальным и экологическим воздействием бизнеса. ESG-метрики, отчетность, сертификация, цели устойчивого развития.",
    category: "GreenTech",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    budget: "$440K - $740K",
    timeline: "8 месяцев",
    team: "13 человек",
    status: "В разработке",
    company: "ImpactMetrics",
    technologies: ["React", "Node.js", "PostgreSQL", "Data Analytics", "BI"],
    features: [
      "ESG-метрики",
      "Отчетность по стандартам",
      "Цели устойчивого развития",
      "Бенчмаркинг",
      "Сертификация"
    ],
    milestones: [
      { title: "Разработка методологии", status: "completed", date: "Q3 2023" },
      { title: "Создание платформы", status: "in-progress", date: "Q1 2024" },
      { title: "Партнерства с сертификаторами", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск платформы", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "320-490%",
      marketSize: "$13B",
      riskLevel: "Средний"
    }
  },
  {
    id: 48,
    title: "Платформа для умного города",
    description: "IoT-решения для городской инфраструктуры",
    fullDescription: "Комплексная платформа для управления городской инфраструктурой. Умное освещение, мониторинг трафика, управление отходами, экология.",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=400&fit=crop",
    budget: "$1M - $1.8M",
    timeline: "12 месяцев",
    team: "22 человек",
    status: "Привлечение инвестиций",
    company: "SmartCity Solutions",
    technologies: ["Python", "IoT", "React", "PostgreSQL", "ML"],
    features: [
      "Умное освещение",
      "Мониторинг трафика",
      "Управление отходами",
      "Экомониторинг",
      "Единая панель управления"
    ],
    milestones: [
      { title: "Исследование и разработка", status: "completed", date: "Q2 2023" },
      { title: "Пилотный проект", status: "in-progress", date: "Q1 2024" },
      { title: "Масштабирование", status: "planned", date: "Q3 2024" },
      { title: "Коммерциализация", status: "planned", date: "Q4 2024" }
    ],
    metrics: {
      expectedROI: "500-800%",
      marketSize: "$42B",
      riskLevel: "Высокий"
    }
  },
  {
    id: 49,
    title: "Платформа для онлайн-юридических услуг",
    description: "Автоматизация юридических процессов",
    fullDescription: "Платформа для автоматизации юридических услуг. Генерация документов, онлайн-консультации с юристами, отслеживание дел, база знаний.",
    category: "LegalTech",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    budget: "$420K - $700K",
    timeline: "8 месяцев",
    team: "12 человек",
    status: "Готов к запуску",
    company: "LegalAssist",
    technologies: ["React", "Node.js", "PostgreSQL", "AI/ML", "WebRTC"],
    features: [
      "Генератор документов",
      "Онлайн-консультации",
      "Отслеживание дел",
      "База знаний",
      "Автоматизация процессов"
    ],
    milestones: [
      { title: "Разработка платформы", status: "completed", date: "Q4 2023" },
      { title: "Набор юристов", status: "completed", date: "Q1 2024" },
      { title: "Beta тестирование", status: "in-progress", date: "Q2 2024" },
      { title: "Публичный запуск", status: "planned", date: "Q2 2024" }
    ],
    metrics: {
      expectedROI: "310-480%",
      marketSize: "$11B",
      riskLevel: "Низкий"
    }
  },
  {
    id: 50,
    title: "Платформа для бронирования парковок",
    description: "Умное управление парковочными местами",
    fullDescription: "Платформа для поиска и бронирования парковочных мест. Онлайн-оплата, навигация, IoT-датчики занятости, абонементы.",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&h=400&fit=crop",
    budget: "$380K - $640K",
    timeline: "7 месяцев",
    team: "11 человек",
    status: "В разработке",
    company: "ParkingSmart",
    technologies: ["React Native", "Node.js", "PostgreSQL", "IoT", "Maps"],
    features: [
      "Поиск парковок",
      "Онлайн-бронирование",
      "Навигация к месту",
      "IoT-мониторинг",
      "Абонементы"
    ],
    milestones: [
      { title: "Разработка приложения", status: "completed", date: "Q3 2023" },
      { title: "Партнерства с парковками", status: "in-progress", date: "Q1 2024" },
      { title: "Запуск в городе", status: "planned", date: "Q2 2024" },
      { title: "Расширение географии", status: "planned", date: "Q3 2024" }
    ],
    metrics: {
      expectedROI: "280-430%",
      marketSize: "$7B",
      riskLevel: "Средний"
    }
  }
];

// Resolve project images to bundled asset URLs and ensure local fallbacks
const projectImages = import.meta.glob('@/assets/projects/*', { eager: true, as: 'url' }) as Record<string, string>;

function resolveProjectImage(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path; // external URL stays as-is (will be overridden by fallback below)
  let key = path;
  // Normalize different notations to '/src/assets/projects/...'
  if (key.startsWith('@/assets/')) key = key.replace('@', '/src');
  if (key.startsWith('src/')) key = `/${key}`;
  if (!key.startsWith('/src/assets/projects/')) {
    const filename = key.split('/').pop() ?? key;
    key = `/src/assets/projects/${filename}`;
  }
  return projectImages[key] ?? path;
}

// Fallbacks for categories to guarantee local images everywhere
const categoryFallback: Record<string, string> = {
  'AI/ML': 'ai-code-assistant.jpg',
  'Blockchain': 'supply-chain-blockchain.jpg',
  'FinTech': 'fintech-mobile-app.jpg',
  'HealthTech': 'healthtech-platform.jpg',
  'EdTech': 'edtech-platform.jpg',
  'GreenTech': 'greentech-energy.jpg',
  'FoodTech': 'foodtech-automation.jpg',
  'PropTech': 'proptech-solution.jpg',
  'IoT': 'iot-smart-home.jpg',
  'SaaS': 'saas-project-management.jpg',
  'Marketplace': 'freelance-marketplace.jpg',
  'AgriTech': 'agritech-farming.jpg',
  'Gaming': 'gaming-esports.jpg',
  'Security': 'cybersecurity-platform.jpg',
  'LegalTech': 'legal-tech.jpg',
  'Music': 'music-streaming.jpg',
  'FashionTech': 'fashion-tech-ar.jpg',
  'Travel': 'travel-ai-assistant.jpg',
  'Energy': 'renewable-energy-trading.jpg',
  'Pets': 'pet-care-platform.jpg',
  'Mentorship': 'career-mentorship.jpg',
  'VR/AR': 'vr-medical-training.jpg',
  'Social': 'social-commerce.jpg',
  'Insurance': 'insurance-tech.jpg',
  'Language': 'language-learning-ai.jpg',
  'Logistics': 'blockchain-logistics.jpg',
  'Delivery': 'autonomous-delivery.jpg',
  'Wellness': 'wellness-meditation.jpg',
  'Recruitment': 'recruitment-ai.jpg',
  'Local': 'local-business-marketplace.jpg',
  '3D Printing': '3d-printing-service.jpg',
  'ElderlyCare': 'elderly-care-tech.jpg',
  'Translation': 'realtime-translation.jpg',
  'Parking': 'smart-parking.jpg',
  'Creators': 'creator-monetization.jpg',
  'Waste': 'waste-management.jpg',
};

// Enforce local images for all projects
allProjects.forEach((p) => {
  const isExternal = /^https?:\/\//.test(p.image);
  if (isExternal) {
    const fallback = categoryFallback[p.category] || 'saas-project-management.jpg';
    p.image = resolveProjectImage(`/src/assets/projects/${fallback}`);
  } else {
    p.image = resolveProjectImage(p.image);
  }
});

// Helper function to get project by ID
export const getProjectById = (id: number): Project | undefined => {
  return allProjects.find(project => project.id === id);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'Все') return allProjects;
  return allProjects.filter(project => project.category === category);
};