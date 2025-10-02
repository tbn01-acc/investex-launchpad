import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, TrendingUp, Users } from "lucide-react";

export function BloggerAnalytics() {
  const metrics = [
    { title: "Общий охват", value: "125K", icon: Eye, change: "+15%", color: "text-blue-500" },
    { title: "Подписчики", value: "45.2K", icon: Users, change: "+8%", color: "text-purple-500" },
    { title: "Вовлеченность", value: "12.5%", icon: Heart, change: "+3%", color: "text-pink-500" },
    { title: "Комментарии", value: "2.8K", icon: MessageCircle, change: "+12%", color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-green-500 mt-1">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Динамика роста
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Рост подписчиков</span>
                <span className="font-semibold">+8.3%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-purple-500 rounded-full h-2" style={{ width: '83%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Рост вовлеченности</span>
                <span className="font-semibold">+12.5%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-pink-500 rounded-full h-2" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
