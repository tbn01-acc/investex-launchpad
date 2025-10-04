import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Plus, Search, Mail, Phone, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ContactsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from("crm_contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContacts(data);
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      client: "bg-blue-100 text-blue-800",
      partner: "bg-green-100 text-green-800",
      investor: "bg-purple-100 text-purple-800",
      lead: "bg-yellow-100 text-yellow-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100";
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || contact.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/project-management-hub")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к управлению
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Контакты</h1>
              <p className="text-muted-foreground">
                Управление клиентами, партнерами и инвесторами
              </p>
            </div>
            <Button onClick={() => navigate("/project-management/crm/contacts/new")}>
              <Plus className="mr-2 h-4 w-4" />
              Новый контакт
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск контактов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={filterType} onValueChange={setFilterType} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="client">Клиенты</TabsTrigger>
            <TabsTrigger value="partner">Партнеры</TabsTrigger>
            <TabsTrigger value="investor">Инвесторы</TabsTrigger>
            <TabsTrigger value="lead">Лиды</TabsTrigger>
          </TabsList>

          <TabsContent value={filterType} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {contact.company}
                        </CardDescription>
                      </div>
                      <Badge className={getTypeColor(contact.type)}>
                        {contact.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contact.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                    {contact.tags && contact.tags.length > 0 && (
                      <div className="flex gap-1 flex-wrap">
                        {contact.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Button variant="outline" className="w-full mt-4">
                      Просмотр профиля
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filteredContacts.length === 0 && (
              <Card>
                <CardContent className="flex items-center justify-center h-32 text-muted-foreground">
                  Контакты не найдены
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}