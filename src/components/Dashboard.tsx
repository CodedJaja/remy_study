import { useState, useEffect } from 'react';
import { Play, Pause, Clock, TrendingUp, Target, Zap, History, Settings, Bell, LogOut, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { TimerCard } from './TimerCard';
import { StatsCard } from './StatsCard';
import { WeeklyOverview } from './WeeklyOverview';
import { InsightsCard } from './InsightsCard';
import { NotificationCenter } from './NotificationCenter';
import { createClient } from '../utils/supabase/client';
import { isElectron, isCapacitor, isMobile } from '../utils/platform';
import { minimizeWindow, maximizeWindow, closeWindow, setAlwaysOnTop } from '../utils/electron-bridge';
import { hapticImpact, setKeepAwake, scheduleNotification } from '../utils/capacitor-bridge';
import logo from 'figma:asset/373827bffc79e0c967df11d60fdb703830b25278.png';

interface DashboardProps {
  onSignOut: () => void;
}

export function Dashboard({ onSignOut }: DashboardProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // in seconds
  const [showNotifications, setShowNotifications] = useState(false);
  const [todayTotal, setTodayTotal] = useState(3240); // 54 minutes in seconds
  const [currentStreak, setCurrentStreak] = useState(7);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Platform-specific effects
  useEffect(() => {
    if (isRunning) {
      // Keep screen awake on mobile during focus session
      if (isCapacitor()) {
        setKeepAwake(true);
      }
    } else {
      if (isCapacitor()) {
        setKeepAwake(false);
      }
    }
  }, [isRunning]);

  const toggleTimer = () => {
    // Haptic feedback on mobile
    if (isCapacitor()) {
      hapticImpact('medium');
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (time > 0) {
      setTodayTotal(todayTotal + time);
      
      // Send notification on session complete
      if (isCapacitor()) {
        scheduleNotification(
          'Session Complete!',
          `Great job! You focused for ${Math.floor(time / 60)} minutes.`,
          0
        );
      }
    }
    setTime(0);
  };

  const toggleFocusMode = () => {
    const newFocusMode = !focusMode;
    setFocusMode(newFocusMode);
    
    // Set always on top for Electron
    if (isElectron()) {
      setAlwaysOnTop(newFocusMode);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src={logo} alt="REMY" className="h-8 w-8" />
              <span className="text-gray-900">REMY</span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Electron window controls */}
              {isElectron() && (
                <div className="flex items-center gap-1 mr-2 border-r border-gray-300 pr-2">
                  <Button variant="ghost" size="sm" onClick={minimizeWindow}>
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={maximizeWindow}>
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={closeWindow}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-blue-600 rounded-full"></span>
              </Button>
              
              {!isMobile() && (
                <>
                  <Button variant="ghost" size="sm">
                    <History className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={toggleFocusMode}
                    className={focusMode ? 'bg-blue-100 text-blue-600' : ''}
                  >
                    <Target className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Timer */}
          <div className="lg:col-span-2 space-y-6">
            <TimerCard
              time={time}
              isRunning={isRunning}
              onToggle={toggleTimer}
              onReset={resetTimer}
              formatTime={formatTime}
            />
            
            <WeeklyOverview />
          </div>

          {/* Right Column - Stats & Insights */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              <StatsCard
                icon={Clock}
                label="Today's Focus"
                value={formatTime(todayTotal + time)}
                color="blue"
              />
              <StatsCard
                icon={Zap}
                label="Current Streak"
                value={`${currentStreak} days`}
                color="orange"
              />
              <StatsCard
                icon={Target}
                label="Daily Goal"
                value="2h 0m"
                progress={((todayTotal + time) / 7200) * 100}
                color="green"
              />
              <StatsCard
                icon={TrendingUp}
                label="This Week"
                value="6h 23m"
                color="purple"
              />
            </div>

            <InsightsCard />
          </div>
        </div>
      </main>

      {/* Quick Action Buttons - Mobile FAB Style */}
      {isMobile() && (
        <div className="fixed bottom-6 left-0 right-0 px-4">
          <Card className="p-4 shadow-lg">
            <div className="flex items-center justify-around gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <History className="h-4 w-4 mr-1" />
                History
              </Button>
              <Button 
                size="sm" 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={toggleTimer}
              >
                {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Notification Center */}
      {showNotifications && (
        <NotificationCenter onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}