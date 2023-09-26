import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {TEXTS} from '../config/texts';
import {DropDownPickerProps} from '../types';

export default function GlobalDropDownPicker({
  datas,
  setValue,
  value,
}: DropDownPickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownPicker
      zIndex={1}
      open={open}
      value={value}
      items={datas}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={TEXTS.SELECT_DATE}
    />
  );
}
