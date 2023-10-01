import React from 'react';
import {Text, View} from 'react-native';
import {BarComponentProps} from '../../../types';
import {BarChartStyle} from './../GlobalBarChartStyle';

export default function Bar({
  value,
  day,
  height,
  date,
  index,
}: BarComponentProps) {
  return (
    <View style={[BarChartStyle.bar, {height: `${height}%`}]}>
      <View
        style={[
          BarChartStyle.bardatacontainer,
          {bottom: index % 2 == 0 ? -40 : -80},
        ]}>
        <Text>{day}</Text>
        <Text>{date}</Text>
      </View>
      <View style={BarChartStyle.barvaluecontainer}>
        <Text>{value}</Text>
      </View>
    </View>
  );
}
