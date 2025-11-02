import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Download, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Типы для структуры квиза
type Answer = {
  text: string;
  next?: string;
  result?: {
    role: string;
    tariff: string;
  };
};

type Question = {
  id: string;
  question: string;
  stage: string;
  answers: Answer[];
};

// 41 уникальных лид-магнитов для каждого тарифа
const LEAD_MAGNETS: Record<string, Record<string, { title: string; file: string; tariff: string }>> = {
  investor: {
    beginner: {
      title: "Гайд: Первые шаги в венчурных инвестициях",
      file: "venture_investing_guide.pdf",
      tariff: "Новичок"
    },
    professional: {
      title: "Чек-лист: AI Due Diligence для инвесторов",
      file: "ai_due_diligence_checklist.pdf",
      tariff: "Профессионал"
    },
    elite: {
      title: "Эксклюзивный отчёт: Pre-seed Deal Flow 2025",
      file: "preseed_dealflow_2025.pdf",
      tariff: "Элит"
    }
  },
  coinvestor: {
    participant: {
      title: "Руководство: Синдицированные инвестиции",
      file: "syndicate_guide.pdf",
      tariff: "Участник"
    },
    club: {
      title: "Методика: Коллективный Due Diligence",
      file: "collective_dd_methodology.pdf",
      tariff: "Клуб"
    },
    syndicate: {
      title: "Шаблон: Создание инвестиционного синдиката",
      file: "syndicate_template.pdf",
      tariff: "Лид-инвестор"
    }
  },
  founder: {
    startup: {
      title: "Шаблон: Профессиональный Pitch Deck",
      file: "pitch_deck_template.pdf",
      tariff: "Стартап"
    },
    growth: {
      title: "Финансовая модель: 5-летний прогноз",
      file: "financial_model_5y.xlsx",
      tariff: "Рост"
    },
    scale: {
      title: "Стратегия: Масштабирование стартапа",
      file: "scaling_strategy.pdf",
      tariff: "Масштабирование"
    }
  },
  cofounder: {
    seeker: {
      title: "Гайд: Как стать со-основателем",
      file: "cofounder_guide.pdf",
      tariff: "Поиск"
    },
    search: {
      title: "Чек-лист: Оценка потенциала стартапа",
      file: "startup_evaluation_checklist.pdf",
      tariff: "Активный поиск"
    },
    partner: {
      title: "Юридический пакет: Документы для со-основателей",
      file: "cofounder_legal_pack.pdf",
      tariff: "Партнёр"
    }
  },
  copartner: {
    observer: {
      title: "Отчёт: M&A сделки на венчурном рынке",
      file: "ma_market_report.pdf",
      tariff: "Наблюдатель"
    },
    advanced: {
      title: "Профессиональный Due Diligence чек-лист",
      file: "professional_dd_checklist.pdf",
      tariff: "Продвинутый"
    },
    strategic: {
      title: "Стратегия: Слияния и поглощения",
      file: "ma_strategy.pdf",
      tariff: "Стратег"
    }
  },
  franchisee: {
    start: {
      title: "Гайд: Как выбрать прибыльную франшизу",
      file: "franchise_selection_guide.pdf",
      tariff: "Старт"
    },
    professional: {
      title: "Калькулятор: ROI франшизы и окупаемость",
      file: "franchise_roi_calculator.xlsx",
      tariff: "Профи"
    },
    premium: {
      title: "Стратегия: Масштабирование франчайзинговой сети",
      file: "multi_location_strategy.pdf",
      tariff: "Премиум"
    }
  },
  franchiser: {
    basic: {
      title: "Пакет документов: Запуск франшизы",
      file: "franchise_starter_pack.pdf",
      tariff: "Базовый"
    },
    growth: {
      title: "Методика: AI-подбор франчайзи",
      file: "franchisee_selection_ai.pdf",
      tariff: "Рост сети"
    },
    scale: {
      title: "Стратегия: Масштабирование франшизы",
      file: "franchise_scaling.pdf",
      tariff: "Масштабирование"
    }
  },
  freelancer: {
    novice: {
      title: "Руководство: Старт карьеры фрилансера",
      file: "freelancer_startup_guide.pdf",
      tariff: "Новичок"
    },
    professional: {
      title: "Инструменты: Time-tracking и отчётность",
      file: "timetracking_tools.pdf",
      tariff: "Профессионал"
    },
    expert: {
      title: "Стратегия: Equity-компенсация для фрилансеров",
      file: "equity_compensation_guide.pdf",
      tariff: "Эксперт"
    }
  },
  expert: {
    intern: {
      title: "Программа: Сертификация эксперта",
      file: "expert_certification.pdf",
      tariff: "Стажёр"
    },
    consultant: {
      title: "Инструменты: Профессиональная отчётность",
      file: "consultant_reporting_tools.pdf",
      tariff: "Консультант"
    },
    senior: {
      title: "Методика: Участие в инвестиционных комитетах",
      file: "investment_committee_guide.pdf",
      tariff: "Сениор"
    }
  },
  consultant: {
    analyst: {
      title: "Библиотека: Шаблоны бизнес-аналитики",
      file: "business_analytics_templates.pdf",
      tariff: "Аналитик"
    },
    strategist: {
      title: "Инструменты: Бизнес-моделирование",
      file: "business_modeling_tools.pdf",
      tariff: "Стратег"
    },
    clevel: {
      title: "Методика: Корпоративная трансформация",
      file: "corporate_transformation.pdf",
      tariff: "C-level"
    }
  },
  outsourcer: {
    team: {
      title: "CRM: Управление командой аутсорсеров",
      file: "outsource_team_crm.pdf",
      tariff: "Команда"
    },
    agency: {
      title: "White Label: Возможности и стратегии",
      file: "whitelabel_strategies.pdf",
      tariff: "Агентство"
    },
    enterprise: {
      title: "Enterprise контракты: Руководство",
      file: "enterprise_contracts_guide.pdf",
      tariff: "Предприятие"
    }
  },
  contractor: {
    basic: {
      title: "Сертификация: Подрядчик на платформе",
      file: "contractor_certification.pdf",
      tariff: "Базовый"
    },
    certified: {
      title: "Контроль качества: Инструменты подрядчика",
      file: "quality_control_tools.pdf",
      tariff: "Сертифицированный"
    },
    premium: {
      title: "Крупные контракты: Стратегия и управление",
      file: "large_contracts_strategy.pdf",
      tariff: "Премиум"
    }
  },
  projectadmin: {
    admin: {
      title: "AI-советник: Руководство по управлению проектами",
      file: "ai_project_management.pdf",
      tariff: "Администратор"
    }
  },
  employee: {
    employee: {
      title: "Карьерный трек: Развитие в стартапе",
      file: "startup_career_track.pdf",
      tariff: "Сотрудник"
    }
  },
  jobseeker: {
    basic: {
      title: "AI-оптимизация резюме: Практическое руководство",
      file: "resume_optimization.pdf",
      tariff: "Базовый"
    },
    premium: {
      title: "Карьерный roadmap: Построение карьеры в стартапах",
      file: "career_roadmap.pdf",
      tariff: "Премиум"
    },
    pro: {
      title: "Networking: Стратегии для профессионалов",
      file: "networking_strategies.pdf",
      tariff: "Про"
    }
  },
  partner: {
    affiliate: {
      title: "Партнёрская программа: Максимизация дохода",
      file: "affiliate_income_maximization.pdf",
      tariff: "Партнёр"
    }
  },
  ambassador: {
    ambassador: {
      title: "Амбассадор: Стратегия влияния и развития",
      file: "ambassador_strategy.pdf",
      tariff: "Амбассадор"
    }
  },
  blogger: {
    blogger: {
      title: "Монетизация контента: Руководство для блогеров",
      file: "content_monetization.pdf",
      tariff: "Блогер"
    }
  }
};

