import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {formatDate} from '../../config/globalFunctions';
import {palette, spacing} from '../../style';
import {SpendingType} from '../../types';
import {deleteSpending, getSpendings} from '../../util/storage';
import {
  DeleteSpendingModalStyle,
  FlatListItemStyle,
  ItemTextStyle,
} from './listScreenStyle';
import {TEXTS} from '../../config/texts';
import {sortDataForPie} from '../Statistics/statisticsScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';

export let updateList: () => void;

export default function ListScreen() {
  const [spendings, setSpendings] = useState<SpendingType[]>([]);
  const [showDeleteSpendingModal, setShowDeleteSpendingModal] =
    useState<boolean>(false);
  const [selectedSpendingId, setSelectedSpendingId] = useState<string>('');
  const [datas, setDatas] = useState<any>();

  updateList = () => {
    handleGetSpendings();
  };

  const handleGetSpendings = () => {
    let tempspending = getSpendings();
    setSpendings(tempspending);
  };

  useEffect(() => {
    handleGetSpendings();
  }, []);

  const handleDeleteItem = () => {
    deleteSpending(selectedSpendingId);
    setSpendings(prev => prev.filter(e => e.id != selectedSpendingId));
    setSelectedSpendingId('');
    setShowDeleteSpendingModal(false);
    if (sortDataForPie) {
      sortDataForPie();
    }
  };

  const getWeekStartDate = (date: any) => {
    const dayOfWeek = date.getUTCDay();
    // const daysUntilMonday = (dayOfWeek + 7 - 1) % 7; // Calculate days until Monday
    const daysUntilSunday = (dayOfWeek + 6) % 7; // Calculate days until Sunday
    const weekStartDate = new Date(date);
    weekStartDate.setUTCDate(date.getUTCDate() - daysUntilSunday);
    return weekStartDate;
  };

  // const getWeekStartDate = (date: any) => {
  //   const dayOfWeek = date.getUTCDay();
  //   const daysUntilMonday = (7 - (dayOfWeek === 0 ? 6 : dayOfWeek - 1)) % 7; // Calculate days until Monday
  //   const weekStartDate = new Date(date);
  //   weekStartDate.setUTCDate(date.getUTCDate() - daysUntilMonday);
  //   return weekStartDate;
  // };

  function displayWeeks() {
    console.log(spendings);
    let data = spendings;
    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    let currentWeekStart = getWeekStartDate(new Date(data[0].date));

    let all = [];

    while (currentWeekStart <= new Date(data[data.length - 1].date)) {
      const nextWeekStart = new Date(currentWeekStart);
      nextWeekStart.setDate(currentWeekStart.getDate() + 6); // Get the end of the week
      const weekRange = `${currentWeekStart.toISOString().split('T')[0]} - ${
        nextWeekStart.toISOString().split('T')[0]
      }`;
      const weekData = data.filter(item => {
        const itemDate = new Date(item.date);
        return (
          (itemDate >= currentWeekStart && itemDate <= nextWeekStart) ||
          (itemDate < nextWeekStart && itemDate >= currentWeekStart)
        );
      });

      let items = [];

      weekData.forEach(item => {
        items.push({
          date: item.date,
          amount: item.amount,
          category: item.category,
          id: item.id,
        });
      });
      all.push({weekRange, items});

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
    // console.log(all);
    console.log(JSON.stringify(all, null, 2));

    setDatas(all);
  }
  useEffect(() => {
    if (spendings.length > 0) {
      displayWeeks();
    }
  }, [spendings]);

  return (
    <>
      {showDeleteSpendingModal ? (
        <View style={DeleteSpendingModalStyle.background}>
          <View style={DeleteSpendingModalStyle.modal}>
            <Text style={DeleteSpendingModalStyle.title}>
              {TEXTS.ARE_YOU_SURE_TO_DELETE}
            </Text>
            <View style={DeleteSpendingModalStyle.buttoncontainer}>
              <TouchableOpacity
                onPress={() => handleDeleteItem()}
                style={[
                  DeleteSpendingModalStyle.button,
                  {backgroundColor: palette.primary},
                ]}>
                <Text style={DeleteSpendingModalStyle.buttontext}>
                  {TEXTS.YES}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowDeleteSpendingModal(false)}
                style={[
                  DeleteSpendingModalStyle.button,
                  {backgroundColor: palette.red},
                ]}>
                <Text style={DeleteSpendingModalStyle.buttontext}>
                  {TEXTS.NO}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      <View style={{padding: spacing.double}}>
        <Text
          style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
          ListScreen
        </Text>
        <View>{/* <DropDownPicker open={true} items={} /> */}</View>
        <View style={{marginVertical: spacing.double}}>
          <FlatList
            // inverted
            contentContainerStyle={{
              alignItems: 'center',
              width: '100%',
            }}
            data={datas}
            renderItem={({item}) => {
              return (
                <>
                  <View key={String(uuid.v4())}>
                    <Text>{item.weekRange}</Text>
                  </View>
                  <View>
                    {item.items.map((e: any) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedSpendingId(e.id);
                            setShowDeleteSpendingModal(true);
                          }}
                          key={e.id}
                          style={FlatListItemStyle}>
                          <Text style={ItemTextStyle}>{e.category}</Text>
                          <Text style={ItemTextStyle}>{e.amount}</Text>
                          <Text style={ItemTextStyle}>
                            {formatDate(e.date)}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </>
              );
            }}
          />
        </View>
      </View>
    </>
  );
}
