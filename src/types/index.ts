import React from "react";
import { InputModeOptions } from 'react-native';

export type SpendingType = {
  id: string;
  category: string;
  amount: number;
  date: string;
};
export type ListSpendingType = {
  weekRange: string;
  items: SpendingType[];
};

export type TabNavigatorParamsList = {
  Home: {};
  List: {};
  Statistics: {};
};

export type GlobalTextInputProps = {
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
  inputMode?: InputModeOptions;
};

export type DeleteModalProps = {
  deleteItem: () => void;
  closeModal: () => void;
}

type ModalType = {
  label: string;
  value: string;
}

export type DropDownPickerProps = {
  datas: ModalType[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export type GlobalFlatListProps = {
  data: ListSpendingType[] | undefined;
  selectItem: (id: string) => void;
}

export type GlobalDatePickerProps = {
  date: Date;
  onChange: (value: Date) => void;
}

export type GlobalButtonProps = {
  label: string;
  callback: () => void;
}