import { useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProjectModal from "./ProjectModal";
import { allProjects } from "@/data/projectsData";

const showcaseProjects = allProjects;

const ProjectShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="min-w-0 text-xs sm:text-sm px-2 sm:px-3"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {isMobile ? (
          <Carousel
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-sm mx-auto"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {filteredProjects.map((project, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border">
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
                      <div className="p-4 flex flex-col h-48">
                        <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">{project.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">{project.description}</p>
                        <Button 
                          onClick={() => handleProjectClick(project)}
                          size="sm" 
                          className="w-full mt-auto"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <>
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                      {filteredProjects
                        .slice(slideIndex * projectsPerSlide, (slideIndex + 1) * projectsPerSlide)
                        .map((project, index) => (
                        <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border">
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
                          <div className="p-6 flex flex-col h-56">
                            <h3 className="text-xl font-semibold mb-3 text-foreground line-clamp-2 h-14">{project.title}</h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{project.description}</p>
                            <Button 
                              onClick={() => handleProjectClick(project)}
                              size="sm" 
                              className="w-full mt-auto"
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
          </>
        )}
        
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