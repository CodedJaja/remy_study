// Capacitor/Ionic Native bridge for mobile-specific features
import { isCapacitor } from './platform';

// App state management
export const setupAppStateListener = (onActive: () => void, onBackground: () => void) => {
  if (!isCapacitor()) return;
  
  try {
    const { App } = (window as any).Capacitor?.Plugins || {};
    if (!App) return;

    App.addListener('appStateChange', ({ isActive }: { isActive: boolean }) => {
      if (isActive) {
        onActive();
      } else {
        onBackground();
      }
    });
  } catch (error) {
    console.error('Error setting up app state listener:', error);
  }
};

// Local notifications
export const scheduleNotification = async (title: string, body: string, delay: number) => {
  if (!isCapacitor()) {
    console.log('Notification (web):', title, body);
    return;
  }

  try {
    const { LocalNotifications } = (window as any).Capacitor?.Plugins || {};
    if (!LocalNotifications) return;

    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: Math.floor(Math.random() * 1000000),
          schedule: { at: new Date(Date.now() + delay * 1000) },
        },
      ],
    });
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

// Haptic feedback
export const hapticImpact = async (style: 'light' | 'medium' | 'heavy' = 'medium') => {
  if (!isCapacitor()) return;

  try {
    const { Haptics } = (window as any).Capacitor?.Plugins || {};
    if (!Haptics) return;

    await Haptics.impact({ style });
  } catch (error) {
    console.error('Error triggering haptic:', error);
  }
};

// Keep screen awake during focus sessions
export const setKeepAwake = async (enable: boolean) => {
  if (!isCapacitor()) return;

  try {
    const { KeepAwake } = (window as any).Capacitor?.Plugins || {};
    if (!KeepAwake) return;

    if (enable) {
      await KeepAwake.keepAwake();
    } else {
      await KeepAwake.allowSleep();
    }
  } catch (error) {
    console.error('Error setting keep awake:', error);
  }
};
