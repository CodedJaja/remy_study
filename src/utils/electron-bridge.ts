// Electron bridge for desktop-specific features
import { isElectron } from './platform';

interface ElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  isMaximized: () => Promise<boolean>;
  onFocusSession: (callback: (minutes: number) => void) => void;
  showNotification: (title: string, body: string) => void;
  setAlwaysOnTop: (flag: boolean) => void;
}

// Access Electron API if available
const getElectronAPI = (): ElectronAPI | null => {
  if (!isElectron()) return null;
  return (window as any).electronAPI || null;
};

// Window controls
export const minimizeWindow = () => {
  const api = getElectronAPI();
  if (api?.minimize) {
    api.minimize();
  }
};

export const maximizeWindow = () => {
  const api = getElectronAPI();
  if (api?.maximize) {
    api.maximize();
  }
};

export const closeWindow = () => {
  const api = getElectronAPI();
  if (api?.close) {
    api.close();
  }
};

export const isWindowMaximized = async (): Promise<boolean> => {
  const api = getElectronAPI();
  if (api?.isMaximized) {
    return await api.isMaximized();
  }
  return false;
};

// Desktop notifications
export const showDesktopNotification = (title: string, body: string) => {
  const api = getElectronAPI();
  if (api?.showNotification) {
    api.showNotification(title, body);
  } else if ('Notification' in window) {
    new Notification(title, { body });
  }
};

// Always on top (for focus mode)
export const setAlwaysOnTop = (flag: boolean) => {
  const api = getElectronAPI();
  if (api?.setAlwaysOnTop) {
    api.setAlwaysOnTop(flag);
  }
};

// Listen for focus session completions
export const onFocusSessionComplete = (callback: (minutes: number) => void) => {
  const api = getElectronAPI();
  if (api?.onFocusSession) {
    api.onFocusSession(callback);
  }
};
