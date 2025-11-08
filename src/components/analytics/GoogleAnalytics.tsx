import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useDomain } from '@/contexts/DomainContext';

// Measurement IDs для каждого домена
const TRACKING_IDS = {
  'invest-ex.ru': 'G-XXXXXXXXX',      // Замени на реальный ID
  'invest-ex.online': 'G-YYYYYYYYY'   // Замени на реальный ID
};

export const GoogleAnalytics = () => {
  const { domain } = useDomain();
  const location = useLocation();
  
  useEffect(() => {
    // Определяем Measurement ID по домену
    const trackingId = TRACKING_IDS[domain];
    
    if (trackingId && !trackingId.includes('XXXXXXXXX')) {
      // Инициализация GA4
      ReactGA.initialize(trackingId, {
        gtagOptions: {
          // Отправляем домен как custom dimension
          custom_map: {
            dimension1: 'domain',
            dimension2: 'language'
          }
        }
      });
      
      // Отправляем первый pageview с параметрами
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname,
        domain: domain,
        language: domain === 'invest-ex.ru' ? 'ru' : 'en'
      });
    }
  }, [domain]);
  
  // Отслеживание смены страниц
  useEffect(() => {
    const trackingId = TRACKING_IDS[domain];
    
    if (trackingId && !trackingId.includes('XXXXXXXXX')) {
      ReactGA.send({
        hitType: 'pageview',
        page: location.pathname,
        domain: domain,
        language: domain === 'invest-ex.ru' ? 'ru' : 'en'
      });
    }
  }, [location.pathname, domain]);
  
  return null; // Компонент невидимый
};
