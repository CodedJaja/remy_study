import { TrendingUp, Award, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function InsightsCard() {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Peak Performance',
      description: 'You focus best between 9-11 AM',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Award,
      title: 'Consistency Master',
      description: '7-day streak! Keep it up',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Target,
      title: 'Almost There',
      description: '1h 6m to reach daily goal',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">Insights</h3>
        <Badge variant="secondary" className="text-xs">Today</Badge>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${insight.bgColor} ${insight.color}`}>
              <insight.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 text-sm">{insight.title}</p>
              <p className="text-gray-600 text-xs mt-0.5">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
