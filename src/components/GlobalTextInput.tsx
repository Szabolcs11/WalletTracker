import React from 'react';
import {TextInput, View} from 'react-native';
import {InputStyle} from '../style';
import {GlobalTextInputProps} from '../types';

export default function GlobalTextInput({
  inputMode,
  onChangeText,
  placeholder,
  value,
}: GlobalTextInputProps) {
  return (
    <View>
      <TextInput
        inputMode={inputMode}
        placeholder={placeholder}
        value={value.toString()}
        onChangeText={text => {
          const parsedValue = parseFloat(text);
          if (!isNaN(parsedValue)) {
            onChangeText(parsedValue);
          } else {
            onChangeText(0);
          }
        }}
        style={InputStyle}
      />
    </View>
  );
}
