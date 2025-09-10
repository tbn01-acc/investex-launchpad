import { useState } from "react";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { ApiConfigDialog } from "@/components/ApiConfigDialog";
import { LanguageCurrencySelector } from "@/components/LanguageCurrencySelector";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, profile } = useAuth();
  const { t } = useLanguage();

  const navigationItems = [
    {
      title: "Для участников",
      items: [
        { title: "Фрилансеры", href: "/freelancers", description: "Найдите проекты и клиентов" },
        { title: "Аутсорсеры", href: "/outsourcers", description: "Управляйте командой и проектами" },
        { title: "Фаундеры", href: "/founders", description: "Создавайте стартапы и привлекайте инвестиции" },
        { title: "Инвесторы", href: "/investors", description: "Инвестируйте в перспективные проекты" },
      ]
    },
    { title: "Проекты", href: "/projects" },
    { title: "Инвестиции", href: "/investments" },
    { title: "Тарифы", href: "/pricing" },
    { title: "О платформе", href: "/about" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              InvestEx
            </span>
          </Link>

          {/* Десктопное меню */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    {item.items ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-accent/10">
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[600px] grid-cols-2 gap-3 p-4">
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
                          to={item.href}
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
              <LanguageCurrencySelector />
              {user ? (
                <>
                  <ApiConfigDialog>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      API
                    </Button>
                  </ApiConfigDialog>
                  <Button variant="ghost" className="hover:bg-accent/10" asChild>
                    <Link to="/profile">{t('nav.profile')}</Link>
                  </Button>
                  <Button variant="ghost" className="hover:bg-accent/10" asChild>
                    <Link to="/dashboard">{t('nav.dashboard')}</Link>
                  </Button>
                  {profile?.role === 'superadmin' && (
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/admin">{t('nav.admin')}</Link>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    className="hover:bg-accent/10"
                    onClick={() => signOut()}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="hover:bg-accent/10" asChild>
                    <Link to="/auth">{t('nav.login')}</Link>
                  </Button>
                  <Button className="bg-gradient-primary hover:opacity-90" asChild>
                    <Link to="/auth?mode=signup">Регистрация</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Мобильное меню кнопка */}
          <div className="md:hidden">
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

        {/* Мобильное меню */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2">
            <div className="flex flex-col space-y-2 pt-4">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  {item.items ? (
                    <div>
                      <div className="flex items-center justify-between px-4 py-2 text-sm font-medium text-muted-foreground">
                        {item.title}
                        <ChevronDown size={16} />
                      </div>
                      <div className="pl-4 space-y-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-2 text-sm hover:bg-accent/10 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                <LanguageCurrencySelector />
                {user ? (
                  <>
                    <ApiConfigDialog>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        API Настройки
                      </Button>
                    </ApiConfigDialog>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/profile" onClick={() => setIsOpen(false)}>{t('nav.profile')}</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>{t('nav.dashboard')}</Link>
                    </Button>
                    {profile?.role === 'superadmin' && (
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/admin" onClick={() => setIsOpen(false)}>{t('nav.admin')}</Link>
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        setIsOpen(false);
                        signOut();
                      }}
                    >
                      Выйти
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/auth" onClick={() => setIsOpen(false)}>{t('nav.login')}</Link>
                    </Button>
                    <Button className="w-full bg-gradient-primary" asChild>
                      <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>Регистрация</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;