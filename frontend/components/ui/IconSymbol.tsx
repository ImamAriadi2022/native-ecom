// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.up': 'keyboard-arrow-up',
  'chevron.down': 'keyboard-arrow-down',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  
  // Profile icons
  'person.circle.fill': 'account-circle',
  'clock.fill': 'schedule',
  'location.fill': 'location-on',
  'creditcard.fill': 'payment',
  'bell.fill': 'notifications',
  'questionmark.circle.fill': 'help-outline',
  'doc.text.fill': 'description',
  'camera.fill': 'camera-alt',
  'arrow.right.square.fill': 'exit-to-app',
  
  // Tab bar icons
  'grid.circle.fill': 'apps',
  'bag.fill': 'shopping-bag',
  'person.fill': 'person',
  'square.grid.2x2': 'apps',
  'cart.fill': 'shopping-cart',
  'star.fill': 'star',
  
  // Additional icons for profile
  'arrow.uturn.left.circle.fill': 'undo',
  'building.2.fill': 'business',
  'phone.fill': 'phone',
  'doc.plaintext.fill': 'article',
  'power': 'power-settings-new',
  'return': 'keyboard-return',
  
  // Additional navigation and form icons
  'plus.circle.fill': 'add-circle',
  'minus.circle.fill': 'remove-circle',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'pencil': 'edit',
  'trash': 'delete',
  'location': 'location-off',
  'map': 'map',
  'envelope.fill': 'email',
  'calendar': 'event',
  'number': 'tag',
  'lock.shield': 'security',
  'building.columns.fill': 'account-balance',
  'wallet.pass.fill': 'account-balance-wallet',
  'photo': 'photo-library',
  'bag': 'shopping-bag-outline',
  'bell.slash': 'notifications-off',
  
  // Complete profile menu icons mapping
  'power.circle': 'power-settings-new',
  'gearshape.fill': 'settings',
  'heart.fill': 'favorite',
  'star.circle.fill': 'grade',
  'info.circle.fill': 'info',
  'shield.fill': 'verified-user',
  'globe': 'public',
  'link': 'link',
  'square.and.arrow.up': 'share',
  'bookmark.fill': 'bookmark',
  'flag.fill': 'flag',
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'key.fill': 'vpn-key',
  'wifi': 'wifi',
  'bluetooth': 'bluetooth',
  'battery.100': 'battery-full',
  'moon.fill': 'dark-mode',
  'sun.max.fill': 'light-mode',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const iconName = MAPPING[name] || 'help-outline'; // fallback icon
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}
