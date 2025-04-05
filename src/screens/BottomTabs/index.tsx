import { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useListenUserUpdate } from '@/features/auth';
import { useAppNavigation, useTheme } from '@/hooks';

import DashboardScreen from './DashboardScreen';
import StatisticsScreen from './StatisticsScreen';
import ProfileScreen from './ProfileScreen';

import { RootStackParamList } from '..';

export type BottomTabsStackParamList = {
  Dashboard: undefined;
  Statistics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsStackParamList>();

const BottomTabs = () => {
  const { theme } = useTheme();
  const navigation = useAppNavigation<RootStackParamList>();
  const { isInitializing, user } = useListenUserUpdate();

  useEffect(() => {
    if (!isInitializing && !user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      });
    }
  }, [isInitializing, user]);

  const getTabBarIcon = useCallback(
    (IconComponent: typeof FontAwesome, iconName: string) =>
      ({ focused }: { focused: boolean }) =>
        (
          <IconComponent
            name={iconName}
            size={22}
            color={focused ? theme.colors.primary : theme.colors.onSurface}
          />
        ),
    [theme]
  );

  const getTabBarLabel = useCallback(
    (label: string) =>
      ({ focused }: { focused: boolean }) =>
        (
          <Text
            variant="labelSmall"
            style={{
              color: focused ? theme.colors.primary : theme.colors.onSurface,
            }}
          >
            {label}
          </Text>
        ),
    [theme]
  );

  if (isInitializing) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: getTabBarIcon(FontAwesome, 'home'),
          tabBarLabel: getTabBarLabel('Dashboard'),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarIcon: getTabBarIcon(AntDesign, 'barschart'),
          tabBarLabel: getTabBarLabel('Statistics'),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: getTabBarIcon(AntDesign, 'user'),
          tabBarLabel: getTabBarLabel('Profile'),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabs;
