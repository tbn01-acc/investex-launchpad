import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Типы для структуры квиза
type Answer = {
  text: string;
  next?: string; // ID следующего вопроса
  result?: {
    role: string;
    tariff: string;
  };
};

type Question = {
  id: string;
  question: string;
  stage?: string;
  answers: Answer[];
};

// 41 уникальных лид-магнитов для каждого тарифа
const LEAD_MAGNETS: Record<string, Record<string, { leadMagnet: string; description: string; cjm: string }>> = {
  investor: {
    beginner: {
      leadMagnet: "📊 Бесплатный гайд: 'Первые шаги в венчурных инвестициях' + доступ к 20 проектам",
      description: "Начинающий инвестор, изучающий венчурный рынок",
      cjm: "/investments/start"
    },
    professional: {
      leadMagnet: "🎯 AI Due Diligence на первый проект + 7 дней пробного периода Premium",
      description: "Профессиональный инвестор с активным портфолио",
      cjm: "/investments/projects"
    },
    elite: {
      leadMagnet: "👑 Персональная встреча с топ-фаундером + эксклюзивный pre-seed deal flow",
      description: "Элитный инвестор с крупным капиталом",
      cjm: "/investments/portfolio"
    }
  },
  coinvestor: {
    participant: {
      leadMagnet: "🤝 Приглашение в первый инвестиционный синдикат + обучающий вебинар",
      description: "Участник синдицированных инвестиций",
      cjm: "/investments/syndicates"
    },
    club: {
      leadMagnet: "💎 Скидка 50% на вход в закрытый синдикат + коллективный Due Diligence отчет",
      description: "Активный член инвестиционного клуба",
      cjm: "/investments/syndicates"
    },
    syndicate: {
      leadMagnet: "🏆 Готовый шаблон синдиката + юридическое сопровождение первой сделки",
      description: "Лид-инвестор, создающий собственные синдикаты",
      cjm: "/investments/syndicates"
    }
  },
  founder: {
    startup: {
      leadMagnet: "🚀 Профессиональный Pitch Deck шаблон + бизнес-план на 30 страниц",
      description: "Стартап на начальной стадии развития",
      cjm: "/startups/fundraise"
    },
    growth: {
      leadMagnet: "📈 Финмодель на 5 лет + AI-анализ конкурентов + Data Room setup",
      description: "Растущий стартап, готовый к масштабированию",
      cjm: "/startups/fundraise"
    },
    scale: {
      leadMagnet: "💼 Персональная стратегическая сессия + прямые контакты с VC фондами",
      description: "Масштабируемый стартап, готовый к крупным раундам",
      cjm: "/startups/fundraise"
    }
  },
  cofounder: {
    seeker: {
      leadMagnet: "🔍 AI-подбор 5 идеальных проектов под ваш профиль + гайд по переговорам",
      description: "Ищущий проект для со-основания",
      cjm: "/startups/find-investors"
    },
    search: {
      leadMagnet: "🎯 Доступ к закрытым проектам + симулятор успеха стартапа",
      description: "Активно ищущий партнерство в стартапе",
      cjm: "/startups/find-investors"
    },
    partner: {
      leadMagnet: "⚖️ Юридический пакет для со-основателей + калькулятор доли в проекте",
      description: "Готовый стать полноценным партнером",
      cjm: "/startups/find-investors"
    }
  },
  mafounder: {
    observer: {
      leadMagnet: "📋 Ежемесячный отчет по M&A сделкам + база из 50 проектов на продажу",
      description: "Наблюдатель рынка слияний и поглощений",
      cjm: "/investments/secondary"
    },
    advanced: {
      leadMagnet: "🔬 Профессиональный Due Diligence чеклист + 3 бесплатных анализа проектов",
      description: "Продвинутый участник M&A сделок",
      cjm: "/investments/secondary"
    },
    strategic: {
      leadMagnet: "🎖️ Доступ к closed deal flow + участие в совете директоров портфельной компании",
      description: "Стратегический соучредитель через M&A",
      cjm: "/investments/secondary"
    }
  },
  franchiser: {
    basic: {
      leadMagnet: "📦 Готовый франчайзинговый пакет документов + размещение в каталоге",
      description: "Базовый франчайзер, начинающий развитие сети",
      cjm: "/management-franchises"
    },
    growth: {
      leadMagnet: "🌐 CRM для франчайзинга + AI-подбор 10 потенциальных франчайзи",
      description: "Растущий франчайзер с активной сетью",
      cjm: "/management-franchises"
    },
    scale: {
      leadMagnet: "🏢 Мини-сайт франшизы + персональный менеджер + юридическое сопровождение",
      description: "Масштабируемая франшиза с большой сетью",
      cjm: "/management-franchises"
    }
  },
  freelancer: {
    novice: {
      leadMagnet: "💼 Оптимизированный профиль + 5 откликов на премиум проекты бесплатно",
      description: "Новичок-фрилансер, начинающий карьеру",
      cjm: "/executors"
    },
    professional: {
      leadMagnet: "⭐ Верификация профиля + топ-размещение на 30 дней + time-tracking инструменты",
      description: "Профессиональный фрилансер с портфолио",
      cjm: "/executors"
    },
    expert: {
      leadMagnet: "👨‍💼 Персональный менеджер + доступ к проектам $10k+ + возможность equity",
      description: "Эксперт-фрилансер с премиум статусом",
      cjm: "/executors"
    }
  },
  expert: {
    intern: {
      leadMagnet: "📚 Сертификация эксперта + 2 бесплатные консультации для портфолио",
      description: "Консультант-стажер, набирающий опыт",
      cjm: "/executors"
    },
    consultant: {
      leadMagnet: "🎓 Доступ к клиентской базе + профессиональные инструменты отчетности",
      description: "Сертифицированный консультант",
      cjm: "/executors"
    },
    senior: {
      leadMagnet: "🏅 Статус ведущего эксперта + участие в инвестиционных комитетах + $100/час ставка",
      description: "Сениор-эксперт с высоким статусом",
      cjm: "/executors"
    }
  },
  businessConsultant: {
    analyst: {
      leadMagnet: "📊 Библиотека бизнес-аналитики + готовые шаблоны + 2 платных консультации",
      description: "Бизнес-аналитик, начинающий консультирование",
      cjm: "/executors"
    },
    consultant: {
      leadMagnet: "📈 Инструменты бизнес-моделирования + долгосрочные контракты со стартапами",
      description: "Бизнес-консультант по стратегии",
      cjm: "/executors"
    },
    strategic: {
      leadMagnet: "🎯 C-level клиенты + проекты корпоративной трансформации + $150/час ставка",
      description: "Стратегический консультант высшего уровня",
      cjm: "/executors"
    }
  },
  outsourcer: {
    team: {
      leadMagnet: "👥 CRM для управления командой + доступ к открытым тендерам + шаблоны договоров",
      description: "Малая команда аутсорсеров",
      cjm: "/executors"
    },
    agency: {
      leadMagnet: "🏢 White label возможности + приоритет в тендерах + расширенная аналитика",
      description: "Аутсорсинговое агентство среднего размера",
      cjm: "/executors"
    },
    enterprise: {
      leadMagnet: "🏆 Enterprise контракты + персональный менеджер + индивидуальные SLA",
      description: "Крупное аутсорсинговое предприятие",
      cjm: "/executors"
    }
  },
  contractor: {
    basic: {
      leadMagnet: "🔨 Сертификация подрядчика + доступ к базе проектов + юридические шаблоны",
      description: "Базовый подрядчик",
      cjm: "/executors"
    },
    certified: {
      leadMagnet: "✅ Полная сертификация + B2B контракты + инструменты контроля качества",
      description: "Сертифицированный подрядчик",
      cjm: "/executors"
    },
    premium: {
      leadMagnet: "💎 Эксклюзивные контракты $100k+ + персональный менеджер + страхование",
      description: "Премиум подрядчик для крупных проектов",
      cjm: "/executors"
    }
  },
  projectAdmin: {
    admin: {
      leadMagnet: "⚙️ AI-советник по управлению + автоматизация отчетов + карьерный трек + опционы",
      description: "Администратор проекта с полным функционалом",
      cjm: "/project-management"
    }
  },
  employee: {
    employee: {
      leadMagnet: "💼 Токенизированные опционы + персональное менторство + корпоративное обучение",
      description: "Сотрудник проекта с карьерным треком",
      cjm: "/employees"
    }
  },
  jobseeker: {
    basic: {
      leadMagnet: "📝 AI-оптимизация резюме + 10 откликов на вакансии + карьерные мероприятия",
      description: "Базовый соискатель работы в стартапах",
      cjm: "/employees"
    },
    premium: {
      leadMagnet: "🎯 Персональные рекомендации + подготовка к собеседованиям + карьерный roadmap",
      description: "Премиум соискатель с AI-поддержкой",
      cjm: "/employees"
    },
    pro: {
      leadMagnet: "👔 Закрытые вакансии в топ-стартапах + networking с лидерами + карьерный консультант",
      description: "Профессиональный соискатель с привилегиями",
      cjm: "/employees"
    }
  },
  affiliate: {
    partner: {
      leadMagnet: "💰 25% комиссия + готовые креативы + персональный менеджер + реал-тайм аналитика",
      description: "Партнер (Affiliate) с высокими комиссиями",
      cjm: "/partners"
    }
  },
  ambassador: {
    ambassador: {
      leadMagnet: "🌟 Токены проектов + эксклюзивный контент + влияние на развитие + NFT активы",
      description: "Амбассадор проекта с особыми привилегиями",
      cjm: "/community"
    }
  },
  blogger: {
    blogger: {
      leadMagnet: "📹 Эксклюзивные интервью + инсайдерская информация + монетизация контента + поддержка",
      description: "Блогер/Инфлюенсер с приоритетным доступом",
      cjm: "/community"
    }
  }
};

