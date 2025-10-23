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
      { text: "Более $100,000", next: "invest_huge_approach" }
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

  // ============ ВЕТКА ПРЕДПРИНИМАТЕЛЕЙ ============
  business_stage: {
    id: "business_stage",
    stage: "Шаг 2 из 7+",
    question: "На какой стадии находится ваш бизнес или идея?",
    answers: [
      { text: "Идея или концепция", next: "business_goal" },
      { text: "Стартап в запуске", next: "business_funding" },
      { text: "Развивающийся бизнес", next: "business_scale" }
    ]
  },

  business_goal: {
    id: "business_goal",
    stage: "Шаг 3 из 7+",
    question: "Какая ваша основная цель?",
    answers: [
      { text: "Поиск инвестиций", next: "business_investor_type" },
      { text: "Разработка продукта", next: "business_team" },
      { text: "Маркетинг и продажи", next: "business_marketing" }
    ]
  },

  business_investor_type: {
    id: "business_investor_type",
    stage: "Шаг 4 из 7+",
    question: "Какой тип инвестора вам интересен?",
    answers: [
      { text: "Ангел-инвестор", next: "business_pitch_ready" },
      { text: "Венчурный фонд", next: "business_pitch_ready" },
      { text: "Краудфандинг", next: "business_pitch_ready" }
    ]
  },

  business_pitch_ready: {
    id: "business_pitch_ready",
    stage: "Шаг 5 из 7+",
    question: "Готов ли у вас pitch deck или презентация?",
    answers: [
      { text: "Да, готов", next: "business_funding_amount" },
      { text: "Нет, нужна помощь", next: "business_pitch_help" }
    ]
  },

  business_pitch_help: {
    id: "business_pitch_help",
    stage: "Шаг 6 из 7+",
    question: "Хотите ли получить шаблоны и помощь в подготовке?",
    answers: [
      { text: "Да, хочу", result: { role: "founder", tariff: "startup" } },
      { text: "Нет, справлюсь сам", next: "business_funding_amount" }
    ]
  },

  business_funding_amount: {
    id: "business_funding_amount",
    stage: "Шаг 7 из 7",
    question: "Какую сумму планируете привлечь?",
    answers: [
      { text: "До $100,000", result: { role: "founder", tariff: "startup" } },
      { text: "$100,000 - $500,000", result: { role: "founder", tariff: "growth" } },
      { text: "Более $500,000", result: { role: "founder", tariff: "scale" } }
    ]
  },

  business_funding: {
    id: "business_funding",
    stage: "Шаг 3 из 7+",
    question: "Как вы планируете финансировать стартап?",
    answers: [
      { text: "Собственные средства", next: "business_team" },
      { text: "Инвестиции", next: "business_investor_type" },
      { text: "Гранты и субсидии", next: "business_team" }
    ]
  },

  business_team: {
    id: "business_team",
    stage: "Шаг 4 из 7+",
    question: "Есть ли у вас команда?",
    answers: [
      { text: "Да, сформирована", next: "business_roles" },
      { text: "Нет, ищу сооснователей", next: "business_roles" }
    ]
  },

  business_roles: {
    id: "business_roles",
    stage: "Шаг 5 из 7+",
    question: "Какие роли вам нужны в команде?",
    answers: [
      { text: "Технический сооснователь", next: "business_marketing" },
      { text: "Маркетолог", next: "business_marketing" },
      { text: "Финансист", next: "business_marketing" }
    ]
  },

  business_marketing: {
    id: "business_marketing",
    stage: "Шаг 6 из 7+",
    question: "Как вы планируете продвигать продукт?",
    answers: [
      { text: "Онлайн маркетинг", next: "business_scale" },
      { text: "Офлайн мероприятия", next: "business_scale" },
      { text: "Партнёрства", next: "business_scale" }
    ]
  },

  business_scale: {
    id: "business_scale",
    stage: "Шаг 7 из 7",
    question: "Какие планы по масштабированию?",
    answers: [
      { text: "Рост в регионе", result: { role: "founder", tariff: "growth" } },
      { text: "Выход на международный рынок", result: { role: "founder", tariff: "scale" } }
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

  ecosystem_consultant_type: {
    id: "ecosystem_consultant_type",
    stage: "Шаг 3 из 7+",
    question: "Какой тип консультанта вы?",
    answers: [
      { text: "Бизнес-аналитик", result: { role: "consultant", tariff: "analyst" } },
      { text: "Стратег", result: { role: "consultant", tariff: "strategist" } },
      { text: "C-level", result: { role: "consultant", tariff: "clevel" } }
    ]
  },

  ecosystem_freelancer_level: {
    id: "ecosystem_freelancer_level",
    stage: "Шаг 3 из 7+",
    question: "Какой у вас уровень?",
    answers: [
      { text: "Новичок", result: { role: "freelancer", tariff: "novice" } },
      { text: "Профессионал", result: { role: "freelancer", tariff: "professional" } },
      { text: "Эксперт", result: { role: "freelancer", tariff: "expert" } }
    ]
  },

  ecosystem_ambassador: {
    id: "ecosystem_ambassador",
    stage: "Шаг 3 из 7+",
    question: "Вы амбассадор или блогер?",
    answers: [
      { text: "Амбассадор", result: { role: "ambassador", tariff: "ambassador" } },
      { text: "Блогер", result: { role: "blogger", tariff: "blogger" } }
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
    founder: "Фаундер",
    cofounder: "Ко-фаундер",
    copartner: "Соучредитель",
    franchiser: "Франчайзер",
    freelancer: "Фрилансер",
    expert: "Эксперт",
    consultant: "Консультант",
    outsourcer: "Аутсорсер",
    contractor: "Подрядчик",
    projectadmin: "Администратор проекта",
    employee: "Сотрудник проекта",
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

          <Card className="p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-primary/5 hover:border-primary transition-all"
                >
                  <span className="text-base">{answer.text}</span>
                  <ArrowRight className="ml-auto w-5 h-5 text-muted-foreground" />
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
