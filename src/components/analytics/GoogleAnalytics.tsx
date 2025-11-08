import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { useDomain } from '@/contexts/DomainContext';

// Measurement IDs из environment variables
const TRACKING_IDS = {
  'invest-ex.ru': import.meta.env.VITE_GA4_RU_ID,
  'invest-ex.online': import.meta.env.VITE_GA4_EN_ID
};

export const GoogleAnalytics = () => {
  const { domain } = useDomain();
  const location = useLocation();
  
  useEffect(() => {
    // Определяем Measurement ID по домену
    const trackingId = TRACKING_IDS[domain];
    
    // Проверка наличия ID
    if (!trackingId) {
      console.warn(`GA4: Measurement ID not found for domain: ${domain}`);
      console.warn('Make sure VITE_GA4_RU_ID and VITE_GA4_EN_ID are set in .env.local');
      return;
    }
    
    // Проверка что ID не placeholder
    if (trackingId.includes('XXX') || trackingId.includes('YYY')) {
      console.warn('GA4: Using placeholder ID. Please replace with real Measurement ID');
      return;
    }
    
    console.log(`GA4: Initializing for ${domain} with ID ${trackingId}`);
    
    // Инициализация GA4
    ReactGA.initialize(trackingId, {
      gtagOptions: {
        send_page_view: false,
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
  }, [domain]);
  
  // Отслеживание смены страниц
  useEffect(() => {
    const trackingId = TRACKING_IDS[domain];
    
    // Проверяем что ID существует и не placeholder
    if (!trackingId || trackingId.includes('XXX') || trackingId.includes('YYY')) {
      return;
    }
    
    console.log(`GA4: Page view - ${location.pathname} (${domain})`);
    
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
      domain: domain,
      language: domain === 'invest-ex.ru' ? 'ru' : 'en'
    });
  }, [location.pathname, domain]);
  
  return null; // Компонент невидимый
};
