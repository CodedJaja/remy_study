import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', minutes: 85 },
  { day: 'Tue', minutes: 120 },
  { day: 'Wed', minutes: 95 },
  { day: 'Thu', minutes: 110 },
  { day: 'Fri', minutes: 75 },
  { day: 'Sat', minutes: 45 },
  { day: 'Sun', minutes: 54 },
];

export function WeeklyOverview() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-900 mb-1">Weekly Overview</h3>
          <p className="text-gray-600 text-sm">Your focus time this week</p>
        </div>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white text-gray-700">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weekData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 12 }}
            axisLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickFormatter={(value) => `${value}m`}
          />
          <Tooltip 
            formatter={(value) => [`${value} minutes`, 'Focus Time']}
            contentStyle={{ 
              borderRadius: '8px', 
              border: '1px solid #e5e7eb',
              fontSize: '12px'
            }}
          />
          <Bar 
            dataKey="minutes" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div>
          <p className="text-gray-600 text-sm">Total</p>
          <p className="text-gray-900">6h 23m</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Average</p>
          <p className="text-gray-900">54m/day</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Best Day</p>
          <p className="text-gray-900">Tuesday</p>
        </div>
      </div>
    </Card>
  );
}
