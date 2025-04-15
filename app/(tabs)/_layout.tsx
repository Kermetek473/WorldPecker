import React from 'react';
import { Tabs } from 'expo-router';
import { 
  Home, 
  Book, 
  Play, 
  BarChart, 
  Settings,
  LucideIcon
} from 'lucide-react-native';
import { useTheme } from '@/context/theme-context';

interface TabBarIconProps {
  Icon: LucideIcon;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ Icon, color, size }) => {
  return <Icon size={size} color={color} />;
};

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={Home} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Listeler',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={Book} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Sözlük',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={Book} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Oyun',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={Play} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'İlerleme',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={BarChart} color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ayarlar',
          tabBarIcon: ({ color, size }) => <TabBarIcon Icon={Settings} color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}