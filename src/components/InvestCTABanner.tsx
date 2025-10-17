import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestCTABanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-primary via-primary/90 to-secondary border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-4">
          <Button 
            asChild
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl px-12 py-6 h-auto"
          >
            <Link to="/about#invest">Ограниченное предложение</Link>
          </Button>
          <div className="text-primary-foreground space-y-2">
            <div className="text-lg opacity-90">
              Инвестируйте в будущее инноваций прямо сейчас,<br />
              чтобы зафиксировать наиболее выгодные условия
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestCTABanner;
