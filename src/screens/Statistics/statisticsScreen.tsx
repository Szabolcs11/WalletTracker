import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {spacing} from '../../style';
import {getSpendings} from '../../util/storage';
import {SpendingType} from './../../types/index';

const screenWidth = Dimensions.get('window').width;

export let sortDataForPie: () => void;

export default function StatisticsScreen() {
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };
  const [sortedData, setSortedData] = useState([]);
  // const data = {
  //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //       color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  //   legend: ['Rainy Days'], // optional
  // };
  useEffect(() => {
    sortDataForPie();
  }, []);

  sortDataForPie = () => {
    const spendings = getSpendings();
    const categoryAmounts: any = {};
    spendings.forEach((item: SpendingType) => {
      const {category, amount} = item;
      if (categoryAmounts[category]) {
        categoryAmounts[category] += amount;
      } else {
        categoryAmounts[category] = amount;
      }
    });
    const sortedCategories = Object.keys(categoryAmounts).map(category => ({
      category,
      color:
        category == 'Élelmiszer'
          ? '#e74645'
          : category == 'Alkohol'
          ? '#fb7756'
          : category == 'Szükségletek'
          ? '#facd60'
          : category == 'Utazás'
          ? '#1ac0c6'
          : '#000',
      legendFontColor:
        category == 'Élelmiszer'
          ? '#e74645'
          : category == 'Alkohol'
          ? '#fb7756'
          : category == 'Szükségletek'
          ? '#facd60'
          : category == 'Utazás'
          ? '#1ac0c6'
          : '#000',
      totalAmount: categoryAmounts[category],
      name: category,
    }));

    sortedCategories.sort((a, b) => a.category.localeCompare(b.category));
    setSortedData(sortedCategories);
  };

  const data2 = [
    {
      name: 'Seoul',
      population: 21500000,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Toronto',
      population: 2800000,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Beijing',
      population: 527612,
      color: 'yellow',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  return (
    <View>
      <Text>StatisticsScreen</Text>
      {/* <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      /> */}
      <PieChart
        data={sortedData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        accessor={'totalAmount'}
        backgroundColor={'transparent'}
        paddingLeft={String(spacing.single)}
        center={[0, 0]}
        absolute
      />
    </View>
  );
}
