import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Github, Twitter, Linkedin, Globe, Shield, FileText, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">InvestEx</h3>
            <p className="text-white/80 leading-relaxed">
              Инвестиционная платформа InvestEx — поиск проектов, инвесторов и партнеров. Рейтинг стартапов,
              коллективные инвестиции, аутсорс-команды и франчайзинг.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* For Users */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Для пользователей</h4>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/investors" className="hover:text-white transition-colors">
                  Инвесторы
                </Link>
              </li>
              <li>
                <Link to="/founders" className="hover:text-white transition-colors">
                  Фаундеры
                </Link>
              </li>
              <li>
                <Link to="/freelancers" className="hover:text-white transition-colors">
                  Фрилансеры
                </Link>
              </li>
              <li>
                <Link to="/outsourcers" className="hover:text-white transition-colors">
                  Аутсорсеры
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-white transition-colors">
                  Биржа проектов
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Ресурсы</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <Link to="/knowledge-base" className="hover:text-white transition-colors">
                  База знаний
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <Link to="/contact" className="hover:text-white transition-colors">
                  Поддержка
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <Link to="/api-docs" className="hover:text-white transition-colors">
                  API документация
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <Link to="/security" className="hover:text-white transition-colors">
                  Безопасность
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Связаться с нами</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>invest.exch@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MessageCircle className="w-4 h-4" />
                <span>Онлайн поддержка 24/7</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-3">Новости и обновления</h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 min-w-0 px-2 sm:px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 text-sm"
                />
                <Button variant="secondary" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">© 2024-2025 InvestEx. Все права защищены.</div>
            <div className="flex gap-6 text-sm text-white/60">
              <Link to="/terms" className="hover:text-white transition-colors">
                Пользовательское соглашение
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
