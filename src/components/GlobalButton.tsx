import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ButtonStyle} from '../style';
import {GlobalButtonProps} from '../types';

export default function GlobalButton({callback, label}: GlobalButtonProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        callback();
      }}
      style={ButtonStyle.buttom}>
      <Text style={ButtonStyle.text}>{label}</Text>
    </TouchableOpacity>
  );
}
