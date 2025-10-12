import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const titles: Record<string, string> = {
  '': 'Главная',
  projects: 'Проекты',
  project: 'Проект',
  investments: 'Инвестиции',
  pricing: 'Тарифы',
  about: 'О платформе',
  profile: 'Профиль',
  dashboard: 'Личный кабинет',
  contacts: 'Контакты',
  partners: 'Партнеры',
};

const AppBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '');
  const segments = pathname.split('/').filter(Boolean);

  const items = [
    { href: '/', label: titles[''] },
    ...segments.map((seg, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      const isId = /^[0-9a-fA-F-]{8,}$/.test(seg);
      const key = isId ? segments[idx - 1] || 'project' : seg;
      const label = isId ? (titles[key] || 'Детали') : (titles[seg] || decodeURIComponent(seg));
      return { href, label, isLast: idx === segments.length - 1 };
    }),
  ];

  return (
    <header className="border-t border-border bg-background/80">
      <nav aria-label="breadcrumb" className="container mx-auto px-2 sm:px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            {items.length > 4 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={items[0].href}>{items[0].label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.slice(-2).map((it, idx) => (
                  <React.Fragment key={it.href}>
                    <BreadcrumbItem>
                      {idx === items.slice(-2).length - 1 ? (
                        <BreadcrumbPage>{it.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={it.href}>{it.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx === 0 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </>
            )}

            {items.length <= 4 && items.map((it, idx) => (
              <React.Fragment key={it.href}>
                <BreadcrumbItem>
                  {idx === items.length - 1 ? (
                    <BreadcrumbPage>{it.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={it.href}>{it.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {idx < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </header>
  );
};

export default AppBreadcrumbs;
