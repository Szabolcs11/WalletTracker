import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigatorParamsList} from '../../types';
import {SCREENS} from '../constans';
import Icon, {IconType} from 'react-native-dynamic-vector-icons';
import HomeScreen from '../../screens/Home/homeScreen';
import ListScreen from '../../screens/List/listScreen';
import {palette, spacing} from '../../style';
import StatisticsScreen from '../../screens/Statistics/statisticsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './settings';

export default function index() {
  const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName: string;
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? 'home' : 'home-outline';
        break;
      case SCREENS.LIST:
        iconName = focused ? 'list' : 'list-outline';
        break;
      case SCREENS.STATISTICS:
        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
        break;
      default:
        iconName = 'home';
        break;
    }
    return <Icon type={IconType.Ionicons} name={iconName} />;
  };

  const RenderTabNavigation = useCallback((a: any) => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon(route, focused, color, size),
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
