import { useState } from "react";
import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageCurrencySelector } from "@/components/LanguageCurrencySelector";
import UserAvatar from "@/components/UserAvatar";
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import logoIcon from "@/assets/logo_silver_no_text_trans.png";

type NavigationItem = {
  title: string;
  href?: string;
  categories?: Array<{
    title: string;
    items: Array<{
      title: string;
      href: string;
      description: string;
    }>;
  }>;
  items?: Array<{
    title: string;
    href: string;
    description: string;
  }>;
};

const MobileMenuItem = ({ item, onClose }: { item: NavigationItem; onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.categories) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/10 rounded-md transition-colors"
        >
          {item.title}
          <ChevronDown size={16} className={cn("transition-transform", isExpanded && "rotate-180")} />
        </button>
        {isExpanded && (
          <div className="pl-4 space-y-2 mt-2">
            {item.categories.map((category) => (
              <div key={category.title}>
                <div className="px-4 py-1 text-xs font-semibold text-primary">
                  {category.title}
                </div>
                <div className="pl-4 space-y-1">
                  {category.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md transition-colors"
                      onClick={onClose}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.items) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent/10 rounded-md transition-colors"
        >
          {item.title}
          <ChevronDown size={16} className={cn("transition-transform", isExpanded && "rotate-180")} />
        </button>
        {isExpanded && (
          <div className="pl-4 space-y-1 mt-2">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                to={subItem.href}
                className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md transition-colors"
                onClick={onClose}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.href!}
      className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md transition-colors"
      onClick={onClose}
    >
      {item.title}
    </Link>
  );
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  const [unreadMessages] = useState(2);

  const navigationItems: NavigationItem[] = [
    {
      title: "Сообщество",
      categories: [
        {
          title: "Участники",
          items: [
            { title: "Инвесторы", href: "/participants", description: "Инвестиции в проекты" },
            { title: "Соинвесторы", href: "/participants", description: "Групповые инвестиции" },
            { title: "Фаундеры", href: "/participants", description: "Создание стартапов" },
            { title: "Ко-фаундеры", href: "/participants", description: "Партнерство в проектах" },
            { title: "Соучредители", href: "/participants", description: "Совместное учредительство" },
            { title: "Франчайзеры", href: "/participants", description: "Франчайзинговый бизнес" },
          ]
        },
        {
          title: "Исполнители",
          items: [
            { title: "Фрилансеры", href: "/executors", description: "Проекты и задачи" },
            { title: "Эксперты", href: "/executors", description: "Консультации и экспертиза" },
            { title: "Консультанты", href: "/executors", description: "Стратегические решения" },
            { title: "Аутсорсеры", href: "/executors", description: "Управление командами" },
            { title: "Подрядчики", href: "/executors", description: "Специализированные работы" },
          ]
        },
        {
          title: "Сотрудники",
          items: [
            { title: "Администраторы", href: "/employees", description: "Управление проектами" },
            { title: "Сотрудники", href: "/employees", description: "Участие в команде" },
            { title: "Соискатели", href: "/employees", description: "Поиск работы" },
          ]
        },
        {
          title: "Партнеры",
          items: [
            { title: "Партнеры", href: "/partners", description: "Стратегическое партнерство" },
            { title: "Амбассадоры", href: "/partners", description: "Представительство бренда" },
            { title: "Блогеры", href: "/partners", description: "Контент и продвижение" },
          ]
        }
      ]
    },
    { title: "Проекты", href: "/projects" },
    { 
      title: "Инвестиции",
      href: "/investments",
      items: [
        { title: "Стартапы", href: "/investments/startups", description: "Песочница и золотой фонд проектов" },
        { title: "Биржа идей", href: "/investments/ideas", description: "Для аккредитованных инвесторов" },
        { title: "Вторичный рынок", href: "/investments/secondary", description: "Для профессиональных инвесторов" },
        { title: "Франшизы", href: "/investments/franchises", description: "Пассивный доход от бизнеса" },
      ]
    },
    { title: "Тарифы", href: "/pricing" },
    { title: "О платформе", href: "/about" },
  ];

  return (
    <>
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center p-1">
              <img src={logoIcon} alt="Invest-Ex" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Invest-Ex
            </span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.categories ? (
                      <>
                        <NavigationMenuTrigger
                          className="bg-transparent hover:bg-accent/10"
                          onClick={() => navigate('/community')}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="max-w-3xl px-4 py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                              {item.categories.map((category) => (
                                <div key={category.title} className="space-y-3 flex flex-col">
                                  <h3 className="font-semibold text-sm text-primary border-b border-border pb-2">
                                    {category.title}
                                  </h3>
                                  <div className="space-y-2 flex-1">
                                    {category.items.map((subItem) => (
                                      <Link
                                        key={subItem.title}
                                        to={subItem.href}
                                        className={cn(
                                          "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        )}
                                      >
                                        <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : item.items ? (
                      <>
                        <NavigationMenuTrigger
                          className="bg-transparent hover:bg-accent/10"
                          onClick={() => item.href && navigate(item.href)}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                         <NavigationMenuContent>
                           <div className="grid w-full max-w-[600px] grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                            {item.items.map((subItem) => (
                              <NavigationMenuLink key={subItem.title} asChild>
                                <Link
                                  to={subItem.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link
                          to={item.href!}
                          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => setIsCreateOpen(true)} className="hidden sm:inline-flex">
                Добавить
              </Button>
              <LanguageCurrencySelector />
              {user && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate('/dashboard?tab=messages')}
                >
                  <Mail className="h-5 w-5" />
                  {unreadMessages > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadMessages}
                    </Badge>
                  )}
                </Button>
              )}
              {user ? (
                <UserAvatar />
              ) : (
                <Button className="bg-gradient-primary hover:opacity-90" asChild>
                  <Link to="/auth">Вход / Регистрация</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => setIsCreateOpen(true)}
              className="bg-gradient-primary text-primary-foreground"
            >
              Добавить
            </Button>
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate('/dashboard?tab=messages')}
              >
                <Mail className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-accent/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Мобильное меню (слайдер) */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[100]">
            {/* Бэкдроп */}
            <div
              className="absolute inset-0 bg-background"
              onClick={() => setIsOpen(false)}
            />

            {/* Панель меню */}
            <div
              className={cn(
                "absolute top-0 left-0 h-full w-11/12 max-w-sm bg-background border-r border-border shadow-xl",
                "transform transition-transform duration-300",
                isOpen ? "translate-x-0" : "-translate-x-full"
              )}
            >
              {/* Хедер панели */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center p-1">
                    <img src={logoIcon} alt="Invest-Ex" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">Invest-Ex</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-accent/10"
                >
                  <X size={24} />
                </Button>
              </div>

              {/* Контент меню с вертикальным скроллом */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navigationItems.map((item) => (
                  <MobileMenuItem
                    key={item.title}
                    item={item}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </div>

              {/* Футер меню */}
              <div className="border-t border-border p-4 space-y-3">
                <LanguageCurrencySelector />
                {user ? (
                  <div className="py-2">
                    <UserAvatar />
                  </div>
                ) : (
                  <Button className="w-full bg-gradient-primary" asChild>
                    <Link to="/auth" onClick={() => setIsOpen(false)}>Вход / Регистрация</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <CreateProjectModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </nav>
    <AppBreadcrumbs />
    </>
  );
};

export default Navigation;