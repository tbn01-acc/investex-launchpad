import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ForgotPasswordFormProps {
  onBack?: () => void;
}

export default function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Введите email адрес");
      return;
    }

    if (!validateEmail(email)) {
      setError("Введите корректный email адрес");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: requestError } = await supabase.functions.invoke('password-reset-request', {
        body: { email }
      });

      if (requestError) {
        throw new Error(requestError.message);
      }

      if (!data?.success) {
        throw new Error(data?.error || "Ошибка отправки запроса");
      }

      setIsSubmitted(true);
      toast({
        title: "Запрос отправлен",
        description: "Проверьте вашу почту для инструкций по сбросу пароля",
      });
    } catch (err: any) {
      console.error("Password reset request error:", err);
      setError(err.message || "Произошла ошибка при отправке запроса");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <CardTitle>Проверьте вашу почту</CardTitle>
          <CardDescription>
            Мы отправили инструкции по сбросу пароля на адрес {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              Если письмо не пришло в течение нескольких минут, проверьте папку "Спам"
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSubmitted(false);
                setEmail("");
                setError("");
              }}
              className="w-full"
            >
              Отправить снова
            </Button>
            
            {onBack ? (
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к входу
              </Button>
            ) : (
              <Link to="/auth" className="w-full">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад к входу
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
        <CardTitle>Забыли пароль?</CardTitle>
        <CardDescription>
          Введите ваш email и мы отправим ссылку для сброса пароля
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email адрес
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите ваш email"
              required
              disabled={isLoading}
              autoFocus
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Отправляем...
              </>
            ) : (
              "Отправить ссылку для сброса"
            )}
          </Button>

          {onBack ? (
            <Button 
              type="button"
              variant="ghost" 
              onClick={onBack}
              className="w-full"
              disabled={isLoading}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к входу
            </Button>
          ) : (
            <Link to="/auth" className="w-full">
              <Button variant="ghost" className="w-full" disabled={isLoading}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к входу
              </Button>
            </Link>
          )}
        </form>
      </CardContent>
    </Card>
  );
}