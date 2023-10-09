import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import GlobalBarChart from '../../components/GlobalBarChart/GlobalBarChart';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import {TEXTS} from '../../config/texts';
import {Container, TitleStyle, palette, spacing} from '../../style';
import {
  getPieChartDataInWeek,
  getTotalSpending,
  getWeeklySpendings,
  getWeeksWithSpending,
} from '../../util/formatSpendings';
import {BarChartType, PieChartDataType} from './../../types/index';
import LoadingComponent from '../../components/LoadingComponent';

export let updateCharts: () => void;

export default function StatisticsScreen() {
  const [weeks, setWeeks] = useState<string[]>([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>(TEXTS.SELECT_DATE);
  const [pieChartData, setPieChartData] = useState<PieChartDataType[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartType[]>([]);
  const [amountSpentInWeek, setAmountSpentInWeek] = useState<number>(-1);
  const [totalAmountSpent, setTotalAmountSpent] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    updateCharts();
    getTotalSpendings();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dropDownValueChanges(selectedDropdownValue);
  }, [selectedDropdownValue]);

  const dropDownValueChanges = (value: string) => {
    if (value == TEXTS.SELECT_DATE) {
      setBarChartData([]);
      setAmountSpentInWeek(-1);
      return;
    }
    setIsLoading(true);
    let {spendingByDay, spentInWeek} = getWeeklySpendings(selectedDropdownValue);
    setBarChartData(spendingByDay);
    setAmountSpentInWeek(spentInWeek);
    getPieChartData(selectedDropdownValue);
    getTotalSpendings();
    setIsLoading(false);
  };

  const getTotalSpendings = () => {
    let total = getTotalSpending();
    setTotalAmountSpent(total);
  };

  updateCharts = () => {
    let weeks = getWeeksWithSpending();
    setWeeks(weeks);
    if (weeks.length == 0) {
      dropDownValueChanges(TEXTS.SELECT_DATE);
      setPieChartData([]);
    } else {
      dropDownValueChanges(selectedDropdownValue);
    }
  };

  const getPieChartData = (weekRange: string) => {
    let data = getPieChartDataInWeek(weekRange);
    setPieChartData(data);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView style={Container}>
      <Text style={TitleStyle}>{TEXTS.STATISTICS}</Text>
      <View style={{marginVertical: spacing.double}}>
        <GlobalDropDownPicker
          adddefaultitem={false}
          datas={weeks}
          placeholder={TEXTS.SELECT_DATE}
          setValue={setSelectedDropdownValue}
          value={selectedDropdownValue}
        />
        <View style={{marginVertical: spacing.double}}>
          <GlobalBarChart data={barChartData} />
        </View>
        <View
          style={{
            marginVertical: spacing.double,
            backgroundColor: pieChartData.length != 0 ? palette.white : undefined,
            borderRadius: spacing.single,
          }}>
          <PieChart
            data={pieChartData}
            width={330}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2,
            }}
            accessor={'totalAmount'}
            backgroundColor={'transparent'}
            paddingLeft={String(spacing.single)}
            center={[0, 0]}
            absolute
          />
        </View>
        {amountSpentInWeek != -1 ? (
          <View style={{marginBottom: spacing.double}}>
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
    </ScrollView>
  );
}
