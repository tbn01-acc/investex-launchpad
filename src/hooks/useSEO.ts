import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
}

type DomainConfig = 'invest-ex.ru' | 'invest-ex.online';

const SEO_CONFIGS: Record<string, Record<DomainConfig, SEOConfig>> = {
  '/': {
    'invest-ex.ru': {
      title: 'Invest-Ex — Инвестиционная платформа стартапов и проектов',
      description: 'Единая инвестиционная платформа для частных инвесторов, бизнес-ангелов, венчурных фондов и стартапов. Найдите перспективные проекты для инвестиций.',
      keywords: ['инвестиционная платформа', 'инвестиции в стартапы', 'частные инвестиции', 'венчурные инвестиции', 'бизнес-ангелы'],
      canonical: 'https://invest-ex.ru/',
      ogImage: 'https://invest-ex.ru/og-image.jpg'
    },
    'invest-ex.online': {
      title: 'Invest-Ex — Investment Platform for Startups and Projects',
      description: 'Unified investment platform for private investors, angel investors, venture funds and startups. Find promising projects for investments.',
      keywords: ['investment platform', 'startup investments', 'private investments', 'venture capital', 'angel investors'],
      canonical: 'https://invest-ex.online/',
      ogImage: 'https://invest-ex.online/og-image.jpg'
    }
  },
  '/projects': {
    'invest-ex.ru': {
      title: 'Проекты для инвестиций — Invest-Ex',
      description: 'Каталог инвестиционных проектов и стартапов. Найдите подходящий проект для инвестиций в различных отраслях: FinTech, HealthTech, AI/ML, Blockchain.',
      keywords: ['проекты для инвестиций', 'стартапы', 'инвестиционные проекты', 'финтех', 'хелстех', 'искусственный интеллект'],
      canonical: 'https://invest-ex.ru/projects',
      ogImage: 'https://invest-ex.ru/og-image-projects.jpg'
    },
    'invest-ex.online': {
      title: 'Investment Projects — Invest-Ex',
      description: 'Catalog of investment projects and startups. Find suitable projects for investments in various industries: FinTech, HealthTech, AI/ML, Blockchain.',
      keywords: ['investment projects', 'startups', 'fintech', 'healthtech', 'artificial intelligence', 'blockchain'],
      canonical: 'https://invest-ex.online/projects',
      ogImage: 'https://invest-ex.online/og-image-projects.jpg'
    }
  },
  '/for-investors': {
    'invest-ex.ru': {
      title: 'Для инвесторов — Invest-Ex',
      description: 'Платформа для частных и квалифицированных инвесторов. Доступ к проверенным стартапам, due diligence, аналитика проектов и управление портфелем инвестиций.',
      keywords: ['для инвесторов', 'частные инвестиции', 'квалифицированные инвесторы', 'портфель инвестиций', 'due diligence'],
      canonical: 'https://invest-ex.ru/for-investors',
      ogImage: 'https://invest-ex.ru/og-image-investors.jpg'
    },
    'invest-ex.online': {
      title: 'For Investors — Invest-Ex',
      description: 'Platform for private and qualified investors. Access to verified startups, due diligence, project analytics and investment portfolio management.',
      keywords: ['for investors', 'private investments', 'qualified investors', 'investment portfolio', 'due diligence'],
      canonical: 'https://invest-ex.online/for-investors',
      ogImage: 'https://invest-ex.online/og-image-investors.jpg'
    }
  },
  '/for-founders': {
    'invest-ex.ru': {
      title: 'Для основателей стартапов — Invest-Ex',
      description: 'Привлекайте инвестиции для вашего стартапа. Доступ к сети инвесторов, питч-сессии, менторство и инструменты для роста проекта.',
      keywords: ['для основателей', 'привлечение инвестиций', 'стартап', 'питч инвесторам', 'менторство стартапов'],
      canonical: 'https://invest-ex.ru/for-founders',
      ogImage: 'https://invest-ex.ru/og-image-founders.jpg'
    },
    'invest-ex.online': {
      title: 'For Startup Founders — Invest-Ex',
      description: 'Attract investments for your startup. Access to investor network, pitch sessions, mentorship and tools for project growth.',
      keywords: ['for founders', 'fundraising', 'startup', 'pitch to investors', 'startup mentorship'],
      canonical: 'https://invest-ex.online/for-founders',
      ogImage: 'https://invest-ex.online/og-image-founders.jpg'
    }
  }
};

function getCurrentDomain(): DomainConfig {
  const hostname = window.location.hostname;
  
  // For localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return (localStorage.getItem('devDomain') as DomainConfig) || 'invest-ex.ru';
  }
  
  // Production domains
  if (hostname.includes('invest-ex.online')) {
    return 'invest-ex.online';
  }
  
  return 'invest-ex.ru';
}

function updateMetaTags(config: SEOConfig) {
  // Update title
  document.title = config.title;
  
  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', config.description);
  
  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', config.keywords.join(', '));
  
  // Update or create canonical link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = config.canonical;
  
  // Open Graph tags
  const ogTags = [
    { property: 'og:title', content: config.title },
    { property: 'og:description', content: config.description },
    { property: 'og:url', content: config.canonical },
    ...(config.ogImage ? [{ property: 'og:image', content: config.ogImage }] : [])
  ];
  
  ogTags.forEach(({ property, content }) => {
    let ogTag = document.querySelector(`meta[property="${property}"]`);
    if (!ogTag) {
      ogTag = document.createElement('meta');
      ogTag.setAttribute('property', property);
      document.head.appendChild(ogTag);
    }
    ogTag.setAttribute('content', content);
  });
  
  // Add hreflang links for both domains
  const hreflangLinks = [
    { rel: 'alternate', hreflang: 'ru', href: config.canonical.replace('invest-ex.online', 'invest-ex.ru') },
    { rel: 'alternate', hreflang: 'en', href: config.canonical.replace('invest-ex.ru', 'invest-ex.online') }
  ];
  
  // Remove existing hreflang links
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
  
  // Add new hreflang links
  hreflangLinks.forEach(({ rel, hreflang, href }) => {
    const link = document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', href);
    document.head.appendChild(link);
  });
}

export function useSEO(pageKey?: string, customConfig?: Partial<SEOConfig>) {
  const location = useLocation();
  
  useEffect(() => {
    const domain = getCurrentDomain();
    const path = pageKey || location.pathname;
    
    // Get config for current page and domain
    const pageConfig = SEO_CONFIGS[path]?.[domain];
    
    if (pageConfig) {
      const finalConfig = customConfig 
        ? { ...pageConfig, ...customConfig }
        : pageConfig;
      
      updateMetaTags(finalConfig);
    }
    
    // Cleanup function
    return () => {
      // Optional: Reset to default meta tags when component unmounts
      // This can be useful if you want to prevent stale meta tags
    };
  }, [location.pathname, pageKey, customConfig]);
}

export function useDevDomainSetter() {
  useEffect(() => {
    // Only in development mode
    if (process.env.NODE_ENV === 'development') {
      // Add global function to window for easy domain switching in dev tools
      (window as any).setDevDomain = (domain: DomainConfig) => {
        localStorage.setItem('devDomain', domain);
        window.location.reload();
      };
      
      console.log('Dev mode: Use window.setDevDomain("invest-ex.ru") or window.setDevDomain("invest-ex.online") to test different domains');
    }
  }, []);
}