// Развернутая структура квиза с 7+ вопросами в каждой ветке
const quizTree: Record<string, Question> = {
  start: {
    id: "start",
    stage: "Шаг 1 из 7+",
    question: "Что лучше всего описывает вашу текущую ситуацию?",
    answers: [
      { text: "💰 У меня есть капитал для инвестиций", next: "invest_amount" },
      { text: "🚀 У меня есть идея/проект или я хочу создать бизнес", next: "business_stage" },
      { text: "💼 У меня есть навыки, которые я хочу применить", next: "skills_type" },
      { text: "🤝 Я хочу быть частью экосистемы", next: "ecosystem_role" }
    ]
  },

  // ============ ВЕТКА ИНВЕСТОРОВ ============
  invest_amount: {
    id: "invest_amount",
    stage: "Шаг 2 из 7+",
    question: "Каким капиталом вы располагаете для инвестиций?",
    answers: [
      { text: "До $10,000", next: "invest_small_experience" },
      { text: "$10,000 - $50,000", next: "invest_medium_goals" },
      { text: "$50,000 - $100,000", next: "invest_large_strategy" },
      { text: "Более $100,000", next: "invest_huge_approach" },
      { text: "🏪 Интересует готовый бизнес (франшиза)", next: "franchisee_capital" }
    ]
  },

  invest_small_experience: {
    id: "invest_small_experience",
    stage: "Шаг 3 из 7+",
    question: "Есть ли у вас опыт инвестиций в стартапы?",
    answers: [
      { text: "Нет, я новичок", next: "invest_small_learning" },
      { text: "Да, небольшой опыт", next: "invest_small_portfolio" }
    ]
  },

  invest_small_learning: {
    id: "invest_small_learning",
    stage: "Шаг 4 из 7+",
    question: "Готовы ли вы инвестировать время в обучение?",
    answers: [
      { text: "Да, хочу изучить основы", next: "invest_small_risk" },
      { text: "Хочу начать с минимальными рисками", next: "invest_small_risk" }
    ]
  },

  invest_small_risk: {
    id: "invest_small_risk",
    stage: "Шаг 5 из 7+",
    question: "Как вы относитесь к рискам?",
    answers: [
      { text: "Готов к умеренным рискам ради роста", next: "invest_small_timeline" },
      { text: "Предпочитаю минимизировать риски", next: "invest_small_timeline" }
    ]
  },

  invest_small_timeline: {
    id: "invest_small_timeline",
    stage: "Шаг 6 из 7+",
    question: "На какой срок вы планируете инвестиции?",
    answers: [
      { text: "1-2 года", next: "invest_small_frequency" },
      { text: "3-5 лет", next: "invest_small_frequency" },
      { text: "Более 5 лет", next: "invest_small_frequency" }
    ]
  },

  invest_small_frequency: {
    id: "invest_small_frequency",
    stage: "Шаг 7 из 7",
    question: "Как часто вы планируете делать инвестиции?",
    answers: [
      { text: "Несколько раз в год", result: { role: "investor", tariff: "beginner" } },
      { text: "Ежемесячно", result: { role: "investor", tariff: "beginner" } },
      { text: "Пока не определился", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_small_portfolio: {
    id: "invest_small_portfolio",
    stage: "Шаг 4 из 7+",
    question: "Сколько проектов в вашем портфолио?",
    answers: [
      { text: "1-2 проекта", next: "invest_small_diversify" },
      { text: "3-5 проектов", next: "invest_small_advanced" }
    ]
  },

  invest_small_diversify: {
    id: "invest_small_diversify",
    stage: "Шаг 5 из 7+",
    question: "Хотите ли вы диверсифицировать портфель?",
    answers: [
      { text: "Да, хочу добавить 2-3 проекта", next: "invest_small_sectors" },
      { text: "Нет, пока наблюдаю за текущими", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_small_sectors: {
    id: "invest_small_sectors",
    stage: "Шаг 6 из 7+",
    question: "В каких секторах вы заинтересованы?",
    answers: [
      { text: "Технологии и AI", next: "invest_small_analytics" },
      { text: "FinTech и Blockchain", next: "invest_small_analytics" },
      { text: "HealthTech и BioTech", next: "invest_small_analytics" },
      { text: "E-commerce и Retail", next: "invest_small_analytics" }
    ]
  },

  invest_small_analytics: {
    id: "invest_small_analytics",
    stage: "Шаг 7 из 7",
    question: "Нужна ли вам расширенная AI-аналитика?",
    answers: [
      { text: "Да, это важно для решений", result: { role: "investor", tariff: "professional" } },
      { text: "Базовой аналитики достаточно", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_small_advanced: {
    id: "invest_small_advanced",
    stage: "Шаг 5 из 7+",
    question: "Используете ли вы продвинутые инструменты?",
    answers: [
      { text: "Да, использую аналитику и due diligence", next: "invest_small_secondary" },
      { text: "Нет, инвестирую интуитивно", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_small_secondary: {
    id: "invest_small_secondary",
    stage: "Шаг 6 из 7+",
    question: "Интересует ли вас вторичный рынок?",
    answers: [
      { text: "Да, хочу ликвидность", next: "invest_small_premium" },
      { text: "Нет, только первичные инвестиции", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_small_premium: {
    id: "invest_small_premium",
    stage: "Шаг 7 из 7",
    question: "Нужны ли закрытые раунды и приоритетный доступ?",
    answers: [
      { text: "Да, хочу эксклюзивные сделки", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, стандартного доступа достаточно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_goals: {
    id: "invest_medium_goals",
    stage: "Шаг 3 из 7+",
    question: "Какая ваша основная цель?",
    answers: [
      { text: "Построить диверсифицированный портфель", next: "invest_medium_experience" },
      { text: "Найти 1-2 прорывных проекта", next: "invest_medium_focus" }
    ]
  },

  invest_medium_experience: {
    id: "invest_medium_experience",
    stage: "Шаг 4 из 7+",
    question: "Каков ваш опыт в венчуре?",
    answers: [
      { text: "Новичок, только начинаю", next: "invest_medium_support" },
      { text: "Средний опыт (1-2 года)", next: "invest_medium_tools" },
      { text: "Опытный инвестор (3+ года)", next: "invest_medium_advanced" }
    ]
  },

  invest_medium_support: {
    id: "invest_medium_support",
    stage: "Шаг 5 из 7+",
    question: "Нужна ли вам образовательная поддержка?",
    answers: [
      { text: "Да, хочу обучаться", next: "invest_medium_community" },
      { text: "Нет, сам разберусь", next: "invest_medium_analytics_basic" }
    ]
  },

  invest_medium_community: {
    id: "invest_medium_community",
    stage: "Шаг 6 из 7+",
    question: "Интересует ли вас сообщество инвесторов?",
    answers: [
      { text: "Да, хочу общаться и учиться", next: "invest_medium_events" },
      { text: "Нет, предпочитаю работать самостоятельно", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_medium_events: {
    id: "invest_medium_events",
    stage: "Шаг 7 из 7",
    question: "Будете ли посещать мероприятия?",
    answers: [
      { text: "Да, это важно для нетворкинга", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, предпочитаю онлайн", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_medium_analytics_basic: {
    id: "invest_medium_analytics_basic",
    stage: "Шаг 6 из 7+",
    question: "Какая аналитика вам нужна?",
    answers: [
      { text: "Базовая - просмотр проектов", next: "invest_medium_frequency_basic" },
      { text: "Расширенная - AI и прогнозы", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_frequency_basic: {
    id: "invest_medium_frequency_basic",
    stage: "Шаг 7 из 7",
    question: "Как часто планируете инвестировать?",
    answers: [
      { text: "Несколько раз в год", result: { role: "investor", tariff: "beginner" } },
      { text: "Регулярно, ежемесячно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_tools: {
    id: "invest_medium_tools",
    stage: "Шаг 5 из 7+",
    question: "Какие инструменты вы используете?",
    answers: [
      { text: "Базовые - Excel, Google Sheets", next: "invest_medium_upgrade" },
      { text: "Профессиональные - CRM, аналитика", next: "invest_medium_secondary_tools" }
    ]
  },

  invest_medium_upgrade: {
    id: "invest_medium_upgrade",
    stage: "Шаг 6 из 7+",
    question: "Хотите ли перейти на профессиональные инструменты?",
    answers: [
      { text: "Да, готов развиваться", next: "invest_medium_ai" },
      { text: "Нет, мне достаточно текущих", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_medium_ai: {
    id: "invest_medium_ai",
    stage: "Шаг 7 из 7",
    question: "Интересует ли вас AI для принятия решений?",
    answers: [
      { text: "Да, хочу использовать AI", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, доверяю своей интуиции", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_medium_secondary_tools: {
    id: "invest_medium_secondary_tools",
    stage: "Шаг 6 из 7+",
    question: "Интересует ли вас вторичный рынок?",
    answers: [
      { text: "Да, нужна ликвидность", next: "invest_medium_exclusive" },
      { text: "Нет, только первичка", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_exclusive: {
    id: "invest_medium_exclusive",
    stage: "Шаг 7 из 7",
    question: "Нужен ли доступ к закрытым раундам?",
    answers: [
      { text: "Да, хочу эксклюзивные сделки", result: { role: "investor", tariff: "professional" } },
      { text: "Открытых раундов достаточно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_advanced: {
    id: "invest_medium_advanced",
    stage: "Шаг 5 из 7+",
    question: "Сколько сделок вы закрыли?",
    answers: [
      { text: "3-5 сделок", next: "invest_medium_roi" },
      { text: "Более 10 сделок", next: "invest_medium_elite_consider" }
    ]
  },

  invest_medium_roi: {
    id: "invest_medium_roi",
    stage: "Шаг 6 из 7+",
    question: "Какой средний ROI вашего портфолио?",
    answers: [
      { text: "Пока убыточное или около нуля", next: "invest_medium_improve" },
      { text: "Положительное (10-50%)", next: "invest_medium_scale" },
      { text: "Высокое (50%+)", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_improve: {
    id: "invest_medium_improve",
    stage: "Шаг 7 из 7",
    question: "Хотите улучшить результаты с AI?",
    answers: [
      { text: "Да, нужна помощь в отборе", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, продолжу как есть", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_medium_scale: {
    id: "invest_medium_scale",
    stage: "Шаг 7 из 7",
    question: "Планируете ли масштабировать инвестиции?",
    answers: [
      { text: "Да, хочу увеличить портфель", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, держу текущий уровень", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_elite_consider: {
    id: "invest_medium_elite_consider",
    stage: "Шаг 6 из 7+",
    question: "Нужен ли персональный менеджер?",
    answers: [
      { text: "Да, хочу индивидуальный сервис", next: "invest_medium_elite_final" },
      { text: "Нет, самостоятельно справляюсь", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_elite_final: {
    id: "invest_medium_elite_final",
    stage: "Шаг 7 из 7",
    question: "Готовы ли перейти на элитный тариф?",
    answers: [
      { text: "Да, интересует VIP-сервис", result: { role: "investor", tariff: "elite" } },
      { text: "Пока нет, остаюсь на текущем", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_focus: {
    id: "invest_medium_focus",
    stage: "Шаг 4 из 7+",
    question: "В какой стадии ищете проекты?",
    answers: [
      { text: "Pre-seed и Seed", next: "invest_medium_sector" },
      { text: "Series A и выше", next: "invest_medium_sector" }
    ]
  },

  invest_medium_sector: {
    id: "invest_medium_sector",
    stage: "Шаг 5 из 7+",
    question: "Какой сектор вас интересует больше всего?",
    answers: [
      { text: "Технологии и AI", next: "invest_medium_dd" },
      { text: "FinTech", next: "invest_medium_dd" },
      { text: "HealthTech", next: "invest_medium_dd" },
      { text: "E-commerce", next: "invest_medium_dd" }
    ]
  },

  invest_medium_dd: {
    id: "invest_medium_dd",
    stage: "Шаг 6 из 7+",
    question: "Как вы проводите due diligence?",
    answers: [
      { text: "Самостоятельно, базовый анализ", next: "invest_medium_decision" },
      { text: "С помощью экспертов и AI", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_medium_decision: {
    id: "invest_medium_decision",
    stage: "Шаг 7 из 7",
    question: "Как быстро принимаете решения?",
    answers: [
      { text: "Быстро (1-2 недели)", result: { role: "investor", tariff: "professional" } },
      { text: "Долго анализирую (месяц+)", result: { role: "investor", tariff: "beginner" } }
    ]
  },

  invest_large_strategy: {
    id: "invest_large_strategy",
    stage: "Шаг 3 из 7+",
    question: "Какая ваша инвестиционная стратегия?",
    answers: [
      { text: "Портфельный подход (5-10 проектов)", next: "invest_large_diversify" },
      { text: "Концентрированная (1-3 проекта)", next: "invest_large_focus_deep" }
    ]
  },

  invest_large_diversify: {
    id: "invest_large_diversify",
    stage: "Шаг 4 из 7+",
    question: "По каким секторам хотите диверсифицировать?",
    answers: [
      { text: "Широко по всем секторам", next: "invest_large_management" },
      { text: "Узко в 2-3 секторах", next: "invest_large_expertise" }
    ]
  },

  invest_large_management: {
    id: "invest_large_management",
    stage: "Шаг 5 из 7+",
    question: "Как планируете управлять портфелем?",
    answers: [
      { text: "Самостоятельно", next: "invest_large_tools_need" },
      { text: "С помощью команды/советников", next: "invest_large_support_type" }
    ]
  },

  invest_large_tools_need: {
    id: "invest_large_tools_need",
    stage: "Шаг 6 из 7+",
    question: "Какие инструменты вам нужны?",
    answers: [
      { text: "AI-аналитика и прогнозы", next: "invest_large_liquidity" },
      { text: "Комплексный dashboard", next: "invest_large_liquidity" }
    ]
  },

  invest_large_liquidity: {
    id: "invest_large_liquidity",
    stage: "Шаг 7 из 7",
    question: "Важна ли ликвидность (вторичный рынок)?",
    answers: [
      { text: "Да, очень важна", result: { role: "investor", tariff: "professional" } },
      { text: "Нет, долгосрочные инвестиции", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_support_type: {
    id: "invest_large_support_type",
    stage: "Шаг 6 из 7+",
    question: "Какая поддержка вам нужна?",
    answers: [
      { text: "Экспертная оценка проектов", next: "invest_large_network" },
      { text: "Персональный менеджер", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_large_network: {
    id: "invest_large_network",
    stage: "Шаг 7 из 7",
    question: "Интересует ли эксклюзивный нетворкинг?",
    answers: [
      { text: "Да, важны связи с топ-фаундерами", result: { role: "investor", tariff: "elite" } },
      { text: "Нет, достаточно стандартного", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_expertise: {
    id: "invest_large_expertise",
    stage: "Шаг 5 из 7+",
    question: "Есть ли у вас экспертиза в этих секторах?",
    answers: [
      { text: "Да, глубокая экспертиза", next: "invest_large_hands_on" },
      { text: "Базовое понимание", next: "invest_large_learn" }
    ]
  },

  invest_large_hands_on: {
    id: "invest_large_hands_on",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли быть hands-on инвестором?",
    answers: [
      { text: "Да, хочу участвовать в развитии", next: "invest_large_mentor" },
      { text: "Нет, только финансовое участие", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_mentor: {
    id: "invest_large_mentor",
    stage: "Шаг 7 из 7",
    question: "Готовы ли менторить стартапы?",
    answers: [
      { text: "Да, это часть моей стратегии", result: { role: "investor", tariff: "elite" } },
      { text: "Иногда, при необходимости", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_learn: {
    id: "invest_large_learn",
    stage: "Шаг 6 из 7+",
    question: "Нужна ли образовательная поддержка?",
    answers: [
      { text: "Да, хочу углубить знания", next: "invest_large_community_access" },
      { text: "Нет, сам изучу", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_community_access: {
    id: "invest_large_community_access",
    stage: "Шаг 7 из 7",
    question: "Нужен ли доступ к закрытому комьюнити?",
    answers: [
      { text: "Да, хочу нетворкинг с профи", result: { role: "investor", tariff: "elite" } },
      { text: "Нет, не обязательно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_focus_deep: {
    id: "invest_large_focus_deep",
    stage: "Шаг 4 из 7+",
    question: "Какой чек готовы инвестировать в один проект?",
    answers: [
      { text: "$20,000 - $50,000", next: "invest_large_stage_pref" },
      { text: "Более $50,000", next: "invest_large_involvement" }
    ]
  },

  invest_large_stage_pref: {
    id: "invest_large_stage_pref",
    stage: "Шаг 5 из 7+",
    question: "Какая стадия вас интересует?",
    answers: [
      { text: "Pre-seed / Seed", next: "invest_large_risk_appetite" },
      { text: "Series A+", next: "invest_large_returns" }
    ]
  },

  invest_large_risk_appetite: {
    id: "invest_large_risk_appetite",
    stage: "Шаг 6 из 7+",
    question: "Как относитесь к высоким рискам?",
    answers: [
      { text: "Готов к высоким рискам ради x10+", next: "invest_large_due_dil" },
      { text: "Предпочитаю умеренные риски", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_due_dil: {
    id: "invest_large_due_dil",
    stage: "Шаг 7 из 7",
    question: "Нужна ли профессиональная экспертиза?",
    answers: [
      { text: "Да, хочу доступ к экспертам", result: { role: "investor", tariff: "elite" } },
      { text: "Сам проведу анализ", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_returns: {
    id: "invest_large_returns",
    stage: "Шаг 6 из 7+",
    question: "Какой горизонт инвестиций?",
    answers: [
      { text: "3-5 лет до exit", next: "invest_large_active" },
      { text: "5+ лет, долгосрочно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_active: {
    id: "invest_large_active",
    stage: "Шаг 7 из 7",
    question: "Нужен ли активный мониторинг портфолио?",
    answers: [
      { text: "Да, с персональным менеджером", result: { role: "investor", tariff: "elite" } },
      { text: "Достаточно dashboard", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_involvement: {
    id: "invest_large_involvement",
    stage: "Шаг 5 из 7+",
    question: "Хотите ли войти в совет директоров?",
    answers: [
      { text: "Да, хочу активно участвовать", next: "invest_large_vip" },
      { text: "Нет, только финансы", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_vip: {
    id: "invest_large_vip",
    stage: "Шаг 6 из 7+",
    question: "Интересует ли VIP-сервис?",
    answers: [
      { text: "Да, важен индивидуальный подход", next: "invest_large_exclusive_deals" },
      { text: "Стандартного достаточно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_large_exclusive_deals: {
    id: "invest_large_exclusive_deals",
    stage: "Шаг 7 из 7",
    question: "Нужен ли доступ к эксклюзивным сделкам?",
    answers: [
      { text: "Да, только закрытые раунды", result: { role: "investor", tariff: "elite" } },
      { text: "Открытых сделок достаточно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_huge_approach: {
    id: "invest_huge_approach",
    stage: "Шаг 3 из 7+",
    question: "Как вы планируете подходить к инвестициям?",
    answers: [
      { text: "Активный инвестор с участием в управлении", next: "invest_huge_board" },
      { text: "Пассивный инвестор (hands-off)", next: "invest_huge_portfolio_size" }
    ]
  },

  invest_huge_board: {
    id: "invest_huge_board",
    stage: "Шаг 4 из 7+",
    question: "Планируете ли вхождение в советы директоров?",
    answers: [
      { text: "Да, это обязательное условие", next: "invest_huge_sectors" },
      { text: "При необходимости", next: "invest_huge_mentorship" }
    ]
  },

  invest_huge_sectors: {
    id: "invest_huge_sectors",
    stage: "Шаг 5 из 7+",
    question: "В каких секторах у вас экспертиза?",
    answers: [
      { text: "Технологии и AI", next: "invest_huge_check_size" },
      { text: "FinTech и Banking", next: "invest_huge_check_size" },
      { text: "HealthTech и Pharma", next: "invest_huge_check_size" },
      { text: "Несколько секторов", next: "invest_huge_check_size" }
    ]
  },

  invest_huge_check_size: {
    id: "invest_huge_check_size",
    stage: "Шаг 6 из 7+",
    question: "Какой средний чек на проект?",
    answers: [
      { text: "$100,000 - $250,000", next: "invest_huge_support_level" },
      { text: "$250,000 - $500,000", next: "invest_huge_concierge" },
      { text: "Более $500,000", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_support_level: {
    id: "invest_huge_support_level",
    stage: "Шаг 7 из 7",
    question: "Какой уровень сервиса нужен?",
    answers: [
      { text: "Персональный менеджер + эксклюзив", result: { role: "investor", tariff: "elite" } },
      { text: "Стандартный профессиональный", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_huge_concierge: {
    id: "invest_huge_concierge",
    stage: "Шаг 7 из 7",
    question: "Нужен ли concierge-сервис?",
    answers: [
      { text: "Да, полное сопровождение", result: { role: "investor", tariff: "elite" } },
      { text: "Базовой поддержки достаточно", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_mentorship: {
    id: "invest_huge_mentorship",
    stage: "Шаг 5 из 7+",
    question: "Готовы ли менторить стартапы?",
    answers: [
      { text: "Да, это важная часть моей стратегии", next: "invest_huge_network_value" },
      { text: "Нет, только капитал", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_network_value: {
    id: "invest_huge_network_value",
    stage: "Шаг 6 из 7+",
    question: "Можете ли предоставить нетворк стартапам?",
    answers: [
      { text: "Да, у меня обширная сеть", next: "invest_huge_vip_events" },
      { text: "Ограниченно", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_vip_events: {
    id: "invest_huge_vip_events",
    stage: "Шаг 7 из 7",
    question: "Интересуют ли закрытые VIP-мероприятия?",
    answers: [
      { text: "Да, важен эксклюзивный нетворкинг", result: { role: "investor", tariff: "elite" } },
      { text: "Не обязательно", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_portfolio_size: {
    id: "invest_huge_portfolio_size",
    stage: "Шаг 4 из 7+",
    question: "Сколько проектов в портфолио планируете?",
    answers: [
      { text: "5-10 проектов", next: "invest_huge_passive_tools" },
      { text: "10-20 проектов", next: "invest_huge_automation" },
      { text: "Более 20 проектов", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_passive_tools: {
    id: "invest_huge_passive_tools",
    stage: "Шаг 5 из 7+",
    question: "Какие инструменты управления нужны?",
    answers: [
      { text: "Комплексный dashboard с AI", next: "invest_huge_reporting" },
      { text: "Базовые метрики", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_huge_reporting: {
    id: "invest_huge_reporting",
    stage: "Шаг 6 из 7+",
    question: "Нужна ли автоматическая отчётность?",
    answers: [
      { text: "Да, ежемесячные отчёты", next: "invest_huge_tax" },
      { text: "Квартальных достаточно", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_huge_tax: {
    id: "invest_huge_tax",
    stage: "Шаг 7 из 7",
    question: "Нужна ли поддержка по налогам и юридике?",
    answers: [
      { text: "Да, это важно", result: { role: "investor", tariff: "elite" } },
      { text: "У меня есть свои специалисты", result: { role: "investor", tariff: "professional" } }
    ]
  },

  invest_huge_automation: {
    id: "invest_huge_automation",
    stage: "Шаг 5 из 7+",
    question: "Нужна ли автоматизация управления?",
    answers: [
      { text: "Да, максимальная автоматизация", next: "invest_huge_ai_decisions" },
      { text: "Частичная", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_ai_decisions: {
    id: "invest_huge_ai_decisions",
    stage: "Шаг 6 из 7+",
    question: "Используете ли AI для инвестрешений?",
    answers: [
      { text: "Да, AI - основа моих решений", next: "invest_huge_rebalancing" },
      { text: "Частично, как дополнение", result: { role: "investor", tariff: "elite" } }
    ]
  },

  invest_huge_rebalancing: {
    id: "invest_huge_rebalancing",
    stage: "Шаг 7 из 7",
    question: "Нужна ли автоматическая ребалансировка?",
    answers: [
      { text: "Да, хочу умное управление портфелем", result: { role: "investor", tariff: "elite" } },
      { text: "Буду делать вручную", result: { role: "investor", tariff: "elite" } }
    ]
  },

  // ============ ВЕТКА СОИНВЕСТОРОВ (расширенная до 7+) ============
  coinvest_interest: {
    id: "coinvest_interest",
    stage: "Шаг 2 из 7+",
    question: "Интересует ли вас совместное инвестирование в синдикате?",
    answers: [
      { text: "Да, хочу участвовать в синдикате", next: "coinvest_experience" },
      { text: "Нет, предпочитаю самостоятельные инвестиции", next: "invest_amount" }
    ]
  },

  coinvest_experience: {
    id: "coinvest_experience",
    stage: "Шаг 3 из 7+",
    question: "Есть ли у вас опыт синдицированных инвестиций?",
    answers: [
      { text: "Нет, я новичок", next: "coinvest_learn" },
      { text: "Да, есть опыт", next: "coinvest_role_experienced" }
    ]
  },

  coinvest_learn: {
    id: "coinvest_learn",
    stage: "Шаг 4 из 7+",
    question: "Хотите ли изучить механику синдикатов?",
    answers: [
      { text: "Да, нужна помощь в обучении", next: "coinvest_capital_small" },
      { text: "Нет, разберусь самостоятельно", next: "coinvest_capital_small" }
    ]
  },

  coinvest_capital_small: {
    id: "coinvest_capital_small",
    stage: "Шаг 5 из 7+",
    question: "Каким капиталом вы располагаете?",
    answers: [
      { text: "До $5,000", next: "coinvest_frequency" },
      { text: "$5,000 - $20,000", next: "coinvest_diversification" },
      { text: "Более $20,000", next: "coinvest_lead_interest" }
    ]
  },

  coinvest_frequency: {
    id: "coinvest_frequency",
    stage: "Шаг 6 из 7+",
    question: "Как часто планируете участвовать?",
    answers: [
      { text: "1-2 раза в год", next: "coinvest_support_level" },
      { text: "Ежеквартально", next: "coinvest_support_level" }
    ]
  },

  coinvest_support_level: {
    id: "coinvest_support_level",
    stage: "Шаг 7 из 7",
    question: "Нужна ли поддержка в принятии решений?",
    answers: [
      { text: "Да, хочу следовать за лид-инвестором", result: { role: "coinvestor", tariff: "participant" } },
      { text: "Хочу самостоятельно анализировать", result: { role: "coinvestor", tariff: "club" } }
    ]
  },

  coinvest_diversification: {
    id: "coinvest_diversification",
    stage: "Шаг 6 из 7+",
    question: "Хотите ли диверсифицировать через синдикат?",
    answers: [
      { text: "Да, хочу участвовать в нескольких проектах", next: "coinvest_dd_level" },
      { text: "Нет, сфокусируюсь на 1-2", result: { role: "coinvestor", tariff: "participant" } }
    ]
  },

  coinvest_dd_level: {
    id: "coinvest_dd_level",
    stage: "Шаг 7 из 7",
    question: "Нужен ли коллективный due diligence?",
    answers: [
      { text: "Да, это важно", result: { role: "coinvestor", tariff: "club" } },
      { text: "Нет, доверюсь лид-инвестору", result: { role: "coinvestor", tariff: "participant" } }
    ]
  },

  coinvest_lead_interest: {
    id: "coinvest_lead_interest",
    stage: "Шаг 6 из 7+",
    question: "Хотите ли стать лид-инвестором?",
    answers: [
      { text: "Да, хочу формировать синдикаты", next: "coinvest_lead_scale" },
      { text: "Нет, буду участником", result: { role: "coinvestor", tariff: "club" } }
    ]
  },

  coinvest_lead_scale: {
    id: "coinvest_lead_scale",
    stage: "Шаг 7 из 7",
    question: "Сколько участников планируете привлекать?",
    answers: [
      { text: "До 10 человек", result: { role: "coinvestor", tariff: "syndicate" } },
      { text: "10-50 человек", result: { role: "coinvestor", tariff: "syndicate" } }
    ]
  },

  coinvest_role_experienced: {
    id: "coinvest_role_experienced",
    stage: "Шаг 4 из 7+",
    question: "Какую роль вы играли в синдикатах?",
    answers: [
      { text: "Участник", next: "coinvest_upgrade" },
      { text: "Лид-инвестор", next: "coinvest_lead_tools" }
    ]
  },

  coinvest_upgrade: {
    id: "coinvest_upgrade",
    stage: "Шаг 5 из 7+",
    question: "Хотите ли стать более активным?",
    answers: [
      { text: "Да, хочу больше участвовать", next: "coinvest_club_interest" },
      { text: "Нет, устраивает текущая роль", result: { role: "coinvestor", tariff: "participant" } }
    ]
  },

  coinvest_club_interest: {
    id: "coinvest_club_interest",
    stage: "Шаг 6 из 7+",
    question: "Интересует ли закрытый клуб инвесторов?",
    answers: [
      { text: "Да, хочу нетворкинг", next: "coinvest_education" },
      { text: "Нет, достаточно сделок", result: { role: "coinvestor", tariff: "club" } }
    ]
  },

  coinvest_education: {
    id: "coinvest_education",
    stage: "Шаг 7 из 7",
    question: "Нужны ли образовательные программы?",
    answers: [
      { text: "Да, хочу развиваться", result: { role: "coinvestor", tariff: "club" } },
      { text: "Нет, есть опыт", result: { role: "coinvestor", tariff: "club" } }
    ]
  },

  coinvest_lead_tools: {
    id: "coinvest_lead_tools",
    stage: "Шаг 5 из 7+",
    question: "Какие инструменты вам нужны?",
    answers: [
      { text: "CRM для управления синдикатом", next: "coinvest_commission" },
      { text: "Аналитика и отчётность", next: "coinvest_commission" }
    ]
  },

  coinvest_commission: {
    id: "coinvest_commission",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли брать комиссию?",
    answers: [
      { text: "Да, это часть бизнес-модели", next: "coinvest_legal" },
      { text: "Нет, для сообщества", result: { role: "coinvestor", tariff: "syndicate" } }
    ]
  },

  coinvest_legal: {
    id: "coinvest_legal",
    stage: "Шаг 7 из 7",
    question: "Нужно ли юридическое сопровождение?",
    answers: [
      { text: "Да, это важно", result: { role: "coinvestor", tariff: "syndicate" } },
      { text: "У меня есть юристы", result: { role: "coinvestor", tariff: "syndicate" } }
    ]
  },

  // ============ ВЕТКА ПРЕДПРИНИМАТЕЛЕЙ (Founder, CoFounder, CoPartner, Franchiser) ============
  business_stage: {
    id: "business_stage",
    stage: "Шаг 2 из 7+",
    question: "На какой стадии находится ваш бизнес или идея?",
    answers: [
      { text: "Идея или концепция (я основатель)", next: "founder_idea_experience" },
      { text: "Хочу присоединиться к проекту как партнер", next: "cofounder_motivation" },
      { text: "Хочу создать франшизу или купить готовый бизнес", next: "franchiser_type" },
      { text: "Хочу войти в готовый бизнес как соучредитель", next: "copartner_experience" }
    ]
  },

  // === FOUNDER BRANCH ===
  founder_idea_experience: {
    id: "founder_idea_experience",
    stage: "Шаг 3 из 7+",
    question: "Есть ли у вас опыт запуска стартапов?",
    answers: [
      { text: "Нет, это мой первый проект", next: "founder_first_help" },
      { text: "Да, запускал раньше", next: "founder_prev_outcome" }
    ]
  },

  founder_first_help: {
    id: "founder_first_help",
    stage: "Шаг 4 из 7+",
    question: "Нужна ли помощь в создании бизнес-плана?",
    answers: [
      { text: "Да, нужны шаблоны и консультации", next: "founder_team_status" },
      { text: "Нет, сам разберусь", next: "founder_team_status" }
    ]
  },

  founder_team_status: {
    id: "founder_team_status",
    stage: "Шаг 5 из 7+",
    question: "Есть ли у вас команда?",
    answers: [
      { text: "Да, есть команда", next: "founder_funding_need" },
      { text: "Нет, ищу команду", next: "founder_funding_need" }
    ]
  },

  founder_funding_need: {
    id: "founder_funding_need",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли привлекать инвестиции?",
    answers: [
      { text: "Да, в ближайшие 3 месяца", next: "founder_funding_amount" },
      { text: "Да, но позже", next: "founder_revenue_model" },
      { text: "Нет, буду самофинансировать", result: { role: "founder", tariff: "startup" } }
    ]
  },

  founder_funding_amount: {
    id: "founder_funding_amount",
    stage: "Шаг 7 из 7",
    question: "Какую сумму планируете привлечь?",
    answers: [
      { text: "До $50,000", result: { role: "founder", tariff: "startup" } },
      { text: "$50,000 - $250,000", result: { role: "founder", tariff: "growth" } },
      { text: "Более $250,000", result: { role: "founder", tariff: "scale" } }
    ]
  },

  founder_revenue_model: {
    id: "founder_revenue_model",
    stage: "Шаг 7 из 7",
    question: "Есть ли у вас четкая бизнес-модель?",
    answers: [
      { text: "Да, проработана", result: { role: "founder", tariff: "growth" } },
      { text: "Нет, нужна помощь", result: { role: "founder", tariff: "startup" } }
    ]
  },

  founder_prev_outcome: {
    id: "founder_prev_outcome",
    stage: "Шаг 4 из 7+",
    question: "Какой был результат предыдущих проектов?",
    answers: [
      { text: "Успешный выход", next: "founder_serial_budget" },
      { text: "Закрылся, но получил опыт", next: "founder_lessons" },
      { text: "Работает, но медленно растет", next: "founder_portfolio" }
    ]
  },

  founder_serial_budget: {
    id: "founder_serial_budget",
    stage: "Шаг 5 из 7+",
    question: "Какой бюджет для нового проекта?",
    answers: [
      { text: "До $100,000", next: "founder_serial_speed" },
      { text: "$100,000 - $500,000", next: "founder_serial_team" },
      { text: "Более $500,000", next: "founder_serial_scale_plan" }
    ]
  },

  founder_serial_speed: {
    id: "founder_serial_speed",
    stage: "Шаг 6 из 7+",
    question: "Как быстро планируете запуск?",
    answers: [
      { text: "В течение месяца", next: "founder_serial_metrics" },
      { text: "3-6 месяцев", next: "founder_serial_metrics" }
    ]
  },

  founder_serial_metrics: {
    id: "founder_serial_metrics",
    stage: "Шаг 7 из 7",
    question: "Нужны ли продвинутые метрики и AI?",
    answers: [
      { text: "Да, критически важно", result: { role: "founder", tariff: "scale" } },
      { text: "Базовых инструментов достаточно", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_serial_team: {
    id: "founder_serial_team",
    stage: "Шаг 6 из 7+",
    question: "Есть ли готовая команда?",
    answers: [
      { text: "Да, команда собрана", next: "founder_serial_investors" },
      { text: "Нет, нужен AI-подбор", next: "founder_serial_investors" }
    ]
  },

  founder_serial_investors: {
    id: "founder_serial_investors",
    stage: "Шаг 7 из 7",
    question: "Планируете ли активно общаться с инвесторами?",
    answers: [
      { text: "Да, нужна база инвесторов", result: { role: "founder", tariff: "scale" } },
      { text: "Нет, у меня есть связи", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_serial_scale_plan: {
    id: "founder_serial_scale_plan",
    stage: "Шаг 6 из 7+",
    question: "Какой масштаб планируете?",
    answers: [
      { text: "Региональный рынок", next: "founder_serial_kpi" },
      { text: "Международный рынок", next: "founder_serial_support" }
    ]
  },

  founder_serial_kpi: {
    id: "founder_serial_kpi",
    stage: "Шаг 7 из 7",
    question: "Нужна ли интеграция с комнатой данных?",
    answers: [
      { text: "Да, для инвесторов", result: { role: "founder", tariff: "scale" } },
      { text: "Пока нет", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_serial_support: {
    id: "founder_serial_support",
    stage: "Шаг 7 из 7",
    question: "Нужен ли персональный менеджер?",
    answers: [
      { text: "Да, нужна поддержка", result: { role: "founder", tariff: "scale" } },
      { text: "Нет, сам справлюсь", result: { role: "founder", tariff: "scale" } }
    ]
  },

  founder_lessons: {
    id: "founder_lessons",
    stage: "Шаг 5 из 7+",
    question: "Какие выводы сделали из прошлого опыта?",
    answers: [
      { text: "Нужна лучшая команда", next: "founder_retry_budget" },
      { text: "Нужно больше инвестиций", next: "founder_retry_budget" },
      { text: "Нужен менторинг", next: "founder_retry_mentoring" }
    ]
  },

  founder_retry_budget: {
    id: "founder_retry_budget",
    stage: "Шаг 6 из 7+",
    question: "Какой бюджет сейчас доступен?",
    answers: [
      { text: "Минимальный (self-funded)", next: "founder_retry_timeline" },
      { text: "Средний ($50-200k)", next: "founder_retry_support_type" },
      { text: "Высокий ($200k+)", result: { role: "founder", tariff: "scale" } }
    ]
  },

  founder_retry_timeline: {
    id: "founder_retry_timeline",
    stage: "Шаг 7 из 7",
    question: "Как быстро нужен результат?",
    answers: [
      { text: "В течение года", result: { role: "founder", tariff: "startup" } },
      { text: "2-3 года", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_retry_support_type: {
    id: "founder_retry_support_type",
    stage: "Шаг 7 из 7",
    question: "Какая поддержка нужна больше всего?",
    answers: [
      { text: "Бизнес-план и финмодель", result: { role: "founder", tariff: "growth" } },
      { text: "Подбор команды и инвесторов", result: { role: "founder", tariff: "scale" } }
    ]
  },

  founder_retry_mentoring: {
    id: "founder_retry_mentoring",
    stage: "Шаг 6 из 7+",
    question: "Какой тип менторинга нужен?",
    answers: [
      { text: "Базовые консультации", next: "founder_retry_final" },
      { text: "Полное сопровождение", next: "founder_retry_premium" }
    ]
  },

  founder_retry_final: {
    id: "founder_retry_final",
    stage: "Шаг 7 из 7",
    question: "Планируете ли привлекать инвестиции?",
    answers: [
      { text: "Да, активно", result: { role: "founder", tariff: "growth" } },
      { text: "Нет, органический рост", result: { role: "founder", tariff: "startup" } }
    ]
  },

  founder_retry_premium: {
    id: "founder_retry_premium",
    stage: "Шаг 7 из 7",
    question: "Готовы ли к премиум-тарифу?",
    answers: [
      { text: "Да, нужен полный пакет", result: { role: "founder", tariff: "scale" } },
      { text: "Пока стандартный вариант", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_portfolio: {
    id: "founder_portfolio",
    stage: "Шаг 5 из 7+",
    question: "Планируете ли развивать текущий или начать новый?",
    answers: [
      { text: "Развивать текущий", next: "founder_current_revenue" },
      { text: "Начать новый проект", next: "founder_serial_budget" }
    ]
  },

  founder_current_revenue: {
    id: "founder_current_revenue",
    stage: "Шаг 6 из 7+",
    question: "Какая текущая выручка в месяц?",
    answers: [
      { text: "Менее $10,000", next: "founder_current_growth_plan" },
      { text: "$10,000 - $50,000", next: "founder_current_investors" },
      { text: "Более $50,000", next: "founder_current_scale" }
    ]
  },

  founder_current_growth_plan: {
    id: "founder_current_growth_plan",
    stage: "Шаг 7 из 7",
    question: "Какая основная задача?",
    answers: [
      { text: "Привлечь инвестиции", result: { role: "founder", tariff: "growth" } },
      { text: "Улучшить продукт", result: { role: "founder", tariff: "startup" } }
    ]
  },

  founder_current_investors: {
    id: "founder_current_investors",
    stage: "Шаг 7 из 7",
    question: "Нужен ли доступ к инвесторам?",
    answers: [
      { text: "Да, нужна серия А", result: { role: "founder", tariff: "scale" } },
      { text: "Нет, пока органический рост", result: { role: "founder", tariff: "growth" } }
    ]
  },

  founder_current_scale: {
    id: "founder_current_scale",
    stage: "Шаг 7 из 7",
    question: "Планируете ли масштабирование?",
    answers: [
      { text: "Да, международная экспансия", result: { role: "founder", tariff: "scale" } },
      { text: "Да, в пределах региона", result: { role: "founder", tariff: "growth" } }
    ]
  },

  // === COFOUNDER BRANCH ===
  cofounder_motivation: {
    id: "cofounder_motivation",
    stage: "Шаг 3 из 7+",
    question: "Что мотивирует вас стать со-основателем?",
    answers: [
      { text: "Хочу воплотить свои идеи", next: "cofounder_skills" },
      { text: "Хочу работать с талантливыми людьми", next: "cofounder_skills" },
      { text: "Хочу создать долю в перспективном проекте", next: "cofounder_skills" }
    ]
  },

  cofounder_skills: {
    id: "cofounder_skills",
    stage: "Шаг 4 из 7+",
    question: "Какие ключевые компетенции вы принесете?",
    answers: [
      { text: "Технические (разработка, продукт)", next: "cofounder_experience" },
      { text: "Бизнес (маркетинг, продажи)", next: "cofounder_experience" },
      { text: "Операционные (управление, финансы)", next: "cofounder_experience" }
    ]
  },

  cofounder_experience: {
    id: "cofounder_experience",
    stage: "Шаг 5 из 7+",
    question: "Каков ваш опыт работы в стартапах?",
    answers: [
      { text: "Нет опыта, хочу попробовать", next: "cofounder_commitment" },
      { text: "Работал в стартапах", next: "cofounder_prev_role" },
      { text: "Был со-основателем", next: "cofounder_equity_expectation" }
    ]
  },

  cofounder_commitment: {
    id: "cofounder_commitment",
    stage: "Шаг 6 из 7+",
    question: "Готовы ли работать full-time?",
    answers: [
      { text: "Да, готов уйти с работы", next: "cofounder_financial_runway" },
      { text: "Нет, пока part-time", next: "cofounder_learning" }
    ]
  },

  cofounder_financial_runway: {
    id: "cofounder_financial_runway",
    stage: "Шаг 7 из 7",
    question: "Есть ли у вас финансовая подушка?",
    answers: [
      { text: "Да, могу 6-12 месяцев без зарплаты", result: { role: "cofounder", tariff: "partner" } },
      { text: "Нет, нужна зарплата сразу", result: { role: "cofounder", tariff: "seeker" } }
    ]
  },

  cofounder_learning: {
    id: "cofounder_learning",
    stage: "Шаг 7 из 7",
    question: "Планируете ли переходить на full-time?",
    answers: [
      { text: "Да, через 3-6 месяцев", result: { role: "cofounder", tariff: "search" } },
      { text: "Нет, останусь part-time", result: { role: "cofounder", tariff: "seeker" } }
    ]
  },

  cofounder_prev_role: {
    id: "cofounder_prev_role",
    stage: "Шаг 6 из 7+",
    question: "Какую роль вы играли?",
    answers: [
      { text: "Лид разработчик / Head of Product", next: "cofounder_project_stage" },
      { text: "Маркетинг / Продажи", next: "cofounder_project_stage" },
      { text: "Операции / Менеджмент", next: "cofounder_project_stage" }
    ]
  },

  cofounder_project_stage: {
    id: "cofounder_project_stage",
    stage: "Шаг 7 из 7",
    question: "На какой стадии ищете проект?",
    answers: [
      { text: "Идея / Pre-seed", result: { role: "cofounder", tariff: "partner" } },
      { text: "Seed / Early", result: { role: "cofounder", tariff: "search" } },
      { text: "Любая стадия", result: { role: "cofounder", tariff: "search" } }
    ]
  },

  cofounder_equity_expectation: {
    id: "cofounder_equity_expectation",
    stage: "Шаг 6 из 7+",
    question: "Какую долю ожидаете?",
    answers: [
      { text: "10-20%", next: "cofounder_vesting" },
      { text: "20-40%", next: "cofounder_vesting" },
      { text: "Более 40%", next: "cofounder_control" }
    ]
  },

  cofounder_vesting: {
    id: "cofounder_vesting",
    stage: "Шаг 7 из 7",
    question: "Понимаете ли принципы vesting?",
    answers: [
      { text: "Да, готов к стандартным условиям", result: { role: "cofounder", tariff: "partner" } },
      { text: "Нет, нужна помощь юриста", result: { role: "cofounder", tariff: "search" } }
    ]
  },

  cofounder_control: {
    id: "cofounder_control",
    stage: "Шаг 7 из 7",
    question: "Нужна ли вам контрольная доля?",
    answers: [
      { text: "Да, хочу быть CEO", result: { role: "founder", tariff: "startup" } },
      { text: "Нет, партнерство важнее", result: { role: "cofounder", tariff: "partner" } }
    ]
  },

  // === COPARTNER BRANCH ===
  copartner_experience: {
    id: "copartner_experience",
    stage: "Шаг 3 из 7+",
    question: "Есть ли у вас опыт M&A или слияний?",
    answers: [
      { text: "Да, участвовал в сделках", next: "copartner_capital" },
      { text: "Нет, но интересует", next: "copartner_motivation_detail" }
    ]
  },

  copartner_capital: {
    id: "copartner_capital",
    stage: "Шаг 4 из 7+",
    question: "Готовы ли внести капитал?",
    answers: [
      { text: "Да, $50k-$200k", next: "copartner_industry" },
      { text: "Да, более $200k", next: "copartner_control_level" },
      { text: "Нет, только экспертиза", next: "copartner_value_prop" }
    ]
  },

  copartner_industry: {
    id: "copartner_industry",
    stage: "Шаг 5 из 7+",
    question: "В какой индустрии ищете проект?",
    answers: [
      { text: "Tech / SaaS", next: "copartner_role_type" },
      { text: "E-commerce / Retail", next: "copartner_role_type" },
      { text: "FinTech / Blockchain", next: "copartner_role_type" },
      { text: "Другое", next: "copartner_role_type" }
    ]
  },

  copartner_role_type: {
    id: "copartner_role_type",
    stage: "Шаг 6 из 7+",
    question: "Какую роль хотите играть?",
    answers: [
      { text: "Пассивный инвестор с долей", next: "copartner_board" },
      { text: "Активный партнер (CPO/CMO)", next: "copartner_time_commitment" }
    ]
  },

  copartner_board: {
    id: "copartner_board",
    stage: "Шаг 7 из 7",
    question: "Хотите ли войти в совет директоров?",
    answers: [
      { text: "Да, хочу влиять на стратегию", result: { role: "copartner", tariff: "advanced" } },
      { text: "Нет, доверяю команде", result: { role: "copartner", tariff: "observer" } }
    ]
  },

  copartner_time_commitment: {
    id: "copartner_time_commitment",
    stage: "Шаг 7 из 7",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "Full-time", result: { role: "copartner", tariff: "strategic" } },
      { text: "Part-time (20-30 часов/неделю)", result: { role: "copartner", tariff: "advanced" } }
    ]
  },

  copartner_control_level: {
    id: "copartner_control_level",
    stage: "Шаг 5 из 7+",
    question: "Какой уровень контроля вам нужен?",
    answers: [
      { text: "Контрольный пакет (50%+)", next: "copartner_acquisition" },
      { text: "Существенный блокпакет (25-49%)", next: "copartner_governance" },
      { text: "Миноритарный (до 25%)", next: "copartner_portfolio" }
    ]
  },

  copartner_acquisition: {
    id: "copartner_acquisition",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли полное поглощение?",
    answers: [
      { text: "Да, хочу купить весь бизнес", next: "copartner_acquisition_budget" },
      { text: "Нет, партнерство важнее", next: "copartner_governance" }
    ]
  },

  copartner_acquisition_budget: {
    id: "copartner_acquisition_budget",
    stage: "Шаг 7 из 7",
    question: "Какой бюджет для покупки?",
    answers: [
      { text: "$200k - $500k", result: { role: "copartner", tariff: "strategic" } },
      { text: "$500k - $2M", result: { role: "copartner", tariff: "strategic" } },
      { text: "Более $2M", result: { role: "copartner", tariff: "strategic" } }
    ]
  },

  copartner_governance: {
    id: "copartner_governance",
    stage: "Шаг 6 из 7+",
    question: "Нужны ли вам права на управление?",
    answers: [
      { text: "Да, хочу место в правлении", next: "copartner_legal_support" },
      { text: "Нет, доверяю текущей команде", next: "copartner_reporting" }
    ]
  },

  copartner_legal_support: {
    id: "copartner_legal_support",
    stage: "Шаг 7 из 7",
    question: "Нужна ли юридическая поддержка?",
    answers: [
      { text: "Да, критически важно", result: { role: "copartner", tariff: "strategic" } },
      { text: "Нет, у меня есть юристы", result: { role: "copartner", tariff: "advanced" } }
    ]
  },

  copartner_reporting: {
    id: "copartner_reporting",
    stage: "Шаг 7 из 7",
    question: "Какая отчетность вам нужна?",
    answers: [
      { text: "Ежемесячная финансовая", result: { role: "copartner", tariff: "advanced" } },
      { text: "Квартальная обзорная", result: { role: "copartner", tariff: "observer" } }
    ]
  },

  copartner_portfolio: {
    id: "copartner_portfolio",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли множественные инвестиции?",
    answers: [
      { text: "Да, формирую портфель", next: "copartner_diversification" },
      { text: "Нет, ищу один проект", next: "copartner_involvement" }
    ]
  },

  copartner_diversification: {
    id: "copartner_diversification",
    stage: "Шаг 7 из 7",
    question: "Сколько компаний планируете в портфеле?",
    answers: [
      { text: "2-5 компаний", result: { role: "copartner", tariff: "advanced" } },
      { text: "5-10 компаний", result: { role: "copartner", tariff: "strategic" } },
      { text: "Более 10", result: { role: "investor", tariff: "professional" } }
    ]
  },

  copartner_involvement: {
    id: "copartner_involvement",
    stage: "Шаг 7 из 7",
    question: "Насколько активно хотите участвовать?",
    answers: [
      { text: "Очень активно, стать CEO/COO", result: { role: "copartner", tariff: "strategic" } },
      { text: "Умеренно, консультации", result: { role: "copartner", tariff: "advanced" } },
      { text: "Пассивно, только отчеты", result: { role: "copartner", tariff: "observer" } }
    ]
  },

  copartner_motivation_detail: {
    id: "copartner_motivation_detail",
    stage: "Шаг 4 из 7+",
    question: "Что вас больше всего привлекает?",
    answers: [
      { text: "Финансовая выгода", next: "copartner_learning_phase" },
      { text: "Опыт в управлении бизнесом", next: "copartner_learning_phase" },
      { text: "Нетворкинг и связи", next: "copartner_learning_phase" }
    ]
  },

  copartner_learning_phase: {
    id: "copartner_learning_phase",
    stage: "Шаг 5 из 7+",
    question: "Готовы ли учиться и развиваться?",
    answers: [
      { text: "Да, хочу менторинг", next: "copartner_budget_beginner" },
      { text: "Нет, у меня уже есть опыт", next: "copartner_value_prop" }
    ]
  },

  copartner_budget_beginner: {
    id: "copartner_budget_beginner",
    stage: "Шаг 6 из 7+",
    question: "Какой капитал готовы вложить?",
    answers: [
      { text: "До $50,000", next: "copartner_entry_level" },
      { text: "$50,000 - $100,000", next: "copartner_engagement" },
      { text: "Более $100,000", next: "copartner_industry" }
    ]
  },

  copartner_entry_level: {
    id: "copartner_entry_level",
    stage: "Шаг 7 из 7",
    question: "Планируете ли активное участие?",
    answers: [
      { text: "Да, хочу быть в команде", result: { role: "copartner", tariff: "observer" } },
      { text: "Нет, пассивное инвестирование", result: { role: "coinvestor", tariff: "participant" } }
    ]
  },

  copartner_engagement: {
    id: "copartner_engagement",
    stage: "Шаг 7 из 7",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "5-10 часов в неделю", result: { role: "copartner", tariff: "observer" } },
      { text: "20+ часов в неделю", result: { role: "copartner", tariff: "advanced" } }
    ]
  },

  copartner_value_prop: {
    id: "copartner_value_prop",
    stage: "Шаг 5 из 7+",
    question: "Какую ценность вы принесете?",
    answers: [
      { text: "Экспертиза в индустрии", next: "copartner_equity_for_expertise" },
      { text: "Связи и клиентов", next: "copartner_equity_for_expertise" },
      { text: "Операционный опыт", next: "copartner_equity_for_expertise" }
    ]
  },

  copartner_equity_for_expertise: {
    id: "copartner_equity_for_expertise",
    stage: "Шаг 6 из 7+",
    question: "Какую долю ожидаете за экспертизу?",
    answers: [
      { text: "5-10%", next: "copartner_advisory" },
      { text: "10-20%", next: "copartner_active_role" },
      { text: "Более 20%", result: { role: "cofounder", tariff: "partner" } }
    ]
  },

  copartner_advisory: {
    id: "copartner_advisory",
    stage: "Шаг 7 из 7",
    question: "Будете ли советником или активным партнером?",
    answers: [
      { text: "Советник", result: { role: "copartner", tariff: "observer" } },
      { text: "Активный партнер", result: { role: "copartner", tariff: "advanced" } }
    ]
  },

  copartner_active_role: {
    id: "copartner_active_role",
    stage: "Шаг 7 из 7",
    question: "Готовы ли занять операционную роль?",
    answers: [
      { text: "Да, стану частью команды", result: { role: "copartner", tariff: "strategic" } },
      { text: "Нет, буду консультировать", result: { role: "copartner", tariff: "advanced" } }
    ]
  },

  // === FRANCHISER BRANCH ===
  franchiser_type: {
    id: "franchiser_type",
    stage: "Шаг 3 из 7+",
    question: "Вы франчайзер или франчайзи?",
    answers: [
      { text: "Хочу создать франшизу своего бизнеса", next: "franchiser_business_ready" },
      { text: "Хочу купить франшизу", next: "franchisee_budget" }
    ]
  },

  franchiser_business_ready: {
    id: "franchiser_business_ready",
    stage: "Шаг 4 из 7+",
    question: "Есть ли у вас работающий бизнес?",
    answers: [
      { text: "Да, прибыльный бизнес", next: "franchiser_locations" },
      { text: "Да, но только запустился", next: "franchiser_premature" },
      { text: "Нет, только идея", result: { role: "founder", tariff: "startup" } }
    ]
  },

  franchiser_locations: {
    id: "franchiser_locations",
    stage: "Шаг 5 из 7+",
    question: "Сколько у вас локаций?",
    answers: [
      { text: "1 локация", next: "franchiser_expansion_plan" },
      { text: "2-3 локации", next: "franchiser_standardization" },
      { text: "Более 3 локаций", next: "franchiser_ready_scale" }
    ]
  },

  franchiser_expansion_plan: {
    id: "franchiser_expansion_plan",
    stage: "Шаг 6 из 7+",
    question: "Готова ли бизнес-модель к тиражированию?",
    answers: [
      { text: "Да, все процессы стандартизированы", next: "franchiser_geography" },
      { text: "Нет, нужна помощь", next: "franchiser_help_needed" }
    ]
  },

  franchiser_help_needed: {
    id: "franchiser_help_needed",
    stage: "Шаг 7 из 7",
    question: "Какая помощь нужна?",
    answers: [
      { text: "Документация и процессы", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Юридическая поддержка", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Полное сопровождение", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_geography: {
    id: "franchiser_geography",
    stage: "Шаг 7 из 7",
    question: "Какая география расширения?",
    answers: [
      { text: "Город", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Регион", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Вся страна", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_standardization: {
    id: "franchiser_standardization",
    stage: "Шаг 6 из 7+",
    question: "Насколько стандартизированы процессы?",
    answers: [
      { text: "Полностью, есть документация", next: "franchiser_package" },
      { text: "Частично, требуется доработка", next: "franchiser_support_level" }
    ]
  },

  franchiser_package: {
    id: "franchiser_package",
    stage: "Шаг 7 из 7",
    question: "Есть ли франчайзинговый пакет?",
    answers: [
      { text: "Да, готов к продаже", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Нет, нужна помощь юриста", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_support_level: {
    id: "franchiser_support_level",
    stage: "Шаг 7 из 7",
    question: "Какой уровень поддержки нужен?",
    answers: [
      { text: "Консультации", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Полное сопровождение", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_ready_scale: {
    id: "franchiser_ready_scale",
    stage: "Шаг 6 из 7+",
    question: "Сколько франчайзи планируете в 1 год?",
    answers: [
      { text: "5-10 франчайзи", next: "franchiser_crm_need" },
      { text: "10-50 франчайзи", next: "franchiser_automation" },
      { text: "Более 50", next: "franchiser_enterprise" }
    ]
  },

  franchiser_crm_need: {
    id: "franchiser_crm_need",
    stage: "Шаг 7 из 7",
    question: "Нужна ли CRM для франчайзинга?",
    answers: [
      { text: "Да, нужна автоматизация", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Нет, справлюсь вручную", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_automation: {
    id: "franchiser_automation",
    stage: "Шаг 7 из 7",
    question: "Нужна ли автоматизация отчетности?",
    answers: [
      { text: "Да, критически важно", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Пока нет", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_enterprise: {
    id: "franchiser_enterprise",
    stage: "Шаг 7 из 7",
    question: "Нужен ли персональный менеджер?",
    answers: [
      { text: "Да, нужна поддержка", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Нет, сам справлюсь", result: { role: "franchiser", tariff: "franchisor" } }
    ]
  },

  franchiser_premature: {
    id: "franchiser_premature",
    stage: "Шаг 5 из 7+",
    question: "Сколько месяцев работает бизнес?",
    answers: [
      { text: "Менее 6 месяцев", next: "franchiser_too_early" },
      { text: "6-12 месяцев", next: "franchiser_profitability" },
      { text: "Более года", next: "franchiser_locations" }
    ]
  },

  franchiser_too_early: {
    id: "franchiser_too_early",
    stage: "Шаг 6 из 7+",
    question: "Бизнес прибыльный?",
    answers: [
      { text: "Да, стабильная прибыль", next: "franchiser_expansion_plan" },
      { text: "Нет, еще в убытке", next: "franchiser_advice" }
    ]
  },

  franchiser_advice: {
    id: "franchiser_advice",
    stage: "Шаг 7 из 7",
    question: "Хотите ли консультацию по развитию?",
    answers: [
      { text: "Да, нужна помощь", result: { role: "founder", tariff: "growth" } },
      { text: "Нет, справлюсь сам", result: { role: "founder", tariff: "startup" } }
    ]
  },

  franchiser_profitability: {
    id: "franchiser_profitability",
    stage: "Шаг 6 из 7+",
    question: "Какая прибыльность в месяц?",
    answers: [
      { text: "До $10,000", next: "franchiser_unit_economics" },
      { text: "$10,000 - $50,000", next: "franchiser_expansion_plan" },
      { text: "Более $50,000", next: "franchiser_ready_scale" }
    ]
  },

  franchiser_unit_economics: {
    id: "franchiser_unit_economics",
    stage: "Шаг 7 из 7",
    question: "Понимаете ли unit-экономику?",
    answers: [
      { text: "Да, все просчитано", result: { role: "franchiser", tariff: "franchisor" } },
      { text: "Нет, нужна помощь", result: { role: "founder", tariff: "growth" } }
    ]
  },


  franchisee_industry: {
    id: "franchisee_industry",
    stage: "Шаг 5 из 7+",
    question: "Какая индустрия интересна?",
    answers: [
      { text: "Еда и напитки", next: "franchisee_location" },
      { text: "Услуги", next: "franchisee_location" },
      { text: "Ретейл", next: "franchisee_location" },
      { text: "Образование", next: "franchisee_location" }
    ]
  },

  franchisee_location: {
    id: "franchisee_location",
    stage: "Шаг 6 из 7+",
    question: "Есть ли локация?",
    answers: [
      { text: "Да, готова", next: "franchisee_timeline" },
      { text: "Нет, буду искать", next: "franchisee_timeline" }
    ]
  },

  franchisee_timeline: {
    id: "franchisee_timeline",
    stage: "Шаг 7 из 7",
    question: "Когда планируете запуск?",
    answers: [
      { text: "В течение 3 месяцев", result: { role: "franchisee", tariff: "start" } },
      { text: "3-6 месяцев", result: { role: "franchisee", tariff: "start" } },
      { text: "Более 6 месяцев", result: { role: "franchisee", tariff: "start" } }
    ]
  },

  franchisee_experience: {
    id: "franchisee_experience",
    stage: "Шаг 5 из 7+",
    question: "Есть ли опыт в бизнесе?",
    answers: [
      { text: "Да, владею бизнесом", next: "franchisee_multiple" },
      { text: "Нет, первый раз", next: "franchisee_industry" }
    ]
  },

  franchisee_multiple: {
    id: "franchisee_multiple",
    stage: "Шаг 6 из 7+",
    question: "Планируете ли несколько франшиз?",
    answers: [
      { text: "Да, мультиюнит", next: "franchisee_scale" },
      { text: "Нет, одну локацию", next: "franchisee_industry" }
    ]
  },

  franchisee_scale: {
    id: "franchisee_scale",
    stage: "Шаг 7 из 7",
    question: "Сколько точек планируете?",
    answers: [
      { text: "2-5 точек", result: { role: "franchisee", tariff: "professional" } },
      { text: "5-10 точек", result: { role: "franchisee", tariff: "premium" } },
      { text: "Более 10", result: { role: "franchisee", tariff: "premium" } }
    ]
  },

  // ============ ВЕТКА НАВЫКОВ ============
  skills_type: {
    id: "skills_type",
    stage: "Шаг 2 из 7+",
    question: "Какие навыки вы хотите применить?",
    answers: [
      { text: "Технические (разработка, IT)", next: "skills_experience" },
      { text: "Маркетинг и продажи", next: "skills_experience" },
      { text: "Управление и финансы", next: "skills_experience" }
    ]
  },

  skills_experience: {
    id: "skills_experience",
    stage: "Шаг 3 из 7+",
    question: "Какой у вас уровень опыта?",
    answers: [
      { text: "Новичок", next: "skills_goal" },
      { text: "Средний", next: "skills_goal" },
      { text: "Эксперт", next: "skills_goal" }
    ]
  },

  skills_goal: {
    id: "skills_goal",
    stage: "Шаг 4 из 7+",
    question: "Какая ваша цель?",
    answers: [
      { text: "Найти работу в стартапе", result: { role: "jobseeker", tariff: "basic" } },
      { text: "Стать сооснователем", result: { role: "cofounder", tariff: "search" } },
      { text: "Фриланс и проекты", result: { role: "freelancer", tariff: "novice" } }
    ]
  },

  // ============ ВЕТКА ЭКОСИСТЕМЫ ============
  ecosystem_role: {
    id: "ecosystem_role",
    stage: "Шаг 2 из 7+",
    question: "Какую роль вы хотите играть в экосистеме?",
    answers: [
      { text: "Партнёр или консультант", next: "ecosystem_consultant_type" },
      { text: "Фрилансер или подрядчик", next: "ecosystem_freelancer_level" },
      { text: "Амбассадор или блогер", next: "ecosystem_ambassador" }
    ]
  },

  // ============ ВЕТКА КОНСУЛЬТАНТОВ (расширенная до 7+) ============
  ecosystem_consultant_type: {
    id: "ecosystem_consultant_type",
    stage: "Шаг 3 из 7+",
    question: "Какой тип консультанта вы?",
    answers: [
      { text: "Бизнес-аналитик", next: "consultant_analyst_experience" },
      { text: "Стратег", next: "consultant_strategist_background" },
      { text: "C-level executive", next: "consultant_clevel_history" }
    ]
  },

  consultant_analyst_experience: {
    id: "consultant_analyst_experience",
    stage: "Шаг 4 из 7+",
    question: "Сколько лет опыта в анализе?",
    answers: [
      { text: "1-3 года", next: "consultant_analyst_tools" },
      { text: "3-7 лет", next: "consultant_analyst_industries" },
      { text: "Более 7 лет", next: "consultant_analyst_specialization" }
    ]
  },

  consultant_analyst_tools: {
    id: "consultant_analyst_tools",
    stage: "Шаг 5 из 7+",
    question: "Какими инструментами владеете?",
    answers: [
      { text: "Excel, Google Sheets", next: "consultant_analyst_project_type" },
      { text: "+ SQL, Python/R", next: "consultant_analyst_data_scale" },
      { text: "+ BI tools (Tableau, Power BI)", next: "consultant_analyst_clients" }
    ]
  },

  consultant_analyst_project_type: {
    id: "consultant_analyst_project_type",
    stage: "Шаг 6 из 7+",
    question: "Какие проекты предпочитаете?",
    answers: [
      { text: "Финансовое моделирование", next: "consultant_analyst_rate" },
      { text: "Маркетинговая аналитика", next: "consultant_analyst_rate" },
      { text: "Операционная аналитика", next: "consultant_analyst_rate" }
    ]
  },

  consultant_analyst_rate: {
    id: "consultant_analyst_rate",
    stage: "Шаг 7 из 7",
    question: "Какой ваш часовой тариф?",
    answers: [
      { text: "$50-80/час", result: { role: "consultant", tariff: "analyst" } },
      { text: "$80-120/час", result: { role: "consultant", tariff: "strategist" } }
    ]
  },

  consultant_analyst_data_scale: {
    id: "consultant_analyst_data_scale",
    stage: "Шаг 6 из 7+",
    question: "С какими объемами данных работали?",
    answers: [
      { text: "До 100K записей", next: "consultant_analyst_rate" },
      { text: "100K-1M записей", next: "consultant_analyst_advanced_rate" },
      { text: "Более 1M записей (Big Data)", next: "consultant_analyst_advanced_rate" }
    ]
  },

  consultant_analyst_advanced_rate: {
    id: "consultant_analyst_advanced_rate",
    stage: "Шаг 7 из 7",
    question: "Есть ли опыт машинного обучения?",
    answers: [
      { text: "Да, применяю ML", result: { role: "consultant", tariff: "strategist" } },
      { text: "Нет, только традиционная аналитика", result: { role: "consultant", tariff: "analyst" } }
    ]
  },

  consultant_analyst_clients: {
    id: "consultant_analyst_clients",
    stage: "Шаг 6 из 7+",
    question: "Сколько у вас было клиентов?",
    answers: [
      { text: "До 10", next: "consultant_analyst_rate" },
      { text: "10-30", next: "consultant_analyst_testimonials" },
      { text: "Более 30", next: "consultant_analyst_testimonials" }
    ]
  },

  consultant_analyst_testimonials: {
    id: "consultant_analyst_testimonials",
    stage: "Шаг 7 из 7",
    question: "Есть ли рекомендации?",
    answers: [
      { text: "Да, от нескольких клиентов", result: { role: "consultant", tariff: "strategist" } },
      { text: "Нет еще", result: { role: "consultant", tariff: "analyst" } }
    ]
  },

  consultant_analyst_industries: {
    id: "consultant_analyst_industries",
    stage: "Шаг 5 из 7+",
    question: "В каких индустриях работали?",
    answers: [
      { text: "1 индустрия (узкая специализация)", next: "consultant_analyst_clients" },
      { text: "2-3 индустрии", next: "consultant_analyst_methodologies" },
      { text: "Более 3 индустрий", next: "consultant_analyst_methodologies" }
    ]
  },

  consultant_analyst_methodologies: {
    id: "consultant_analyst_methodologies",
    stage: "Шаг 6 из 7+",
    question: "Какие методологии применяете?",
    answers: [
      { text: "Базовые (SWOT, Porter's 5 Forces)", next: "consultant_analyst_testimonials" },
      { text: "Продвинутые (BCG Matrix, Lean Analytics)", next: "consultant_strategist_deliverables" },
      { text: "Кастомизированные фреймворки", next: "consultant_strategist_deliverables" }
    ]
  },

  consultant_analyst_specialization: {
    id: "consultant_analyst_specialization",
    stage: "Шаг 5 из 7+",
    question: "Есть ли узкая специализация?",
    answers: [
      { text: "Да, эксперт в нише", next: "consultant_analyst_thought_leadership" },
      { text: "Нет, работаю широко", next: "consultant_analyst_industries" }
    ]
  },

  consultant_analyst_thought_leadership: {
    id: "consultant_analyst_thought_leadership",
    stage: "Шаг 6 из 7+",
    question: "Пишете ли статьи/исследования?",
    answers: [
      { text: "Да, регулярно публикуюсь", next: "consultant_strategist_rate_premium" },
      { text: "Нет", next: "consultant_analyst_methodologies" }
    ]
  },

  consultant_strategist_background: {
    id: "consultant_strategist_background",
    stage: "Шаг 4 из 7+",
    question: "Какой у вас бэкграунд?",
    answers: [
      { text: "Консалтинговая фирма (MBB, Big 4)", next: "consultant_strategist_years" },
      { text: "Корпоративная стратегия", next: "consultant_strategist_company_size" },
      { text: "Стартапы и быстрорастущие компании", next: "consultant_strategist_startup_stage" }
    ]
  },

  consultant_strategist_years: {
    id: "consultant_strategist_years",
    stage: "Шаг 5 из 7+",
    question: "Сколько лет в консалтинге?",
    answers: [
      { text: "3-5 лет", next: "consultant_strategist_level" },
      { text: "5-10 лет", next: "consultant_strategist_senior_projects" },
      { text: "Более 10 лет", next: "consultant_strategist_partner_track" }
    ]
  },

  consultant_strategist_level: {
    id: "consultant_strategist_level",
    stage: "Шаг 6 из 7+",
    question: "Какой уровень в фирме?",
    answers: [
      { text: "Consultant/Senior Consultant", next: "consultant_strategist_deliverables" },
      { text: "Manager/Senior Manager", next: "consultant_strategist_rate_mid" },
      { text: "Principal/Partner", next: "consultant_clevel_portfolio" }
    ]
  },

  consultant_strategist_deliverables: {
    id: "consultant_strategist_deliverables",
    stage: "Шаг 7 из 7",
    question: "Что вы поставляете клиентам?",
    answers: [
      { text: "Аналитические отчеты", result: { role: "consultant", tariff: "analyst" } },
      { text: "Стратегические рекомендации + план", result: { role: "consultant", tariff: "strategist" } },
      { text: "Полное сопровождение внедрения", result: { role: "consultant", tariff: "strategist" } }
    ]
  },

  consultant_strategist_rate_mid: {
    id: "consultant_strategist_rate_mid",
    stage: "Шаг 7 из 7",
    question: "Какой ваш дневной тариф?",
    answers: [
      { text: "$1000-$2000/день", result: { role: "consultant", tariff: "strategist" } },
      { text: "$2000-$4000/день", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_senior_projects: {
    id: "consultant_strategist_senior_projects",
    stage: "Шаг 6 из 7+",
    question: "Сколько проектов возглавляли?",
    answers: [
      { text: "5-15 проектов", next: "consultant_strategist_rate_mid" },
      { text: "15-30 проектов", next: "consultant_strategist_rate_premium" },
      { text: "Более 30 проектов", next: "consultant_clevel_transformation" }
    ]
  },

  consultant_strategist_rate_premium: {
    id: "consultant_strategist_rate_premium",
    stage: "Шаг 7 из 7",
    question: "Какой ваш дневной тариф?",
    answers: [
      { text: "$2000-$4000/день", result: { role: "consultant", tariff: "clevel" } },
      { text: "$4000-$8000/день", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_partner_track: {
    id: "consultant_strategist_partner_track",
    stage: "Шаг 6 из 7+",
    question: "Были ли партнером в фирме?",
    answers: [
      { text: "Да, был/являюсь партнером", next: "consultant_clevel_own_practice" },
      { text: "Нет, был Principal/Director", next: "consultant_strategist_rate_premium" }
    ]
  },

  consultant_clevel_own_practice: {
    id: "consultant_clevel_own_practice",
    stage: "Шаг 7 из 7",
    question: "Запустили ли собственную практику?",
    answers: [
      { text: "Да, работаю независимо", result: { role: "consultant", tariff: "clevel" } },
      { text: "Нет, все еще в фирме", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_company_size: {
    id: "consultant_strategist_company_size",
    stage: "Шаг 5 из 7+",
    question: "В каких компаниях работали?",
    answers: [
      { text: "Средний бизнес (50-500 сотр.)", next: "consultant_strategist_strategy_focus" },
      { text: "Крупные корпорации (500+)", next: "consultant_strategist_corporate_level" },
      { text: "Fortune 500", next: "consultant_clevel_history" }
    ]
  },

  consultant_strategist_strategy_focus: {
    id: "consultant_strategist_strategy_focus",
    stage: "Шаг 6 из 7+",
    question: "На чем фокусировались?",
    answers: [
      { text: "Рост и экспансия", next: "consultant_strategist_outcomes" },
      { text: "Оптимизация и эффективность", next: "consultant_strategist_outcomes" },
      { text: "Трансформация бизнес-модели", next: "consultant_strategist_transformation" }
    ]
  },

  consultant_strategist_outcomes: {
    id: "consultant_strategist_outcomes",
    stage: "Шаг 7 из 7",
    question: "Каковы измеримые результаты?",
    answers: [
      { text: "Рост выручки на X%", result: { role: "consultant", tariff: "strategist" } },
      { text: "Сокращение издержек на X%", result: { role: "consultant", tariff: "strategist" } },
      { text: "Успешный exit/IPO", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_transformation: {
    id: "consultant_strategist_transformation",
    stage: "Шаг 7 из 7",
    question: "Какого размера была трансформация?",
    answers: [
      { text: "Отдел/департамент", result: { role: "consultant", tariff: "strategist" } },
      { text: "Вся компания", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_corporate_level: {
    id: "consultant_strategist_corporate_level",
    stage: "Шаг 6 из 7+",
    question: "Какой был уровень?",
    answers: [
      { text: "Manager/Director", next: "consultant_strategist_rate_mid" },
      { text: "VP/SVP", next: "consultant_clevel_experience" },
      { text: "C-level", next: "consultant_clevel_history" }
    ]
  },

  consultant_strategist_startup_stage: {
    id: "consultant_strategist_startup_stage",
    stage: "Шаг 5 из 7+",
    question: "На каких стадиях работали?",
    answers: [
      { text: "Pre-seed/Seed", next: "consultant_strategist_startup_count" },
      { text: "Series A-B", next: "consultant_strategist_startup_growth" },
      { text: "Series C+ (scale-ups)", next: "consultant_strategist_scaleup" }
    ]
  },

  consultant_strategist_startup_count: {
    id: "consultant_strategist_startup_count",
    stage: "Шаг 6 из 7+",
    question: "Сколько стартапов консультировали?",
    answers: [
      { text: "1-5 стартапов", next: "consultant_strategist_equity_deals" },
      { text: "5-15 стартапов", next: "consultant_strategist_portfolio_outcomes" },
      { text: "Более 15", next: "consultant_strategist_portfolio_outcomes" }
    ]
  },

  consultant_strategist_equity_deals: {
    id: "consultant_strategist_equity_deals",
    stage: "Шаг 7 из 7",
    question: "Брали ли equity вместо cash?",
    answers: [
      { text: "Да, в нескольких проектах", result: { role: "consultant", tariff: "strategist" } },
      { text: "Нет, только cash", result: { role: "consultant", tariff: "strategist" } }
    ]
  },

  consultant_strategist_portfolio_outcomes: {
    id: "consultant_strategist_portfolio_outcomes",
    stage: "Шаг 7 из 7",
    question: "Были ли успешные exits в портфолио?",
    answers: [
      { text: "Да, несколько exits", result: { role: "consultant", tariff: "clevel" } },
      { text: "Нет", result: { role: "consultant", tariff: "strategist" } }
    ]
  },

  consultant_strategist_startup_growth: {
    id: "consultant_strategist_startup_growth",
    stage: "Шаг 6 из 7+",
    question: "Помогали ли в привлечении инвестиций?",
    answers: [
      { text: "Да, несколько раундов", next: "consultant_strategist_fundraising_size" },
      { text: "Нет, фокус на операциях", next: "consultant_strategist_startup_count" }
    ]
  },

  consultant_strategist_fundraising_size: {
    id: "consultant_strategist_fundraising_size",
    stage: "Шаг 7 из 7",
    question: "Какого размера раунды привлекали?",
    answers: [
      { text: "До $5M", result: { role: "consultant", tariff: "strategist" } },
      { text: "$5M-$20M", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более $20M", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_strategist_scaleup: {
    id: "consultant_strategist_scaleup",
    stage: "Шаг 6 из 7+",
    question: "В чем помогали scale-ups?",
    answers: [
      { text: "Международная экспансия", next: "consultant_strategist_markets" },
      { text: "Организационная структура", next: "consultant_clevel_transformation" },
      { text: "IPO подготовка", next: "consultant_clevel_ipo" }
    ]
  },

  consultant_strategist_markets: {
    id: "consultant_strategist_markets",
    stage: "Шаг 7 из 7",
    question: "Сколько рынков открывали?",
    answers: [
      { text: "1-2 рынка", result: { role: "consultant", tariff: "strategist" } },
      { text: "3-5 рынков", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более 5 рынков", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_history: {
    id: "consultant_clevel_history",
    stage: "Шаг 4 из 7+",
    question: "Какую C-level позицию занимали?",
    answers: [
      { text: "CFO", next: "consultant_clevel_company_type" },
      { text: "COO", next: "consultant_clevel_company_type" },
      { text: "CMO/CPO/CTO", next: "consultant_clevel_company_type" },
      { text: "CEO", next: "consultant_clevel_ceo_experience" }
    ]
  },

  consultant_clevel_company_type: {
    id: "consultant_clevel_company_type",
    stage: "Шаг 5 из 7+",
    question: "В каких компаниях?",
    answers: [
      { text: "Стартапы", next: "consultant_clevel_startup_outcomes" },
      { text: "Средний бизнес", next: "consultant_clevel_growth" },
      { text: "Корпорации", next: "consultant_clevel_corporate_scope" }
    ]
  },

  consultant_clevel_startup_outcomes: {
    id: "consultant_clevel_startup_outcomes",
    stage: "Шаг 6 из 7+",
    question: "Какие были outcomes?",
    answers: [
      { text: "Вырастил до series A/B", next: "consultant_clevel_fundraising" },
      { text: "Exit/acquisition", next: "consultant_clevel_exit_size" },
      { text: "IPO", next: "consultant_clevel_ipo" }
    ]
  },

  consultant_clevel_fundraising: {
    id: "consultant_clevel_fundraising",
    stage: "Шаг 7 из 7",
    question: "Сколько капитала привлекли?",
    answers: [
      { text: "До $10M", result: { role: "consultant", tariff: "clevel" } },
      { text: "$10M-$50M", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более $50M", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_exit_size: {
    id: "consultant_clevel_exit_size",
    stage: "Шаг 7 из 7",
    question: "Какого размера была сделка?",
    answers: [
      { text: "$10M-$50M", result: { role: "consultant", tariff: "clevel" } },
      { text: "$50M-$200M", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более $200M", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_ipo: {
    id: "consultant_clevel_ipo",
    stage: "Шаг 7 из 7",
    question: "Участвовали ли в IPO?",
    answers: [
      { text: "Да, вывел компанию на биржу", result: { role: "consultant", tariff: "clevel" } },
      { text: "Да, был в команде IPO", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_growth: {
    id: "consultant_clevel_growth",
    stage: "Шаг 6 из 7+",
    question: "На сколько вырос бизнес?",
    answers: [
      { text: "2x за 3 года", next: "consultant_clevel_team_built" },
      { text: "5x за 3 года", next: "consultant_clevel_transformation" },
      { text: "10x+ за 3 года", next: "consultant_clevel_transformation" }
    ]
  },

  consultant_clevel_team_built: {
    id: "consultant_clevel_team_built",
    stage: "Шаг 7 из 7",
    question: "Какую команду построили?",
    answers: [
      { text: "10-50 человек", result: { role: "consultant", tariff: "clevel" } },
      { text: "50-200 человек", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более 200 человек", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_transformation: {
    id: "consultant_clevel_transformation",
    stage: "Шаг 7 из 7",
    question: "Проводили ли трансформацию?",
    answers: [
      { text: "Да, digital transformation", result: { role: "consultant", tariff: "clevel" } },
      { text: "Да, культурная трансформация", result: { role: "consultant", tariff: "clevel" } },
      { text: "Да, полная реорганизация", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_corporate_scope: {
    id: "consultant_clevel_corporate_scope",
    stage: "Шаг 6 из 7+",
    question: "Какой был scope ответственности?",
    answers: [
      { text: "Департамент/бизнес-юнит", next: "consultant_clevel_team_built" },
      { text: "Регион (несколько стран)", next: "consultant_clevel_multi_market" },
      { text: "Global (вся компания)", next: "consultant_clevel_portfolio" }
    ]
  },

  consultant_clevel_multi_market: {
    id: "consultant_clevel_multi_market",
    stage: "Шаг 7 из 7",
    question: "Сколькими рынками управляли?",
    answers: [
      { text: "2-5 рынков", result: { role: "consultant", tariff: "clevel" } },
      { text: "5-10 рынков", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более 10 рынков", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_portfolio: {
    id: "consultant_clevel_portfolio",
    stage: "Шаг 7 из 7",
    question: "Консультируете ли несколько компаний?",
    answers: [
      { text: "Да, портфолио из 3-5 компаний", result: { role: "consultant", tariff: "clevel" } },
      { text: "Да, более 5 компаний", result: { role: "consultant", tariff: "clevel" } },
      { text: "Нет, фокус на одной", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_experience: {
    id: "consultant_clevel_experience",
    stage: "Шаг 7 из 7",
    question: "Сколько лет в C-level?",
    answers: [
      { text: "3-7 лет", result: { role: "consultant", tariff: "clevel" } },
      { text: "7-15 лет", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более 15 лет", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_ceo_experience: {
    id: "consultant_clevel_ceo_experience",
    stage: "Шаг 5 из 7+",
    question: "Сколько раз были CEO?",
    answers: [
      { text: "Один раз", next: "consultant_clevel_company_type" },
      { text: "2-3 раза", next: "consultant_clevel_serial_outcomes" },
      { text: "Более 3 раз (serial CEO)", next: "consultant_clevel_serial_success" }
    ]
  },

  consultant_clevel_serial_outcomes: {
    id: "consultant_clevel_serial_outcomes",
    stage: "Шаг 6 из 7+",
    question: "Были ли успешные exits?",
    answers: [
      { text: "Да, 1 exit", next: "consultant_clevel_exit_size" },
      { text: "Да, несколько exits", next: "consultant_clevel_serial_size" },
      { text: "Нет exits", next: "consultant_clevel_growth" }
    ]
  },

  consultant_clevel_serial_size: {
    id: "consultant_clevel_serial_size",
    stage: "Шаг 7 из 7",
    question: "Общий размер exits?",
    answers: [
      { text: "До $100M", result: { role: "consultant", tariff: "clevel" } },
      { text: "$100M-$500M", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более $500M", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_serial_success: {
    id: "consultant_clevel_serial_success",
    stage: "Шаг 6 из 7+",
    question: "Каков track record?",
    answers: [
      { text: "Все компании выросли", next: "consultant_clevel_board_multiple" },
      { text: "Были и успехи и неудачи", next: "consultant_clevel_learnings" }
    ]
  },

  consultant_clevel_board_multiple: {
    id: "consultant_clevel_board_multiple",
    stage: "Шаг 7 из 7",
    question: "В скольких board сейчас?",
    answers: [
      { text: "1-3 board seats", result: { role: "consultant", tariff: "clevel" } },
      { text: "4-7 board seats", result: { role: "consultant", tariff: "clevel" } },
      { text: "Более 7 board seats", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  consultant_clevel_learnings: {
    id: "consultant_clevel_learnings",
    stage: "Шаг 7 из 7",
    question: "Применяете ли опыт провалов?",
    answers: [
      { text: "Да, это ключевая ценность", result: { role: "consultant", tariff: "clevel" } },
      { text: "Да, но фокус на успехах", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  // ============ ВЕТКА ЭКСПЕРТОВ (расширенная до 7+) ============
  expert_entry: {
    id: "expert_entry",
    stage: "Шаг 3 из 7+",
    question: "Какой у вас уровень экспертизы?",
    answers: [
      { text: "Специалист (5-10 лет опыта)", next: "expert_specialist_domain" },
      { text: "Старший эксперт (10-15 лет)", next: "expert_senior_focus" },
      { text: "Гуру (15+ лет, признание в индустрии)", next: "expert_guru_value" }
    ]
  },

  expert_specialist_domain: {
    id: "expert_specialist_domain",
    stage: "Шаг 4 из 7+",
    question: "В какой области ваша экспертиза?",
    answers: [
      { text: "Технологии (CTO, архитектор)", next: "expert_specialist_certifications" },
      { text: "Продукт (CPO, product management)", next: "expert_specialist_certifications" },
      { text: "Маркетинг (CMO, growth)", next: "expert_specialist_certifications" },
      { text: "Финансы (CFO, контроллинг)", next: "expert_specialist_certifications" }
    ]
  },

  expert_specialist_certifications: {
    id: "expert_specialist_certifications",
    stage: "Шаг 5 из 7+",
    question: "Есть ли у вас профессиональные сертификаты?",
    answers: [
      { text: "Да, международные сертификации", next: "expert_specialist_availability" },
      { text: "Нет, но есть опыт в крупных компаниях", next: "expert_specialist_availability" }
    ]
  },

  expert_specialist_availability: {
    id: "expert_specialist_availability",
    stage: "Шаг 6 из 7+",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "Part-time (10-20 часов/неделю)", next: "expert_specialist_rate" },
      { text: "Полная занятость", next: "expert_specialist_commitment" }
    ]
  },

  expert_specialist_rate: {
    id: "expert_specialist_rate",
    stage: "Шаг 7 из 7",
    question: "Какой ваш часовой тариф?",
    answers: [
      { text: "$100-200/час", result: { role: "expert", tariff: "specialist" } },
      { text: "$200-400/час", result: { role: "expert", tariff: "senior" } }
    ]
  },

  expert_specialist_commitment: {
    id: "expert_specialist_commitment",
    stage: "Шаг 7 из 7",
    question: "Готовы ли к долгосрочному контракту?",
    answers: [
      { text: "Да, 6-12 месяцев", result: { role: "expert", tariff: "senior" } },
      { text: "Нет, предпочитаю проектную работу", result: { role: "expert", tariff: "specialist" } }
    ]
  },

  expert_senior_focus: {
    id: "expert_senior_focus",
    stage: "Шаг 4 из 7+",
    question: "На чем вы фокусируетесь?",
    answers: [
      { text: "Стратегические консультации", next: "expert_senior_industries" },
      { text: "Операционное внедрение", next: "expert_senior_team_size" },
      { text: "Менторинг и обучение", next: "expert_senior_mentees" }
    ]
  },

  expert_senior_industries: {
    id: "expert_senior_industries",
    stage: "Шаг 5 из 7+",
    question: "В скольких индустриях работали?",
    answers: [
      { text: "1-2 индустрии (узкая специализация)", next: "expert_senior_clients" },
      { text: "3-5 индустрий", next: "expert_senior_track_record" },
      { text: "Более 5 (широкий опыт)", next: "expert_senior_track_record" }
    ]
  },

  expert_senior_clients: {
    id: "expert_senior_clients",
    stage: "Шаг 6 из 7+",
    question: "С кем предпочитаете работать?",
    answers: [
      { text: "Стартапы (seed-series A)", next: "expert_senior_equity" },
      { text: "Scale-ups (series B+)", next: "expert_senior_pricing" },
      { text: "Enterprise", next: "expert_senior_pricing" }
    ]
  },

  expert_senior_equity: {
    id: "expert_senior_equity",
    stage: "Шаг 7 из 7",
    question: "Рассматриваете ли equity compensation?",
    answers: [
      { text: "Да, если проект интересный", result: { role: "expert", tariff: "senior" } },
      { text: "Только частично (cash + equity)", result: { role: "expert", tariff: "senior" } },
      { text: "Нет, только cash", result: { role: "expert", tariff: "senior" } }
    ]
  },

  expert_senior_pricing: {
    id: "expert_senior_pricing",
    stage: "Шаг 7 из 7",
    question: "Какая модель оплаты?",
    answers: [
      { text: "Retainer (месячный)", result: { role: "expert", tariff: "senior" } },
      { text: "Проектная ставка", result: { role: "expert", tariff: "senior" } },
      { text: "Success fee", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_senior_track_record: {
    id: "expert_senior_track_record",
    stage: "Шаг 6 из 7+",
    question: "Есть ли успешные exits в портфолио?",
    answers: [
      { text: "Да, был частью команды exit", next: "expert_senior_reference" },
      { text: "Нет, но помогал масштабировать", next: "expert_senior_pricing" }
    ]
  },

  expert_senior_reference: {
    id: "expert_senior_reference",
    stage: "Шаг 7 из 7",
    question: "Можете ли предоставить рекомендации?",
    answers: [
      { text: "Да, от CEO/основателей", result: { role: "expert", tariff: "guru" } },
      { text: "Да, от менеджеров", result: { role: "expert", tariff: "senior" } }
    ]
  },

  expert_senior_team_size: {
    id: "expert_senior_team_size",
    stage: "Шаг 5 из 7+",
    question: "Какого размера команды управляли?",
    answers: [
      { text: "До 10 человек", next: "expert_senior_clients" },
      { text: "10-50 человек", next: "expert_senior_track_record" },
      { text: "Более 50 человек", next: "expert_senior_c_level" }
    ]
  },

  expert_senior_c_level: {
    id: "expert_senior_c_level",
    stage: "Шаг 6 из 7+",
    question: "Были ли в C-level позиции?",
    answers: [
      { text: "Да, был CXO", next: "expert_senior_interim" },
      { text: "Нет, VP/Director level", next: "expert_senior_pricing" }
    ]
  },

  expert_senior_interim: {
    id: "expert_senior_interim",
    stage: "Шаг 7 из 7",
    question: "Рассматриваете ли interim CXO роль?",
    answers: [
      { text: "Да, это приоритет", result: { role: "expert", tariff: "guru" } },
      { text: "Нет, только консалтинг", result: { role: "expert", tariff: "senior" } }
    ]
  },

  expert_senior_mentees: {
    id: "expert_senior_mentees",
    stage: "Шаг 5 из 7+",
    question: "Сколько у вас было менти?",
    answers: [
      { text: "До 10 человек", next: "expert_senior_programs" },
      { text: "10-50 человек", next: "expert_senior_teaching" },
      { text: "Более 50 (корпоративное обучение)", next: "expert_senior_thought_leader" }
    ]
  },

  expert_senior_programs: {
    id: "expert_senior_programs",
    stage: "Шаг 6 из 7+",
    question: "Есть ли структурированная программа?",
    answers: [
      { text: "Да, разработал программу", next: "expert_senior_pricing_mentor" },
      { text: "Нет, индивидуальный подход", next: "expert_senior_pricing_mentor" }
    ]
  },

  expert_senior_pricing_mentor: {
    id: "expert_senior_pricing_mentor",
    stage: "Шаг 7 из 7",
    question: "Какая модель работы с менти?",
    answers: [
      { text: "Почасовая оплата", result: { role: "expert", tariff: "senior" } },
      { text: "Месячный retainer", result: { role: "expert", tariff: "senior" } },
      { text: "Equity в стартапе", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_senior_teaching: {
    id: "expert_senior_teaching",
    stage: "Шаг 6 из 7+",
    question: "Преподаете ли в университетах?",
    answers: [
      { text: "Да, регулярно", next: "expert_senior_publications" },
      { text: "Нет, только корпоративное обучение", next: "expert_senior_pricing_mentor" }
    ]
  },

  expert_senior_publications: {
    id: "expert_senior_publications",
    stage: "Шаг 7 из 7",
    question: "Есть ли публикации или книги?",
    answers: [
      { text: "Да, написал книгу(и)", result: { role: "expert", tariff: "guru" } },
      { text: "Да, регулярно пишу статьи", result: { role: "expert", tariff: "guru" } },
      { text: "Нет", result: { role: "expert", tariff: "senior" } }
    ]
  },

  expert_senior_thought_leader: {
    id: "expert_senior_thought_leader",
    stage: "Шаг 6 из 7+",
    question: "Вы thought leader в индустрии?",
    answers: [
      { text: "Да, меня приглашают на конференции", next: "expert_guru_speaking" },
      { text: "Нет, но есть экспертиза", next: "expert_senior_pricing_mentor" }
    ]
  },

  expert_guru_speaking: {
    id: "expert_guru_speaking",
    stage: "Шаг 7 из 7",
    question: "Выступаете ли на международных конференциях?",
    answers: [
      { text: "Да, регулярно", result: { role: "expert", tariff: "guru" } },
      { text: "Иногда", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_value: {
    id: "expert_guru_value",
    stage: "Шаг 4 из 7+",
    question: "В чем ваша уникальная ценность?",
    answers: [
      { text: "Построил и продал стартапы", next: "expert_guru_exits" },
      { text: "Работал в FAANG/топ компаниях", next: "expert_guru_network" },
      { text: "Признанный эксперт в узкой нише", next: "expert_guru_niche" }
    ]
  },

  expert_guru_exits: {
    id: "expert_guru_exits",
    stage: "Шаг 5 из 7+",
    question: "Сколько было exits?",
    answers: [
      { text: "1 exit", next: "expert_guru_deal_size" },
      { text: "2-3 exits", next: "expert_guru_advisory_board" },
      { text: "Более 3 exits", next: "expert_guru_portfolio" }
    ]
  },

  expert_guru_deal_size: {
    id: "expert_guru_deal_size",
    stage: "Шаг 6 из 7+",
    question: "Какого размера была сделка?",
    answers: [
      { text: "$1M - $10M", next: "expert_guru_role_type" },
      { text: "$10M - $100M", next: "expert_guru_board_seats" },
      { text: "Более $100M", next: "expert_guru_exclusive" }
    ]
  },

  expert_guru_role_type: {
    id: "expert_guru_role_type",
    stage: "Шаг 7 из 7",
    question: "Какую роль предпочитаете?",
    answers: [
      { text: "Advisory board member", result: { role: "expert", tariff: "guru" } },
      { text: "Interim executive", result: { role: "expert", tariff: "guru" } },
      { text: "Strategic consultant", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_board_seats: {
    id: "expert_guru_board_seats",
    stage: "Шаг 7 из 7",
    question: "Сколько board seats у вас сейчас?",
    answers: [
      { text: "1-2", result: { role: "expert", tariff: "guru" } },
      { text: "3-5", result: { role: "expert", tariff: "guru" } },
      { text: "Более 5", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_exclusive: {
    id: "expert_guru_exclusive",
    stage: "Шаг 7 из 7",
    question: "Работаете ли только с эксклюзивными проектами?",
    answers: [
      { text: "Да, очень селективный", result: { role: "expert", tariff: "guru" } },
      { text: "Нет, открыт к разным проектам", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_advisory_board: {
    id: "expert_guru_advisory_board",
    stage: "Шаг 6 из 7+",
    question: "В скольких advisory boards состоите?",
    answers: [
      { text: "1-3", next: "expert_guru_compensation" },
      { text: "4-10", next: "expert_guru_portfolio" },
      { text: "Более 10", next: "expert_guru_venture" }
    ]
  },

  expert_guru_compensation: {
    id: "expert_guru_compensation",
    stage: "Шаг 7 из 7",
    question: "Какая компенсация?",
    answers: [
      { text: "Equity only", result: { role: "expert", tariff: "guru" } },
      { text: "Cash + equity", result: { role: "expert", tariff: "guru" } },
      { text: "Cash only (высокая ставка)", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_portfolio: {
    id: "expert_guru_portfolio",
    stage: "Шаг 7 из 7",
    question: "Инвестируете ли в портфолио?",
    answers: [
      { text: "Да, активный angel investor", result: { role: "expert", tariff: "guru" } },
      { text: "Да, иногда", result: { role: "expert", tariff: "guru" } },
      { text: "Нет, только экспертиза", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_venture: {
    id: "expert_guru_venture",
    stage: "Шаг 7 из 7",
    question: "Ассоциированы ли с VC фондом?",
    answers: [
      { text: "Да, партнер/советник VC", result: { role: "expert", tariff: "guru" } },
      { text: "Нет", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_network: {
    id: "expert_guru_network",
    stage: "Шаг 5 из 7+",
    question: "В каких компаниях работали?",
    answers: [
      { text: "Google, Facebook, Amazon и т.д.", next: "expert_guru_level_faang" },
      { text: "Лидирующие стартапы (unicorns)", next: "expert_guru_startup_role" },
      { text: "Fortune 500", next: "expert_guru_corporate_role" }
    ]
  },

  expert_guru_level_faang: {
    id: "expert_guru_level_faang",
    stage: "Шаг 6 из 7+",
    question: "Какой был уровень?",
    answers: [
      { text: "Senior engineer/manager", next: "expert_guru_role_type" },
      { text: "Director/VP", next: "expert_guru_board_seats" },
      { text: "C-level", next: "expert_guru_exclusive" }
    ]
  },

  expert_guru_startup_role: {
    id: "expert_guru_startup_role",
    stage: "Шаг 6 из 7+",
    question: "Какую роль играли?",
    answers: [
      { text: "Early employee (1-50)", next: "expert_guru_equity_outcome" },
      { text: "Founding team", next: "expert_guru_deal_size" },
      { text: "Executive hire", next: "expert_guru_board_seats" }
    ]
  },

  expert_guru_equity_outcome: {
    id: "expert_guru_equity_outcome",
    stage: "Шаг 7 из 7",
    question: "Какой был outcome?",
    answers: [
      { text: "IPO", result: { role: "expert", tariff: "guru" } },
      { text: "Acquisition", result: { role: "expert", tariff: "guru" } },
      { text: "Все еще там/не было exit", result: { role: "expert", tariff: "guru" } }
    ]
  },

  expert_guru_corporate_role: {
    id: "expert_guru_corporate_role",
    stage: "Шаг 6 из 7+",
    question: "Какая была позиция?",
    answers: [
      { text: "VP/SVP", next: "expert_guru_board_seats" },
      { text: "C-level", next: "expert_guru_exclusive" }
    ]
  },

  expert_guru_niche: {
    id: "expert_guru_niche",
    stage: "Шаг 5 из 7+",
    question: "Что это за ниша?",
    answers: [
      { text: "Blockchain/Web3", next: "expert_guru_recognition" },
      { text: "AI/ML", next: "expert_guru_recognition" },
      { text: "Quantum computing", next: "expert_guru_recognition" },
      { text: "Biotech/Healthcare", next: "expert_guru_recognition" },
      { text: "Другая emerging tech", next: "expert_guru_recognition" }
    ]
  },

  expert_guru_recognition: {
    id: "expert_guru_recognition",
    stage: "Шаг 6 из 7+",
    question: "Какое признание в индустрии?",
    answers: [
      { text: "Публикации в top journals", next: "expert_guru_patents" },
      { text: "Keynote speaker на конференциях", next: "expert_senior_publications" },
      { text: "Награды и премии", next: "expert_guru_portfolio" }
    ]
  },

  expert_guru_patents: {
    id: "expert_guru_patents",
    stage: "Шаг 7 из 7",
    question: "Есть ли патенты?",
    answers: [
      { text: "Да, несколько патентов", result: { role: "expert", tariff: "guru" } },
      { text: "Нет", result: { role: "expert", tariff: "guru" } }
    ]
  },

  // ============ ВЕТКА ФРИЛАНСЕРОВ (расширенная до 7+) ============
  ecosystem_freelancer_level: {
    id: "ecosystem_freelancer_level",
    stage: "Шаг 3 из 7+",
    question: "Какой у вас уровень?",
    answers: [
      { text: "Новичок (менее 1 года)", next: "freelancer_novice_skills" },
      { text: "Профессионал (1-3 года)", next: "freelancer_pro_specialization" },
      { text: "Эксперт (3+ лет)", next: "freelancer_expert_niche" }
    ]
  },

  freelancer_novice_skills: {
    id: "freelancer_novice_skills",
    stage: "Шаг 4 из 7+",
    question: "Какие навыки вы предлагаете?",
    answers: [
      { text: "Дизайн (UI/UX, графика)", next: "freelancer_novice_portfolio" },
      { text: "Разработка (frontend, backend)", next: "freelancer_novice_portfolio" },
      { text: "Контент (копирайтинг, SMM)", next: "freelancer_novice_portfolio" },
      { text: "Другое", next: "freelancer_novice_portfolio" }
    ]
  },

  freelancer_novice_portfolio: {
    id: "freelancer_novice_portfolio",
    stage: "Шаг 5 из 7+",
    question: "Есть ли у вас портфолио?",
    answers: [
      { text: "Да, есть 5+ работ", next: "freelancer_novice_rate" },
      { text: "Да, но только 1-3 работы", next: "freelancer_novice_learning" },
      { text: "Нет, я только начинаю", next: "freelancer_novice_first_project" }
    ]
  },

  freelancer_novice_rate: {
    id: "freelancer_novice_rate",
    stage: "Шаг 6 из 7+",
    question: "Какой ваш часовой тариф?",
    answers: [
      { text: "До $20/час", next: "freelancer_novice_goal" },
      { text: "$20-40/час", next: "freelancer_novice_commitment" }
    ]
  },

  freelancer_novice_goal: {
    id: "freelancer_novice_goal",
    stage: "Шаг 7 из 7",
    question: "Какая ваша главная цель?",
    answers: [
      { text: "Набраться опыта", result: { role: "freelancer", tariff: "novice" } },
      { text: "Зарабатывать деньги", result: { role: "freelancer", tariff: "novice" } }
    ]
  },

  freelancer_novice_commitment: {
    id: "freelancer_novice_commitment",
    stage: "Шаг 7 из 7",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "Part-time (до 20 часов/неделю)", result: { role: "freelancer", tariff: "novice" } },
      { text: "Full-time (40+ часов/неделю)", result: { role: "freelancer", tariff: "professional" } }
    ]
  },

  freelancer_novice_learning: {
    id: "freelancer_novice_learning",
    stage: "Шаг 6 из 7+",
    question: "Хотите ли развивать навыки?",
    answers: [
      { text: "Да, нужен менторинг", next: "freelancer_novice_mentor_support" },
      { text: "Нет, буду учиться сам", next: "freelancer_novice_goal" }
    ]
  },

  freelancer_novice_mentor_support: {
    id: "freelancer_novice_mentor_support",
    stage: "Шаг 7 из 7",
    question: "Нужна ли помощь в поиске клиентов?",
    answers: [
      { text: "Да, это критично", result: { role: "freelancer", tariff: "novice" } },
      { text: "Нет, найду сам", result: { role: "freelancer", tariff: "novice" } }
    ]
  },

  freelancer_novice_first_project: {
    id: "freelancer_novice_first_project",
    stage: "Шаг 6 из 7+",
    question: "Готовы ли работать за символическую плату?",
    answers: [
      { text: "Да, для первого опыта", next: "freelancer_novice_timeline" },
      { text: "Нет, хочу нормальную ставку", next: "freelancer_novice_goal" }
    ]
  },

  freelancer_novice_timeline: {
    id: "freelancer_novice_timeline",
    stage: "Шаг 7 из 7",
    question: "Когда хотите начать?",
    answers: [
      { text: "Прямо сейчас", result: { role: "freelancer", tariff: "novice" } },
      { text: "Через 1-2 месяца", result: { role: "freelancer", tariff: "novice" } }
    ]
  },

  freelancer_pro_specialization: {
    id: "freelancer_pro_specialization",
    stage: "Шаг 4 из 7+",
    question: "Какая ваша специализация?",
    answers: [
      { text: "Веб-разработка (React, Vue, Node)", next: "freelancer_pro_clients" },
      { text: "Мобильная разработка (iOS, Android)", next: "freelancer_pro_clients" },
      { text: "UI/UX дизайн", next: "freelancer_pro_clients" },
      { text: "Digital маркетинг", next: "freelancer_pro_clients" },
      { text: "Другое", next: "freelancer_pro_clients" }
    ]
  },

  freelancer_pro_clients: {
    id: "freelancer_pro_clients",
    stage: "Шаг 5 из 7+",
    question: "Сколько клиентов у вас было?",
    answers: [
      { text: "До 10 клиентов", next: "freelancer_pro_rate" },
      { text: "10-30 клиентов", next: "freelancer_pro_recurring" },
      { text: "Более 30 клиентов", next: "freelancer_pro_team" }
    ]
  },

  freelancer_pro_rate: {
    id: "freelancer_pro_rate",
    stage: "Шаг 6 из 7+",
    question: "Какой ваш текущий тариф?",
    answers: [
      { text: "$30-50/час", next: "freelancer_pro_project_type" },
      { text: "$50-100/час", next: "freelancer_pro_availability" }
    ]
  },

  freelancer_pro_project_type: {
    id: "freelancer_pro_project_type",
    stage: "Шаг 7 из 7",
    question: "Какие проекты предпочитаете?",
    answers: [
      { text: "Краткосрочные (до 1 месяца)", result: { role: "freelancer", tariff: "professional" } },
      { text: "Долгосрочные контракты", result: { role: "freelancer", tariff: "professional" } }
    ]
  },

  freelancer_pro_availability: {
    id: "freelancer_pro_availability",
    stage: "Шаг 7 из 7",
    question: "Какая ваша доступность?",
    answers: [
      { text: "Part-time (20 часов)", result: { role: "freelancer", tariff: "professional" } },
      { text: "Full-time (40+ часов)", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  freelancer_pro_recurring: {
    id: "freelancer_pro_recurring",
    stage: "Шаг 6 из 7+",
    question: "Есть ли у вас постоянные клиенты?",
    answers: [
      { text: "Да, 3+ ретейнеров", next: "freelancer_pro_revenue" },
      { text: "Нет, ищу каждый раз", next: "freelancer_pro_project_type" }
    ]
  },

  freelancer_pro_revenue: {
    id: "freelancer_pro_revenue",
    stage: "Шаг 7 из 7",
    question: "Какой месячный доход?",
    answers: [
      { text: "$3k-$5k/месяц", result: { role: "freelancer", tariff: "professional" } },
      { text: "$5k-$10k/месяц", result: { role: "freelancer", tariff: "expert" } },
      { text: "Более $10k/месяц", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  freelancer_pro_team: {
    id: "freelancer_pro_team",
    stage: "Шаг 6 из 7+",
    question: "Работаете ли в команде?",
    answers: [
      { text: "Да, у меня есть команда", next: "freelancer_to_agency" },
      { text: "Нет, работаю один", next: "freelancer_pro_project_type" }
    ]
  },

  freelancer_to_agency: {
    id: "freelancer_to_agency",
    stage: "Шаг 7 из 7",
    question: "Планируете ли развивать агентство?",
    answers: [
      { text: "Да, это моя цель", result: { role: "outsourcer", tariff: "studio" } },
      { text: "Нет, останусь фрилансером", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  freelancer_expert_niche: {
    id: "freelancer_expert_niche",
    stage: "Шаг 4 из 7+",
    question: "Есть ли у вас узкая ниша?",
    answers: [
      { text: "Да, специализируюсь на определенной индустрии", next: "freelancer_expert_rate" },
      { text: "Нет, беру любые проекты", next: "freelancer_expert_branding" }
    ]
  },

  freelancer_expert_rate: {
    id: "freelancer_expert_rate",
    stage: "Шаг 5 из 7+",
    question: "Какой ваш тариф?",
    answers: [
      { text: "$80-150/час", next: "freelancer_expert_projects" },
      { text: "$150-300/час", next: "freelancer_expert_vip_clients" },
      { text: "Более $300/час", next: "freelancer_expert_consulting" }
    ]
  },

  freelancer_expert_projects: {
    id: "freelancer_expert_projects",
    stage: "Шаг 6 из 7+",
    question: "Какие проекты вам интересны?",
    answers: [
      { text: "Стартапы с потенциалом", next: "freelancer_expert_equity" },
      { text: "Enterprise клиенты", next: "freelancer_expert_retainer" }
    ]
  },

  freelancer_expert_equity: {
    id: "freelancer_expert_equity",
    stage: "Шаг 7 из 7",
    question: "Рассматриваете ли equity вместо оплаты?",
    answers: [
      { text: "Да, если проект перспективный", result: { role: "expert", tariff: "senior" } },
      { text: "Нет, только деньги", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  freelancer_expert_retainer: {
    id: "freelancer_expert_retainer",
    stage: "Шаг 7 из 7",
    question: "Предпочитаете retainer или проектную работу?",
    answers: [
      { text: "Retainer с фиксированной ставкой", result: { role: "freelancer", tariff: "expert" } },
      { text: "Проектная с премией за результат", result: { role: "expert", tariff: "specialist" } }
    ]
  },

  freelancer_expert_vip_clients: {
    id: "freelancer_expert_vip_clients",
    stage: "Шаг 6 из 7+",
    question: "С кем предпочитаете работать?",
    answers: [
      { text: "Только C-level и основатели", next: "freelancer_expert_advisory" },
      { text: "С менеджерами проектов", next: "freelancer_expert_retainer" }
    ]
  },

  freelancer_expert_advisory: {
    id: "freelancer_expert_advisory",
    stage: "Шаг 7 из 7",
    question: "Готовы ли выполнять роль advisory?",
    answers: [
      { text: "Да, это моя основная роль", result: { role: "expert", tariff: "guru" } },
      { text: "Нет, предпочитаю execution", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  freelancer_expert_consulting: {
    id: "freelancer_expert_consulting",
    stage: "Шаг 5 из 7+",
    question: "Вы консультант или исполнитель?",
    answers: [
      { text: "Консультант (стратегия, аудит)", next: "freelancer_expert_industry" },
      { text: "Исполнитель (hands-on работа)", next: "freelancer_expert_retainer" }
    ]
  },

  freelancer_expert_industry: {
    id: "freelancer_expert_industry",
    stage: "Шаг 6 из 7+",
    question: "В какой индустрии ваша экспертиза?",
    answers: [
      { text: "FinTech / Crypto", next: "freelancer_expert_track_record" },
      { text: "HealthTech / BioTech", next: "freelancer_expert_track_record" },
      { text: "AI / ML / Big Data", next: "freelancer_expert_track_record" },
      { text: "E-commerce / Retail", next: "freelancer_expert_track_record" }
    ]
  },

  freelancer_expert_track_record: {
    id: "freelancer_expert_track_record",
    stage: "Шаг 7 из 7",
    question: "Есть ли у вас успешные кейсы?",
    answers: [
      { text: "Да, помог вырасти нескольким стартапам", result: { role: "expert", tariff: "guru" } },
      { text: "Да, есть портфолио проектов", result: { role: "expert", tariff: "senior" } }
    ]
  },

  freelancer_expert_branding: {
    id: "freelancer_expert_branding",
    stage: "Шаг 5 из 7+",
    question: "Есть ли у вас личный бренд?",
    answers: [
      { text: "Да, меня знают в индустрии", next: "freelancer_expert_rate" },
      { text: "Нет, работаю без PR", next: "freelancer_expert_projects" }
    ]
  },

  // === OUTSOURCER BRANCH ===
  outsourcer_team_size: {
    id: "outsourcer_team_size",
    stage: "Шаг 4 из 7+",
    question: "Какого размера ваша команда?",
    answers: [
      { text: "2-5 человек (студия)", next: "outsourcer_studio_focus" },
      { text: "6-15 человек (агентство)", next: "outsourcer_agency_specialization" },
      { text: "Более 15 человек (компания)", next: "outsourcer_company_scale" }
    ]
  },

  outsourcer_studio_focus: {
    id: "outsourcer_studio_focus",
    stage: "Шаг 5 из 7+",
    question: "На чем специализируется студия?",
    answers: [
      { text: "Дизайн и UX/UI", next: "outsourcer_studio_clients" },
      { text: "Разработка (web/mobile)", next: "outsourcer_studio_clients" },
      { text: "Маркетинг и контент", next: "outsourcer_studio_clients" },
      { text: "Комплексные решения", next: "outsourcer_studio_revenue" }
    ]
  },

  outsourcer_studio_clients: {
    id: "outsourcer_studio_clients",
    stage: "Шаг 6 из 7+",
    question: "Сколько у вас активных клиентов?",
    answers: [
      { text: "1-3 клиента", next: "outsourcer_studio_growth" },
      { text: "4-10 клиентов", next: "outsourcer_studio_revenue" },
      { text: "Более 10 клиентов", next: "outsourcer_agency_specialization" }
    ]
  },

  outsourcer_studio_growth: {
    id: "outsourcer_studio_growth",
    stage: "Шаг 7 из 7",
    question: "Планируете ли расширение?",
    answers: [
      { text: "Да, хочу масштабировать", result: { role: "outsourcer", tariff: "studio" } },
      { text: "Нет, комфортно в текущем размере", result: { role: "outsourcer", tariff: "boutique" } }
    ]
  },

  outsourcer_studio_revenue: {
    id: "outsourcer_studio_revenue",
    stage: "Шаг 7 из 7",
    question: "Какой месячный оборот?",
    answers: [
      { text: "До $20k/месяц", result: { role: "outsourcer", tariff: "boutique" } },
      { text: "$20k-$50k/месяц", result: { role: "outsourcer", tariff: "studio" } },
      { text: "Более $50k/месяц", result: { role: "outsourcer", tariff: "agency" } }
    ]
  },

  outsourcer_agency_specialization: {
    id: "outsourcer_agency_specialization",
    stage: "Шаг 5 из 7+",
    question: "Какая специализация агентства?",
    answers: [
      { text: "Full-cycle разработка", next: "outsourcer_agency_verticals" },
      { text: "Digital маркетинг", next: "outsourcer_agency_services" },
      { text: "Консалтинг + execution", next: "outsourcer_agency_clients_size" }
    ]
  },

  outsourcer_agency_verticals: {
    id: "outsourcer_agency_verticals",
    stage: "Шаг 6 из 7+",
    question: "В каких вертикалях работаете?",
    answers: [
      { text: "1-2 индустрии (узкая ниша)", next: "outsourcer_agency_pricing" },
      { text: "3-5 индустрий", next: "outsourcer_agency_revenue" },
      { text: "Любые проекты", next: "outsourcer_agency_competition" }
    ]
  },

  outsourcer_agency_pricing: {
    id: "outsourcer_agency_pricing",
    stage: "Шаг 7 из 7",
    question: "Какая модель ценообразования?",
    answers: [
      { text: "Почасовая", result: { role: "outsourcer", tariff: "studio" } },
      { text: "Fixed price проекты", result: { role: "outsourcer", tariff: "agency" } },
      { text: "Retainer + success fee", result: { role: "outsourcer", tariff: "agency" } }
    ]
  },

  outsourcer_agency_revenue: {
    id: "outsourcer_agency_revenue",
    stage: "Шаг 7 из 7",
    question: "Какой годовой оборот?",
    answers: [
      { text: "$200k-$500k", result: { role: "outsourcer", tariff: "studio" } },
      { text: "$500k-$2M", result: { role: "outsourcer", tariff: "agency" } },
      { text: "Более $2M", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_agency_competition: {
    id: "outsourcer_agency_competition",
    stage: "Шаг 7 из 7",
    question: "Как конкурируете на рынке?",
    answers: [
      { text: "Цена (дешевле конкурентов)", result: { role: "outsourcer", tariff: "studio" } },
      { text: "Качество и экспертиза", result: { role: "outsourcer", tariff: "agency" } },
      { text: "Уникальное позиционирование", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_agency_services: {
    id: "outsourcer_agency_services",
    stage: "Шаг 6 из 7+",
    question: "Какие услуги предоставляете?",
    answers: [
      { text: "Performance маркетинг", next: "outsourcer_agency_pricing" },
      { text: "Брендинг + креатив", next: "outsourcer_agency_revenue" },
      { text: "Комплексный digital", next: "outsourcer_agency_revenue" }
    ]
  },

  outsourcer_agency_clients_size: {
    id: "outsourcer_agency_clients_size",
    stage: "Шаг 6 из 7+",
    question: "С кем работаете?",
    answers: [
      { text: "Стартапы и SMB", next: "outsourcer_agency_pricing" },
      { text: "Mid-market компании", next: "outsourcer_agency_revenue" },
      { text: "Enterprise клиенты", next: "outsourcer_enterprise_contracts" }
    ]
  },

  outsourcer_enterprise_contracts: {
    id: "outsourcer_enterprise_contracts",
    stage: "Шаг 7 из 7",
    question: "Какой средний размер контракта?",
    answers: [
      { text: "$50k-$200k", result: { role: "outsourcer", tariff: "agency" } },
      { text: "$200k-$1M", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "Более $1M", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_company_scale: {
    id: "outsourcer_company_scale",
    stage: "Шаг 5 из 7+",
    question: "Какова структура компании?",
    answers: [
      { text: "Несколько департаментов", next: "outsourcer_company_services" },
      { text: "Офисы в нескольких городах/странах", next: "outsourcer_company_geography" },
      { text: "Вертикально интегрированная", next: "outsourcer_company_verticals" }
    ]
  },

  outsourcer_company_services: {
    id: "outsourcer_company_services",
    stage: "Шаг 6 из 7+",
    question: "Какие направления развиты?",
    answers: [
      { text: "Разработка + дизайн", next: "outsourcer_company_revenue" },
      { text: "+ Маркетинг", next: "outsourcer_company_revenue" },
      { text: "Full-service (все услуги)", next: "outsourcer_company_partnerships" }
    ]
  },

  outsourcer_company_revenue: {
    id: "outsourcer_company_revenue",
    stage: "Шаг 7 из 7",
    question: "Каков годовой оборот?",
    answers: [
      { text: "$2M-$5M", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "$5M-$20M", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "Более $20M", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_company_partnerships: {
    id: "outsourcer_company_partnerships",
    stage: "Шаг 7 из 7",
    question: "Есть ли партнерства с глобальными брендами?",
    answers: [
      { text: "Да, золотой партнер (Google, Meta и т.д.)", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "Нет, но планируем", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_company_geography: {
    id: "outsourcer_company_geography",
    stage: "Шаг 6 из 7+",
    question: "Где расположены офисы?",
    answers: [
      { text: "В одной стране", next: "outsourcer_company_revenue" },
      { text: "В нескольких странах", next: "outsourcer_company_global" },
      { text: "На нескольких континентах", next: "outsourcer_company_global" }
    ]
  },

  outsourcer_company_global: {
    id: "outsourcer_company_global",
    stage: "Шаг 7 из 7",
    question: "Сколько сотрудников всего?",
    answers: [
      { text: "15-50 человек", result: { role: "outsourcer", tariff: "agency" } },
      { text: "50-200 человек", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "Более 200 человек", result: { role: "outsourcer", tariff: "enterprise" } }
    ]
  },

  outsourcer_company_verticals: {
    id: "outsourcer_company_verticals",
    stage: "Шаг 6 из 7+",
    question: "Есть ли собственные продукты?",
    answers: [
      { text: "Да, развиваем SaaS продукты", next: "outsourcer_company_product_revenue" },
      { text: "Нет, только услуги", next: "outsourcer_company_revenue" }
    ]
  },

  outsourcer_company_product_revenue: {
    id: "outsourcer_company_product_revenue",
    stage: "Шаг 7 из 7",
    question: "Какая доля выручки от продуктов?",
    answers: [
      { text: "До 20%", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "20-50%", result: { role: "outsourcer", tariff: "enterprise" } },
      { text: "Более 50%", result: { role: "founder", tariff: "scale" } }
    ]
  },

  // === CONTRACTOR BRANCH ===
  contractor_specialization: {
    id: "contractor_specialization",
    stage: "Шаг 4 из 7+",
    question: "Какая ваша специализация?",
    answers: [
      { text: "Технический подрядчик (dev, QA)", next: "contractor_tech_stack" },
      { text: "Креативный подрядчик (дизайн, видео)", next: "contractor_creative_services" },
      { text: "Бизнес-подрядчик (операции, финансы)", next: "contractor_business_area" }
    ]
  },

  contractor_tech_stack: {
    id: "contractor_tech_stack",
    stage: "Шаг 5 из 7+",
    question: "Какой технологический стек?",
    answers: [
      { text: "Frontend (React, Vue, Angular)", next: "contractor_tech_experience" },
      { text: "Backend (Node, Python, Go)", next: "contractor_tech_experience" },
      { text: "Mobile (iOS, Android, React Native)", next: "contractor_tech_experience" },
      { text: "Full-stack + DevOps", next: "contractor_tech_seniority" }
    ]
  },

  contractor_tech_experience: {
    id: "contractor_tech_experience",
    stage: "Шаг 6 из 7+",
    question: "Сколько лет коммерческого опыта?",
    answers: [
      { text: "2-5 лет", next: "contractor_tech_rate" },
      { text: "5-10 лет", next: "contractor_tech_projects" },
      { text: "Более 10 лет", next: "contractor_tech_leadership" }
    ]
  },

  contractor_tech_rate: {
    id: "contractor_tech_rate",
    stage: "Шаг 7 из 7",
    question: "Какой ваш часовой тариф?",
    answers: [
      { text: "$40-60/час", result: { role: "contractor", tariff: "specialist" } },
      { text: "$60-100/час", result: { role: "contractor", tariff: "senior" } },
      { text: "Более $100/час", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_tech_projects: {
    id: "contractor_tech_projects",
    stage: "Шаг 7 из 7",
    question: "Какие проекты предпочитаете?",
    answers: [
      { text: "Краткосрочные (1-3 месяца)", result: { role: "contractor", tariff: "senior" } },
      { text: "Долгосрочные контракты (6+ месяцев)", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_tech_leadership: {
    id: "contractor_tech_leadership",
    stage: "Шаг 7 из 7",
    question: "Есть ли опыт руководства?",
    answers: [
      { text: "Да, Tech Lead/Architect", result: { role: "contractor", tariff: "expert" } },
      { text: "Нет, только senior execution", result: { role: "contractor", tariff: "senior" } }
    ]
  },

  contractor_tech_seniority: {
    id: "contractor_tech_seniority",
    stage: "Шаг 6 из 7+",
    question: "Какой уровень сложности проектов?",
    answers: [
      { text: "Стандартные CRUD приложения", next: "contractor_tech_rate" },
      { text: "High-load системы", next: "contractor_tech_projects" },
      { text: "Enterprise архитектура", next: "contractor_tech_leadership" }
    ]
  },

  contractor_creative_services: {
    id: "contractor_creative_services",
    stage: "Шаг 5 из 7+",
    question: "Какие услуги предоставляете?",
    answers: [
      { text: "UI/UX дизайн", next: "contractor_creative_tools" },
      { text: "Графический дизайн и брендинг", next: "contractor_creative_portfolio" },
      { text: "Видеопродакшн и анимация", next: "contractor_creative_projects" },
      { text: "Контент-продакшн", next: "contractor_creative_volume" }
    ]
  },

  contractor_creative_tools: {
    id: "contractor_creative_tools",
    stage: "Шаг 6 из 7+",
    question: "Какие инструменты используете?",
    answers: [
      { text: "Figma, Sketch, Adobe XD", next: "contractor_creative_portfolio" },
      { text: "+ Prototyping (Framer, Principle)", next: "contractor_creative_projects" },
      { text: "+ Front-end (HTML/CSS/JS)", next: "contractor_creative_rate_premium" }
    ]
  },

  contractor_creative_portfolio: {
    id: "contractor_creative_portfolio",
    stage: "Шаг 7 из 7",
    question: "Сколько проектов в портфолио?",
    answers: [
      { text: "5-15 проектов", result: { role: "contractor", tariff: "specialist" } },
      { text: "15-50 проектов", result: { role: "contractor", tariff: "senior" } },
      { text: "Более 50 проектов", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_creative_projects: {
    id: "contractor_creative_projects",
    stage: "Шаг 7 из 7",
    question: "С кем предпочитаете работать?",
    answers: [
      { text: "Стартапы (быстрый темп)", result: { role: "contractor", tariff: "senior" } },
      { text: "Агентства (разнообразие)", result: { role: "contractor", tariff: "senior" } },
      { text: "Прямые корп. клиенты", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_creative_rate_premium: {
    id: "contractor_creative_rate_premium",
    stage: "Шаг 7 из 7",
    question: "Какой ваш дневной тариф?",
    answers: [
      { text: "$400-$800/день", result: { role: "contractor", tariff: "senior" } },
      { text: "$800-$1500/день", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_creative_volume: {
    id: "contractor_creative_volume",
    stage: "Шаг 6 из 7+",
    question: "Какой объем контента производите?",
    answers: [
      { text: "По запросу (проектная работа)", next: "contractor_creative_portfolio" },
      { text: "Регулярный поток (retainer)", next: "contractor_creative_rate_premium" }
    ]
  },

  contractor_business_area: {
    id: "contractor_business_area",
    stage: "Шаг 5 из 7+",
    question: "В какой области специализируетесь?",
    answers: [
      { text: "Операционный менеджмент", next: "contractor_business_experience" },
      { text: "Финансы и аналитика", next: "contractor_business_certifications" },
      { text: "HR и рекрутинг", next: "contractor_business_volume" },
      { text: "Юридические услуги", next: "contractor_business_legal" }
    ]
  },

  contractor_business_experience: {
    id: "contractor_business_experience",
    stage: "Шаг 6 из 7+",
    question: "Каков ваш опыт?",
    answers: [
      { text: "3-7 лет", next: "contractor_business_rate" },
      { text: "7-15 лет", next: "contractor_business_scale" },
      { text: "Более 15 лет", next: "contractor_business_advisory" }
    ]
  },

  contractor_business_rate: {
    id: "contractor_business_rate",
    stage: "Шаг 7 из 7",
    question: "Какая модель оплаты?",
    answers: [
      { text: "Почасовая $50-100/час", result: { role: "contractor", tariff: "specialist" } },
      { text: "Дневная $500-$1000/день", result: { role: "contractor", tariff: "senior" } },
      { text: "Проектная (fixed price)", result: { role: "contractor", tariff: "senior" } }
    ]
  },

  contractor_business_scale: {
    id: "contractor_business_scale",
    stage: "Шаг 7 из 7",
    question: "Какого размера проекты ведете?",
    answers: [
      { text: "Small business / стартапы", result: { role: "contractor", tariff: "senior" } },
      { text: "Mid-market компании", result: { role: "contractor", tariff: "expert" } },
      { text: "Enterprise", result: { role: "contractor", tariff: "expert" } }
    ]
  },

  contractor_business_advisory: {
    id: "contractor_business_advisory",
    stage: "Шаг 7 из 7",
    question: "Работаете как исполнитель или советник?",
    answers: [
      { text: "Исполнитель (hands-on)", result: { role: "contractor", tariff: "expert" } },
      { text: "Советник (advisory)", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  contractor_business_certifications: {
    id: "contractor_business_certifications",
    stage: "Шаг 6 из 7+",
    question: "Есть ли профессиональные сертификаты?",
    answers: [
      { text: "Да (CPA, CFA, ACCA и т.д.)", next: "contractor_business_scale" },
      { text: "Нет, но есть опыт", next: "contractor_business_rate" }
    ]
  },

  contractor_business_volume: {
    id: "contractor_business_volume",
    stage: "Шаг 6 из 7+",
    question: "Сколько найма делаете в год?",
    answers: [
      { text: "До 20 позиций", next: "contractor_business_rate" },
      { text: "20-50 позиций", next: "contractor_business_scale" },
      { text: "Более 50 позиций", next: "contractor_business_advisory" }
    ]
  },

  contractor_business_legal: {
    id: "contractor_business_legal",
    stage: "Шаг 6 из 7+",
    question: "Какая юридическая специализация?",
    answers: [
      { text: "Корпоративное право", next: "contractor_business_scale" },
      { text: "Интеллектуальная собственность", next: "contractor_business_scale" },
      { text: "M&A и сделки", next: "contractor_business_advisory" }
    ]
  },

  // === PROJECT ADMIN BRANCH ===
  projectadmin_entry: {
    id: "projectadmin_entry",
    stage: "Шаг 3 из 7+",
    question: "Какой у вас опыт в управлении проектами?",
    answers: [
      { text: "Нет опыта, хочу начать", next: "projectadmin_motivation" },
      { text: "1-3 года опыта", next: "projectadmin_projects_count" },
      { text: "Более 3 лет, профессиональный PM", next: "projectadmin_methodology" }
    ]
  },

  projectadmin_motivation: {
    id: "projectadmin_motivation",
    stage: "Шаг 4 из 7+",
    question: "Почему хотите стать PM?",
    answers: [
      { text: "Нравится координировать команды", next: "projectadmin_learning" },
      { text: "Хочу карьерного роста", next: "projectadmin_learning" },
      { text: "Есть техническое/бизнес образование", next: "projectadmin_background" }
    ]
  },

  projectadmin_learning: {
    id: "projectadmin_learning",
    stage: "Шаг 5 из 7+",
    question: "Проходили ли обучение PM?",
    answers: [
      { text: "Да, есть сертификаты (PMP, PRINCE2)", next: "projectadmin_first_role" },
      { text: "Нет, самоучка", next: "projectadmin_tools_basic" }
    ]
  },

  projectadmin_tools_basic: {
    id: "projectadmin_tools_basic",
    stage: "Шаг 6 из 7+",
    question: "Какими инструментами владеете?",
    answers: [
      { text: "Trello, Asana (базовые)", next: "projectadmin_availability" },
      { text: "Jira, MS Project (продвинутые)", next: "projectadmin_first_role" }
    ]
  },

  projectadmin_availability: {
    id: "projectadmin_availability",
    stage: "Шаг 7 из 7",
    question: "Готовы ли работать full-time?",
    answers: [
      { text: "Да, full-time", result: { role: "projectadmin", tariff: "junior" } },
      { text: "Нет, ищу part-time", result: { role: "employee", tariff: "parttime" } }
    ]
  },

  projectadmin_first_role: {
    id: "projectadmin_first_role",
    stage: "Шаг 7 из 7",
    question: "Какую роль ищете?",
    answers: [
      { text: "Junior PM / PM Assistant", result: { role: "projectadmin", tariff: "junior" } },
      { text: "Project Coordinator", result: { role: "projectadmin", tariff: "coordinator" } }
    ]
  },

  projectadmin_background: {
    id: "projectadmin_background",
    stage: "Шаг 5 из 7+",
    question: "Какое у вас образование?",
    answers: [
      { text: "Техническое (IT, инженерия)", next: "projectadmin_first_role" },
      { text: "Бизнес (менеджмент, экономика)", next: "projectadmin_tools_basic" },
      { text: "Другое", next: "projectadmin_learning" }
    ]
  },

  projectadmin_projects_count: {
    id: "projectadmin_projects_count",
    stage: "Шаг 4 из 7+",
    question: "Сколько проектов вели?",
    answers: [
      { text: "1-5 проектов", next: "projectadmin_team_size" },
      { text: "5-15 проектов", next: "projectadmin_complexity" },
      { text: "Более 15 проектов", next: "projectadmin_methodology" }
    ]
  },

  projectadmin_team_size: {
    id: "projectadmin_team_size",
    stage: "Шаг 5 из 7+",
    question: "Какого размера команды управляли?",
    answers: [
      { text: "До 5 человек", next: "projectadmin_tools_intermediate" },
      { text: "5-15 человек", next: "projectadmin_budget" },
      { text: "Более 15 человек", next: "projectadmin_methodology" }
    ]
  },

  projectadmin_tools_intermediate: {
    id: "projectadmin_tools_intermediate",
    stage: "Шаг 6 из 7+",
    question: "Какие методологии применяли?",
    answers: [
      { text: "Waterfall", next: "projectadmin_salary_mid" },
      { text: "Agile/Scrum", next: "projectadmin_certifications" },
      { text: "Hybrid", next: "projectadmin_certifications" }
    ]
  },

  projectadmin_salary_mid: {
    id: "projectadmin_salary_mid",
    stage: "Шаг 7 из 7",
    question: "Какая зарплата ожидается?",
    answers: [
      { text: "$2k-$4k/месяц", result: { role: "projectadmin", tariff: "coordinator" } },
      { text: "$4k-$7k/месяц", result: { role: "projectadmin", tariff: "manager" } }
    ]
  },

  projectadmin_certifications: {
    id: "projectadmin_certifications",
    stage: "Шаг 7 из 7",
    question: "Есть ли сертификаты PM?",
    answers: [
      { text: "Да (PMP, PRINCE2, Scrum Master)", result: { role: "projectadmin", tariff: "manager" } },
      { text: "Нет", result: { role: "projectadmin", tariff: "coordinator" } }
    ]
  },

  projectadmin_budget: {
    id: "projectadmin_budget",
    stage: "Шаг 6 из 7+",
    question: "Управляли ли бюджетом проекта?",
    answers: [
      { text: "Да, до $100k", next: "projectadmin_certifications" },
      { text: "Да, $100k-$500k", next: "projectadmin_senior_scope" },
      { text: "Более $500k", next: "projectadmin_methodology" }
    ]
  },

  projectadmin_senior_scope: {
    id: "projectadmin_senior_scope",
    stage: "Шаг 7 из 7",
    question: "Какого масштаба проекты вели?",
    answers: [
      { text: "Один проект за раз", result: { role: "projectadmin", tariff: "manager" } },
      { text: "Несколько параллельно", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_complexity: {
    id: "projectadmin_complexity",
    stage: "Шаг 5 из 7+",
    question: "Какой сложности проекты?",
    answers: [
      { text: "Стандартные (известная технология)", next: "projectadmin_budget" },
      { text: "Сложные (innovation, R&D)", next: "projectadmin_stakeholders" },
      { text: "Кризисные (turnaround)", next: "projectadmin_methodology" }
    ]
  },

  projectadmin_stakeholders: {
    id: "projectadmin_stakeholders",
    stage: "Шаг 6 из 7+",
    question: "Сколько стейкхолдеров обычно?",
    answers: [
      { text: "До 5 человек", next: "projectadmin_senior_scope" },
      { text: "5-15 человек", next: "projectadmin_leadership" },
      { text: "Более 15 (множественные департаменты)", next: "projectadmin_program" }
    ]
  },

  projectadmin_leadership: {
    id: "projectadmin_leadership",
    stage: "Шаг 7 из 7",
    question: "Есть ли опыт руководства PM'ами?",
    answers: [
      { text: "Да, управлял командой PM", result: { role: "projectadmin", tariff: "director" } },
      { text: "Нет, только индивидуальные проекты", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_program: {
    id: "projectadmin_program",
    stage: "Шаг 7 из 7",
    question: "Управляли ли программами (несколько связанных проектов)?",
    answers: [
      { text: "Да, Program Manager", result: { role: "projectadmin", tariff: "director" } },
      { text: "Нет, только отдельные проекты", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_methodology: {
    id: "projectadmin_methodology",
    stage: "Шаг 4 из 7+",
    question: "Какие методологии освоили?",
    answers: [
      { text: "Agile/Scrum/Kanban", next: "projectadmin_domain" },
      { text: "Waterfall/PRINCE2", next: "projectadmin_transformation" },
      { text: "Lean/Six Sigma", next: "projectadmin_industry" },
      { text: "Все вышеперечисленные", next: "projectadmin_portfolio" }
    ]
  },

  projectadmin_domain: {
    id: "projectadmin_domain",
    stage: "Шаг 5 из 7+",
    question: "В какой сфере больше опыта?",
    answers: [
      { text: "IT/Software", next: "projectadmin_agile_scale" },
      { text: "Product Development", next: "projectadmin_product_launches" },
      { text: "Consulting/Professional Services", next: "projectadmin_client_facing" }
    ]
  },

  projectadmin_agile_scale: {
    id: "projectadmin_agile_scale",
    stage: "Шаг 6 из 7+",
    question: "Внедряли ли Agile на уровне компании?",
    answers: [
      { text: "Да, SAFe/LeSS implementation", next: "projectadmin_coaching" },
      { text: "Нет, только команды", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_coaching: {
    id: "projectadmin_coaching",
    stage: "Шаг 7 из 7",
    question: "Коучите ли вы команды?",
    answers: [
      { text: "Да, Agile Coach", result: { role: "projectadmin", tariff: "director" } },
      { text: "Нет, только управление", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_product_launches: {
    id: "projectadmin_product_launches",
    stage: "Шаг 6 из 7+",
    question: "Сколько продуктов запустили?",
    answers: [
      { text: "1-3 запуска", next: "projectadmin_leadership" },
      { text: "4-10 запусков", next: "projectadmin_product_success" },
      { text: "Более 10", next: "projectadmin_product_success" }
    ]
  },

  projectadmin_product_success: {
    id: "projectadmin_product_success",
    stage: "Шаг 7 из 7",
    question: "Каков success rate?",
    answers: [
      { text: "Более 70% успешных", result: { role: "projectadmin", tariff: "director" } },
      { text: "50-70%", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_client_facing: {
    id: "projectadmin_client_facing",
    stage: "Шаг 6 из 7+",
    question: "Работаете ли напрямую с клиентами?",
    answers: [
      { text: "Да, управляю отношениями", next: "projectadmin_account" },
      { text: "Нет, внутренние проекты", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_account: {
    id: "projectadmin_account",
    stage: "Шаг 7 из 7",
    question: "Какова роль?",
    answers: [
      { text: "Delivery Manager", result: { role: "projectadmin", tariff: "senior" } },
      { text: "Account Manager / Client Partner", result: { role: "projectadmin", tariff: "director" } }
    ]
  },

  projectadmin_transformation: {
    id: "projectadmin_transformation",
    stage: "Шаг 5 из 7+",
    question: "Вели ли трансформационные проекты?",
    answers: [
      { text: "Да, организационная трансформация", next: "projectadmin_change" },
      { text: "Нет, стандартные проекты", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_change: {
    id: "projectadmin_change",
    stage: "Шаг 6 из 7+",
    question: "Есть ли опыт change management?",
    answers: [
      { text: "Да, сертифицированный change manager", next: "projectadmin_executive" },
      { text: "Нет", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_executive: {
    id: "projectadmin_executive",
    stage: "Шаг 7 из 7",
    question: "Работали ли на executive уровне?",
    answers: [
      { text: "Да, PMO Director / VP", result: { role: "projectadmin", tariff: "director" } },
      { text: "Нет", result: { role: "projectadmin", tariff: "senior" } }
    ]
  },

  projectadmin_industry: {
    id: "projectadmin_industry",
    stage: "Шаг 5 из 7+",
    question: "В каких индустриях работали?",
    answers: [
      { text: "Одна индустрия (специализация)", next: "projectadmin_domain" },
      { text: "Несколько индустрий", next: "projectadmin_adaptability" }
    ]
  },

  projectadmin_adaptability: {
    id: "projectadmin_adaptability",
    stage: "Шаг 6 из 7+",
    question: "Как быстро адаптируетесь?",
    answers: [
      { text: "Легко перехожу между индустриями", next: "projectadmin_portfolio" },
      { text: "Нужно время на изучение", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_portfolio: {
    id: "projectadmin_portfolio",
    stage: "Шаг 5 из 7+",
    question: "Управляли ли портфелем проектов?",
    answers: [
      { text: "Да, Portfolio Manager", next: "projectadmin_pmo" },
      { text: "Нет, только отдельные проекты", next: "projectadmin_leadership" }
    ]
  },

  projectadmin_pmo: {
    id: "projectadmin_pmo",
    stage: "Шаг 6 из 7+",
    question: "Создавали ли PMO с нуля?",
    answers: [
      { text: "Да, построил PMO", next: "projectadmin_governance" },
      { text: "Нет, работал в существующей PMO", next: "projectadmin_executive" }
    ]
  },

  projectadmin_governance: {
    id: "projectadmin_governance",
    stage: "Шаг 7 из 7",
    question: "Внедряли ли процессы governance?",
    answers: [
      { text: "Да, установил стандарты и процессы", result: { role: "projectadmin", tariff: "director" } },
      { text: "Частично", result: { role: "projectadmin", tariff: "director" } }
    ]
  },

  // === EMPLOYEE BRANCH ===
  employee_entry: {
    id: "employee_entry",
    stage: "Шаг 3 из 7+",
    question: "Какую роль в проекте ищете?",
    answers: [
      { text: "Техническая роль (dev, QA, devops)", next: "employee_tech_level" },
      { text: "Продуктовая роль (PM, designer)", next: "employee_product_role" },
      { text: "Бизнес-роль (маркетинг, продажи, операции)", next: "employee_business_function" }
    ]
  },

  employee_tech_level: {
    id: "employee_tech_level",
    stage: "Шаг 4 из 7+",
    question: "Какой ваш уровень?",
    answers: [
      { text: "Junior (до 2 лет опыта)", next: "employee_tech_learning" },
      { text: "Middle (2-5 лет)", next: "employee_tech_stack" },
      { text: "Senior (5+ лет)", next: "employee_tech_leadership_interest" }
    ]
  },

  employee_tech_learning: {
    id: "employee_tech_learning",
    stage: "Шаг 5 из 7+",
    question: "Какой стек изучаете?",
    answers: [
      { text: "Frontend", next: "employee_tech_mentorship" },
      { text: "Backend", next: "employee_tech_mentorship" },
      { text: "Mobile", next: "employee_tech_mentorship" },
      { text: "QA/Testing", next: "employee_tech_mentorship" }
    ]
  },

  employee_tech_mentorship: {
    id: "employee_tech_mentorship",
    stage: "Шаг 6 из 7+",
    question: "Важно ли менторство?",
    answers: [
      { text: "Да, критически важно", next: "employee_work_mode" },
      { text: "Желательно, но не обязательно", next: "employee_work_mode" }
    ]
  },

  employee_work_mode: {
    id: "employee_work_mode",
    stage: "Шаг 7 из 7",
    question: "Какой формат работы предпочитаете?",
    answers: [
      { text: "Full-time в офисе", result: { role: "employee", tariff: "fulltime" } },
      { text: "Full-time удаленно", result: { role: "employee", tariff: "remote" } },
      { text: "Part-time", result: { role: "employee", tariff: "parttime" } }
    ]
  },

  employee_tech_stack: {
    id: "employee_tech_stack",
    stage: "Шаг 5 из 7+",
    question: "Какая ваша специализация?",
    answers: [
      { text: "Frontend разработка", next: "employee_project_stage" },
      { text: "Backend разработка", next: "employee_project_stage" },
      { text: "Full-stack", next: "employee_project_stage" },
      { text: "DevOps/Infrastructure", next: "employee_project_stage" }
    ]
  },

  employee_project_stage: {
    id: "employee_project_stage",
    stage: "Шаг 6 из 7+",
    question: "На какой стадии проект интересует?",
    answers: [
      { text: "Early stage (стартап)", next: "employee_equity" },
      { text: "Growth stage", next: "employee_compensation" },
      { text: "Не важно", next: "employee_work_mode" }
    ]
  },

  employee_equity: {
    id: "employee_equity",
    stage: "Шаг 7 из 7",
    question: "Интересует ли equity?",
    answers: [
      { text: "Да, готов на меньшую зарплату + опционы", result: { role: "employee", tariff: "equity" } },
      { text: "Нет, только фикс", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_compensation: {
    id: "employee_compensation",
    stage: "Шаг 7 из 7",
    question: "Что важнее?",
    answers: [
      { text: "Высокая зарплата", result: { role: "employee", tariff: "fulltime" } },
      { text: "Equity + конкурентная зарплата", result: { role: "employee", tariff: "equity" } }
    ]
  },

  employee_tech_leadership_interest: {
    id: "employee_tech_leadership_interest",
    stage: "Шаг 5 из 7+",
    question: "Интересует ли руководство?",
    answers: [
      { text: "Да, хочу стать Tech Lead", next: "employee_leadership_experience" },
      { text: "Нет, предпочитаю индивидуальный путь", next: "employee_project_stage" }
    ]
  },

  employee_leadership_experience: {
    id: "employee_leadership_experience",
    stage: "Шаг 6 из 7+",
    question: "Есть ли опыт руководства?",
    answers: [
      { text: "Да, управлял командой", next: "employee_leadership_size" },
      { text: "Нет, но готов учиться", next: "employee_compensation" }
    ]
  },

  employee_leadership_size: {
    id: "employee_leadership_size",
    stage: "Шаг 7 из 7",
    question: "Какого размера команда?",
    answers: [
      { text: "2-5 человек", result: { role: "employee", tariff: "lead" } },
      { text: "5-15 человек", result: { role: "employee", tariff: "lead" } },
      { text: "Более 15 (Engineering Manager)", result: { role: "employee", tariff: "lead" } }
    ]
  },

  employee_product_role: {
    id: "employee_product_role",
    stage: "Шаг 4 из 7+",
    question: "Какая роль интересует?",
    answers: [
      { text: "Product Manager", next: "employee_pm_experience" },
      { text: "Product Designer / UX", next: "employee_design_level" },
      { text: "Product Analyst", next: "employee_analyst_tools" }
    ]
  },

  employee_pm_experience: {
    id: "employee_pm_experience",
    stage: "Шаг 5 из 7+",
    question: "Каков ваш опыт в PM?",
    answers: [
      { text: "Нет опыта, хочу начать", next: "employee_pm_learning" },
      { text: "1-3 года", next: "employee_pm_products" },
      { text: "Более 3 лет", next: "employee_pm_strategy" }
    ]
  },

  employee_pm_learning: {
    id: "employee_pm_learning",
    stage: "Шаг 6 из 7+",
    question: "Есть ли техническое/бизнес образование?",
    answers: [
      { text: "Да, технический бэкграунд", next: "employee_work_mode" },
      { text: "Да, бизнес бэкграунд", next: "employee_work_mode" },
      { text: "Нет, но хочу учиться", next: "employee_work_mode" }
    ]
  },

  employee_pm_products: {
    id: "employee_pm_products",
    stage: "Шаг 6 из 7+",
    question: "Какие продукты вели?",
    answers: [
      { text: "B2C продукты", next: "employee_project_stage" },
      { text: "B2B/SaaS", next: "employee_project_stage" },
      { text: "Marketplace", next: "employee_project_stage" }
    ]
  },

  employee_pm_strategy: {
    id: "employee_pm_strategy",
    stage: "Шаг 6 из 7+",
    question: "Участвовали ли в стратегии продукта?",
    answers: [
      { text: "Да, формировал product vision", next: "employee_pm_seniority" },
      { text: "Нет, только execution", next: "employee_project_stage" }
    ]
  },

  employee_pm_seniority: {
    id: "employee_pm_seniory",
    stage: "Шаг 7 из 7",
    question: "Какую роль ищете?",
    answers: [
      { text: "Senior PM", result: { role: "employee", tariff: "lead" } },
      { text: "Head of Product / CPO", result: { role: "cofounder", tariff: "partner" } }
    ]
  },

  employee_design_level: {
    id: "employee_design_level",
    stage: "Шаг 5 из 7+",
    question: "Какой ваш уровень?",
    answers: [
      { text: "Junior/Middle", next: "employee_design_focus" },
      { text: "Senior", next: "employee_design_specialization" },
      { text: "Lead Designer", next: "employee_design_team" }
    ]
  },

  employee_design_focus: {
    id: "employee_design_focus",
    stage: "Шаг 6 из 7+",
    question: "На чем фокусируетесь?",
    answers: [
      { text: "UI дизайн", next: "employee_work_mode" },
      { text: "UX research", next: "employee_work_mode" },
      { text: "Product design (UI+UX)", next: "employee_project_stage" }
    ]
  },

  employee_design_specialization: {
    id: "employee_design_specialization",
    stage: "Шаг 6 из 7+",
    question: "Есть ли узкая специализация?",
    answers: [
      { text: "Mobile design", next: "employee_project_stage" },
      { text: "Web design", next: "employee_project_stage" },
      { text: "Design systems", next: "employee_compensation" }
    ]
  },

  employee_design_team: {
    id: "employee_design_team",
    stage: "Шаг 6 из 7+",
    question: "Управляли ли командой дизайнеров?",
    answers: [
      { text: "Да, 2-5 человек", next: "employee_design_head" },
      { text: "Нет, индивидуальный contributor", next: "employee_compensation" }
    ]
  },

  employee_design_head: {
    id: "employee_design_head",
    stage: "Шаг 7 из 7",
    question: "Интересует ли роль Head of Design?",
    answers: [
      { text: "Да", result: { role: "employee", tariff: "lead" } },
      { text: "Нет, Lead Designer", result: { role: "employee", tariff: "lead" } }
    ]
  },

  employee_analyst_tools: {
    id: "employee_analyst_tools",
    stage: "Шаг 5 из 7+",
    question: "Какими инструментами владеете?",
    answers: [
      { text: "SQL, Excel", next: "employee_analyst_product" },
      { text: "+ Python/R", next: "employee_analyst_experience" },
      { text: "+ BI tools (Tableau, Looker)", next: "employee_analyst_experience" }
    ]
  },

  employee_analyst_product: {
    id: "employee_analyst_product",
    stage: "Шаг 6 из 7+",
    question: "Работали ли с продуктовыми метриками?",
    answers: [
      { text: "Да, знаю AARRR, cohorts и т.д.", next: "employee_work_mode" },
      { text: "Нет, хочу научиться", next: "employee_work_mode" }
    ]
  },

  employee_analyst_experience: {
    id: "employee_analyst_experience",
    stage: "Шаг 6 из 7+",
    question: "Сколько лет опыта в аналитике?",
    answers: [
      { text: "До 2 лет", next: "employee_work_mode" },
      { text: "2-5 лет", next: "employee_project_stage" },
      { text: "Более 5 лет", next: "employee_compensation" }
    ]
  },

  employee_business_function: {
    id: "employee_business_function",
    stage: "Шаг 4 из 7+",
    question: "Какая функция интересует?",
    answers: [
      { text: "Маркетинг / Growth", next: "employee_marketing_type" },
      { text: "Продажи / Business Development", next: "employee_sales_experience" },
      { text: "Операции / Customer Success", next: "employee_ops_role" }
    ]
  },

  employee_marketing_type: {
    id: "employee_marketing_type",
    stage: "Шаг 5 из 7+",
    question: "Какое направление маркетинга?",
    answers: [
      { text: "Performance / Digital", next: "employee_marketing_channels" },
      { text: "Content / Brand", next: "employee_marketing_content" },
      { text: "Growth hacking", next: "employee_growth_metrics" }
    ]
  },

  employee_marketing_channels: {
    id: "employee_marketing_channels",
    stage: "Шаг 6 из 7+",
    question: "Какие каналы освоили?",
    answers: [
      { text: "Google Ads, Facebook Ads", next: "employee_marketing_budget" },
      { text: "+ SEO, Email", next: "employee_marketing_experience" },
      { text: "Все digital каналы", next: "employee_marketing_experience" }
    ]
  },

  employee_marketing_budget: {
    id: "employee_marketing_budget",
    stage: "Шаг 7 из 7",
    question: "Управляли ли рекламным бюджетом?",
    answers: [
      { text: "Да, до $50k/месяц", result: { role: "employee", tariff: "fulltime" } },
      { text: "Да, более $50k/месяц", result: { role: "employee", tariff: "lead" } },
      { text: "Нет", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_marketing_experience: {
    id: "employee_marketing_experience",
    stage: "Шаг 7 из 7",
    question: "Сколько лет опыта в маркетинге?",
    answers: [
      { text: "До 3 лет", result: { role: "employee", tariff: "fulltime" } },
      { text: "3-7 лет", result: { role: "employee", tariff: "fulltime" } },
      { text: "Более 7 лет", result: { role: "employee", tariff: "lead" } }
    ]
  },

  employee_marketing_content: {
    id: "employee_marketing_content",
    stage: "Шаг 6 из 7+",
    question: "Какой контент создаете?",
    answers: [
      { text: "Статьи, блоги", next: "employee_marketing_portfolio" },
      { text: "Видео, подкасты", next: "employee_marketing_portfolio" },
      { text: "Комплексный контент", next: "employee_marketing_experience" }
    ]
  },

  employee_marketing_portfolio: {
    id: "employee_marketing_portfolio",
    stage: "Шаг 7 из 7",
    question: "Есть ли портфолио?",
    answers: [
      { text: "Да, могу показать примеры", result: { role: "employee", tariff: "fulltime" } },
      { text: "Нет", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_growth_metrics: {
    id: "employee_growth_metrics",
    stage: "Шаг 6 из 7+",
    question: "Работали ли с growth метриками?",
    answers: [
      { text: "Да, оптимизировал воронки", next: "employee_growth_results" },
      { text: "Нет, хочу учиться", next: "employee_work_mode" }
    ]
  },

  employee_growth_results: {
    id: "employee_growth_results",
    stage: "Шаг 7 из 7",
    question: "Какие результаты?",
    answers: [
      { text: "Вырастил ключевые метрики на X%", result: { role: "employee", tariff: "lead" } },
      { text: "Еще учусь", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_sales_experience: {
    id: "employee_sales_experience",
    stage: "Шаг 5 из 7+",
    question: "Какой у вас опыт в продажах?",
    answers: [
      { text: "Нет опыта, хочу начать", next: "employee_sales_type" },
      { text: "1-3 года", next: "employee_sales_b2b" },
      { text: "Более 3 лет", next: "employee_sales_closing" }
    ]
  },

  employee_sales_type: {
    id: "employee_sales_type",
    stage: "Шаг 6 из 7+",
    question: "Какой тип продаж интересует?",
    answers: [
      { text: "B2B продажи", next: "employee_work_mode" },
      { text: "B2C продажи", next: "employee_work_mode" },
      { text: "Partnership / BD", next: "employee_work_mode" }
    ]
  },

  employee_sales_b2b: {
    id: "employee_sales_b2b",
    stage: "Шаг 6 из 7+",
    question: "Какой цикл сделки?",
    answers: [
      { text: "Короткий (SMB)", next: "employee_sales_quota" },
      { text: "Длинный (Enterprise)", next: "employee_sales_deal_size" }
    ]
  },

  employee_sales_quota: {
    id: "employee_sales_quota",
    stage: "Шаг 7 из 7",
    question: "Выполняли ли квоту?",
    answers: [
      { text: "Да, регулярно 100%+", result: { role: "employee", tariff: "fulltime" } },
      { text: "Иногда", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_sales_deal_size: {
    id: "employee_sales_deal_size",
    stage: "Шаг 7 из 7",
    question: "Какой средний размер сделки?",
    answers: [
      { text: "До $50k", result: { role: "employee", tariff: "fulltime" } },
      { text: "$50k-$500k", result: { role: "employee", tariff: "lead" } },
      { text: "Более $500k", result: { role: "employee", tariff: "lead" } }
    ]
  },

  employee_sales_closing: {
    id: "employee_sales_closing",
    stage: "Шаг 6 из 7+",
    question: "Закрывали ли крупные сделки?",
    answers: [
      { text: "Да, $100k+ deals", next: "employee_sales_team" },
      { text: "Нет, в основном SMB", next: "employee_sales_quota" }
    ]
  },

  employee_sales_team: {
    id: "employee_sales_team",
    stage: "Шаг 7 из 7",
    question: "Управляли ли командой продаж?",
    answers: [
      { text: "Да, Sales Manager/Director", result: { role: "employee", tariff: "lead" } },
      { text: "Нет, индивидуальный contributor", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_ops_role: {
    id: "employee_ops_role",
    stage: "Шаг 5 из 7+",
    question: "Какая роль интересует?",
    answers: [
      { text: "Operations Manager", next: "employee_ops_experience" },
      { text: "Customer Success", next: "employee_cs_clients" },
      { text: "Account Manager", next: "employee_am_portfolio" }
    ]
  },

  employee_ops_experience: {
    id: "employee_ops_experience",
    stage: "Шаг 6 из 7+",
    question: "Какой опыт в операциях?",
    answers: [
      { text: "До 2 лет", next: "employee_work_mode" },
      { text: "2-5 лет", next: "employee_project_stage" },
      { text: "Более 5 лет", next: "employee_ops_scale" }
    ]
  },

  employee_ops_scale: {
    id: "employee_ops_scale",
    stage: "Шаг 7 из 7",
    question: "Какого размера операции управляли?",
    answers: [
      { text: "Небольшая команда (до 10 чел)", result: { role: "employee", tariff: "fulltime" } },
      { text: "Средняя команда (10-50 чел)", result: { role: "employee", tariff: "lead" } },
      { text: "Крупная (50+ чел)", result: { role: "employee", tariff: "lead" } }
    ]
  },

  employee_cs_clients: {
    id: "employee_cs_clients",
    stage: "Шаг 6 из 7+",
    question: "Сколько клиентов вели?",
    answers: [
      { text: "До 20 клиентов", next: "employee_cs_retention" },
      { text: "20-50 клиентов", next: "employee_cs_retention" },
      { text: "Более 50 клиентов", next: "employee_cs_automation" }
    ]
  },

  employee_cs_retention: {
    id: "employee_cs_retention",
    stage: "Шаг 7 из 7",
    question: "Какой retention rate?",
    answers: [
      { text: "Более 90%", result: { role: "employee", tariff: "fulltime" } },
      { text: "80-90%", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_cs_automation: {
    id: "employee_cs_automation",
    stage: "Шаг 7 из 7",
    question: "Внедряли ли автоматизацию CS?",
    answers: [
      { text: "Да, настроил процессы", result: { role: "employee", tariff: "lead" } },
      { text: "Нет", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_am_portfolio: {
    id: "employee_am_portfolio",
    stage: "Шаг 6 из 7+",
    question: "Какой размер портфолио клиентов?",
    answers: [
      { text: "До $500k ARR", next: "employee_am_upsell" },
      { text: "$500k-$2M ARR", next: "employee_am_upsell" },
      { text: "Более $2M ARR", next: "employee_am_strategic" }
    ]
  },

  employee_am_upsell: {
    id: "employee_am_upsell",
    stage: "Шаг 7 из 7",
    question: "Занимались ли upsell?",
    answers: [
      { text: "Да, регулярно росла выручка", result: { role: "employee", tariff: "fulltime" } },
      { text: "Нет, только retention", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  employee_am_strategic: {
    id: "employee_am_strategic",
    stage: "Шаг 7 из 7",
    question: "Работали ли со strategic accounts?",
    answers: [
      { text: "Да, enterprise клиенты", result: { role: "employee", tariff: "lead" } },
      { text: "Нет", result: { role: "employee", tariff: "fulltime" } }
    ]
  },

  // ============ ВЕТКА ЭКОСИСТЕМЫ: ПАРТНЕРЫ И КОММЬЮНИТИ ============
  ecosystem_ambassador: {
    id: "ecosystem_ambassador",
    stage: "Шаг 3 из 7+",
    question: "Какая роль вас интересует?",
    answers: [
      { text: "Партнер (привлечение клиентов)", next: "partner_experience" },
      { text: "Амбассадор проектов", next: "ambassador_audience" },
      { text: "Блогер/Инфлюенсер", next: "blogger_platform" },
      { text: "Ищу работу (Job Seeker)", next: "jobseeker_status" }
    ]
  },

  // ============ ВЕТКА ПАРТНЕРА (расширенная до 7+) ============
  partner_experience: {
    id: "partner_experience",
    stage: "Шаг 4 из 7+",
    question: "Есть ли у вас опыт партнерского маркетинга?",
    answers: [
      { text: "Да, работал(а) с партнерками", next: "partner_network" },
      { text: "Нет, хочу начать", next: "partner_motivation" }
    ]
  },

  partner_network: {
    id: "partner_network",
    stage: "Шаг 5 из 7+",
    question: "Какая у вас сеть контактов?",
    answers: [
      { text: "Небольшая (до 100 потенциальных клиентов)", next: "partner_niche" },
      { text: "Средняя (100-500 контактов)", next: "partner_conversion" },
      { text: "Большая (500+ контактов)", next: "partner_revenue" }
    ]
  },

  partner_niche: {
    id: "partner_niche",
    stage: "Шаг 6 из 7+",
    question: "Есть ли у вас специализация по нише?",
    answers: [
      { text: "Да, работаю в определенной индустрии", next: "partner_time" },
      { text: "Нет, работаю с разными сегментами", next: "partner_time" }
    ]
  },

  partner_time: {
    id: "partner_time",
    stage: "Шаг 7 из 7",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "Несколько часов в неделю", result: { role: "partner", tariff: "starter" } },
      { text: "Несколько часов в день", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_conversion: {
    id: "partner_conversion",
    stage: "Шаг 6 из 7+",
    question: "Какой процент конверсии в сделки?",
    answers: [
      { text: "До 5%", next: "partner_tools" },
      { text: "5-10%", next: "partner_scaling" },
      { text: "Более 10%", next: "partner_revenue" }
    ]
  },

  partner_tools: {
    id: "partner_tools",
    stage: "Шаг 7 из 7",
    question: "Используете ли CRM и аналитику?",
    answers: [
      { text: "Да, отслеживаю метрики", result: { role: "partner", tariff: "pro" } },
      { text: "Нет, работаю вручную", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_scaling: {
    id: "partner_scaling",
    stage: "Шаг 7 из 7",
    question: "Планируете ли масштабировать партнерский бизнес?",
    answers: [
      { text: "Да, хочу построить агентство", result: { role: "partner", tariff: "elite" } },
      { text: "Нет, комфортен текущий масштаб", result: { role: "partner", tariff: "pro" } }
    ]
  },

  partner_revenue: {
    id: "partner_revenue",
    stage: "Шаг 6 из 7+",
    question: "Какой месячный доход от партнерки?",
    answers: [
      { text: "До $2,000", next: "partner_growth_goal" },
      { text: "$2,000-$10,000", next: "partner_team" },
      { text: "Более $10,000", next: "partner_automation" }
    ]
  },

  partner_growth_goal: {
    id: "partner_growth_goal",
    stage: "Шаг 7 из 7",
    question: "Хотите ли увеличить доход?",
    answers: [
      { text: "Да, хочу расти до $10k+", result: { role: "partner", tariff: "pro" } },
      { text: "Нет, это дополнительный доход", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_team: {
    id: "partner_team",
    stage: "Шаг 7 из 7",
    question: "Работаете ли с командой?",
    answers: [
      { text: "Да, у меня есть помощники", result: { role: "partner", tariff: "elite" } },
      { text: "Нет, работаю один", result: { role: "partner", tariff: "pro" } }
    ]
  },

  partner_automation: {
    id: "partner_automation",
    stage: "Шаг 7 из 7",
    question: "Используете ли автоматизацию процессов?",
    answers: [
      { text: "Да, автоматизировал воронки", result: { role: "partner", tariff: "elite" } },
      { text: "Частично", result: { role: "partner", tariff: "elite" } }
    ]
  },

  partner_motivation: {
    id: "partner_motivation",
    stage: "Шаг 5 из 7+",
    question: "Что вас привлекает в партнерстве?",
    answers: [
      { text: "Пассивный доход", next: "partner_audience" },
      { text: "Развитие бизнес-навыков", next: "partner_learning" },
      { text: "Расширение сети контактов", next: "partner_network_building" }
    ]
  },

  partner_audience: {
    id: "partner_audience",
    stage: "Шаг 6 из 7+",
    question: "Есть ли у вас аудитория?",
    answers: [
      { text: "Да, есть свой блог/канал", next: "partner_content" },
      { text: "Нет, буду строить с нуля", next: "partner_commitment" }
    ]
  },

  partner_content: {
    id: "partner_content",
    stage: "Шаг 7 из 7",
    question: "Готовы ли создавать контент?",
    answers: [
      { text: "Да, регулярно пишу/снимаю", result: { role: "partner", tariff: "pro" } },
      { text: "Буду пробовать", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_commitment: {
    id: "partner_commitment",
    stage: "Шаг 7 из 7",
    question: "Готовы ли учиться партнерскому маркетингу?",
    answers: [
      { text: "Да, готов(а) инвестировать время", result: { role: "partner", tariff: "starter" } },
      { text: "Хочу попробовать", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_learning: {
    id: "partner_learning",
    stage: "Шаг 6 из 7+",
    question: "Готовы ли изучать продажи и маркетинг?",
    answers: [
      { text: "Да, хочу глубоко разобраться", next: "partner_budget" },
      { text: "Базово, для старта", next: "partner_commitment" }
    ]
  },

  partner_budget: {
    id: "partner_budget",
    stage: "Шаг 7 из 7",
    question: "Есть ли бюджет на рекламу?",
    answers: [
      { text: "Да, $500-$2000", result: { role: "partner", tariff: "pro" } },
      { text: "Нет, только органика", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_network_building: {
    id: "partner_network_building",
    stage: "Шаг 6 из 7+",
    question: "Как планируете строить сеть?",
    answers: [
      { text: "Через LinkedIn и нетворкинг", next: "partner_outreach" },
      { text: "Через события и конференции", next: "partner_events" }
    ]
  },

  partner_outreach: {
    id: "partner_outreach",
    stage: "Шаг 7 из 7",
    question: "Готовы ли делать холодный outreach?",
    answers: [
      { text: "Да, умею писать сообщения", result: { role: "partner", tariff: "pro" } },
      { text: "Нет, предпочитаю теплые контакты", result: { role: "partner", tariff: "starter" } }
    ]
  },

  partner_events: {
    id: "partner_events",
    stage: "Шаг 7 из 7",
    question: "Как часто посещаете мероприятия?",
    answers: [
      { text: "Регулярно (1-2 раза в месяц)", result: { role: "partner", tariff: "pro" } },
      { text: "Иногда", result: { role: "partner", tariff: "starter" } }
    ]
  },

  // ============ ВЕТКА АМБАССАДОРА (расширенная до 7+) ============
  ambassador_audience: {
    id: "ambassador_audience",
    stage: "Шаг 4 из 7+",
    question: "Какая у вас аудитория?",
    answers: [
      { text: "До 1,000 подписчиков", next: "ambassador_motivation" },
      { text: "1,000-10,000 подписчиков", next: "ambassador_engagement" },
      { text: "Более 10,000 подписчиков", next: "ambassador_blogger_crossover" }
    ]
  },

  ambassador_motivation: {
    id: "ambassador_motivation",
    stage: "Шаг 5 из 7+",
    question: "Что вас мотивирует?",
    answers: [
      { text: "Поддержка стартапов", next: "ambassador_niche" },
      { text: "Расширение личного бренда", next: "ambassador_content_type" },
      { text: "Дополнительный доход", next: "ambassador_time" }
    ]
  },

  ambassador_niche: {
    id: "ambassador_niche",
    stage: "Шаг 6 из 7+",
    question: "Есть ли у вас специализация?",
    answers: [
      { text: "Да, tech/SaaS стартапы", next: "ambassador_expertise" },
      { text: "Да, другая индустрия", next: "ambassador_expertise" },
      { text: "Нет, готов(а) работать с разными проектами", next: "ambassador_commitment" }
    ]
  },

  ambassador_expertise: {
    id: "ambassador_expertise",
    stage: "Шаг 7 из 7",
    question: "Есть ли экспертиза в вашей нише?",
    answers: [
      { text: "Да, работал(а) в индустрии", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Нет, но активно изучаю", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_content_type: {
    id: "ambassador_content_type",
    stage: "Шаг 6 из 7+",
    question: "Какой контент создаете?",
    answers: [
      { text: "Посты в соцсетях", next: "ambassador_frequency" },
      { text: "Статьи/лонгриды", next: "ambassador_frequency" },
      { text: "Видео/подкасты", next: "ambassador_production" }
    ]
  },

  ambassador_frequency: {
    id: "ambassador_frequency",
    stage: "Шаг 7 из 7",
    question: "Как часто публикуете контент?",
    answers: [
      { text: "Несколько раз в неделю", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Раз в неделю", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Реже", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_production: {
    id: "ambassador_production",
    stage: "Шаг 7 из 7",
    question: "Какое качество продакшена?",
    answers: [
      { text: "Профессиональное (студия/оборудование)", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Среднее (смартфон + монтаж)", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_time: {
    id: "ambassador_time",
    stage: "Шаг 6 из 7+",
    question: "Сколько времени готовы уделять?",
    answers: [
      { text: "5-10 часов в неделю", next: "ambassador_projects" },
      { text: "Более 10 часов в неделю", next: "ambassador_full_time" }
    ]
  },

  ambassador_projects: {
    id: "ambassador_projects",
    stage: "Шаг 7 из 7",
    question: "Сколько проектов готовы продвигать?",
    answers: [
      { text: "1-2 проекта одновременно", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "3-5 проектов", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_full_time: {
    id: "ambassador_full_time",
    stage: "Шаг 7 из 7",
    question: "Рассматриваете ли это как основную деятельность?",
    answers: [
      { text: "Да, хочу делать это full-time", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Нет, это подработка", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_commitment: {
    id: "ambassador_commitment",
    stage: "Шаг 7 из 7",
    question: "Готовы ли активно строить аудиторию?",
    answers: [
      { text: "Да, буду регулярно создавать контент", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Буду пробовать", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_engagement: {
    id: "ambassador_engagement",
    stage: "Шаг 5 из 7+",
    question: "Какой уровень вовлеченности аудитории?",
    answers: [
      { text: "Высокий (5%+ engagement)", next: "ambassador_monetization" },
      { text: "Средний (2-5%)", next: "ambassador_growth" },
      { text: "Низкий (менее 2%)", next: "ambassador_content_strategy" }
    ]
  },

  ambassador_monetization: {
    id: "ambassador_monetization",
    stage: "Шаг 6 из 7+",
    question: "Монетизируете ли сейчас аудиторию?",
    answers: [
      { text: "Да, есть доход от рекламы/партнерок", next: "ambassador_income" },
      { text: "Нет, но хочу начать", next: "ambassador_projects" }
    ]
  },

  ambassador_income: {
    id: "ambassador_income",
    stage: "Шаг 7 из 7",
    question: "Какой месячный доход?",
    answers: [
      { text: "До $500", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "$500-$2000", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Более $2000", result: { role: "blogger", tariff: "influencer" } }
    ]
  },

  ambassador_growth: {
    id: "ambassador_growth",
    stage: "Шаг 6 из 7+",
    question: "Как быстро растет аудитория?",
    answers: [
      { text: "Быстро (10%+ в месяц)", next: "ambassador_monetization" },
      { text: "Медленно", next: "ambassador_content_strategy" }
    ]
  },

  ambassador_content_strategy: {
    id: "ambassador_content_strategy",
    stage: "Шаг 7 из 7",
    question: "Есть ли контент-стратегия?",
    answers: [
      { text: "Да, планирую контент заранее", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Нет, публикую спонтанно", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_blogger_crossover: {
    id: "ambassador_blogger_crossover",
    stage: "Шаг 5 из 7+",
    question: "Как вы позиционируетесь?",
    answers: [
      { text: "Амбассадор стартапов/брендов", next: "ambassador_partnerships" },
      { text: "Инфлюенсер/Блогер", next: "blogger_monetization_level" }
    ]
  },

  ambassador_partnerships: {
    id: "ambassador_partnerships",
    stage: "Шаг 6 из 7+",
    question: "Сколько брендов/проектов продвигаете?",
    answers: [
      { text: "1-2 одновременно", next: "ambassador_partnership_type" },
      { text: "3-5 одновременно", next: "ambassador_partnership_depth" },
      { text: "Более 5", next: "blogger_collaborations" }
    ]
  },

  ambassador_partnership_type: {
    id: "ambassador_partnership_type",
    stage: "Шаг 7 из 7",
    question: "Какой тип партнерства предпочитаете?",
    answers: [
      { text: "Долгосрочные (3+ месяца)", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Разовые кампании", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  ambassador_partnership_depth: {
    id: "ambassador_partnership_depth",
    stage: "Шаг 7 из 7",
    question: "Насколько глубоко вовлечены в проекты?",
    answers: [
      { text: "Консультирую и помогаю развитию", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Только продвижение", result: { role: "ambassador", tariff: "ambassador" } }
    ]
  },

  // ============ ВЕТКА БЛОГЕРА (расширенная до 7+) ============
  blogger_platform: {
    id: "blogger_platform",
    stage: "Шаг 4 из 7+",
    question: "На какой платформе ваша основная аудитория?",
    answers: [
      { text: "Instagram/TikTok", next: "blogger_audience_size" },
      { text: "YouTube", next: "blogger_youtube_subscribers" },
      { text: "Twitter/LinkedIn", next: "blogger_professional" },
      { text: "Telegram/VK", next: "blogger_audience_size" }
    ]
  },

  blogger_audience_size: {
    id: "blogger_audience_size",
    stage: "Шаг 5 из 7+",
    question: "Какой размер аудитории?",
    answers: [
      { text: "До 10,000", next: "blogger_growth_strategy" },
      { text: "10,000-100,000", next: "blogger_engagement_rate" },
      { text: "Более 100,000", next: "blogger_monetization_level" }
    ]
  },

  blogger_growth_strategy: {
    id: "blogger_growth_strategy",
    stage: "Шаг 6 из 7+",
    question: "Как планируете расти?",
    answers: [
      { text: "Органически (контент)", next: "blogger_content_frequency" },
      { text: "Платная реклама", next: "blogger_ad_budget" },
      { text: "Коллаборации", next: "blogger_niche" }
    ]
  },

  blogger_content_frequency: {
    id: "blogger_content_frequency",
    stage: "Шаг 7 из 7",
    question: "Как часто публикуете контент?",
    answers: [
      { text: "Ежедневно", result: { role: "blogger", tariff: "blogger" } },
      { text: "Несколько раз в неделю", result: { role: "blogger", tariff: "blogger" } },
      { text: "Раз в неделю или реже", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_ad_budget: {
    id: "blogger_ad_budget",
    stage: "Шаг 7 из 7",
    question: "Какой бюджет на рекламу?",
    answers: [
      { text: "$500-$2000/месяц", result: { role: "blogger", tariff: "blogger" } },
      { text: "Более $2000/месяц", result: { role: "blogger", tariff: "influencer" } },
      { text: "Пока нет бюджета", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_niche: {
    id: "blogger_niche",
    stage: "Шаг 7 из 7",
    question: "Есть ли у вас четкая ниша?",
    answers: [
      { text: "Да, узкая специализация", result: { role: "blogger", tariff: "blogger" } },
      { text: "Нет, general content", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_engagement_rate: {
    id: "blogger_engagement_rate",
    stage: "Шаг 6 из 7+",
    question: "Какой engagement rate?",
    answers: [
      { text: "Более 5%", next: "blogger_monetization_current" },
      { text: "2-5%", next: "blogger_content_quality" },
      { text: "Менее 2%", next: "blogger_audience_quality" }
    ]
  },

  blogger_monetization_current: {
    id: "blogger_monetization_current",
    stage: "Шаг 7 из 7",
    question: "Какой текущий доход от блога?",
    answers: [
      { text: "До $1000/месяц", result: { role: "blogger", tariff: "blogger" } },
      { text: "$1000-$5000/месяц", result: { role: "blogger", tariff: "influencer" } },
      { text: "Более $5000/месяц", result: { role: "blogger", tariff: "influencer" } }
    ]
  },

  blogger_content_quality: {
    id: "blogger_content_quality",
    stage: "Шаг 7 из 7",
    question: "Какое качество контента?",
    answers: [
      { text: "Профессиональное (съемка, монтаж)", result: { role: "blogger", tariff: "influencer" } },
      { text: "Среднее (смартфон)", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_audience_quality: {
    id: "blogger_audience_quality",
    stage: "Шаг 7 из 7",
    question: "Анализируете ли аудиторию?",
    answers: [
      { text: "Да, использую аналитику", result: { role: "blogger", tariff: "blogger" } },
      { text: "Нет", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_monetization_level: {
    id: "blogger_monetization_level",
    stage: "Шаг 6 из 7+",
    question: "Какой уровень монетизации?",
    answers: [
      { text: "$5k-$20k/месяц", next: "blogger_business_model" },
      { text: "Более $20k/месяц", next: "blogger_team" },
      { text: "Пока не монетизирую", next: "blogger_monetization_plan" }
    ]
  },

  blogger_business_model: {
    id: "blogger_business_model",
    stage: "Шаг 7 из 7",
    question: "Какая основная модель дохода?",
    answers: [
      { text: "Реклама брендов", result: { role: "blogger", tariff: "influencer" } },
      { text: "Партнерские программы", result: { role: "blogger", tariff: "influencer" } },
      { text: "Свои продукты/курсы", result: { role: "blogger", tariff: "influencer" } }
    ]
  },

  blogger_team: {
    id: "blogger_team",
    stage: "Шаг 7 из 7",
    question: "Работаете ли с командой?",
    answers: [
      { text: "Да, есть менеджер/редактор", result: { role: "blogger", tariff: "influencer" } },
      { text: "Нет, делаю всё сам", result: { role: "blogger", tariff: "influencer" } }
    ]
  },

  blogger_monetization_plan: {
    id: "blogger_monetization_plan",
    stage: "Шаг 7 из 7",
    question: "Планируете ли монетизировать?",
    answers: [
      { text: "Да, активно ищу способы", result: { role: "blogger", tariff: "influencer" } },
      { text: "Пока просто создаю контент", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_youtube_subscribers: {
    id: "blogger_youtube_subscribers",
    stage: "Шаг 5 из 7+",
    question: "Сколько подписчиков на YouTube?",
    answers: [
      { text: "До 10,000", next: "blogger_youtube_content" },
      { text: "10,000-100,000", next: "blogger_youtube_views" },
      { text: "Более 100,000", next: "blogger_youtube_monetization" }
    ]
  },

  blogger_youtube_content: {
    id: "blogger_youtube_content",
    stage: "Шаг 6 из 7+",
    question: "Какой тип контента?",
    answers: [
      { text: "Короткие видео (Shorts)", next: "blogger_youtube_frequency" },
      { text: "Длинные видео (10+ минут)", next: "blogger_youtube_quality" },
      { text: "Оба формата", next: "blogger_youtube_quality" }
    ]
  },

  blogger_youtube_frequency: {
    id: "blogger_youtube_frequency",
    stage: "Шаг 7 из 7",
    question: "Как часто загружаете видео?",
    answers: [
      { text: "Ежедневно", result: { role: "blogger", tariff: "blogger" } },
      { text: "Несколько раз в неделю", result: { role: "blogger", tariff: "blogger" } },
      { text: "Раз в неделю", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_youtube_quality: {
    id: "blogger_youtube_quality",
    stage: "Шаг 7 из 7",
    question: "Какое качество продакшена?",
    answers: [
      { text: "Профессиональное (камера, свет, монтаж)", result: { role: "blogger", tariff: "influencer" } },
      { text: "Среднее", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_youtube_views: {
    id: "blogger_youtube_views",
    stage: "Шаг 6 из 7+",
    question: "Средний просмотр на видео?",
    answers: [
      { text: "До 5,000", next: "blogger_youtube_growth" },
      { text: "5,000-50,000", next: "blogger_youtube_monetization_status" },
      { text: "Более 50,000", next: "blogger_youtube_monetization" }
    ]
  },

  blogger_youtube_growth: {
    id: "blogger_youtube_growth",
    stage: "Шаг 7 из 7",
    question: "Растет ли канал?",
    answers: [
      { text: "Да, стабильный рост", result: { role: "blogger", tariff: "blogger" } },
      { text: "Медленно", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_youtube_monetization_status: {
    id: "blogger_youtube_monetization_status",
    stage: "Шаг 7 из 7",
    question: "Подключена ли монетизация YouTube?",
    answers: [
      { text: "Да, зарабатываю на просмотрах", result: { role: "blogger", tariff: "influencer" } },
      { text: "Нет, не хватает часов просмотра", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_youtube_monetization: {
    id: "blogger_youtube_monetization",
    stage: "Шаг 7 из 7",
    question: "Какой доход от YouTube?",
    answers: [
      { text: "До $2000/месяц", result: { role: "blogger", tariff: "influencer" } },
      { text: "$2000-$10k/месяц", result: { role: "blogger", tariff: "influencer" } },
      { text: "Более $10k/месяц", result: { role: "blogger", tariff: "influencer" } }
    ]
  },

  blogger_professional: {
    id: "blogger_professional",
    stage: "Шаг 5 из 7+",
    question: "Какой тип контента?",
    answers: [
      { text: "B2B / профессиональные темы", next: "blogger_professional_niche" },
      { text: "Personal brand / лайфстайл", next: "blogger_audience_size" }
    ]
  },

  blogger_professional_niche: {
    id: "blogger_professional_niche",
    stage: "Шаг 6 из 7+",
    question: "Есть ли экспертиза в нише?",
    answers: [
      { text: "Да, работаю в индустрии", next: "blogger_professional_network" },
      { text: "Нет, но активно изучаю", next: "blogger_audience_size" }
    ]
  },

  blogger_professional_network: {
    id: "blogger_professional_network",
    stage: "Шаг 7 из 7",
    question: "Есть ли сильная профессиональная сеть?",
    answers: [
      { text: "Да, хорошие связи в индустрии", result: { role: "blogger", tariff: "influencer" } },
      { text: "Нет, только начинаю", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  blogger_collaborations: {
    id: "blogger_collaborations",
    stage: "Шаг 6 из 7+",
    question: "Как часто делаете коллаборации?",
    answers: [
      { text: "Регулярно (1-2 в месяц)", next: "blogger_collab_results" },
      { text: "Иногда", next: "blogger_content_frequency" }
    ]
  },

  blogger_collab_results: {
    id: "blogger_collab_results",
    stage: "Шаг 7 из 7",
    question: "Растет ли аудитория от коллабораций?",
    answers: [
      { text: "Да, заметный прирост", result: { role: "blogger", tariff: "influencer" } },
      { text: "Немного", result: { role: "blogger", tariff: "blogger" } }
    ]
  },

  // ============ ВЕТКА JOB SEEKER (расширенная до 7+) ============
  jobseeker_status: {
    id: "jobseeker_status",
    stage: "Шаг 4 из 7+",
    question: "Ваш текущий статус?",
    answers: [
      { text: "Активно ищу работу", next: "jobseeker_experience" },
      { text: "Рассматриваю предложения", next: "jobseeker_current_job" },
      { text: "Хочу сменить карьеру", next: "jobseeker_career_change" }
    ]
  },

  jobseeker_experience: {
    id: "jobseeker_experience",
    stage: "Шаг 5 из 7+",
    question: "Какой у вас опыт работы?",
    answers: [
      { text: "Без опыта / Junior", next: "jobseeker_education" },
      { text: "1-3 года (Middle)", next: "jobseeker_field" },
      { text: "Более 3 лет (Senior+)", next: "jobseeker_leadership" }
    ]
  },

  jobseeker_education: {
    id: "jobseeker_education",
    stage: "Шаг 6 из 7+",
    question: "Есть ли образование/сертификаты?",
    answers: [
      { text: "Да, профильное образование", next: "jobseeker_learning" },
      { text: "Есть онлайн-курсы", next: "jobseeker_portfolio" },
      { text: "Нет, самоучка", next: "jobseeker_portfolio" }
    ]
  },

  jobseeker_learning: {
    id: "jobseeker_learning",
    stage: "Шаг 7 из 7",
    question: "Готовы ли продолжать обучение?",
    answers: [
      { text: "Да, активно учусь", result: { role: "jobseeker", tariff: "active" } },
      { text: "По необходимости", result: { role: "jobseeker", tariff: "seeker" } }
    ]
  },

  jobseeker_portfolio: {
    id: "jobseeker_portfolio",
    stage: "Шаг 7 из 7",
    question: "Есть ли портфолио или пет-проекты?",
    answers: [
      { text: "Да, есть несколько проектов", result: { role: "jobseeker", tariff: "active" } },
      { text: "Работаю над первым проектом", result: { role: "jobseeker", tariff: "seeker" } },
      { text: "Нет", result: { role: "jobseeker", tariff: "seeker" } }
    ]
  },

  jobseeker_field: {
    id: "jobseeker_field",
    stage: "Шаг 6 из 7+",
    question: "В какой сфере работаете?",
    answers: [
      { text: "Tech (разработка, дизайн, продукт)", next: "jobseeker_tech_role" },
      { text: "Бизнес (маркетинг, продажи, operations)", next: "jobseeker_business_area" },
      { text: "Другое", next: "jobseeker_search_intensity" }
    ]
  },

  jobseeker_tech_role: {
    id: "jobseeker_tech_role",
    stage: "Шаг 7 из 7",
    question: "Какая роль интересует?",
    answers: [
      { text: "Developer", result: { role: "jobseeker", tariff: "active" } },
      { text: "Designer", result: { role: "jobseeker", tariff: "active" } },
      { text: "Product Manager", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Аналитик", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_business_area: {
    id: "jobseeker_business_area",
    stage: "Шаг 7 из 7",
    question: "Какое направление?",
    answers: [
      { text: "Маркетинг / Growth", result: { role: "jobseeker", tariff: "active" } },
      { text: "Продажи / BD", result: { role: "jobseeker", tariff: "active" } },
      { text: "Operations / CS", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_search_intensity: {
    id: "jobseeker_search_intensity",
    stage: "Шаг 7 из 7",
    question: "Как активно ищете?",
    answers: [
      { text: "Очень активно (откликаюсь ежедневно)", result: { role: "jobseeker", tariff: "active" } },
      { text: "Умеренно", result: { role: "jobseeker", tariff: "seeker" } }
    ]
  },

  jobseeker_leadership: {
    id: "jobseeker_leadership",
    stage: "Шаг 6 из 7+",
    question: "Есть ли опыт управления?",
    answers: [
      { text: "Да, руководил командой", next: "jobseeker_team_size" },
      { text: "Нет, индивидуальный contributor", next: "jobseeker_seniority" }
    ]
  },

  jobseeker_team_size: {
    id: "jobseeker_team_size",
    stage: "Шаг 7 из 7",
    question: "Какого размера командой управляли?",
    answers: [
      { text: "2-5 человек (Team Lead)", result: { role: "jobseeker", tariff: "premium" } },
      { text: "6-15 человек (Manager)", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Более 15 (Director/Head)", result: { role: "jobseeker", tariff: "premium" } }
    ]
  },

  jobseeker_seniority: {
    id: "jobseeker_seniority",
    stage: "Шаг 7 из 7",
    question: "Какую роль ищете?",
    answers: [
      { text: "Senior специалист", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Lead / Principal", result: { role: "jobseeker", tariff: "premium" } }
    ]
  },

  jobseeker_current_job: {
    id: "jobseeker_current_job",
    stage: "Шаг 5 из 7+",
    question: "Почему рассматриваете смену?",
    answers: [
      { text: "Хочу больше зарплату", next: "jobseeker_salary_expectations" },
      { text: "Ищу новые вызовы", next: "jobseeker_motivation" },
      { text: "Хочу в стартап/крупную компанию", next: "jobseeker_company_type" }
    ]
  },

  jobseeker_salary_expectations: {
    id: "jobseeker_salary_expectations",
    stage: "Шаг 6 из 7+",
    question: "На сколько хотите увеличить зарплату?",
    answers: [
      { text: "На 20-30%", next: "jobseeker_negotiation" },
      { text: "На 50%+", next: "jobseeker_value_prop" }
    ]
  },

  jobseeker_negotiation: {
    id: "jobseeker_negotiation",
    stage: "Шаг 7 из 7",
    question: "Готовы ли к долгим переговорам?",
    answers: [
      { text: "Да, буду искать идеальный оффер", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Хочу быстро найти", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_value_prop: {
    id: "jobseeker_value_prop",
    stage: "Шаг 7 из 7",
    question: "Можете ли обосновать такой рост?",
    answers: [
      { text: "Да, есть достижения и метрики", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Частично", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_motivation: {
    id: "jobseeker_motivation",
    stage: "Шаг 6 из 7+",
    question: "Какие вызовы интересуют?",
    answers: [
      { text: "Новые технологии/инструменты", next: "jobseeker_learning_attitude" },
      { text: "Управление и лидерство", next: "jobseeker_leadership_ambition" },
      { text: "Более сложные проекты", next: "jobseeker_project_complexity" }
    ]
  },

  jobseeker_learning_attitude: {
    id: "jobseeker_learning_attitude",
    stage: "Шаг 7 из 7",
    question: "Как быстро осваиваете новое?",
    answers: [
      { text: "Очень быстро, люблю учиться", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Нормально", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_leadership_ambition: {
    id: "jobseeker_leadership_ambition",
    stage: "Шаг 7 из 7",
    question: "Есть ли опыт менторства?",
    answers: [
      { text: "Да, менторил джунов", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Нет, но хочу попробовать", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_project_complexity: {
    id: "jobseeker_project_complexity",
    stage: "Шаг 7 из 7",
    question: "Какие проекты интересуют?",
    answers: [
      { text: "Highload / сложные системы", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Инновационные продукты", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Просто более масштабные", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_company_type: {
    id: "jobseeker_company_type",
    stage: "Шаг 6 из 7+",
    question: "Какой тип компании интересует?",
    answers: [
      { text: "Стартап (быстрый рост, риск)", next: "jobseeker_startup_stage" },
      { text: "Крупная компания (стабильность)", next: "jobseeker_corporate" }
    ]
  },

  jobseeker_startup_stage: {
    id: "jobseeker_startup_stage",
    stage: "Шаг 7 из 7",
    question: "Какая стадия стартапа?",
    answers: [
      { text: "Pre-seed / Seed (0-10 человек)", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Series A-B (10-100 человек)", result: { role: "jobseeker", tariff: "active" } },
      { text: "Series C+ (100+ человек)", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_corporate: {
    id: "jobseeker_corporate",
    stage: "Шаг 7 из 7",
    question: "Что важнее?",
    answers: [
      { text: "Бренд компании", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Зарплата и бенефиты", result: { role: "jobseeker", tariff: "active" } },
      { text: "Work-life balance", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_career_change: {
    id: "jobseeker_career_change",
    stage: "Шаг 5 из 7+",
    question: "Откуда хотите перейти?",
    answers: [
      { text: "Из другой индустрии в tech", next: "jobseeker_tech_skills" },
      { text: "Из одной tech-роли в другую", next: "jobseeker_transition_reason" }
    ]
  },

  jobseeker_tech_skills: {
    id: "jobseeker_tech_skills",
    stage: "Шаг 6 из 7+",
    question: "Есть ли tech-навыки?",
    answers: [
      { text: "Да, прошел курсы/буткемп", next: "jobseeker_transition_support" },
      { text: "Нет, но готов учиться", next: "jobseeker_retraining" }
    ]
  },

  jobseeker_transition_support: {
    id: "jobseeker_transition_support",
    stage: "Шаг 7 из 7",
    question: "Нужна ли помощь с переходом?",
    answers: [
      { text: "Да, нужен менторинг", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Нет, справлюсь сам", result: { role: "jobseeker", tariff: "active" } }
    ]
  },

  jobseeker_retraining: {
    id: "jobseeker_retraining",
    stage: "Шаг 7 из 7",
    question: "Готовы ли инвестировать время?",
    answers: [
      { text: "Да, 6-12 месяцев на обучение", result: { role: "jobseeker", tariff: "active" } },
      { text: "Хочу быстрее", result: { role: "jobseeker", tariff: "seeker" } }
    ]
  },

  jobseeker_transition_reason: {
    id: "jobseeker_transition_reason",
    stage: "Шаг 6 из 7+",
    question: "Почему хотите сменить роль?",
    answers: [
      { text: "Текущая не подходит", next: "jobseeker_new_direction" },
      { text: "Хочу больше зарабатывать", next: "jobseeker_salary_expectations" }
    ]
  },

  jobseeker_new_direction: {
    id: "jobseeker_new_direction",
    stage: "Шаг 7 из 7",
    question: "Какое направление интересует?",
    answers: [
      { text: "Продуктовое (PM)", result: { role: "jobseeker", tariff: "premium" } },
      { text: "Аналитическое (Data)", result: { role: "jobseeker", tariff: "active" } },
      { text: "Техническое (Engineering)", result: { role: "jobseeker", tariff: "active" } }
    ]
  }
};

interface InteractiveQuizProps {
  onComplete?: (role: string, tariff: string) => void;
}

const InteractiveQuiz = ({ onComplete }: InteractiveQuizProps) => {
  const [currentQuestionId, setCurrentQuestionId] = useState("start");
  const [history, setHistory] = useState<string[]>(["start"]);
  const [quizResult, setQuizResult] = useState<{ role: string; tariff: string } | null>(null);

  const currentQuestion = quizTree[currentQuestionId];
  const progress = Math.min(100, (history.length / 7) * 100);

  // Safety check: if currentQuestion is undefined, reset to start
  if (!currentQuestion) {
    setCurrentQuestionId("start");
    setHistory(["start"]);
    return null;
  }

  const handleAnswer = (answer: Answer) => {
    if (answer.result) {
      setQuizResult(answer.result);
      if (onComplete) {
        onComplete(answer.result.role, answer.result.tariff);
      }
    } else if (answer.next) {
      setCurrentQuestionId(answer.next);
      setHistory([...history, answer.next]);
    }
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentQuestionId(newHistory[newHistory.length - 1]);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionId("start");
    setHistory(["start"]);
    setQuizResult(null);
  };

  // Mapping quiz role to display role names
  const ROLE_NAMES: Record<string, string> = {
    investor: "Инвестор",
    coinvestor: "Соинвестор",
    franchisee: "Франчайзи",
    founder: "Фаундер",
    cofounder: "Ко-фаундер",
    copartner: "Соучредитель",
    franchiser: "Франчайзер",
    freelancer: "Фрилансер",
    expert: "Эксперт",
    consultant: "Консультант",
    outsourcer: "Аутсорсер",
    contractor: "Подрядчик",
    projectadmin: "Администратор стартапа",
    employee: "Сотрудник стартапа",
    jobseeker: "Соискатель",
    partner: "Партнёр (Affiliate)",
    ambassador: "Амбассадор проекта",
    blogger: "Лидер мнений/Блогер"
  };

  if (quizResult) {
    const leadMagnet = LEAD_MAGNETS[quizResult.role]?.[quizResult.tariff];
    const roleName = ROLE_NAMES[quizResult.role] || quizResult.role;
    
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 shadow-xl">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-3xl font-bold text-foreground">
                Отлично! Мы подобрали для вас идеальный вариант
              </h3>
              
              <div className="bg-accent/10 rounded-lg p-6 space-y-4">
                <div>
                  <p className="text-muted-foreground font-medium mb-2">Рекомендованный тариф:</p>
                  <p className="text-2xl font-bold text-primary">{roleName} - {leadMagnet?.tariff}</p>
                </div>
                <Button 
                  className="w-full mt-4" 
                  size="lg"
                  onClick={() => window.location.href = `/pricing?role=${encodeURIComponent(roleName)}&period=1`}
                >
                  Посмотреть
                </Button>
              </div>

              {leadMagnet && (
                <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
                  <h4 className="font-semibold text-lg text-foreground">Ваш бонус:</h4>
                  <p className="text-muted-foreground">{leadMagnet.title}</p>
                  <Button className="w-full" size="lg" variant="secondary">
                    <Download className="w-5 h-5 mr-2" />
                    Скачать {leadMagnet.file}
                  </Button>
                </div>
              )}

              <div className="flex gap-4">
                <Button onClick={handleRestart} variant="outline" className="flex-1">
                  Пройти заново
                </Button>
                <Button 
                  onClick={() => window.location.href = '/auth'}
                  className="flex-1"
                >
                  Зарегистрироваться
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Найдите свой путь на платформе
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответьте на несколько вопросов, и мы подберём идеальный тариф
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{currentQuestion.stage}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-3 sm:p-8 shadow-lg">
            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-3 sm:mb-6 leading-tight break-words hyphens-auto">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 sm:py-4 px-4 sm:px-6 hover:bg-primary/5 hover:border-primary transition-all"
                >
                  <span className="text-sm sm:text-base break-words leading-tight whitespace-normal flex-1 pr-2">{answer.text}</span>
                  <ArrowRight className="ml-auto w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground flex-shrink-0" />
                </Button>
              ))}
            </div>

            {history.length > 1 && (
              <Button
                onClick={handleBack}
                variant="ghost"
                className="mt-6 w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </Button>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
