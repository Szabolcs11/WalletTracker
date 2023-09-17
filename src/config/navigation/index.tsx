import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback} from 'react';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import HomeScreen from '../../screens/Home/homeScreen';
import ListScreen from '../../screens/List/listScreen';
import StatisticsScreen from '../../screens/Statistics/statisticsScreen';
import {palette, spacing} from '../../style';
import {TabNavigatorParamsList} from '../../types';
import {SCREENS} from '../constans';
import {navigationRef} from './settings';

export default function index() {
  const Tab = createBottomTabNavigator<TabNavigatorParamsList>();

  const renderTabIcon = (route: any, focused: boolean) => {
    let iconName: string;
    let iconColor: string;
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? 'home' : 'home-outline';
        iconColor = focused ? palette.white : palette.gray;
        break;
      case SCREENS.LIST:
        iconName = focused ? 'list' : 'list-outline';
        iconColor = focused ? palette.white : palette.gray;
        break;
      case SCREENS.STATISTICS:
        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        iconColor = focused ? palette.white : palette.gray;
        break;
      default:
        iconName = 'home';
        iconColor = focused ? palette.white : palette.gray;
        break;
    }
    return <Icon type={IconType.Ionicons} color={iconColor} name={iconName} />;
  };

  const RenderTabNavigation = useCallback((a: any) => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => renderTabIcon(route, focused),
          tabBarActiveTintColor: palette.white,
          tabBarInactiveTintColor: palette.gray,
          tabBarActiveBackgroundColor: palette.primary,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarItemStyle: {
            borderRadius: spacing.double,
          },
          tabBarStyle: {
            borderTopLeftRadius: spacing.double,
            borderTopRightRadius: spacing.double,
          },
        })}>
        <Tab.Screen name={'Home'} component={HomeScreen} />
        <Tab.Screen name={'List'} component={ListScreen} />
        <Tab.Screen name={'Statistics'} component={StatisticsScreen} />
      </Tab.Navigator>
    );
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RenderTabNavigation />
    </NavigationContainer>
  );
}
