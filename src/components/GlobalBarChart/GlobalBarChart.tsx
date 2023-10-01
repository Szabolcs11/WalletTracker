import React from 'react';
import {View} from 'react-native';
import {spacing} from '../../style';
import {BarChartProps} from '../../types';
import Bar from './Components/Bar';
import {BarChartStyle} from './GlobalBarChartStyle';

export default function GlobalBarChart({data}: BarChartProps) {
  if (data.length == 0) {
    return <></>;
  }
  const maxDataValue = data.reduce((max, item) => {
    return Math.max(max, item.Spendings);
  }, 0);

  return (
    <View style={[BarChartStyle.background, {height: 300}]}>
      <View style={BarChartStyle.container}>
        {data.map((e, index) => {
          return (
            <Bar
              key={index}
              height={(e.Spendings / maxDataValue) * 100 - spacing.half}
              day={e.Day}
              date={e.Date}
              index={index}
              value={e.Spendings}
            />
          );
        })}
      </View>
    </View>
  );
}
