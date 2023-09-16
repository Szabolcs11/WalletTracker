import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {RESPONSES, TEXTS} from '../../config/texts';
import {palette, spacing} from '../../style';
import {SpendingType} from '../../types';
import {addSpending, getSpendings} from '../../util/storage';
import {showToast} from '../../util/toast';

export default function HomeScreen() {
  // const [spendings, setSpendings] = useState<SpendingType[]>(getSpendings());
  const [spendings, setSpendings] = useState<SpendingType[]>([]);
  console.log(spendings);
  const inputRef = useRef(null);
  const [name, setName] = useState<string>('');
  const [amout, setAmount] = useState<number>(0);

  const handleGetSpendings = () => {
    let tempspending = getSpendings();
    setSpendings(tempspending);
  };

  useEffect(() => {
    handleGetSpendings();
  }, []);

  const handleAddNewItem = () => {
    console.log(name);
    console.log(amout);
    if (name.trim().length <= 3) {
      showToast('error', RESPONSES.FILL_THE_NAME);
      return;
    }
    if (amout.toString().trim().length <= 1) {
      showToast('error', RESPONSES.FILL_THE_AMOUNT);
      return;
    }
    addSpending(name, amout);
    showToast('success', RESPONSES.SUCCESSFULLY_ADDED_SPENDING);
    Keyboard.dismiss();
    handleGetSpendings();
  };

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center'}}>Wallet Tracker</Text>

      <View>
        {spendings.map((e: SpendingType) => {
          return (
            <View key={e.name}>
              <Text>{e.name}</Text>
              <Text>{e.amount}</Text>
            </View>
          );
        })}
      </View>
      <View style={{marginVertical: spacing.double}}>
        <View style={{marginVertical: spacing.single}}>
          <TextInput
            onChangeText={e => {
              setName(e);
            }}
            style={{
              borderRadius: spacing.single,
              borderWidth: 2,
              padding: spacing.single,
            }}
            placeholder={TEXTS.NAME}
            ref={inputRef}
          />
        </View>
        <View style={{marginVertical: spacing.single}}>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={e => {
              setAmount(Number(e) || 0);
            }}
            style={{
              borderRadius: spacing.single,
              borderWidth: 2,
              padding: spacing.single,
            }}
            placeholder={TEXTS.AMOUNT}
            ref={inputRef}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleAddNewItem();
        }}
        style={{
          backgroundColor: palette.primary,
          borderRadius: spacing.single,
          margin: spacing.double,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: palette.white,
            paddingVertical: spacing.single,
            paddingHorizontal: spacing.triple,
            fontSize: 16,
            fontWeight: '500',
          }}>
          {TEXTS.ADD_NEW_ITEM}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
