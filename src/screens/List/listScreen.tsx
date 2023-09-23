import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {formatDate} from '../../config/globalFunctions';
import {palette, spacing} from '../../style';
import {SpendingType} from '../../types';
import {getSpendings} from '../../util/storage';
import {FlatListItemStyle, ItemTextStyle} from './listScreenStyle';

export let updateList: () => void;

export default function ListScreen() {
  const [spendings, setSpendings] = useState<SpendingType[]>([]);

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

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        ListScreen
      </Text>
      <View style={{marginVertical: spacing.double}}>
        <FlatList
          inverted
          contentContainerStyle={{
            alignItems: 'center',
            width: '100%',
          }}
          data={spendings}
          renderItem={({item}) => {
            return (
              <View key={item.date} style={FlatListItemStyle}>
                <Text style={ItemTextStyle}>{item.category}</Text>
                <Text style={ItemTextStyle}>{item.amount}</Text>
                <Text style={ItemTextStyle}>{formatDate(item.date)}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
