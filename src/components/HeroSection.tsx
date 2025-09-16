import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Briefcase, Building } from "lucide-react";
import heroImage from "@/assets/hero-realistic.jpg";
import collaborationImage from "@/assets/collaboration-realistic.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-white border border-white/20">
                <TrendingUp className="w-4 h-4" />
                Платформа №1 для проектов и инвестиций
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">InvestEx</span>
                <span className="block text-2xl lg:text-3xl font-normal text-white/80 mt-2">
                  Экосистема проектов и инвестиций
                </span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl leading-relaxed">
                Объединяем фрилансеров, аутсорсеров, фаундеров и инвесторов в единой платформе. 
                От идеи до реализации проекта и привлечения инвестиций.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6 h-auto" asChild>
                <Link to="/auth?mode=signup">
                  Начать сейчас
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/about">
                  Узнать больше
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-white/70">Активных проектов</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">$50M+</div>
                <div className="text-sm text-white/70">Инвестировано</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">25K+</div>
                <div className="text-sm text-white/70">Участников</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-glow">
              <img 
                src={collaborationImage} 
                alt="InvestEx Platform - Платформа для бизнес-коллабораций и инвестиций" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-card animate-bounce">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-investment-green rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Фрилансеры</div>
                  <div className="text-xs text-muted-foreground">15,847 активных</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-card animate-bounce" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-fintech-blue rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Инвесторы</div>
                  <div className="text-xs text-muted-foreground">$2.3M готовы инвестировать</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;