import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import GlobalFlatList from '../../components/GlobalFlatList';
import {TEXTS} from '../../config/texts';
import {palette, spacing} from '../../style';
import {ListSpendingType, SpendingType} from '../../types';
import {sortData} from '../../util/sortSpendings';
import {deleteSpending, getSpendings} from '../../util/storage';
import {sortDataForPie} from '../Statistics/statisticsScreen';

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
    if (sortDataForPie) {
      sortDataForPie();
    }
  };

  useEffect(() => {
    handleGetSpendings();
  }, []);

  useEffect(() => {
    if (selectedDropdownValue == TEXTS.ALL) {
      setSearchedSpendings(datas);
    } else {
      setSearchedSpendings(
        datas?.filter(e => e.weekRange == selectedDropdownValue),
      );
    }
  }, [selectedDropdownValue]);

  useEffect(() => {
    if (spendings.length > 0) {
      let data = sortData(spendings);
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
            datas={[
              {label: TEXTS.ALL_DATE, value: TEXTS.ALL},
              ...(datas
                ? datas?.map(e => ({
                    label: e.weekRange,
                    value: e.weekRange,
                  }))
                : []),
            ]}
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
