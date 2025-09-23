import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ProjectModal from "./ProjectModal";

const showcaseProjects = [
  {
    id: 1,
    title: "AI-Маркетинг для E-commerce",
    description: "Революционное решение для персонализации пользовательского опыта",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300&h=200&fit=crop",
    budget: "$500K - $1M",
    timeline: "6 месяцев",
    team: "15 человек",
    company: "TechVision AI"
  },
  {
    id: 2,
    title: "Блокчейн для логистики",
    description: "Прозрачное отслеживание поставок от производителя до потребителя",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
    budget: "$800K - $1.2M",
    timeline: "8 месяцев",
    team: "12 человек",
    company: "LogiChain Solutions"
  },
  {
    id: 3,
    title: "Fintech для малого бизнеса",
    description: "Упрощенная система учета и финансового планирования",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop",
    budget: "$300K - $600K",
    timeline: "4 месяца",
    team: "8 человек",
    company: "FinFlow Inc"
  },
  {
    id: 4,
    title: "Медтех платформа",
    description: "Телемедицина и мониторинг здоровья с использованием IoT",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop",
    budget: "$600K - $900K",
    timeline: "10 месяцев",
    team: "18 человек",
    company: "HealthTech Solutions"
  },
  {
    id: 5,
    title: "EdTech платформа",
    description: "Персонализированное обучение с использованием машинного обучения",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop",
    budget: "$400K - $700K",
    timeline: "7 месяцев",
    team: "12 человек",
    company: "EduTech Innovations"
  },
  {
    id: 6,
    title: "GreenTech стартап",
    description: "Умные решения для экологически чистой энергетики",
    category: "GreenTech",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop",
    budget: "$1M - $2M",
    timeline: "12 месяцев",
    team: "25 человек",
    company: "Green Energy Corp"
  },
  {
    id: 7,
    title: "FoodTech инновации",
    description: "Автоматизация ресторанного бизнеса и доставки еды",
    category: "FoodTech",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
    budget: "$500K - $800K",
    timeline: "6 месяцев",
    team: "14 человек",
    company: "FoodTech Solutions"
  },
  {
    id: 8,
    title: "PropTech решение",
    description: "Цифровизация процессов покупки и аренды недвижимости",
    category: "PropTech",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop",
    budget: "$700K - $1.1M",
    timeline: "9 месяцев",
    team: "16 человек",
    company: "PropTech Innovations"
  }
];

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const projectsPerSlide = 4;
  
  const categories = ["Все", "AI/ML", "Blockchain", "FinTech", "HealthTech", "EdTech", "GreenTech", "FoodTech", "PropTech"];
  
  const filteredProjects = selectedCategory === "Все" 
    ? showcaseProjects 
    : showcaseProjects.filter(project => project.category === selectedCategory);
    
  const totalSlides = Math.ceil(filteredProjects.length / projectsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideProjects = () => {
    const start = currentSlide * projectsPerSlide;
    return filteredProjects.slice(start, start + projectsPerSlide);
  };

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Витрина проектов</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-8">
          Откройте для себя разнообразие стартапов на нашей платформе — от FinTech до BioTech.
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentSlide(0);
              }}
              className="min-w-0"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredProjects
                    .slice(slideIndex * projectsPerSlide, (slideIndex + 1) * projectsPerSlide)
                    .map((project, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                      <div className="relative">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{project.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                        <Button 
                          onClick={() => handleProjectClick(project)}
                          size="sm" 
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-lg -ml-6 w-12 h-12"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} />
            </Button>
          </div>
          
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-lg -mr-6 w-12 h-12"
              onClick={nextSlide}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-border'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        
        {/* All Projects Button */}
        <div className="flex justify-end mt-6">
          <Button asChild variant="outline">
            <Link to="/projects">
              Все проекты
            </Link>
          </Button>
        </div>
        
        <ProjectModal 
          project={selectedProject}
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
        />
      </div>
    </section>
  );
};

export default ProjectShowcase;