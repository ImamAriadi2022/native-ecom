import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useAuth } from '@/contexts/AuthContext';

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
          tabBarIcon: ({ color }) => <IconSymbol size={26} name="bag.fill" color={color} />,
          href: isAuthenticated ? '/(tabs)/cart' : null, // Show only when authenticated
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
