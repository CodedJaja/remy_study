import { X, Award, Clock, Target } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NotificationCenterProps {
  onClose: () => void;
}

export function NotificationCenter({ onClose }: NotificationCenterProps) {
  const notifications = [
    {
      id: 1,
      type: 'achievement',
      icon: Award,
      title: 'New Achievement!',
      message: 'You\'ve reached a 7-day streak',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'reminder',
      icon: Clock,
      title: 'Break Time',
      message: 'Time for a 5-minute break',
      time: '3 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'goal',
      icon: Target,
      title: 'Daily Goal Reached',
      message: 'Great job! You hit your 2-hour goal yesterday',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)]"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <h3 className="text-gray-900">Notifications</h3>
              <p className="text-gray-600 text-xs mt-0.5">You have 2 unread messages</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notification.type === 'achievement' ? 'bg-orange-100 text-orange-600' :
                    notification.type === 'reminder' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-gray-900 text-sm">{notification.title}</p>
                      {notification.unread && (
                        <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-gray-600 text-xs mb-1">{notification.message}</p>
                    <p className="text-gray-500 text-xs">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200">
            <Button variant="ghost" size="sm" className="w-full text-blue-600">
              Mark all as read
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
