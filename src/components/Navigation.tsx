import { useState } from "react";
import { Menu, X, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { ApiConfigDialog } from "@/components/ApiConfigDialog";
import { LanguageCurrencySelector } from "@/components/LanguageCurrencySelector";
import RoleBasedNavigation from "./RoleBasedNavigation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut, profile } = useAuth();
  const { t } = useLanguage();

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
            <RoleBasedNavigation userRole={profile?.role} />

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
              <div className="space-y-2">
                <Link
                  to="/for-investors"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  💎 Инвесторы
                </Link>
                <Link
                  to="/for-founders"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  🚀 Фаундеры
                </Link>
                <Link
                  to="/for-freelancers"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  💼 Фрилансеры
                </Link>
                <Link
                  to="/for-outsourcers"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  🏢 Аутсорсеры
                </Link>
              </div>
              
              <div className="space-y-2 border-t border-border mt-4 pt-4">
                <Link
                  to="/projects"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Проекты
                </Link>
                <Link
                  to="/pricing"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Тарифы
                </Link>
                <Link
                  to="/about"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  О платформе
                </Link>
                <Link
                  to="/contact"
                  className="block text-sm hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Контакты
                </Link>
              </div>
              
              <div className="pt-4 border-t border-border mt-4 space-y-2">
                <LanguageCurrencySelector />
                {user ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/profile" onClick={() => setIsOpen(false)}>{t('nav.profile')}</Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setIsOpen(false)}>{t('nav.dashboard')}</Link>
                    </Button>
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