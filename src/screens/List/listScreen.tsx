import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {formatDate} from '../../config/globalFunctions';
import {palette, spacing} from '../../style';
import {SpendingType} from '../../types';
import {getSpendings} from '../../util/storage';
import {FlatListItemStyle} from './listScreenStyle';

export default function ListScreen() {
  const [spendings, setSpendings] = useState<SpendingType[]>([]);

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
          contentContainerStyle={{
            alignItems: 'center',
            width: '100%',
          }}
          data={spendings}
          renderItem={({item}) => {
            return (
              <View key={item.name} style={FlatListItemStyle}>
                <Text style={{color: palette.white}}>{item.name}</Text>
                <Text style={{color: palette.white}}>{item.amount}</Text>
                <Text style={{color: palette.white}}>
                  {formatDate(item.date)}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
