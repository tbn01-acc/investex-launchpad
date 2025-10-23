import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Autoplay from "embla-carousel-autoplay";
import { roleTestimonials } from "@/data/roleTestimonials";

interface TestimonialsSectionProps {
  filterByRole?: string;
}

const TestimonialsSection = ({ filterByRole }: TestimonialsSectionProps) => {
  const isMobile = useIsMobile();
  
  const testimonials = filterByRole && roleTestimonials[filterByRole as keyof typeof roleTestimonials]
    ? roleTestimonials[filterByRole as keyof typeof roleTestimonials]
    : roleTestimonials.investor;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-4">Нам доверяют</h2>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Доверие — наша главная ценность. Вот мнения тех, кто уже использует Invest-Ex для своего роста.
        </p>
        
        {isMobile ? (
          <Carousel
            plugins={[Autoplay({ delay: 5000 })]}
            className="w-full max-w-sm mx-auto"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="bg-card border border-border rounded-lg p-4 shadow-card h-64">
                      <div className="relative mb-3">
                        <p className="text-muted-foreground text-sm leading-relaxed pl-5 relative">
                          <span className="absolute left-0 top-0 text-2xl text-primary opacity-50 leading-none">"</span>
                          {testimonial.text}
                        </p>
                      </div>
                      <div className="flex items-center mt-4">
                        <Avatar className="h-8 w-8 mr-3">
                          <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-sm">{testimonial.author}</div>
                          <div className="text-muted-foreground text-xs">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="relative mb-4">
                  <p className="text-muted-foreground text-base leading-relaxed pl-6 relative">
                    <span className="absolute left-0 top-0 text-3xl text-primary opacity-50 leading-none">"</span>
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
