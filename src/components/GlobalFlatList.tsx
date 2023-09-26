import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import {
  FlatListItemStyle,
  ItemTextStyle,
} from '../screens/List/listScreenStyle';
import {formatDate} from '../config/globalFunctions';
import {GlobalFlatListProps} from '../types';
import {spacing} from '../style';

export default function GlobalFlatList({
  data,
  selectItem,
}: GlobalFlatListProps) {
  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
        width: '100%',
      }}
      style={{
        marginVertical: spacing.double,
        maxHeight: '86%',
      }}
      showsVerticalScrollIndicator={false}
      data={data}
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
                      selectItem(e.id);
                    }}
                    key={e.id}
                    style={FlatListItemStyle}>
                    <Text style={ItemTextStyle}>{e.category}</Text>
                    <Text style={ItemTextStyle}>{e.amount}</Text>
                    <Text style={ItemTextStyle}>{formatDate(e.date)}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        );
      }}
    />
  );
}
