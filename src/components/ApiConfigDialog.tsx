import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Settings, Key, Trash2, Plus } from "lucide-react";

interface ApiKey {
  id: string;
  key_name: string;
  provider: string;
  model_preference: string;
  is_active: boolean;
  created_at: string;
}

interface ApiConfigDialogProps {
  children: React.ReactNode;
}

const PROVIDERS = {
  openai: {
    name: "OpenAI",
    models: [
      "gpt-5-2025-08-07",
      "gpt-5-mini-2025-08-07", 
      "gpt-5-nano-2025-08-07",
      "gpt-4.1-2025-04-14",
      "gpt-4.1-mini-2025-04-14",
      "o3-2025-04-16",
      "o4-mini-2025-04-16"
    ]
  },
  anthropic: {
    name: "Anthropic",
    models: [
      "claude-opus-4-20250514",
      "claude-sonnet-4-20250514", 
      "claude-3-5-haiku-20241022",
      "claude-3-7-sonnet-20250219"
    ]
  },
  openrouter: {
    name: "OpenRouter",
    models: [
      "anthropic/claude-3.5-sonnet",
      "openai/gpt-4-turbo",
      "meta-llama/llama-3.1-405b-instruct",
      "google/gemini-pro-1.5"
    ]
  },
  perplexity: {
    name: "Perplexity",
    models: [
      "llama-3.1-sonar-small-128k-online",
      "llama-3.1-sonar-large-128k-online",
      "llama-3.1-sonar-huge-128k-online"
    ]
  }
};

export function ApiConfigDialog({ children }: ApiConfigDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    keyName: "",
    provider: "",
    model: "",
    apiKey: ""
  });

  useEffect(() => {
    if (isOpen && user) {
      fetchApiKeys();
    }
  }, [isOpen, user]);

  const fetchApiKeys = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_api_keys')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить API ключи",
        variant: "destructive",
      });
    }
  };

  const handleAddApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !formData.keyName || !formData.provider || !formData.model || !formData.apiKey) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('user_api_keys')
        .insert({
          user_id: user.id,
          key_name: formData.keyName,
          provider: formData.provider,
          model_preference: formData.model,
          api_key: formData.apiKey
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "API ключ добавлен",
      });

      setFormData({ keyName: "", provider: "", model: "", apiKey: "" });
      fetchApiKeys();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteApiKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "API ключ удален",
      });

      fetchApiKeys();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('user_api_keys')
        .update({ is_active: !isActive })
        .eq('id', id);

      if (error) throw error;

      fetchApiKeys();
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Настройки API
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Мои ключи</TabsTrigger>
            <TabsTrigger value="add">Добавить ключ</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {apiKeys.length === 0 ? (
              <Card className="p-6 text-center">
                <Key className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Нет настроенных API ключей</h3>
                <p className="text-muted-foreground mb-4">
                  Добавьте API ключи для использования ИИ-функций платформы
                </p>
                <Button onClick={() => (document.querySelector('[value="add"]') as HTMLElement)?.click()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить первый ключ
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((apiKey) => (
                  <Card key={apiKey.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{apiKey.key_name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            apiKey.is_active 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                          }`}>
                            {apiKey.is_active ? 'Активен' : 'Неактивен'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {PROVIDERS[apiKey.provider as keyof typeof PROVIDERS]?.name || apiKey.provider} • {apiKey.model_preference}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Добавлен: {new Date(apiKey.created_at).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(apiKey.id, apiKey.is_active)}
                        >
                          {apiKey.is_active ? 'Деактивировать' : 'Активировать'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteApiKey(apiKey.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add">
            <form onSubmit={handleAddApiKey} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keyName">Название конфигурации</Label>
                <Input
                  id="keyName"
                  value={formData.keyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, keyName: e.target.value }))}
                  placeholder="Моя OpenAI конфигурация"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider">Провайдер</Label>
                <Select
                  value={formData.provider}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, provider: value, model: "" }));
                  }}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите провайдера" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(PROVIDERS).map(([key, provider]) => (
                      <SelectItem key={key} value={key}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.provider && (
                <div className="space-y-2">
                  <Label htmlFor="model">Модель</Label>
                  <Select
                    value={formData.model}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите модель" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVIDERS[formData.provider as keyof typeof PROVIDERS]?.models.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Ключ</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="sk-..."
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Ваш API ключ будет зашифрован и безопасно сохранен
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Добавление..." : "Добавить API ключ"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}