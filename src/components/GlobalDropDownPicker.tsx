import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {DropDownPickerProps} from '../types';

export default function GlobalDropDownPicker({
  datas,
  setValue,
  value,
  placeholder,
  adddefaultitem,
}: DropDownPickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      zIndex={1}
      open={open}
      value={value}
      //@ts-ignore
      items={[
        adddefaultitem ? {label: placeholder, value: placeholder} : null,
        ...(datas
          ? datas.map(e => ({
              label: e,
              value: e,
            }))
          : []),
      ].filter(item => item !== null)}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={placeholder}
    />
  );
}
