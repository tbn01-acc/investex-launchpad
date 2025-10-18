import { useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ProjectModal from "./ProjectModal";
import { allProjects } from "@/data/projectsData";

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const categories = ["Все", "AI/ML", "Blockchain", "FinTech", "HealthTech", "EdTech", "GreenTech", "FoodTech", "PropTech", "IoT", "SaaS", "Marketplace", "AgriTech", "LegalTech"];
  
  const filteredProjects = selectedCategory === "Все" 
    ? allProjects.slice(0, 8)
    : allProjects.filter(project => project.category === selectedCategory).slice(0, 8);

  const getCategoryCount = (category: string) => {
    if (category === "Все") return allProjects.length;
    return allProjects.filter(project => project.category === category).length;
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
              onClick={() => setSelectedCategory(category)}
              className="min-w-0 text-xs sm:text-sm px-2 sm:px-3 relative"
            >
              {category}
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary-foreground text-primary">
                {getCategoryCount(category)}
              </span>
            </Button>
          ))}
        </div>
        
        {/* Projects Grid - 2 rows x 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-border cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative">
                <img 
                  src={project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop";
                  }}
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {project.category}
                </Badge>
              </div>
              <div className="p-6 flex flex-col h-56">
                <h3 className="text-xl font-semibold mb-3 text-foreground line-clamp-2 h-14">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{project.description}</p>
                <Button 
                  size="sm" 
                  className="w-full mt-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Подробнее
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* All Projects Button */}
        <div className="flex justify-end mt-6">
          <Button asChild variant="outline">
            <Link to="/projects">
              Все проекты ({allProjects.length})
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
