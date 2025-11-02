import { Card } from "@/components/ui/card";
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
    role: "Инвестор",
    query: "Найти перспективный стартап",
    icon: TrendingUp,
    link: "/investments",
    color: "from-blue-500 to-blue-600"
  },
  {
    role: "Соинвестор",
    query: "Войти в инвестиционный синдикат",
    icon: Users,
    link: "/investments",
    color: "from-purple-500 to-purple-600"
  },
  {
    role: "Франчайзи",
    query: "Найти прибыльную франшизу",
    icon: Store,
    link: "/management-franchises",
    color: "from-green-500 to-green-600"
  },
  {
    role: "Фаундер",
    query: "Привлечь инвестиции",
    icon: Rocket,
    link: "/for-founders",
    color: "from-orange-500 to-orange-600"
  },
  {
    role: "Ко-фаундер",
    query: "Найти команду для стартапа",
    icon: UserPlus,
    link: "/for-founders",
    color: "from-pink-500 to-pink-600"
  },
  {
    role: "Франчайзер",
    query: "Масштабировать бизнес через франшизу",
    icon: Building2,
    link: "/management-franchises",
    color: "from-teal-500 to-teal-600"
  },
  {
    role: "Исполнитель",
    query: "Найти проекты для фриланса",
    icon: Briefcase,
    link: "/for-freelancers",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    role: "Соискатель",
    query: "Найти работу в стартапе",
    icon: Search,
    link: "/employees",
    color: "from-red-500 to-red-600"
  },
  {
    role: "Партнер",
    query: "Стать партнером платформы",
    icon: Handshake,
    link: "/partners",
    color: "from-yellow-500 to-yellow-600"
  }
];

const KeySearchSection = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Что вы ищете?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите свою роль и начните путь к успеху
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keySearches.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.link} className="block group">
                <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 border-2 hover:border-primary/50 bg-card">
                  <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {item.role}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {item.query}
                  </h3>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeySearchSection;
