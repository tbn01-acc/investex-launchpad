import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

export default function PortfolioAnalytics() {
  // Performance data over time
  const performanceData = [
    { month: 'Янв', value: 2850000, return: 0 },
    { month: 'Фев', value: 2920000, return: 2.5 },
    { month: 'Мар', value: 3100000, return: 6.2 },
    { month: 'Апр', value: 3050000, return: -1.6 },
    { month: 'Май', value: 3250000, return: 6.6 },
    { month: 'Июн', value: 3420000, return: 5.2 },
  ];

  // Sector allocation
  const sectorData = [
    { name: 'Финтех', value: 35, amount: 1197000 },
    { name: 'ИИ/ML', value: 25, amount: 855000 },
    { name: 'Блокчейн', value: 20, amount: 684000 },
    { name: 'IoT', value: 12, amount: 410400 },
    { name: 'E-commerce', value: 8, amount: 273600 },
  ];

  // Risk vs Return data
  const riskReturnData = [
    { risk: 2, return: 8, size: 300000, name: 'Проект A' },
    { risk: 4, return: 15, size: 500000, name: 'Проект B' },
    { risk: 6, return: 25, size: 400000, name: 'Проект C' },
    { risk: 3, return: 12, size: 600000, name: 'Проект D' },
    { risk: 7, return: 30, size: 350000, name: 'Проект E' },
    { risk: 5, return: 18, size: 450000, name: 'Проект F' },
  ];

  // Top performers
  const topPerformers = [
    { name: 'AI-платформа для e-commerce', return: 45.2, amount: 500000, color: 'green' },
    { name: 'Система управления складом', return: 38.7, amount: 200000, color: 'green' },
    { name: 'Блокчейн-платформа для NFT', return: 25.0, amount: 650000, color: 'green' },
    { name: 'Fintech для микробизнеса', return: 12.5, amount: 300000, color: 'blue' },
    { name: 'Мобильное приложение для доставки', return: -5.2, amount: 300000, color: 'red' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Общая доходность</p>
                <p className="text-2xl font-bold text-green-600">+20.0%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Годовая доходность</p>
                <p className="text-2xl font-bold text-blue-600">18.5%</p>
              </div>
              <Percent className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Волатильность</p>
                <p className="text-2xl font-bold text-orange-600">12.3%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Коэффициент Шарпа</p>
                <p className="text-2xl font-bold text-purple-600">1.42</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Динамика портфеля</CardTitle>
          <CardDescription>Стоимость портфеля и доходность по месяцам</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'value' ? `₽${value.toLocaleString()}` : `${value}%`,
                  name === 'value' ? 'Стоимость' : 'Доходность'
                ]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="value" fill="#8884d8" name="Стоимость портфеля" />
              <Line yAxisId="right" type="monotone" dataKey="return" stroke="#82ca9d" name="Месячная доходность %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Allocation */}
        <Card>
          <CardHeader>
            <CardTitle>Распределение по секторам</CardTitle>
            <CardDescription>Диверсификация инвестиций по отраслям</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Доля']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {sectorData.map((sector, index) => (
                <div key={sector.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{sector.name}</span>
                  </div>
                  <span className="font-medium">₽{sector.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Лучшие инвестиции</CardTitle>
            <CardDescription>Проекты с наибольшей доходностью</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Инвестировано: ₽{project.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={project.color === 'green' ? 'default' : 
                              project.color === 'red' ? 'destructive' : 'secondary'}
                      className={
                        project.color === 'green' ? 'bg-green-100 text-green-800' :
                        project.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''
                      }
                    >
                      {project.return >= 0 ? '+' : ''}{project.return}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle>Анализ риск-доходность</CardTitle>
          <CardDescription>Соотношение риска и ожидаемой доходности по проектам</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskReturnData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="risk" 
                domain={[0, 10]}
                label={{ value: 'Уровень риска', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                type="number" 
                dataKey="return"
                label={{ value: 'Ожидаемая доходность (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name, props) => [
                  name === 'return' ? `${value}%` : value,
                  name === 'return' ? 'Доходность' : 'Риск'
                ]}
                labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
              />
              <Line
                type="monotone"
                dataKey="return"
                stroke="#8884d8"
                dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-muted-foreground mt-2">
            График показывает соотношение риска и доходности по проектам
          </p>
        </CardContent>
      </Card>
    </div>
  );
}