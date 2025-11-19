import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useNavigationHistory } from '@/contexts/NavigationHistoryContext';

const AppBreadcrumbs: React.FC = () => {
  const { history } = useNavigationHistory();
  const items = history;

  return (
    <header className="border-t border-border bg-background/80">
      <nav aria-label="breadcrumb" className="container mx-auto px-2 sm:px-4 py-2">
        <Breadcrumb>
          <BreadcrumbList>
            {items.length > 4 && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={items[0].path}>{items[0].label}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {items.slice(-2).map((it, idx) => (
                  <React.Fragment key={it.path}>
                    <BreadcrumbItem>
                      {idx === items.slice(-2).length - 1 ? (
                        <BreadcrumbPage>{it.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={it.path}>{it.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {idx === 0 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </>
            )}

            {items.length <= 4 && items.map((it, idx) => (
              <React.Fragment key={it.path}>
                <BreadcrumbItem>
                  {idx === items.length - 1 ? (
                    <BreadcrumbPage>{it.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={it.path}>{it.label}</Link>
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
