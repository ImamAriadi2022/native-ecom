import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useCart } from '@/app/CartContext';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAuth } from '@/contexts/AuthContext';
import { StyleSheet, Text, View } from 'react-native';

const CartIcon = ({ color }: { color: string }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <View style={styles.cartIconContainer}>
      <IconSymbol size={26} name="bag.fill" color={color} />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems > 99 ? '99+' : totalItems}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  return (
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#DE8389',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e1e1e1',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          default: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e1e1e1',
            height: 65,
            paddingBottom: 8,
            paddingTop: 8,
            elevation: 8,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="house.fill" color={color} />,
          href: isAuthenticated ? null : '/index', // Hide when authenticated
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="grid.circle.fill" color={color} />,
          href: isAuthenticated ? '/(tabs)/explore' : null, // Show only when authenticated
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <CartIcon color={color} />,
          href: isAuthenticated ? '/cart' : null, // Show only when authenticated
        }}
      />
      <Tabs.Screen
        name="event"
        options={{
          title: 'Event',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="star.fill" color={color} />,
          href: isAuthenticated ? '/(tabs)/event' : null, // Show only when authenticated
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="person.circle.fill" color={color} />,
          href: isAuthenticated ? '/(tabs)/profile' : null, // Show only when authenticated
        }}
      />
      {/* Hide unused tabs */}
      <Tabs.Screen
        name="index.v2"
        options={{
          href: null, // This hides the tab
        }}
      />
      <Tabs.Screen
        name="exploreReal"
        options={{
          href: null, // This hides the tab
        }}
      />
    </Tabs>
  );
}
