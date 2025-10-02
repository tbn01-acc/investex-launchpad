import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Award } from "lucide-react";

export function PartnerAnalytics() {
  const metrics = [
    { title: "Рефералы", value: "342", icon: Users, change: "+23", color: "text-blue-500" },
    { title: "Заработано", value: "$12.5K", icon: DollarSign, change: "+$2.1K", color: "text-green-500" },
    { title: "Конверсия", value: "8.3%", icon: TrendingUp, change: "+1.2%", color: "text-purple-500" },
    { title: "Рейтинг", value: "Gold", icon: Award, change: "↑1", color: "text-orange-500" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Прогресс по уровням</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>До Platinum уровня</span>
                  <span className="font-semibold">73%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full h-2" style={{ width: '73%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ источников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Социальные сети</span>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Email рассылка</span>
                <span className="font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Прямые переходы</span>
                <span className="font-semibold">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
