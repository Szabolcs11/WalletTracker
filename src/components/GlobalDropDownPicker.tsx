import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {DropDownPickerProps} from '../types';

export default function GlobalDropDownPicker({
  datas,
  setValue,
  value,
  placeholder,
}: DropDownPickerProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DropDownPicker
      zIndex={1}
      open={open}
      value={value}
      items={[
        {label: placeholder, value: placeholder},
        ...(datas
          ? datas?.map(e => ({
              label: e,
              value: e,
            }))
          : []),
      ]}
      setOpen={setOpen}
      setValue={setValue}
      placeholder={placeholder}
    />
  );
}