// Ветвленая структура вопросов
const quizTree: Record<string, Question> = {
  start: {
    id: "start",
    stage: "Определение категории",
    question: "Выберите, что лучше всего описывает вашу текущую ситуацию:",
    answers: [
      { text: "💰 У меня есть капитал для инвестиций", next: "capital" },
      { text: "🚀 У меня есть идея/проект или я хочу создать бизнес", next: "business" },
      { text: "💼 У меня есть навыки/опыт, которые я хочу применить", next: "talent" },
      { text: "🤝 Я хочу быть частью экосистемы и влиять на развитие", next: "ecosystem" }
    ]
  },
  
  // === ВЕТКА КАПИТАЛ ===
  capital: {
    id: "capital",
    stage: "Капитал - Тип участия",
    question: "Как вы хотите инвестировать?",
    answers: [
      { text: "Самостоятельно принимать инвестиционные решения", next: "capital_solo" },
      { text: "Инвестировать вместе с другими (синдикаты, пулы)", next: "capital_together" },
      { text: "Инвестировать в готовые бизнес-модели (франшизы)", next: "capital_franchise" }
    ]
  },
  
  capital_solo: {
    id: "capital_solo",
    stage: "Капитал - Бюджет",
    question: "Каким капиталом вы располагаете для инвестиций?",
    answers: [
      { text: "До $10,000 - хочу начать с небольших сумм", next: "investor_beginner" },
      { text: "$10,000 - $100,000 - готов к умеренным инвестициям", next: "investor_budget" },
      { text: "Более $100,000 - готов к крупным венчурным инвестициям", next: "investor_large" }
    ]
  },
  
  investor_beginner: {
    id: "investor_beginner",
    stage: "Инвестор - Опыт",
    question: "Какой у вас опыт в инвестициях?",
    answers: [
      { 
        text: "Новичок - только начинаю изучать венчурные инвестиции",
        result: { role: "investor", tariff: "beginner" }
      },
      { 
        text: "Есть небольшой опыт - хочу расширить портфолио",
        result: { role: "investor", tariff: "professional" }
      }
    ]
  },
  
  investor_budget: {
    id: "investor_budget",
    stage: "Инвестор - Цели",
    question: "Какие функции для вас наиболее важны?",
    answers: [
      { 
        text: "Базовые - просмотр проектов и аналитика",
        result: { role: "investor", tariff: "beginner" }
      },
      { 
        text: "Расширенные - AI-аналитика, закрытые раунды, вторичный рынок",
        result: { role: "investor", tariff: "professional" }
      }
    ]
  },
  
  investor_large: {
    id: "investor_large",
    stage: "Инвестор - Уровень",
    question: "Какой уровень сервиса вам нужен?",
    answers: [
      { 
        text: "Стандартный профессиональный сервис с расширенной аналитикой",
        result: { role: "investor", tariff: "professional" }
      },
      { 
        text: "Элитный сервис с персональным менеджером и эксклюзивными сделками",
        result: { role: "investor", tariff: "elite" }
      }
    ]
  },
  
  capital_together: {
    id: "capital_together",
    stage: "Соинвестор - Роль",
    question: "Какую роль вы хотите играть?",
    answers: [
      { text: "Участвовать в синдикатах других инвесторов", next: "coinvestor_participant" },
      { text: "Создавать и управлять собственными синдикатами", next: "coinvestor_lead" }
    ]
  },
  
  coinvestor_participant: {
    id: "coinvestor_participant",
    stage: "Соинвестор - Активность",
    question: "Насколько активно вы планируете участвовать?",
    answers: [
      { 
        text: "Изредка - буду изучать возможности",
        result: { role: "coinvestor", tariff: "participant" }
      },
      { 
        text: "Активно - хочу быть частью инвестиционного клуба",
        result: { role: "coinvestor", tariff: "club" }
      }
    ]
  },
  
  coinvestor_lead: {
    id: "coinvestor_lead",
    stage: "Соинвестор - Опыт управления",
    question: "Есть ли у вас опыт управления инвестициями?",
    answers: [
      { 
        text: "Нет опыта - хочу научиться через участие в клубе",
        result: { role: "coinvestor", tariff: "club" }
      },
      { 
        text: "Есть опыт - готов создавать и управлять синдикатами",
        result: { role: "coinvestor", tariff: "syndicate" }
      }
    ]
  },
  
  capital_franchise: {
    id: "capital_franchise",
    stage: "Франчайзер - Стадия",
    question: "На какой стадии ваш франчайзинговый проект?",
    answers: [
      { 
        text: "Только начинаю - 1 франшиза",
        result: { role: "franchiser", tariff: "basic" }
      },
      { 
        text: "Развиваюсь - до 3 франшиз и до 50 франчайзи",
        result: { role: "franchiser", tariff: "growth" }
      },
      { 
        text: "Масштабируюсь - неограниченное количество",
        result: { role: "franchiser", tariff: "scale" }
      }
    ]
  },
  
  // === ВЕТКА БИЗНЕС ===
  business: {
    id: "business",
    stage: "Бизнес - Тип участия",
    question: "Что лучше всего описывает вашу ситуацию?",
    answers: [
      { text: "У меня есть своя идея - хочу создать стартап", next: "business_founder" },
      { text: "Хочу присоединиться к существующему проекту как партнер", next: "business_cofounder" },
      { text: "Хочу покупать/объединять существующие компании", next: "business_ma" },
      { text: "Предлагаю услуги для стартапов и проектов", next: "business_service" }
    ]
  },
  
  business_founder: {
    id: "business_founder",
    stage: "Фаундер - Стадия",
    question: "На какой стадии ваш проект?",
    answers: [
      { 
        text: "Идея или MVP - только начинаю",
        result: { role: "founder", tariff: "startup" }
      },
      { 
        text: "Есть продукт и первые клиенты - готов к росту",
        result: { role: "founder", tariff: "growth" }
      },
      { 
        text: "Растущий бизнес - готов к крупным раундам и масштабированию",
        result: { role: "founder", tariff: "scale" }
      }
    ]
  },
  
  business_cofounder: {
    id: "business_cofounder",
    stage: "Ко-фаундер - Готовность",
    question: "Насколько вы готовы к партнерству?",
    answers: [
      { 
        text: "Только ищу подходящий проект - хочу изучить варианты",
        result: { role: "cofounder", tariff: "seeker" }
      },
      { 
        text: "Активно ищу - готов к детальному анализу и общению",
        result: { role: "cofounder", tariff: "search" }
      },
      { 
        text: "Готов стать партнером - нужна юридическая поддержка",
        result: { role: "cofounder", tariff: "partner" }
      }
    ]
  },
  
  business_ma: {
    id: "business_ma",
    stage: "M&A - Активность",
    question: "Насколько активно вы планируете участвовать в M&A?",
    answers: [
      { 
        text: "Наблюдаю за рынком - изучаю возможности",
        result: { role: "mafounder", tariff: "observer" }
      },
      { 
        text: "Готов к сделкам - нужны инструменты анализа",
        result: { role: "mafounder", tariff: "advanced" }
      },
      { 
        text: "Активный участник - нужен полный пакет с юридической поддержкой",
        result: { role: "mafounder", tariff: "strategic" }
      }
    ]
  },
  
  business_service: {
    id: "business_service",
    stage: "Услуги - Тип",
    question: "Какой тип услуг вы предлагаете?",
    answers: [
      { text: "Команда разработки, дизайна или других услуг", next: "service_team" },
      { text: "Крупные подрядные работы и контракты", next: "service_contractor" }
    ]
  },
  
  service_team: {
    id: "service_team",
    stage: "Аутсорсер - Размер",
    question: "Какой размер вашей команды?",
    answers: [
      { 
        text: "До 5 специалистов - малая команда",
        result: { role: "outsourcer", tariff: "team" }
      },
      { 
        text: "До 20 специалистов - агентство",
        result: { role: "outsourcer", tariff: "agency" }
      },
      { 
        text: "Более 20 специалистов - крупное предприятие",
        result: { role: "outsourcer", tariff: "enterprise" }
      }
    ]
  },
  
  service_contractor: {
    id: "service_contractor",
    stage: "Подрядчик - Уровень",
    question: "Какой уровень проектов вас интересует?",
    answers: [
      { 
        text: "Стандартные проекты - нужна базовая сертификация",
        result: { role: "contractor", tariff: "basic" }
      },
      { 
        text: "B2B контракты - нужна полная сертификация и QA инструменты",
        result: { role: "contractor", tariff: "certified" }
      },
      { 
        text: "Эксклюзивные контракты $100k+ - нужен премиум пакет",
        result: { role: "contractor", tariff: "premium" }
      }
    ]
  },
  
  // === ВЕТКА ТАЛАНТ ===
  talent: {
    id: "talent",
    stage: "Талант - Формат работы",
    question: "В каком формате вы хотите работать?",
    answers: [
      { text: "Ищу постоянную работу в стартапе", next: "talent_employee" },
      { text: "Работаю как фрилансер на проектах", next: "talent_freelance" },
      { text: "Предлагаю экспертные консультации", next: "talent_consulting" }
    ]
  },
  
  talent_employee: {
    id: "talent_employee",
    stage: "Сотрудник - Статус",
    question: "Каков ваш текущий статус?",
    answers: [
      { 
        text: "Ищу работу - активный поиск",
        next: "talent_jobseeker"
      },
      { 
        text: "Уже работаю в проекте - нужны инструменты управления",
        result: { role: "employee", tariff: "employee" }
      },
      { 
        text: "Управляю проектом - нужны инструменты администрирования",
        result: { role: "projectAdmin", tariff: "admin" }
      }
    ]
  },
  
  talent_jobseeker: {
    id: "talent_jobseeker",
    stage: "Соискатель - Уровень",
    question: "Какой уровень сервиса вам нужен?",
    answers: [
      { 
        text: "Базовый - поиск вакансий и отклики",
        result: { role: "jobseeker", tariff: "basic" }
      },
      { 
        text: "Премиум - AI-оптимизация резюме и карьерное планирование",
        result: { role: "jobseeker", tariff: "premium" }
      },
      { 
        text: "Профи - закрытые вакансии и персональный консультант",
        result: { role: "jobseeker", tariff: "pro" }
      }
    ]
  },
  
  talent_freelance: {
    id: "talent_freelance",
    stage: "Фрилансер - Опыт",
    question: "Какой у вас уровень опыта?",
    answers: [
      { 
        text: "Новичок - только начинаю карьеру фрилансера",
        result: { role: "freelancer", tariff: "novice" }
      },
      { 
        text: "Профессионал - есть портфолио и опыт",
        result: { role: "freelancer", tariff: "professional" }
      },
      { 
        text: "Эксперт - работаю с крупными проектами и хочу equity",
        result: { role: "freelancer", tariff: "expert" }
      }
    ]
  },
  
  talent_consulting: {
    id: "talent_consulting",
    stage: "Консультации - Специализация",
    question: "Какая ваша специализация?",
    answers: [
      { text: "Технические/отраслевые консультации", next: "consulting_expert" },
      { text: "Бизнес-консультирование и стратегия", next: "consulting_business" }
    ]
  },
  
  consulting_expert: {
    id: "consulting_expert",
    stage: "Эксперт - Уровень",
    question: "Какой ваш уровень экспертизы?",
    answers: [
      { 
        text: "Консультант-стажер - набираю опыт",
        result: { role: "expert", tariff: "intern" }
      },
      { 
        text: "Консультант - сертифицированный эксперт",
        result: { role: "expert", tariff: "consultant" }
      },
      { 
        text: "Сениор - ведущий эксперт с участием в комитетах",
        result: { role: "expert", tariff: "senior" }
      }
    ]
  },
  
  consulting_business: {
    id: "consulting_business",
    stage: "Бизнес-консультант - Уровень",
    question: "С кем вы работаете?",
    answers: [
      { 
        text: "Бизнес-аналитик - работаю со стартапами",
        result: { role: "businessConsultant", tariff: "analyst" }
      },
      { 
        text: "Бизнес-консультант - разрабатываю стратегии и планы",
        result: { role: "businessConsultant", tariff: "consultant" }
      },
      { 
        text: "Стратегический консультант - работаю с C-level",
        result: { role: "businessConsultant", tariff: "strategic" }
      }
    ]
  },
  
  // === ВЕТКА ЭКОСИСТЕМА ===
  ecosystem: {
    id: "ecosystem",
    stage: "Экосистема - Роль",
    question: "Как вы хотите участвовать в экосистеме?",
    answers: [
      { 
        text: "🤝 Как партнер - привлекать пользователей и получать комиссии",
        result: { role: "affiliate", tariff: "partner" }
      },
      { 
        text: "🌟 Как амбассадор - представлять конкретные проекты",
        result: { role: "ambassador", tariff: "ambassador" }
      },
      { 
        text: "📹 Как блогер/инфлюенсер - создавать контент об экосистеме",
        result: { role: "blogger", tariff: "blogger" }
      }
    ]
  }
};

const InteractiveQuiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("start");
  const [questionHistory, setQuestionHistory] = useState<string[]>(["start"]);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<{ role: string; tariff: string } | null>(null);
  const [hideQuiz, setHideQuiz] = useState(false);
  const navigate = useNavigate();

  const currentQuestion = quizTree[currentQuestionId];
  
  // Вычисляем прогресс на основе глубины в дереве
  const progress = Math.min((questionHistory.length / 6) * 100, 95);

  const handleAnswer = (answer: Answer) => {
    if (answer.result) {
      // Это финальный ответ
      setFinalResult(answer.result);
      setShowResult(true);
    } else if (answer.next) {
      // Переход к следующему вопросу
      setCurrentQuestionId(answer.next);
      setQuestionHistory([...questionHistory, answer.next]);
    }
  };

  const handleBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop(); // Убираем текущий вопрос
      const previousQuestionId = newHistory[newHistory.length - 1];
      setQuestionHistory(newHistory);
      setCurrentQuestionId(previousQuestionId);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionId("start");
    setQuestionHistory(["start"]);
    setShowResult(false);
    setFinalResult(null);
  };

  const getResultData = () => {
    if (!finalResult) return null;
    return LEAD_MAGNETS[finalResult.role]?.[finalResult.tariff];
  };

  if (hideQuiz) return null;

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-5xl mx-auto shadow-2xl border-2 relative">
          <div className="absolute top-5 right-5 z-10">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox 
                checked={hideQuiz} 
                onCheckedChange={(checked) => setHideQuiz(checked as boolean)}
              />
              <span className="text-sm text-muted-foreground">Больше не показывать</span>
            </label>
          </div>
          
          <div className="p-8 md:p-12">
            {!showResult ? (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Найдите свою роль в экосистеме
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Ответьте на вопросы, чтобы получить персональные рекомендации
                  </p>
                  {currentQuestion.stage && (
                    <Badge variant="secondary" className="mb-4">
                      {currentQuestion.stage}
                    </Badge>
                  )}
                </div>

                <Progress value={progress} className="w-full mb-8 h-3" />
                
                {questionHistory.length > 1 && (
                  <div className="mb-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Назад
                    </Button>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
                    {currentQuestion.question}
                  </h3>
                  
                  <div className="space-y-3 max-w-3xl mx-auto">
                    {currentQuestion.answers.map((answer, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="lg"
                        className="w-full text-left justify-start p-6 h-auto text-base font-medium hover:border-primary hover:bg-primary/5 hover:scale-[1.02] transition-all leading-relaxed whitespace-normal"
                        onClick={() => handleAnswer(answer)}
                      >
                        <span className="break-words">{answer.text}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in text-center max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  Ваш результат
                </h2>
                
                <p className="text-lg text-muted-foreground mb-8">
                  {getResultData()?.description}
                </p>
                
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-2">🎁 Ваш персональный лид-магнит:</h3>
                  <p className="text-muted-foreground">{getResultData()?.leadMagnet}</p>
                </Card>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    size="lg" 
                    onClick={() => navigate(getResultData()?.cjm || "/dashboard")} 
                    className="text-base px-8"
                  >
                    Начать путь
                  </Button>
                  <Button variant="outline" size="lg" onClick={resetQuiz} className="text-base px-8">
                    Пройти заново
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveQuiz;
