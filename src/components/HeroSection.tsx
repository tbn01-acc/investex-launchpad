import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Briefcase, Building } from "lucide-react";
import heroImage from "@/assets/hero-realistic.jpg";
import collaborationImage from "@/assets/collaboration-realistic.jpg";
import logoSilver from "@/assets/logo_silver.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-blue-600 via-green-500 to-yellow-400 pt-4 pb-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-2">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start">
              <img src={logoSilver} alt="Invest-Ex Logo" className="w-64 h-auto" />
            </div>
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm font-medium text-foreground">
                <TrendingUp className="w-4 h-4 text-primary" />
                Платформа №1 для проектов и инвестиций
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                <span className="block">Invest-Ex</span>
                <span className="block text-xl lg:text-2xl font-normal text-gray-200 mt-2">
                  Единая инвестиционная платформа проектов и инвестиций
                </span>
              </h1>
              
              <p className="text-lg text-orange-300 max-w-full sm:max-w-2xl leading-relaxed px-4 sm:px-0">
                Объединяем инвесторов, фаундеров, исполнителей, партнеров и др. - всех участников венчурного и инвестиционного рынка в единой платформе. От идеи до реализации проекта и привлечения инвестиций.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base px-6 py-3" asChild>
                <Link to="/auth?mode=signup">
                  Начать сейчас
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-base px-6 py-3" asChild>
                <Link to="/about">
                  Узнать больше
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/20">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-orange-400">10K+</div>
                <div className="text-sm text-gray-200">Активных проектов</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-orange-400">$50M+</div>
                <div className="text-sm text-gray-200">Инвестировано</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-orange-400">25K+</div>
                <div className="text-sm text-gray-200">Участников</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-card border border-border">
              <img 
                src={collaborationImage} 
                alt="InvestEx Platform - Платформа для бизнес-коллабораций и инвестиций" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-card border border-border rounded-lg p-3 shadow-card">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-secondary rounded-md flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Фрилансеры</div>
                  <div className="text-xs text-muted-foreground">15,847 активных</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-card">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <Building className="w-3 h-3 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Инвесторы</div>
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