import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target, 
  MapPin, 
  Calendar,
  ExternalLink,
  PlayCircle,
  FileText,
  Star
} from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    executiveSummary: string;
    industry: string;
    stage: string;
    fundingAmount: string;
    valuation: string;
    teamSize: number;
    revenue: string;
    growth: string;
    location: string;
    tags: string[];
    team: Array<{
      name: string;
      role: string;
      experience: string;
      linkedIn?: string;
    }>;
    traction: {
      users: string;
      revenue: string;
      partnerships: string;
    };
    financial: {
      burnRate: string;
      runway: string;
      projections: string;
    };
    investment: {
      useOfFunds: string[];
      targetROI: string;
      exitStrategy: string;
    };
    riskFactors: string[];
    esgScore: number;
    demoUrl?: string;
    pitchDeckUrl?: string;
    videoUrl?: string;
  };
  compact?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'pre-seed': return 'bg-blue-500';
      case 'seed': return 'bg-green-500';
      case 'series-a': return 'bg-orange-500';
      case 'series-b': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEsgColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (compact) {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <div className="flex gap-2 mb-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
            <div className="text-right">
              <Badge className={`${getStageColor(project.stage)} text-white mb-2`}>
                {project.stage}
              </Badge>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {project.location}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground">Требуется</div>
              <div className="font-semibold">{project.fundingAmount}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Оценка</div>
              <div className="font-semibold">{project.valuation}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Выручка</div>
              <div className="font-semibold text-green-600">{project.revenue}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Рост</div>
              <div className="font-semibold text-green-600">{project.growth}</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" />
              Команда: {project.teamSize} человек
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Подробнее
              </Button>
              <Button size="sm">
                Инвестировать
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
            <CardDescription className="text-base">{project.description}</CardDescription>
            <div className="flex gap-2 mt-3">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
          <div className="text-right">
            <Badge className={`${getStageColor(project.stage)} text-white mb-2`}>
              {project.stage}
            </Badge>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {project.location}
            </div>
            <div className={`text-sm font-medium mt-1 ${getEsgColor(project.esgScore)}`}>
              ESG: {project.esgScore}/100
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Executive Summary */}
        <div>
          <h4 className="font-semibold mb-2">Executive Summary</h4>
          <p className="text-muted-foreground">{project.executiveSummary}</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Требуется</span>
            </div>
            <div className="text-xl font-bold">{project.fundingAmount}</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Оценка</span>
            </div>
            <div className="text-xl font-bold">{project.valuation}</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Выручка</span>
            </div>
            <div className="text-xl font-bold text-green-600">{project.revenue}</div>
          </div>
          <div className="border rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-muted-foreground">Рост</span>
            </div>
            <div className="text-xl font-bold text-green-600">{project.growth}</div>
          </div>
        </div>

        {/* Team Showcase */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Users className="h-4 w-4" />
            Команда ({project.teamSize} человек)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.team.slice(0, 4).map((member, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.role}</div>
                    <div className="text-xs text-muted-foreground">{member.experience}</div>
                  </div>
                  {member.linkedIn && (
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traction Metrics */}
        <div>
          <h4 className="font-semibold mb-3">Traction Metrics</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Пользователи</div>
              <div className="font-semibold">{project.traction.users}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">MRR</div>
              <div className="font-semibold">{project.traction.revenue}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Партнерства</div>
              <div className="font-semibold">{project.traction.partnerships}</div>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div>
          <h4 className="font-semibold mb-3">Financial Highlights</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Burn Rate</div>
              <div className="font-semibold">{project.financial.burnRate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Runway</div>
              <div className="font-semibold">{project.financial.runway}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Прогноз</div>
              <div className="font-semibold">{project.financial.projections}</div>
            </div>
          </div>
        </div>

        {/* Investment Terms */}
        <div>
          <h4 className="font-semibold mb-3">Investment Terms</h4>
          <div className="space-y-2">
            <div>
              <span className="text-sm text-muted-foreground">Use of Funds: </span>
              <span className="text-sm">{project.investment.useOfFunds.join(', ')}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Target ROI: </span>
              <span className="text-sm font-medium text-green-600">{project.investment.targetROI}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Exit Strategy: </span>
              <span className="text-sm">{project.investment.exitStrategy}</span>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="font-semibold mb-3">Risk Factors</h4>
          <div className="space-y-1">
            {project.riskFactors.map((risk, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                • {risk}
              </div>
            ))}
          </div>
        </div>

        {/* Media & Documents */}
        <div className="flex gap-3 pt-4 border-t">
          {project.demoUrl && (
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Button>
          )}
          {project.videoUrl && (
            <Button variant="outline" size="sm">
              <PlayCircle className="h-4 w-4 mr-2" />
              Видео
            </Button>
          )}
          {project.pitchDeckUrl && (
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Pitch Deck
            </Button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            Подробнее
          </Button>
          <Button className="flex-1">
            Выразить интерес
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;