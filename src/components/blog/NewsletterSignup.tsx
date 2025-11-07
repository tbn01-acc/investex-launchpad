import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  roleType?: string;
}

export const NewsletterSignup = ({ roleType }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Подписка оформлена!",
        description: "Вы будете получать новые статьи на указанный email.",
      });
      setEmail("");
    }
  };

  return (
    <section className="bg-muted/50 rounded-lg p-8 md:p-12 text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-4">
        {roleType 
          ? `Получайте новые статьи от ${roleType}`
          : 'Подпишитесь на блог Invest-Ex'
        }
      </h3>
      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
        Еженедельная рассылка с лучшими статьями, кейсами и аналитикой от экспертов индустрии
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input
          type="email"
          placeholder="Ваш email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">Подписаться</Button>
      </form>
    </section>
  );
};
