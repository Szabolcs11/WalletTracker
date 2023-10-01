import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import GlobalFlatList from '../../components/GlobalFlatList';
import {TEXTS} from '../../config/texts';
import {palette, spacing} from '../../style';
import {ListSpendingType, SpendingType} from '../../types';
import {
  getWeeksWithSpending,
  getSpendingsGroupByDate,
} from '../../util/formatSpendings';
import {deleteSpending, getSpendings} from '../../util/storage';
import {updateCharts} from '../Statistics/statisticsScreen';

export let updateList: () => void;

export default function ListScreen() {
  const [spendings, setSpendings] = useState<SpendingType[]>([]);
  const [showDeleteSpendingModal, setShowDeleteSpendingModal] =
    useState<boolean>(false);
  const [selectedSpendingId, setSelectedSpendingId] = useState<string>('');
  const [datas, setDatas] = useState<ListSpendingType[]>();
  const [selectedDropdownValue, setSelectedDropdownValue] =
    useState<string>('');
  const [searchedSpendings, setSearchedSpendings] =
    useState<ListSpendingType[]>();
  const [weeks, setWeeks] = useState<string[]>([]);

  updateList = () => {
    handleGetSpendings();
  };

  const handleGetSpendings = () => {
    let tempspending = getSpendings();
    setSpendings(tempspending);
  };

  const handleDeleteItem = () => {
    deleteSpending(selectedSpendingId);
    setSpendings(prev => prev.filter(e => e.id != selectedSpendingId));
    setSelectedSpendingId('');
    setShowDeleteSpendingModal(false);
    if (updateCharts) {
      updateCharts();
    }
  };

  useEffect(() => {
    handleGetSpendings();
    let weeks = getWeeksWithSpending();
    setWeeks(weeks);
  }, []);

  useEffect(() => {
    if (selectedDropdownValue == TEXTS.SELECT_DATE_ALL) {
      setSearchedSpendings(datas);
    } else {
      setSearchedSpendings(
        datas?.filter(e => e.weekRange == selectedDropdownValue),
      );
    }
  }, [selectedDropdownValue]);

  useEffect(() => {
    if (spendings.length > 0) {
      let data = getSpendingsGroupByDate(spendings);
      setDatas(data);
      setSearchedSpendings(data);
    }
  }, [spendings]);

  return (
    <>
      {showDeleteSpendingModal ? (
        <DeleteModal
          deleteItem={() => {
            handleDeleteItem();
          }}
          closeModal={() => {
            setShowDeleteSpendingModal(false);
          }}
        />
      ) : (
        <></>
      )}
      <View style={{padding: spacing.double}}>
        <Text
          style={{textAlign: 'center', color: palette.primary, fontSize: 20}}>
          Expenses
        </Text>
        <View style={{marginVertical: spacing.double}}>
          <GlobalDropDownPicker
            datas={weeks}
            placeholder={TEXTS.SELECT_DATE_ALL}
            setValue={setSelectedDropdownValue}
            value={selectedDropdownValue}
          />
          <GlobalFlatList
            data={searchedSpendings}
            selectItem={id => {
              setSelectedSpendingId(id);
              setShowDeleteSpendingModal(true);
            }}
          />
        </View>
      </View>
    </>
  );
}
