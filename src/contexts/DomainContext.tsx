import { createContext, useContext, ReactNode } from 'react';

interface DomainContextType {
  domain: 'invest-ex.ru' | 'invest-ex.online';
}

const DomainContext = createContext<DomainContextType>({
  domain: 'invest-ex.ru'
});

export const useDomain = () => useContext(DomainContext);

export const DomainProvider = ({ children }: { children: ReactNode }) => {
  // Определяем домен из window.location.hostname
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const domain = hostname.includes('invest-ex.online') ? 'invest-ex.online' : 'invest-ex.ru';
  
  return (
    <DomainContext.Provider value={{ domain }}>
      {children}
    </DomainContext.Provider>
  );
};
