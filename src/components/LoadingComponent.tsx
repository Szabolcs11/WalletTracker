import {View, Text, ActivityIndicator, Dimensions} from 'react-native';
import React from 'react';
import {palette} from '../style';

const {width, height} = Dimensions.get('screen');

export default function LoadingComponent() {
  return (
    <View
      style={{width, height, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} color={palette.primary} />
    </View>
  );
}
