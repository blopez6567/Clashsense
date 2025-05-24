import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Home, FolderOpen, GitMerge, Settings } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e5e5',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="projects"
          options={{
            title: 'Projects',
            tabBarIcon: ({ color, size }) => (
              <FolderOpen size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="clashes"
          options={{
            title: 'Clashes',
            tabBarIcon: ({ color, size }) => (
              <GitMerge size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Settings size={size} color={color} />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}