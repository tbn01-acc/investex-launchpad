import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from "lucide-react";

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

export default function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validatePassword = (pass: string) => {
    if (pass.length < 8) {
      return "Пароль должен содержать минимум 8 символов";
    }
    if (!/(?=.*[a-z])/.test(pass)) {
      return "Пароль должен содержать строчные буквы";
    }
    if (!/(?=.*[A-Z])/.test(pass)) {
      return "Пароль должен содержать прописные буквы";
    }
    if (!/(?=.*\d)/.test(pass)) {
      return "Пароль должен содержать цифры";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('password-reset', {
        body: {
          token,
          newPassword: password
        }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || 'Ошибка сброса пароля');
      }

      toast({
        title: "Пароль успешно изменён",
        description: "Теперь вы можете войти с новым паролем",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Произошла ошибка при сбросе пароля");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
        <CardTitle>Установить новый пароль</CardTitle>
        <CardDescription>
          Введите новый пароль для вашего аккаунта
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
            <label htmlFor="password" className="text-sm font-medium">
              Новый пароль
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите новый пароль"
                required
                disabled={isLoading}
                autoFocus
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Подтвердите пароль
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Подтвердите новый пароль"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Пароль должен содержать:</p>
            <ul className="space-y-1">
              <li className={`flex items-center gap-2 ${password.length >= 8 ? 'text-green-600' : ''}`}>
                {password.length >= 8 ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-muted-foreground" />}
                Минимум 8 символов
              </li>
              <li className={`flex items-center gap-2 ${/(?=.*[a-z])/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*[a-z])/.test(password) ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-muted-foreground" />}
                Строчные буквы
              </li>
              <li className={`flex items-center gap-2 ${/(?=.*[A-Z])/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*[A-Z])/.test(password) ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-muted-foreground" />}
                Прописные буквы
              </li>
              <li className={`flex items-center gap-2 ${/(?=.*\d)/.test(password) ? 'text-green-600' : ''}`}>
                {/(?=.*\d)/.test(password) ? <CheckCircle className="h-3 w-3" /> : <div className="h-3 w-3 rounded-full border border-muted-foreground" />}
                Цифры
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !password || !confirmPassword}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Сохранение...
              </>
            ) : (
              "Сохранить новый пароль"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}