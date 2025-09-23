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
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800&h=400&fit=crop",
    budget: "$500K - $1M",
    timeline: "6 месяцев",
    team: "15 человек",
    status: "В разработке",
    company: "TechVision AI",
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
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
    budget: "$800K - $1.2M",
    timeline: "8 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "LogiChain Solutions",
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
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
    budget: "$300K - $600K",
    timeline: "4 месяца",
    team: "8 человек",
    status: "Готов к запуску",
    company: "FinFlow Inc",
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
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
    budget: "$600K - $900K",
    timeline: "10 месяцев",
    team: "18 человек",
    status: "В разработке",
    company: "HealthTech Solutions",
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
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop",
    budget: "$400K - $700K",
    timeline: "7 месяцев",
    team: "12 человек",
    status: "Поиск инвестиций",
    company: "EduTech Innovations",
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
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=400&fit=crop",
    budget: "$1M - $2M",
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
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
    budget: "$500K - $800K",
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
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    budget: "$700K - $1.1M",
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
  }
];

// Helper function to get project by ID
export const getProjectById = (id: number): Project | undefined => {
  return allProjects.find(project => project.id === id);
};

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "Все") return allProjects;
  return allProjects.filter(project => project.category === category);
};