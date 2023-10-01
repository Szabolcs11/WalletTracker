import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import GlobalBarChart from '../../components/GlobalBarChart/GlobalBarChart';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import {TEXTS} from '../../config/texts';
import {palette, spacing} from '../../style';
import {
  getWeeksWithSpending,
  getWeeklySpendings,
  getTotalSpending,
} from '../../util/formatSpendings';
import {getSpendings} from '../../util/storage';
import {BarChartType, SpendingType} from './../../types/index';
import {PieChart} from 'react-native-chart-kit';

export let updateCharts: () => void;

export default function StatisticsScreen() {
  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
  };
  const [sortedData, setSortedData] = useState([]);
  const [weeks, setWeeks] = useState<string[]>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(
    TEXTS.SELECT_DATE,
  );
  const [selectedData, setSelectedData] = useState<BarChartType[]>([]);
  const [amountSpentInWeek, setAmountSpentInWeek] = useState<number>(-1);
  const [totalAmountSpent, setTotalAmountSpent] = useState<number>(-1);

  useEffect(() => {
    updateCharts();
    let total = getTotalSpending();
    setTotalAmountSpent(total);
  }, []);

  useEffect(() => {
    dropDownValueChanges(selectedDropdownValue);
  }, [selectedDropdownValue]);

  const dropDownValueChanges = (value: string) => {
    if (value == TEXTS.SELECT_DATE) {
      setSelectedData([]);
      setAmountSpentInWeek(-1);
      return;
    }
    let {spendingByDay, spentInWeek} = getWeeklySpendings(
      selectedDropdownValue,
    );
    setSelectedData(spendingByDay);
    setAmountSpentInWeek(spentInWeek);
  };

  updateCharts = () => {
    let weeks = getWeeksWithSpending();
    setWeeks(weeks);
    getPieChartData();
    dropDownValueChanges(selectedDropdownValue);
  };

  const getPieChartData = () => {
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

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        Statistics
      </Text>
      <View style={{marginVertical: spacing.double}}>
        <GlobalDropDownPicker
          datas={weeks}
          placeholder={TEXTS.SELECT_DATE}
          setValue={setSelectedDropdownValue}
          value={selectedDropdownValue}
        />
        {/* <PieChart
          data={sortedData}
          width={300}
          height={220}
          chartConfig={chartConfig}
          accessor={'totalAmount'}
          backgroundColor={'transparent'}
          paddingLeft={String(spacing.single)}
          center={[0, 0]}
          absolute
        /> */}
        <View style={{marginVertical: spacing.double}}>
          <GlobalBarChart data={selectedData} />
        </View>
        {amountSpentInWeek != -1 ? (
          <View>
            <Text style={{fontWeight: '600', marginVertical: spacing.half}}>
              A héten elköltött: {amountSpentInWeek} HUF
            </Text>
            <Text style={{fontWeight: '600', marginVertical: spacing.half}}>
              Összesen elköltött {totalAmountSpent} HUF
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
