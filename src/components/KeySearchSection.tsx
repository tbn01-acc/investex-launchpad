import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  Store, 
  Rocket, 
  UserPlus, 
  Building2,
  Briefcase,
  Search,
  Handshake
} from "lucide-react";

const keySearches = [
  {
    query: "Найти перспективный стартап",
    icon: TrendingUp,
    link: "/investments",
    color: "from-blue-500 to-blue-600"
  },
  {
    query: "Войти в коллективные инвестиции",
    icon: Users,
    link: "/investments",
    color: "from-purple-500 to-purple-600"
  },
  {
    query: "Найти прибыльную франшизу",
    icon: Store,
    link: "/franchises",
    color: "from-green-500 to-green-600"
  },
  {
    query: "Привлечь инвестиции",
    icon: Rocket,
    link: "/for-founders",
    color: "from-orange-500 to-orange-600"
  },
  {
    query: "Собрать команду для стартапа",
    icon: UserPlus,
    link: "/for-founders",
    color: "from-pink-500 to-pink-600"
  },
  {
    query: "Масштабировать бизнес через франшизу",
    icon: Building2,
    link: "/franchisers",
    color: "from-teal-500 to-teal-600"
  },
  {
    query: "Найти проекты для сотрудничества",
    icon: Briefcase,
    link: "/for-freelancers",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    query: "Найти работу в стартапе",
    icon: Search,
    link: "/employees",
    color: "from-red-500 to-red-600"
  },
  {
    query: "Стать партнером платформы",
    icon: Handshake,
    link: "/partners",
    color: "from-yellow-500 to-yellow-600"
  }
];

const KeySearchSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Что вы ищете?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите свою роль и начните путь к успеху
          </p>
        </div>
        
        {/* Desktop version - unified gradient background */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-1 relative">
          {/* Subtle galactic glow effect in background */}
          <div className="absolute inset-0 pointer-events-none" 
               style={{ 
                 background: 'radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(219, 39, 119, 0.02) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(65, 105, 225, 0.02) 0%, transparent 50%)',
                 filter: 'blur(40px)'
               }} 
          />
          
          {keySearches.map((item, index) => {
            const Icon = item.icon;
            // Extract base color from item.color
            const colorMatch = item.color.match(/from-(\w+)-/);
            const baseColor = colorMatch ? colorMatch[1] : 'blue';
            
            return (
              <Link key={index} to={item.link} className="block group relative">
                <div 
                  className="relative h-64 overflow-hidden rounded-lg transition-all duration-300 hover:scale-105 hover:z-10"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--${baseColor}-800)) 0%, hsl(var(--${baseColor}-200)) 50%, hsl(var(--${baseColor}-500)) 100%)`
                  }}
                >
                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                  
                  {/* Text content - top left */}
                  <h3 className="absolute top-[1.125rem] left-[1.125rem] text-lg text-white leading-tight max-w-[70%] z-10 group-hover:translate-x-1 transition-transform">
                    {item.query}
                  </h3>
                  
                  {/* Icon - bottom right */}
                  <div className="absolute bottom-[1.125rem] right-[1.125rem] w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all z-10">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile version - individual gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-1">
          {keySearches.map((item, index) => {
            const Icon = item.icon;
            // Extract base color from item.color
            const colorMatch = item.color.match(/from-(\w+)-/);
            const baseColor = colorMatch ? colorMatch[1] : 'blue';
            
            return (
              <Link key={index} to={item.link} className="block group">
                <div 
                  className="relative h-64 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--${baseColor}-800)) 0%, hsl(var(--${baseColor}-200)) 50%, hsl(var(--${baseColor}-500)) 100%)`
                  }}
                >
                  {/* Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                  
                  {/* Text content - top left */}
                  <h3 className="absolute top-[1.125rem] left-[1.125rem] text-lg text-white leading-tight max-w-[70%] z-10 group-hover:translate-x-1 transition-transform">
                    {item.query}
                  </h3>
                  
                  {/* Icon - bottom right */}
                  <div className="absolute bottom-[1.125rem] right-[1.125rem] w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all z-10">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeySearchSection;
