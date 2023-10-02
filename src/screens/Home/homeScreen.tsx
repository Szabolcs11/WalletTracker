import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import GlobalButton from '../../components/GlobalButton';
import GlobalDatePicker from '../../components/GlobalDatePicker';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import GlobalTextInput from '../../components/GlobalTextInput';
import {CATEGORIES} from '../../config/constans';
import {RESPONSES, TEXTS} from '../../config/texts';
import {palette, spacing} from '../../style';
import {addSpending} from '../../util/storage';
import {showToast} from '../../util/toast';
import {updateList} from '../List/listScreen';
import {updateCharts} from '../Statistics/statisticsScreen';

export default function HomeScreen() {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [categoryValue, setcategoryValue] = useState<string>('');

  const resetInputs = () => {
    setAmount(0);
    setDate(new Date());
  };

  const handleAddNewItem = () => {
    if (categoryValue == null) {
      showToast('error', RESPONSES.FILL_THE_NAME);
      return;
    }
    if (amount.toString().trim().length <= 1) {
      showToast('error', RESPONSES.FILL_THE_AMOUNT);
      return;
    }
    addSpending(categoryValue, amount, date.toString());
    showToast('success', RESPONSES.SUCCESSFULLY_ADDED_SPENDING);
    Keyboard.dismiss();
    resetInputs();
    if (updateList) {
      updateList();
    }
    if (updateCharts) {
      updateCharts();
    }
  };

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        Wallet Tracker
      </Text>
      <View style={{marginVertical: spacing.double, gap: spacing.double}}>
        <GlobalDropDownPicker
          adddefaultitem
          datas={CATEGORIES}
          setValue={setcategoryValue}
          value={categoryValue}
          placeholder={TEXTS.SELECT_ITEM}
        />
        <GlobalTextInput
          inputMode="numeric"
          placeholder={TEXTS.AMOUNT}
          value={amount}
          onChangeText={setAmount}
        />
        <GlobalDatePicker
          date={date}
          onChange={(date: Date = new Date()) => setDate(date)}
        />
      </View>
      <GlobalButton
        label={TEXTS.ADD_NEW_ITEM}
        callback={() => handleAddNewItem()}
      />
    </View>
  );
}
