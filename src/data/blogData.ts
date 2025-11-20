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
    content: 'За 15 лет ангельского инвестирования я вложил средства в более чем 30 стартапов. Мой портфель включает как громкие успехи с доходностью 20x+, так и полные провалы. В этой статье делюсь реальным опытом диверсификации, ошибками и стратегиями минимизации рисков.',
    fullContent: `За 15 лет ангельского инвестирования я вложил средства в более чем 30 стартапов в различных отраслях и на разных стадиях развития. Мой портфель включает как громкие успехи с доходностью 20x+, так и полные провалы, которые научили меня не меньше.

## Почему диверсификация критична в ангельском инвестировании

### Power Law Distribution — основа венчурной экономики

В венчурных инвестициях работает правило power law: 1-2 сделки приносят 80-90% всей прибыли портфеля. Из моих 30 инвестиций:

**Распределение результатов:**
- 2 компании дали 15x и 22x доходность (85% прибыли портфеля)
- 4 компании вернули 2-5x (покрыли первоначальные инвестиции)
- 8 компаний достигли break-even или 1-1.5x
- 16 компаний обанкротились (полная потеря капитала)

**Ключевой вывод:** Без диверсификации вероятность попасть в ту единственную компанию-победителя крайне мала. Инвестируя только в 3-5 стартапов, вы практически гарантированно потеряете деньги, даже если один из них взлетит.

### Математика диверсификации

Согласно исследованию Cambridge Associates, для построения статистически значимого портфеля angel-инвестор должен вложиться минимум в 15-20 компаний. Мой опыт подтверждает эти цифры:

**Мой портфель по этапам:**
- **Первые 5 инвестиций (2009-2011):** 1 выход с 3x, 4 банкротства → общий результат -60%
- **Инвестиции 6-15 (2012-2015):** 1 выход с 15x, 2 с 2x, 7 банкротств → +180% совокупный ROI
- **Инвестиции 16-30 (2016-2023):** 1 выход с 22x, 3 с 3-5x, 11 активных, 15 банкротств → текущий IRR 28%

## Стратегии диверсификации: что работает

### 1. Отраслевая диверсификация

**Моя структура по секторам:**
- 40% — B2B SaaS (12 компаний)
- 25% — Fintech (8 компаний)
- 20% — Healthcare Tech (6 компаний)
- 15% — E-commerce & Marketplaces (4 компании)

**Почему именно так:**
- Фокус на секторах, которые я понимаю профессионально
- B2B SaaS дает предсказуемость через recurring revenue
- Fintech имеет высокий потенциал роста, но и высокие риски регулирования
- Healthcare — долгие циклы, но огромный TAM
- E-commerce — быстрая валидация PMF, но высокая конкуренция

**Ошибка, которую я совершил:** В 2011-2013 я вложился в 5 hardware-стартапов, несмотря на отсутствие экспертизы в этой области. Все 5 обанкротились. Урок: инвестируйте в то, что понимаете.

### 2. Стадийная диверсификация

**Распределение по стадиям:**
- 50% — Pre-seed / Seed ($50-100K чеки)
- 30% — Series A ($25-50K follow-on)
- 20% — Growth stage ($10-25K secondary)

**Логика стратегии:**
- **Pre-seed/Seed:** Максимальный потенциал роста (10-100x), но высокий риск
- **Series A:** Уже есть traction, риск ниже, но и upside 3-10x
- **Growth stage:** Минимальный риск, стабильный 2-3x

**Важное правило:** Резервирую 50% капитала для follow-on инвестиций. Лучшие компании постоянно нуждаются в дополнительном финансировании, и отказ от участия в следующих раундах приводит к критическому разводнению.

### 3. Географическая диверсификация

**Моя география:**
- 60% — Россия и СНГ
- 25% — США
- 10% — Европа
- 5% — Азия

**Почему USA включен:**
- Доступ к самым крупным рынкам
- Более зрелая венчурная экосистема
- Лучшие exit opportunities (IPO, M&A)

**Сложности с cross-border:**
- Юридические и налоговые особенности
- Удаленный due diligence сложнее
- Валютные риски

### 4. Временная диверсификация (Vintage Diversification)

Не инвестируйте весь капитал за один год. Растяните инвестиции на 3-5 лет:

**Мой подход:**
- 2009-2011: $500K (первая треть капитала)
- 2012-2015: $750K (вторая треть + заработанная прибыль)
- 2016-2023: $1.2M (оставшийся капитал + follow-ons)

**Почему это важно:**
- Рыночные условия меняются (2021 vs 2023 — разные оценки)
- Вы становитесь опытнее и делаете лучший выбор
- Снижаете риск инвестирования в пик рынка

## Распространенные ошибки диверсификации

### Ошибка #1: Псевдо-диверсификация

**Что я сделал неправильно:**
В 2017 году инвестировал в 4 криптовалютных стартапа, думая, что диверсифицировал. Когда рынок крипты обвалился в 2018, все 4 компании пострадали одновременно.

**Урок:** Если компании зависят от одних и тех же макрофакторов, это не настоящая диверсификация. Нужна независимость рисков.

### Ошибка #2: Over-Diversification

**Антипаттерн:**
Некоторые ангелы вкладывают по $5-10K в 100+ компаний. Результат: невозможно активно помогать, track record размывается, administrative burden огромный.

**Мой sweet spot:** 20-35 активных инвестиций. Это позволяет:
- Знать каждую компанию детально
- Активно помогать founders
- Иметь значимую долю для влияния

### Ошибка #3: Игнорирование корреляций

**Пример из практики:**
В 2020 я инвестировал в 3 B2B SaaS стартапа, целевой аудиторией которых были рестораны. COVID ударил по всем трем одновременно.

**Решение:** Анализируйте не только sector, но и end-market. Диверсифицируйте по типам клиентов.

## Тактики активного управления портфелем

### 1. Quarterly Portfolio Review

Каждый квартал провожу детальный анализ:

**Метрики для tracking:**
- Revenue growth (MRR/ARR)
- Burn rate и runway
- Customer acquisition metrics (CAC, LTV)
- Team changes (новые hires, departures)
- Fundraising status

**Действия на основе review:**
- Follow-on в top performers (удваиваю ставку)
- Write-off очевидных failures (психологически освобождает)
- Помощь struggling компаниям (интро к клиентам, advisors)

### 2. Re-balancing Strategy

**Когда ребалансировать:**
- Компания сильно выросла и стала >30% портфеля → частичная продажа на secondary
- Сектор перегрет → снижение новых инвестиций в него
- Появились лучшие возможности → перераспределение focus

**Мой кейс с rebalancing:**
В 2021 одна из моих компаний выросла до $500M valuation (моя доля стала стоить $2.5M — 40% портфеля). Я продал 30% позиции на secondary за $750K и реинвестировал в 5 новых pre-seed компаний. Это снизило concentration risk.

### 3. Добавление ценности портфельным компаниям

**Мои основные contribution:**
- **Customer intros:** 15+ успешных B2B deals для portfolio companies
- **Hiring:** Помог нанять 8 C-level executives через мою сеть
- **Fundraising:** Интро к 20+ VC фондам для следующих раундов
- **Strategic advice:** Регулярные 1-on-1 с founders

**Результат:** Компании, которым я активно помогал, показывают 2x лучший performance по сравнению с passive investments.

## Финансовые результаты моего портфеля

### Aggregate Returns (15 лет)

**Инвестировано:** $2.45M (включая follow-ons)
**Текущая оценка:** $8.2M
**Realized proceeds:** $3.1M
**Total Value:** $11.3M
**MOIC:** 4.6x
**IRR:** 24.3% (с учетом timing)

### Breakdown по категориям:

**Top 3 Winners:**
1. B2B SaaS (HR tech) — вход $75K в 2015, exit $1.6M в 2022 (22x)
2. Fintech (payments) — вход $100K в 2016, current value $1.5M (15x, не exited)
3. Healthcare SaaS — вход $50K в 2014, exit $400K в 2020 (8x)

**Bottom performers:**
- 16 полных write-offs
- Средняя потеря: $65K на компанию
- Total losses: ~$1.04M

**Key takeaway:** 3 компании (10% портфеля) принесли 85% прибыли. Остальные 27 компаний в среднем вернули 0.8x capital.

## Выводы и рекомендации

### Для начинающих angel-инвесторов:

1. **Начинайте с минимум 15-20 компаний в плане**
   - Не вкладывайте все сразу
   - Растяните на 3-5 лет
   - Оставьте 50% для follow-ons

2. **Диверсифицируйте, но оставайтесь в зоне компетенции**
   - 3-4 сектора максимум
   - Только то, в чем вы professional
   - География там, где у вас есть network

3. **Активно управляйте портфелем**
   - Quarterly reviews обязательны
   - Help your winners (не тратьте время на losers)
   - Be ready to write-off и move on

4. **Принимайте неизбежность failures**
   - 50-60% компаний обанкротятся
   - Это нормально и ожидаемо
   - Focus на том, чтобы ваши winners компенсировали это

### Что бы я сделал иначе

**Если бы я начинал сегодня заново:**
1. **Больше follow-ons в winners** — я упустил огромный upside, не участвуя в Series A/B моих лучших компаний
2. **Меньше экзотических секторов** — hardware и deep tech требуют больше expertise
3. **Более aggressive secondary sales** — продавать частично на каждом раунде для ребалансировки
4. **Синдицирование** — соинвестирование с другими ангелами снижает check size и расширяет доступ к deal flow

## Заключение

Диверсификация в angel investing — это не просто "не клади все яйца в одну корзину". Это systematic approach к управлению неизбежной неопределенностью early-stage инвестиций.

Мой портфель доказал, что даже с 53% failure rate (16 из 30), можно достичь IRR 24%+ через правильную диверсификацию и активное управление.

Помните: в венчурном инвестировании важна не средняя доходность, а наличие outliers. Диверсификация увеличивает ваши шансы поймать того единорога, который окупит все остальные инвестиции.`,
    author: blogAuthors[0],
    category: 'seed-funding',
    tags: ['портфель', 'диверсификация', 'кейс'],
    publishedAt: '2024-01-05',
    readTime: 18,
    image: portfolioDiversification,
    roleType: 'angel-investors',
    contentType: 'cases',
    isPremium: true
  },

  // Founders Articles
  {
    id: 'fundraising-strategy',
    title: 'Стратегия фандрайзинга: как привлечь первый раунд',
    excerpt: 'Пошаговый план привлечения первых инвестиций. От подготовки питча до закрытия сделки.',
    content: 'Привлечение первого раунда инвестиций — один из самых критических моментов для любого стартапа. По данным Crunchbase, только 0.05% стартапов успешно закрывают seed-раунд. В этой статье я делюсь пошаговой стратегией, которая помогла мне привлечь $2M для моего первого стартапа.',
    fullContent: `Привлечение первого раунда инвестиций — один из самых критических моментов для любого стартапа. По данным Crunchbase, только 0.05% стартапов успешно закрывают seed-раунд. За три стартапа я прошла путь от полного провала первого раундаразва (отказы от 30 инвесторов) до успешного закрытия $2M за 8 недель в последнем проекте.

## Фундаментальная подготовка: до первого контакта

### 1. Достижение "fundability threshold"

**Что нужно иметь ДО начала fundraise:**

**Для B2B SaaS:**
- Минимум 10 платящих клиентов ИЛИ $10K+ MRR
- Customer testimonials и case studies
- Повторяемый sales process
- CAC payback < 12 месяцев

**Для B2C/Consumer:**
- 5,000+ активных пользователей (DAU)
- Retention rate >20% на Day 30
- Органический рост (viral coefficient >0.5)
- Engagement metrics (daily usage >10 min)

**Для Marketplace:**
- 100+ active suppliers И 500+ active buyers
- GMV >$50K/month
- Positive unit economics на supply И demand side
- Repeat transaction rate >30%

**Ошибка моего первого стартапа:**
Я начала fundraise с только 3 paying customers и $2K MRR. Результат: 30 отказов от инвесторов. Я потратила 4 месяца на fundraising вместо building. Когда вернулась к продукту и вырастила до $15K MRR, привлечь деньги стало в 10x проще.

### 2. Построение financial model

**Структура финансовой модели:**

**Revenue Forecast (bottom-up):**
- Текущие показатели и growth rate
- Customer acquisition plan по каналам
- Pricing и average deal size
- Churn rate assumptions
- Projected MRR/ARR на 36 месяцев

**Cost Structure:**
- Headcount plan (детально: кого, когда, за сколько)
- Sales & Marketing spend по каналам
- R&D и product development costs
- G&A (office, legal, accounting)

**Key Assumptions лист:**
- CAC по каналам
- LTV и payback period
- Conversion rates в воронке
- Growth rates и их обоснование

**Cash Flow Projection:**
- Monthly burn rate
- Runway с текущими средствами
- Runway после привлечения
- Break-even analysis

**Мой пример (B2B SaaS):**
- Current MRR: $15K
- Target MRR через 18 месяцев: $200K
- Требуется: $1.5M
- Runway: 18 месяцев до Series A
- Projected burn: $80K/month

### 3. Создание compelling pitch deck

**Структура идеального deck (12-15 слайдов):**

**Слайд 1: Cover**
- Название компании и one-liner
- Tagline (что вы делаете в 10 слов)
- Contact info

**Слайд 2: Problem**
- Конкретная болевая точка (не абстрактная)
- Quantify pain: "Компании тратят $X на..."
- Current alternatives и их недостатки
- Market size affected

**Мой антипаттерн:** В первом стартапе я описала problem как "люди хотят лучше управлять временем" — слишком generic. Во втором: "B2B sales teams тратят 15 часов в неделю на manual data entry" — конкретно и измеримо.

**Слайд 3: Solution**
- Your product и unique value prop
- Key features (3-4 maximum)
- Screenshots или demo video (30 sec)
- Почему ваше решение 10x better

**Слайд 4: Traction**
- Revenue graph (если есть)
- User growth metrics
- Key customers logos
- Testimonials (1-2 quotes)

**Слайд 5: Market Opportunity**
- TAM (Total Addressable Market)
- SAM (Serviceable AM)
- SOM (Obtainable в 5 лет)
- Market growth trends

**Формула TAM:**
TAM = # of potential customers × ARPU

**Пример:** 100K SMB companies in US × $10K ARPU = $1B TAM

**Слайд 6: Business Model**
- Revenue model (subscription, transaction, etc.)
- Pricing tiers
- Unit economics: CAC, LTV, payback
- Path to profitability

**Слайд 7: Go-to-Market Strategy**
- Customer acquisition channels
- Sales process (inside/field sales)
- Marketing strategy
- Partnership opportunities

**Слайд 8: Competition**
- Competitive landscape (magic quadrant)
- Your differentiation
- Barriers to entry
- Why you'll win

**Слайд 9: Team**
- Founders: background, why you
- Key hires
- Advisors
- Why THIS team can execute

**Слайд 10: Financials**
- 3-year projections
- Key metrics growth
- Use of funds breakdown
- Runway post-funding

**Слайд 11: The Ask**
- Amount raising
- Detailed use of funds:
  * 50% — Sales & Marketing
  * 30% — Product & Engineering
  * 20% — Operations
- Milestones с этими деньгами
- Timeline к Series A

**Слайд 12: Appendix**
- Detailed financials
- Product roadmap
- Customer case studies
- Team bios

### Common pitch deck mistakes

**Mistake #1: Too much information**
Мой первый deck был 25 слайдов с мелким текстом. Инвесторы теряли интерес к слайду 10.

**Fix:** 12-15 слайдов maximum, large fonts, minimal text.

**Mistake #2: Hockey stick без обоснования**
Showing revenue рост 10x year-over-year без explanation КАК.

**Fix:** Break down growth assumptions: "Hiring 3 sales reps × 2 deals/month × $5K ACV = $30K new MRR"

**Mistake #3: Ignoring competition**
Saying "we have no competitors" — огромный red flag.

**Fix:** Acknowledge competitors, explain why you're different and better.

## Building investor pipeline

### 1. Создание target list

**Критерии отбора инвесторов:**

**Stage fit:**
- Seed investors для seed round
- Check size: $50K-$500K typically
- Portfolio stage: pre-seed/seed focus

**Sector fit:**
- Активны в вашей индустрии
- Portfolio companies complementary
- Domain expertise relevant

**Geography:**
- Local investors легче встретиться
- But don't limit себя только local

**Value-add:**
- Network в вашей industry
- Expertise в scaling
- Track record exits

**Как я построила список:**
1. AngelList — filtered по sector + stage
2. Crunchbase — similar company investors
3. LinkedIn — warm intro paths
4. VC databases — Pitchbook, CB Insights

**Результат:** 150 target investors → 50 warm intros → 20 meetings → 8 term sheets

### 2. Warm intro стратегия

**Статистика conversion:**
- Cold email: 1-2% response rate
- Warm intro: 40-60% response rate
- Personal intro от portfolio founder: 80%+ response

**Мой процесс warm intro:**

**Step 1: Identify mutual connections**
LinkedIn search: "Find people who know [Investor Name]"

**Step 2: Reach out к connection**
Email template:

"Привет [Name],

Надеюсь у тебя всё отлично! Я сейчас raising seed round для [Company] — [one-liner].

Я вижу, что ты знаешь [Investor] из [Fund]. Если ты считаешь, что наш проект может быть интересен [Investor], был бы благодарна за intro.

Вот наш pitch deck [link] и one-pager [link] для контекста.

Спасибо! [Your name]"

**Step 3: Follow up**
Если нет ответа через 5 дней — polite follow-up.

### 3. Email outreach best practices

**Subject line примеры:**
- "Intro: [YourCompany] — [One-line description]"
- "[Mutual Connection] suggested I reach out"
- "Solving [Problem] for [Target Market]"

**Email body structure:**

Пример письма:
- Приветствие с упоминанием связи или фонда
- Краткое описание компании (one-liner)
- Ключевые метрики traction (2-3 bullet points)
- Размер раунда и цель привлечения
- Call to action (15-minute meeting)
- Ссылка на deck

## The fundraising process

### Timeline breakdown

**Week 1-2: Preparation**
- Finalize pitch deck
- Build financial model
- Prepare data room
- Create target list

**Week 3-6: Initial outreach**
- Send 20-30 emails per week
- Book 5-10 meetings per week
- Follow up systematically

**Week 7-10: Deep dive meetings**
- Product demos
- Due diligence questions
- Reference calls

**Week 11-12: Term sheets & closing**
- Receive term sheets
- Negotiate terms
- Legal docs
- Wire funds

**My actual timeline (successful round):**
- Week 1-2: Prep (deck, financials)
- Week 3: First 15 meetings
- Week 4-5: Follow-up meetings + DD
- Week 6: 3 term sheets received
- Week 7-8: Negotiation + legal
- **Total: 8 weeks from start to close**

### Meeting structure

**First meeting (30-45 min):**
- 15 min: Your pitch (deck walkthrough)
- 10 min: Q&A
- 10 min: Discuss process, next steps

**Follow-up meeting:**
- Deep dive на metrics
- Product demo (hands-on)
- Team interviews
- Technical Q&A

**Partner meeting:**
- Present к full partnership
- Usually 1 hour
- More detailed questions
- Decision meeting

### Due diligence preparation

**Documents для data room:**

**Corporate:**
- Certificate of incorporation
- Cap table
- Previous fundraising docs
- Board resolutions

**Financial:**
- Financial statements (2-3 years)
- Bank statements (6 months)
- Revenue by customer
- Unit economics breakdown

**Product:**
- Product roadmap
- Technical architecture
- Security documentation
- Customer contracts

**Team:**
- Employee agreements
- ESOP pool documentation
- Advisor agreements
- Résumés ключевых members

## Negotiating term sheets

### Key terms to understand

**Valuation:**
- Pre-money vs post-money
- How dilution works
- Price per share calculation

**Мой пример:**
- Pre-money: $8M
- Investment: $2M
- Post-money: $10M
- Investor ownership: 20%
- Founders dilute от 100% → 80%

**Liquidation preference:**
- 1x participating (стандарт)
- Non-participating (founder-friendly)
- Avoid: >1x preference

**Board composition:**
- Typical: 2 founders, 1 investor, 1 independent
- Maintain founder control early

**Vesting:**
- 4-year vest с 1-year cliff
- Acceleration clauses
- Key person provisions

**Pro-rata rights:**
- Investor право participate in future rounds
- Important for maintaining ownership

### Red flags в term sheets

🚩 **Valuation cap too low** — ниже market
🚩 **Excessive liquidation preference** — >1x participating
🚩 **Full ratchet anti-dilution** — punitive для founders
🚩 **No-shop clause** — prevents shopping deal
🚩 **Founder vesting restart** — lose earned equity

## Post-closing best practices

### Communication with investors

**Monthly updates format:**

**Subject:** [Company] Update — [Month Year]

**Key Metrics:**
- MRR: $X (↑Y% MoM)
- New customers: X
- Churn: X%
- Cash: $X (X months runway)

**Highlights:**
- Major wins (customers, partnerships)
- Product milestones
- Key hires

**Lowlights:**
- Challenges faced
- Metrics missed
- Help needed

**Asks:**
- Specific intros needed
- Hiring help
- Strategic advice

### Leveraging investor network

**How I utilize investors:**
- Customer intros: 15+ B2B leads
- Hiring: 3 C-level через их network
- Next round prep: warm intros к VCs
- Strategic advice: quarterly dinners

## Lessons learned

### Что я сделала бы иначе

**Round 1 (failed):**
- Started fundraising too early (no traction)
- Unclear use of funds
- Weak competitive analysis
- Only one founder pitched

**Round 2 (mediocre):**
- Better traction, но overvalued
- Took 6 months (слишком долго)
- Didn't build urgency
- Too many small checks

**Round 3 (successful):**
- Strong traction before starting
- Created FOMO (multiple meetings same week)
- Clear milestones и use of funds
- Both co-founders active in pitch
- Closed в 8 weeks

### Key success factors

1. **Traction above all** — nothing matters more than proof of demand
2. **Warm intros matter** — 30x better conversion
3. **Create urgency** — compressed timeline creates FOMO
4. **Be coachable** — investors invest in people, not just ideas
5. **Know your numbers cold** — every metric, every assumption

## Заключение

Fundraising — это full-time job на 2-3 месяца. Не пытайтесь совмещать с building продукта. Designate одного co-founder на fundraise, другой keep продукт alive.

Подготовка критична. 80% успеха определяется ДО первой встречи: traction, pitch deck, financial model, investor targeting.

Помните: fundraising — это sales process. Вы продаете vision и equity. И как в любых продажах, preparation и execution определяют результат.`,
    author: blogAuthors[1],
    category: 'seed-funding',
    tags: ['фандрайзинг', 'инвестиции', 'питч'],
    publishedAt: '2024-01-18',
    readTime: 16,
    image: fundraisingStrategy,
    roleType: 'founders',
    contentType: 'guides',
    isPremium: true
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
