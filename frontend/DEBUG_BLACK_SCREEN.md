# Debug Build Issues - Black Screen Fix

## Masalah yang Ditemukan

### 1. ✅ FIXED: Broken Tab Layout
**File**: `app/(tabs)/_layout.tsx`
**Masalah**: File layout rusak, menggunakan `<Slot />` bukan `<Tabs>`
**Solusi**: Mengganti dengan proper Tabs component dengan screen configuration

### 2. Kemungkinan Penyebab Lain Black Screen

#### A. Metro Cache Issue
Coba clear cache:
```bash
cd c:\programming\native-ecom\frontend
npx expo start --clear
```

#### B. Build Cache Issue
Clear EAS build cache:
```bash
eas build --clear-cache
```

#### C. Dependencies Issue
Install ulang dependencies:
```bash
npm install
# atau
yarn install
```

#### D. Platform-Specific Issues
Untuk Android APK, pastikan:
- Target SDK version compatible
- Permissions correct di app.json/app.config.js

### 3. Debugging Steps

#### Check Console Logs
Di terminal saat `expo start`, lihat apakah ada error JavaScript

#### Check Device Logs
**Android:**
```bash
adb logcat | grep -i expo
```

#### Test di Development Mode
Coba jalankan di development mode dulu:
```bash
npx expo start
# Scan QR code dengan Expo Go
```

### 4. Potential Fixes

#### Update App Config
Pastikan app.json/app.config.js memiliki:
```json
{
  "expo": {
    "name": "Lyana Bottle Studio",
    "slug": "lyana-bottle-studio",
    "platforms": ["ios", "android"],
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    }
  }
}
```

#### Update EAS Build Config
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk",
        "distribution": "internal"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

### 5. Testing Checklist

- [ ] Test in Expo Go (development)
- [ ] Check console for JavaScript errors
- [ ] Verify tab navigation works
- [ ] Test login flow
- [ ] Check image loading
- [ ] Verify all screens accessible

### 6. Common Solutions

1. **Clear all caches**
2. **Rebuild with fresh dependencies**
3. **Test in development first**
4. **Check device compatibility**
5. **Verify app permissions**

## Next Steps

1. Build dan test dengan tab layout yang sudah diperbaiki
2. Jika masih black screen, coba development mode dulu
3. Check console logs untuk error spesifik
4. Clear cache jika perlu

Tab layout sekarang sudah diperbaiki, seharusnya setelah rebuild tidak ada lagi black screen.
