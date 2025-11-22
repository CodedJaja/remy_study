import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface TimerCardProps {
  time: number;
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  formatTime: (seconds: number) => string;
}

export function TimerCard({ time, isRunning, onToggle, onReset, formatTime }: TimerCardProps) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const progress = (time % 1500) / 1500; // 25 min pomodoro cycle
  const strokeDashoffset = circumference - (progress * circumference);

  return (
    <Card className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
      <div className="flex flex-col items-center">
        <h2 className="text-white/80 mb-6">Active Session</h2>
        
        {/* Circular Timer */}
        <div className="relative mb-8">
          <svg className="transform -rotate-90" width="280" height="280">
            {/* Background circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="140"
              cy="140"
              r={radius}
              stroke="white"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl tracking-wider mb-2">
              {formatTime(time)}
            </div>
            <div className="text-white/60 text-sm">
              {isRunning ? 'In Progress' : 'Paused'}
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={onReset}
            className="w-14 h-14 rounded-full"
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
          
          <Button
            size="lg"
            onClick={onToggle}
            className="w-20 h-20 rounded-full bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
          >
            {isRunning ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </Button>
          
          <div className="w-14" /> {/* Spacer for symmetry */}
        </div>

        {/* Quick Start Presets */}
        <div className="flex items-center gap-2 mt-8">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            15 min
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            25 min
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            45 min
          </Button>
        </div>
      </div>
    </Card>
  );
}
