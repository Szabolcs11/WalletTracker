import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {DeleteSpendingModalStyle} from '../screens/List/listScreenStyle';
import {TEXTS} from '../config/texts';
import {DeleteModalProps} from '../types';
import {palette} from '../style';

export default function DeleteModal({
  deleteItem,
  closeModal,
}: DeleteModalProps) {
  return (
    <View style={DeleteSpendingModalStyle.background}>
      <View style={DeleteSpendingModalStyle.modal}>
        <Text style={DeleteSpendingModalStyle.title}>
          {TEXTS.ARE_YOU_SURE_TO_DELETE}
        </Text>
        <View style={DeleteSpendingModalStyle.buttoncontainer}>
          <TouchableOpacity
            onPress={() => deleteItem()}
            style={[
              DeleteSpendingModalStyle.button,
              {backgroundColor: palette.primary},
            ]}>
            <Text style={DeleteSpendingModalStyle.buttontext}>{TEXTS.YES}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => closeModal()}
            style={[
              DeleteSpendingModalStyle.button,
              {backgroundColor: palette.red},
            ]}>
            <Text style={DeleteSpendingModalStyle.buttontext}>{TEXTS.NO}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
