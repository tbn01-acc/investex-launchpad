import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestCTABanner = () => {
  return (
    <section className="py-4 bg-gradient-to-r from-primary via-primary/90 to-secondary border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-primary-foreground">
            <TrendingUp className="w-6 h-6 flex-shrink-0" />
            <div>
              <div className="font-bold text-lg">Инвестируй в будущее инноваций</div>
              <div className="text-sm opacity-90">Станьте частью революции в венчурных инвестициях</div>
            </div>
          </div>
          <Button 
            asChild
            variant="secondary" 
            size="lg"
            className="md:w-auto w-full whitespace-nowrap font-semibold"
          >
            <Link to="/about#invest">Узнать подробнее</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvestCTABanner;
