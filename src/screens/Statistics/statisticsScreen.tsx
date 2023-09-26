import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {palette, spacing} from '../../style';
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

  useEffect(() => {
    sortDataForPie();
  }, []);

  sortDataForPie = () => {
    const spendings = getSpendings();
    console.log(spendings);
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

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        Statistics
      </Text>
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

// import React, {useEffect, useState} from 'react';
// import {Dimensions, Text, View} from 'react-native';
// import {LineChart, PieChart} from 'react-native-chart-kit';
// import {palette, spacing} from '../../style';
// import {getSpendings} from '../../util/storage';
// import {SpendingType} from './../../types/index';

// const screenWidth = Dimensions.get('window').width;

// export let sortDataForPie: () => void;

// export default function StatisticsScreen() {
//   const chartConfig = {
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//   };
//   const [sortedData, setSortedData] = useState([]);

//   useEffect(() => {
//     sortDataForPie();
//   }, []);

//   sortDataForPie = () => {
//     const spendings = getSpendings();
//     console.log(spendings);
//     const categoryAmounts: any = {};
//     spendings.forEach((item: SpendingType) => {
//       const {category, amount} = item;
//       if (categoryAmounts[category]) {
//         categoryAmounts[category] += amount;
//       } else {
//         categoryAmounts[category] = amount;
//       }
//     });
//     const sortedCategories = Object.keys(categoryAmounts).map(category => ({
//       category,
//       color:
//         category == 'Élelmiszer'
//           ? '#e74645'
//           : category == 'Alkohol'
//           ? '#fb7756'
//           : category == 'Szükségletek'
//           ? '#facd60'
//           : category == 'Utazás'
//           ? '#1ac0c6'
//           : '#000',
//       legendFontColor:
//         category == 'Élelmiszer'
//           ? '#e74645'
//           : category == 'Alkohol'
//           ? '#fb7756'
//           : category == 'Szükségletek'
//           ? '#facd60'
//           : category == 'Utazás'
//           ? '#1ac0c6'
//           : '#000',
//       totalAmount: categoryAmounts[category],
//       name: category,
//     }));

//     sortedCategories.sort((a, b) => a.category.localeCompare(b.category));
//     setSortedData(sortedCategories);
//   };

//   return (
//     <View style={{padding: spacing.double}}>
//       <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
//         Statistics
//       </Text>
//       <PieChart
//         data={sortedData}
//         width={screenWidth}
//         height={220}
//         chartConfig={chartConfig}
//         accessor={'totalAmount'}
//         backgroundColor={'transparent'}
//         paddingLeft={String(spacing.single)}
//         center={[0, 0]}
//         absolute
//       />
//     </View>
//   );
// }
