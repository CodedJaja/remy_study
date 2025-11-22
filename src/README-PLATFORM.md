# REMY - Platform Setup Guide

REMY is a cross-platform focus tracking application that runs on:
- **Web** - Standard browser application
- **Desktop** - Electron wrapper for Windows, macOS, and Linux
- **Mobile** - Ionic Capacitor for iOS and Android

## Platform-Specific Features

### 🖥️ Desktop (Electron)
- Native window controls (minimize, maximize, close)
- Always-on-top mode for focus sessions
- System tray integration
- Desktop notifications
- Native menu bar

### 📱 Mobile (Capacitor)
- Haptic feedback on interactions
- Keep screen awake during focus sessions
- Local push notifications
- Background app state management
- Native splash screen

## Setup Instructions

### Web Development
```bash
npm install
npm run dev
```

### Electron Desktop App

1. **Install dependencies:**
```bash
npm install electron concurrently wait-on electron-builder --save-dev
```

2. **Run in development:**
```bash
npm run electron:dev
```

3. **Build for distribution:**
```bash
npm run electron:build
```

This will create installers in `dist-electron/`:
- Windows: `.exe` installer
- macOS: `.dmg` image
- Linux: `.AppImage` or `.deb`

### Capacitor Mobile App

1. **Initialize Capacitor:**
```bash
npm install @capacitor/core @capacitor/cli
npm run capacitor:init
```

2. **Add platforms:**
```bash
# For Android
npm run capacitor:add:android

# For iOS (macOS only)
npm run capacitor:add:ios
```

3. **Install required plugins:**
```bash
npm install @capacitor/app @capacitor/haptics @capacitor/local-notifications
```

4. **Build and sync:**
```bash
npm run build
npm run capacitor:sync
```

5. **Open in native IDE:**
```bash
# Android Studio
npm run capacitor:open:android

# Xcode (macOS only)
npm run capacitor:open:ios
```

6. **Configure permissions:**

For Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.WAKE_LOCK"/>
```

For iOS (`ios/App/App/Info.plist`):
```xml
<key>UIBackgroundModes</key>
<array>
  <string>remote-notification</string>
</array>
```

## Platform Detection

The app automatically detects the platform and enables appropriate features:

```typescript
import { getPlatform, isElectron, isCapacitor, isMobile } from './utils/platform';

if (isElectron()) {
  // Desktop-specific features
}

if (isCapacitor()) {
  // Mobile native features
}

if (isMobile()) {
  // Mobile UI adjustments
}
```

## Testing

- **Web**: Standard browser testing at `http://localhost:5173`
- **Electron**: Runs in Electron window with DevTools
- **Android**: Test on emulator or physical device via Android Studio
- **iOS**: Test on simulator or physical device via Xcode

## Distribution

### Desktop
- Electron Builder creates native installers
- Code signing required for macOS and Windows
- Auto-update supported via electron-updater

### Mobile
- Android: Generate signed APK or AAB for Play Store
- iOS: Archive and upload to App Store Connect
- Both require developer accounts

## Notes

- Supabase authentication works across all platforms
- Data syncs automatically when online
- Offline functionality can be added with local storage
- Push notifications require platform-specific setup
