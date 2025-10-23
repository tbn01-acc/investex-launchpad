import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { roleSuccessStories } from "@/data/roleSuccessStories";

interface SuccessStoriesSectionProps {
  filterByRole?: string;
}

const SuccessStoriesSection = ({ filterByRole }: SuccessStoriesSectionProps) => {
  const isMobile = useIsMobile();
  
  const stories = filterByRole && roleSuccessStories[filterByRole as keyof typeof roleSuccessStories]
    ? roleSuccessStories[filterByRole as keyof typeof roleSuccessStories]
    : roleSuccessStories.investor;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Истории успеха</h2>
        <p className="text-xl text-muted-foreground text-center max-w-4xl mx-auto mb-12">
          Гордимся результатами наших пользователей. Эти проекты — яркий пример того, чего можно достичь с Invest-Ex.
        </p>
        
        {isMobile ? (
          <Carousel
            plugins={[Autoplay({ delay: 3500 })]}
            className="w-full max-w-sm mx-auto"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent>
              {stories.map((story, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="bg-white rounded-2xl p-6 text-center shadow-lg border-t-4 border-primary">
                      <h3 className="text-lg font-bold mb-2">{story.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{story.subtitle}</p>
                      <div className="text-3xl font-bold text-primary mb-2">{story.metric}</div>
                      <p className="text-muted-foreground text-sm font-semibold">{story.label}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg border-t-4 border-primary">
                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                <p className="text-muted-foreground mb-6">{story.subtitle}</p>
                <div className="text-4xl font-bold text-primary mb-2">{story.metric}</div>
                <p className="text-muted-foreground font-semibold">{story.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
