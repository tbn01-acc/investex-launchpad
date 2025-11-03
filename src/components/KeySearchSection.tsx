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
    query: "Войти в инвестиционный синдикат",
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
    query: "Найти команду для стартапа",
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
    query: "Найти проекты для фриланса",
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keySearches.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.link} className="block group">
                <div className={`relative h-32 rounded-xl bg-gradient-to-br ${item.color} p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden`}>
                  {/* Background overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                  
                  {/* Icon with inverted style */}
                  <div className="relative z-10 w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:bg-white/30 transition-all">
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Text content */}
                  <h3 className="relative z-10 text-base font-bold text-white leading-tight group-hover:translate-x-1 transition-transform">
                    {item.query}
                  </h3>
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
