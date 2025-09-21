import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const showcaseProjects = [
  {
    title: "AI-Маркетинг для E-commerce",
    description: "Революционное решение для персонализации пользовательского опыта",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300&h=200&fit=crop"
  },
  {
    title: "Блокчейн для логистики",
    description: "Прозрачное отслеживание поставок от производителя до потребителя",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop"
  },
  {
    title: "Медтех платформа",
    description: "Телемедицина и мониторинг здоровья с использованием IoT",
    category: "HealthTech",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop"
  },
  {
    title: "Fintech для малого бизнеса",
    description: "Упрощенная система учета и финансового планирования",
    category: "FinTech",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop"
  },
  {
    title: "EdTech платформа",
    description: "Персонализированное обучение с использованием машинного обучения",
    category: "EdTech",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop"
  },
  {
    title: "GreenTech стартап",
    description: "Умные решения для экологически чистой энергетики",
    category: "GreenTech",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300&h=200&fit=crop"
  },
  {
    title: "FoodTech инновации",
    description: "Автоматизация ресторанного бизнеса и доставки еды",
    category: "FoodTech",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop"
  },
  {
    title: "PropTech решение",
    description: "Цифровизация процессов покупки и аренды недвижимости",
    category: "PropTech",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop"
  }
];

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const projectsPerSlide = 4;
  const totalSlides = Math.ceil(showcaseProjects.length / projectsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideProjects = () => {
    const start = currentSlide * projectsPerSlide;
    return showcaseProjects.slice(start, start + projectsPerSlide);
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Витрина проектов</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Откройте для себя разнообразие стартапов на нашей платформе — от FinTech до BioTech.
        </p>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {showcaseProjects
                    .slice(slideIndex * projectsPerSlide, (slideIndex + 1) * projectsPerSlide)
                    .map((project, index) => (
                    <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                          {project.category}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {project.description}
                        </p>
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
      </div>
    </section>
  );
};

export default ProjectShowcase;