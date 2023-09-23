import React, {useState} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import GlobalTextInput from '../../components/GlobalTextInput';
import {RESPONSES, TEXTS} from '../../config/texts';
import {InputStyle, palette, spacing} from '../../style';
import {addSpending, clearAllSpending} from '../../util/storage';
import {showToast} from '../../util/toast';
import DatePicker from 'react-native-date-picker';
import {updateList} from '../List/listScreen';
import DropDownPicker from 'react-native-dropdown-picker';
import {CATEGORIES} from '../../config/constans';
import {sortDataForPie} from '../Statistics/statisticsScreen';

export default function HomeScreen() {
  const [name, setName] = useState<string>('');
  const [amout, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [dateModalState, setDateModalState] = useState(false);

  const [drodownModalState, setDropdownModalState] = useState(false);
  const [categoryValue, setcategoryValue] = useState(null);

  const resetInputs = () => {
    setName('');
    setAmount(0);
    setDate(new Date());
  };

  const handleAddNewItem = () => {
    if (categoryValue == null) {
      showToast('error', RESPONSES.FILL_THE_NAME);
      return;
    }
    if (amout.toString().trim().length <= 1) {
      showToast('error', RESPONSES.FILL_THE_AMOUNT);
      return;
    }
    addSpending(categoryValue, amout, date.toString());
    showToast('success', RESPONSES.SUCCESSFULLY_ADDED_SPENDING);
    Keyboard.dismiss();
    resetInputs();
    if (updateList) {
      updateList();
    }
    if (sortDataForPie) {
      sortDataForPie();
    }
    // handleGetSpendings();
  };

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        Wallet Tracker
      </Text>
      {/* <Text>{CURRENCY_API_URL}</Text> */}
      <View style={{marginVertical: spacing.double}}>
        <View style={{marginVertical: spacing.single}}>
          {/* <GlobalTextInput
            placeholder={TEXTS.NAME}
            onChangeText={e => setName(e)}
          /> */}
          <DropDownPicker
            style={[InputStyle]}
            placeholder="Válasz kategóriát"
            open={drodownModalState}
            value={categoryValue}
            items={CATEGORIES}
            setOpen={setDropdownModalState}
            setValue={setcategoryValue}
          />
        </View>
        <View style={{marginVertical: spacing.single}}>
          <GlobalTextInput
            inputMode="decimal"
            placeholder={TEXTS.AMOUNT}
            onChangeText={e => setAmount(Number(e))}
          />
        </View>
        <View style={{marginVertical: spacing.single}}>
          <TouchableOpacity
            onPress={() => setDateModalState(!dateModalState)}
            style={InputStyle}>
            <Text>{new Date(date).toLocaleDateString()}</Text>
            <DatePicker
              modal
              open={dateModalState}
              date={date}
              onConfirm={date => {
                setDateModalState(false);
                setDate(date);
              }}
              onCancel={() => {
                setDateModalState(false);
              }}
            />
          </TouchableOpacity>
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
