// Electron preload script
// This file should be referenced in your Electron main process configuration

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  minimize: () => ipcRenderer.send('window-minimize'),
  maximize: () => ipcRenderer.send('window-maximize'),
  close: () => ipcRenderer.send('window-close'),
  isMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),
  setAlwaysOnTop: (flag) => ipcRenderer.send('set-always-on-top', flag),
  onFocusSession: (callback) => ipcRenderer.on('focus-session-complete', (_, minutes) => callback(minutes)),
});
