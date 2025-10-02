import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, FileText, Eye, TrendingUp } from "lucide-react";

export function JobSeekerAnalytics() {
  const metrics = [
    { title: "Откликов", value: "28", icon: FileText, change: "+5", color: "text-blue-500" },
    { title: "Просмотры резюме", value: "156", icon: Eye, change: "+23", color: "text-green-500" },
    { title: "Собеседований", value: "7", icon: Briefcase, change: "+3", color: "text-purple-500" },
    { title: "Отклик-рейт", value: "18%", icon: TrendingUp, change: "+2%", color: "text-orange-500" },
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
            <CardTitle>Статус откликов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ожидают ответа</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Приглашения</span>
                <span className="font-semibold text-green-500">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Отказы</span>
                <span className="font-semibold text-red-500">9</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ навыки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">React</span>
                <div className="w-24 bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '90%' }} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">TypeScript</span>
                <div className="w-24 bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Node.js</span>
                <div className="w-24 bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
