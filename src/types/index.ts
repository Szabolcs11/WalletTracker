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
  value: number;
  onChangeText: (text: number) => void;
  inputMode?: InputModeOptions;
};

export type DeleteModalProps = {
  deleteItem: () => void;
  closeModal: () => void;
}

export type DropDownPickerProps = {
  datas?: string[];
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  adddefaultitem: boolean;
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

export type BarComponentProps = {
  height: number;
  index: number;
  day: string
  value: number;
  date: string;
}

export type BarChartType = {
  Day: string;
  Spendings: number;
  Date: string
}

export type BarChartProps = {
  data: BarChartType[]
}

export type PieChartDataType = {
  category: string;
  color: string;
  legendFontColor: string;
  totalAmount: any;
  name: string;
}