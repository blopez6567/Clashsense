import { useEffect } from 'react';
import { Tabs } from 'expo-router/tabs';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Home, Settings, FileText, Users } from 'lucide-react-native';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
          }}
        />
        <Tabs.Screen
          name="solutions"
          options={{
            title: 'Solutions',
            tabBarIcon: ({ color, size }) => <Users size={size} color={color} />
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            title: 'Resources',
            tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </>
  );
}