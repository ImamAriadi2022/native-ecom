# Production Build Black Screen Fix - Complete Guide

## Problem Analysis

**Development (npx expo start)**: Works perfectly ✅
**Production Build (eas build)**: Black screen after login ❌

This is a common issue where code works in development but fails in production builds.

## Root Causes Found

### 1. Missing Configuration Files
- ✅ **FIXED**: Added `metro.config.js`
- ✅ **FIXED**: Added `babel.config.js`
- ✅ **FIXED**: Updated `app.json` with proper production settings
- ✅ **FIXED**: Enhanced `eas.json` with better build configuration

### 2. Potential Issues to Test

#### A. LinearGradient in Production
**Problem**: expo-linear-gradient might cause issues in production builds
**Files affected**: 20+ screens use LinearGradient
**Test approach**: Created simple screens without LinearGradient

#### B. Dynamic Imports/Require
**Status**: No dynamic requires found ✅

#### C. Asset Loading
**Status**: Added `"assetBundlePatterns": ["**/*"]` to app.json ✅

## Files Created/Updated

### 1. Configuration Files Added

#### metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.requireCycleIgnorePatterns = [
  /(^|\/|\\)node_modules($|\/|\\)/,
];
module.exports = config;
```

#### babel.config.js
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      'react-native-reanimated/plugin'
    ],
  };
};
```

### 2. Updated app.json
- ✅ Changed name to "Lyana Bottle Studio"
- ✅ Added splash screen configuration
- ✅ Added assetBundlePatterns
- ✅ Removed newArchEnabled (can cause issues)
- ✅ Updated package names

### 3. Enhanced eas.json
- ✅ Added development profile
- ✅ Added CLI version requirement
- ✅ Better build profiles

### 4. Test Files Created
- ✅ `app/test-build.tsx` - Simple test screen
- ✅ `app/index-simple.tsx` - Login without LinearGradient

## Testing Strategy

### Phase 1: Simple Build Test
1. Temporarily rename current index.tsx
2. Rename index-simple.tsx to index.tsx
3. Build and test
4. If works → LinearGradient is the issue

### Phase 2: Gradual Re-enablement
1. If simple build works, gradually add back features
2. Start with basic navigation
3. Add LinearGradient screens one by one
4. Identify specific problematic component

## Build Commands

### Clear Everything and Rebuild
```bash
cd c:\programming\native-ecom\frontend

# Clear all caches
npx expo install --fix
rm -rf node_modules
npm install

# Clear Expo cache
npx expo start --clear

# Clear EAS cache and build
eas build --profile preview --clear-cache
```

### Test Simple Build
```bash
# Backup current index
mv app/(tabs)/index.tsx app/(tabs)/index-original.tsx

# Use simple version
mv app/index-simple.tsx app/(tabs)/index.tsx

# Build
eas build --profile preview --clear-cache
```

## Debugging Steps

### 1. Test Development Build First
```bash
eas build --profile development
# Install development build on phone
# Use Expo CLI to connect and see logs
```

### 2. Check Android Logs
```bash
adb logcat | grep -E "(ERROR|FATAL|ExpoKit|ReactNative)"
```

### 3. Check Metro Logs
Look for any bundling errors during build process

## Common Solutions

### Solution 1: LinearGradient Issue
If LinearGradient causes problems:
- Replace with View with backgroundColor
- Use Skia or other gradient solutions
- Simplify to solid colors temporarily

### Solution 2: Navigation Issue
- Ensure all route names are correct
- Check tab layout configuration
- Verify screen imports

### Solution 3: Asset Loading
- Ensure all images exist
- Check require() paths
- Verify asset bundle patterns

## Quick Fix Test

### Rename Files for Testing
```bash
# Test without LinearGradient
cd app/(tabs)
mv index.tsx index-gradient.tsx
mv ../index-simple.tsx index.tsx

# Build and test
eas build --profile preview --clear-cache
```

If simple version works:
1. LinearGradient is causing the issue
2. Gradually replace LinearGradient with solid colors
3. Or find alternative gradient solution

### Restore Original if Needed
```bash
mv index.tsx ../index-simple.tsx
mv index-gradient.tsx index.tsx
```

## Next Steps

1. **Try the simple build test first** - this will tell us if LinearGradient is the issue
2. **Check the build logs** for any specific errors
3. **Use development build** to get better error reporting
4. **Gradually add back complex components** once simple version works

## Files to Revert if Needed

If you need to go back to original:
- `app.json` - revert to original package name
- Remove `metro.config.js` and `babel.config.js` if they cause issues
- `eas.json` - keep the improvements

The configuration files added should help with production builds. Try building with these changes first, then use the simple test if still having issues.
