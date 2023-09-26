import React from 'react';
import {InputModeOptions, TextInput, View} from 'react-native';
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
        value={value}
        onChangeText={onChangeText}
        style={InputStyle}
      />
    </View>
  );
}
