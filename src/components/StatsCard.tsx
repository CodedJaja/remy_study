import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: 'blue' | 'orange' | 'green' | 'purple';
  progress?: number;
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  orange: 'bg-orange-100 text-orange-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
};

export function StatsCard({ icon: Icon, label, value, color, progress }: StatsCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-gray-900 text-2xl">{value}</p>
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1">{Math.round(progress)}% complete</p>
        </div>
      )}
    </Card>
  );
}
