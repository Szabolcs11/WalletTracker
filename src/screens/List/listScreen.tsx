import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import DeleteModal from '../../components/DeleteModal';
import GlobalDropDownPicker from '../../components/GlobalDropDownPicker';
import GlobalFlatList from '../../components/GlobalFlatList';
import {TEXTS} from '../../config/texts';
import {Container, palette, spacing} from '../../style';
import {ListSpendingType, SpendingType} from '../../types';
import {getWeeksWithSpending, getSpendingsGroupByDate} from '../../util/formatSpendings';
import {deleteSpending, getSpendings} from '../../util/storage';
import {updateCharts} from '../Statistics/statisticsScreen';
import LoadingComponent from '../../components/LoadingComponent';

export let updateList: () => void;

export default function ListScreen() {
  const [spendings, setSpendings] = useState<SpendingType[]>([]);
  const [showDeleteSpendingModal, setShowDeleteSpendingModal] = useState<boolean>(false);
  const [selectedSpendingId, setSelectedSpendingId] = useState<string>('');
  const [groupedSpendings, setGroupedSpendings] = useState<ListSpendingType[]>();
  const [selectedDropdownValue, setSelectedDropdownValue] = useState<string>('');
  const [searchedSpendings, setSearchedSpendings] = useState<ListSpendingType[]>();
  const [weeks, setWeeks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  updateList = () => {
    handleGetSpendings();
  };

  const handleGetSpendings = () => {
    let tempspending = getSpendings();
    setSpendings(tempspending);
    setIsLoading(false);
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
      setSearchedSpendings(groupedSpendings);
    } else {
      setSearchedSpendings(groupedSpendings?.filter(e => e.weekRange == selectedDropdownValue));
    }
  }, [selectedDropdownValue]);

  useEffect(() => {
    if (spendings.length > 0) {
      let data = getSpendingsGroupByDate(spendings);
      setGroupedSpendings(data);
      setSearchedSpendings(data);
    }
  }, [spendings]);

  if (isLoading) {
    return <LoadingComponent />;
  }

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
      <View style={Container}>
        <Text
          style={{
            textAlign: 'center',
            color: palette.primary,
            fontSize: 20,
          }}>
          {TEXTS.EXPENSES}
        </Text>
        <View
          style={{
            marginVertical: spacing.double,
          }}>
          <GlobalDropDownPicker
            adddefaultitem
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
