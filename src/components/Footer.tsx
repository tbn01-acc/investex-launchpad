import { Button } from "@/components/ui/button";
import { 
  Mail, 
  MessageCircle, 
  Github, 
  Twitter, 
  Linkedin,
  Globe,
  Shield,
  FileText,
  HelpCircle
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-secondary text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">InvestEx</h3>
            <p className="text-white/80 leading-relaxed">
              Универсальная платформа для организации проектной работы с интегрированной 
              инвестиционной биржей проектов и стартапов.
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
              <li><a href="#" className="hover:text-white transition-colors">Фрилансеры</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Аутсорсеры</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Фаундеры</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Инвесторы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Биржа проектов</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Ресурсы</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">База знаний</a>
              </li>
              <li className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Поддержка</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">API документация</a>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Безопасность</a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Связаться с нами</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span>info@investex.com</span>
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
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/60 focus:outline-none focus:border-white/40"
                />
                <Button variant="hero" size="sm">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © 2024 InvestEx. Все права защищены.
            </div>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;