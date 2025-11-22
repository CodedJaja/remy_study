// Platform detection utilities
export const isElectron = () => {
  return typeof window !== 'undefined' && 
         window.navigator.userAgent.toLowerCase().includes('electron');
};

export const isCapacitor = () => {
  return typeof window !== 'undefined' && 
         !!(window as any).Capacitor;
};

export const isMobile = () => {
  if (isCapacitor()) return true;
  
  return typeof window !== 'undefined' && 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
           window.navigator.userAgent
         );
};

export const isDesktop = () => {
  return isElectron() || (!isMobile() && typeof window !== 'undefined');
};

export const getPlatform = (): 'electron' | 'capacitor' | 'mobile' | 'web' => {
  if (isElectron()) return 'electron';
  if (isCapacitor()) return 'capacitor';
  if (isMobile()) return 'mobile';
  return 'web';
};
