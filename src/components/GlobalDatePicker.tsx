import {Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {InputStyle} from '../style';
import DatePicker from 'react-native-date-picker';
import {GlobalDatePickerProps} from '../types';

export default function GlobalDatePicker({date, onChange}: GlobalDatePickerProps) {
  const [dateModalState, setDateModalState] = useState<boolean>(false);
  return (
    <TouchableOpacity onPress={() => setDateModalState(!dateModalState)} style={InputStyle}>
      <Text>{new Date(date).toLocaleDateString()}</Text>
      <DatePicker
        modal
        open={dateModalState}
        date={new Date(date)}
        onConfirm={date => {
          setDateModalState(false);
          onChange(date);
        }}
        onCancel={() => {
          setDateModalState(false);
        }}
      />
    </TouchableOpacity>
  );
}
