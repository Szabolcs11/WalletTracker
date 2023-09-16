import {
  CardStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionPresets,
} from '@react-navigation/stack';
import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {TabNavigatorParamsList} from './../../types';

export const navigationRef =
  React.createRef<NavigationContainerRef<TabNavigatorParamsList>>();

export function navigate<T extends keyof TabNavigatorParamsList>(
  name: T,
  params: TabNavigatorParamsList[T],
) {
  // @ts-ignore
  navigationRef.current?.navigate(name, params);
}

export const modalOption = {
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyleInterpolator: (props: StackCardInterpolationProps) => ({
    ...CardStyleInterpolators.forVerticalIOS(props),
    overlayStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
      }),
    },
  }),
} as StackNavigationOptions;

export const basicScreenPreset = {
  textAlign: 'center',
  drawerInactiveTintColor: 'white',
  gestureEnabled: true,
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  ...TransitionPresets.SlideFromRightIOS,
  cardStyleInterpolator: (props: StackCardInterpolationProps) => ({
    ...CardStyleInterpolators.forHorizontalIOS(props),
    overlayStyle: {
      opacity: props.current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
      }),
    },
  }),
} as StackNavigationOptions;
