import React, {useState} from 'react';
import {Keyboard, Text, TouchableOpacity, View} from 'react-native';
import GlobalTextInput from '../../components/GlobalTextInput';
import {RESPONSES, TEXTS} from '../../config/texts';
import {InputStyle, palette, spacing} from '../../style';
import {addSpending} from '../../util/storage';
import {showToast} from '../../util/toast';
import DatePicker from 'react-native-date-picker';

export default function HomeScreen() {
  const [name, setName] = useState<string>('');
  const [amout, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [dateModalState, setDateModalState] = useState(false);

  const resetInputs = () => {
    setName('');
    setAmount(0);
    setDate(new Date());
  };

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
    resetInputs();
    // handleGetSpendings();
  };

  return (
    <View style={{padding: spacing.double}}>
      <Text style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
        Wallet Tracker
      </Text>
      <View style={{marginVertical: spacing.double}}>
        <View style={{marginVertical: spacing.single}}>
          <GlobalTextInput
            placeholder={TEXTS.NAME}
            onChangeText={e => setName(e)}
          />
        </View>
        <View style={{marginVertical: spacing.single}}>
          <GlobalTextInput
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
