import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {FlatList, ListRenderItem, SafeAreaView, View} from 'react-native';
import Portal from '../../../../tmd/components/Portal/Portal';
import {appTheme, Stack} from '../../../../tmd';
import Typography from '../../../../tmd/components/Typography/Typography';
import useExpense from '../../../providers/ExpenseProvider';
import {useSelector} from 'react-redux';
import {ExpenseModel} from '../../../models/expense/Expense';
import _categories from '../../../../tmd/data/_categories';
import moment from 'moment';

interface ExpenseListBSProps {
  open: boolean;
  onClose: () => void;
}

const ExpenseListBottomSheet = (props: ExpenseListBSProps) => {
  const modalizeRef = useRef<Modalize>(null);
  const {colors} = appTheme();

  const {fetch, isFetching} = useExpense();

  const data: ExpenseModel[] = useSelector(state => state.expenseReducer.data);

  const handleOpen = () => {
    modalizeRef.current?.open();
    fetchData();
  };

  const handleClose = () => {
    props.onClose();
    modalizeRef.current?.close();
  };

  const fetchData = async () => {
    await fetch();
  };

  const renderContent = ({item, index}) => {
    const category = _categories.find(e => e.id.toString() == item.category);
    const date = moment(item.date).format('DD/MM/yyyy');

    let color;
    let amount;

    if (item.type == 'minus') {
      color = colors.danger.main;
      amount = '-Rp' + item.amount;
    } else {
      color = colors.success.main;
      amount = '+Rp' + item.amount;
    }

    return (
      <Stack spacing={8}>
        <Stack direction={'row'} content={'space-between'}>
          <Typography type={'label1'}>{category.name}</Typography>
          <Typography type={'body3'}>{date}</Typography>
        </Stack>
        <Typography type={'title3'} style={{color: color}}>
          {amount}
        </Typography>
        <Typography type={'body3'}>{item.note}</Typography>
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary.border,
            marginBottom: 16,
            marginTop: 8,
          }}
        />
      </Stack>
    );
  };

  useEffect(() => {
    if (props.open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.open]);

  return (
    <Portal>
      <Modalize
        handlePosition={'inside'}
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          backgroundColor: colors.neutral.neutral_10,
          borderTopLeftRadius: 16,
        }}
        closeOnOverlayTap={true}
        withHandle={true}
        onClose={props.onClose}
        onBackButtonPress={() => {
          return true;
        }}
        ref={modalizeRef}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'column',
              paddingVertical: 16,
            }}>
            <FlatList data={data} renderItem={renderContent} />
          </View>
        </SafeAreaView>
      </Modalize>
    </Portal>
  );
};

export default ExpenseListBottomSheet;
