import React, {useEffect, useState} from 'react';
import {appTheme, IconButton, Page, Stack, Toolbar} from '../../tmd';
import {navigate} from '../navigations/RootNavigation';
import Typography from '../../tmd/components/Typography/Typography';
import {ExpenseGraphicModel, ExpenseType} from '../models/expense/Expense';
import {useBottomSheet} from '../../tmd/providers/BottomSheetProvider';
import useExpense from '../providers/ExpenseProvider';
import {useSelector} from 'react-redux';
import PieChart from 'react-native-pie-chart';
import {useLocale} from '../providers/LocaleProvider';

const HomeScreen = () => {
  const {colors} = appTheme();

  const {t} = useLocale();
  const {showExpenseListBS, hideExpenseListBS} = useBottomSheet();
  const {getTotalBalance, getGraphicData} = useExpense();

  const balance: number = useSelector(state => state.expenseReducer.balance);
  // const graphicData: ExpenseGraphicModel = useSelector(state => state.expenseReducer.graphicData);

  const [series, setSeries] = useState([100, 199]);
  const [sliceColor, setSliceColor] = useState(['#ffffff', '#ffffff']);

  const getSummary = async () => {
    const res = await getGraphicData();
    console.log(res);

    setSeries(res.total);
    setSliceColor(res.color);
  };

  const navigateRecord = (type: ExpenseType) => {
    navigate('RecordExpenseScreen');
  };

  const renderMenuBtn = () => {
    return (
      <IconButton
        onPress={() => {
          showExpenseListBS();
        }}
        icon={'menu'}
        size={32}
        color={colors.neutral.neutral_90}
        variant={'tertiary'}
      />
    );
  };

  const renderRecord = (type: ExpenseType) => {
    let icon;
    let onPress;
    let bgcolor;

    if (type == 'minus') {
      icon = 'cash-minus';
      onPress = () => navigateRecord('minus');
      bgcolor = colors.danger.main;
    } else {
      icon = 'cash-plus';
      onPress = () => navigateRecord('plus');
      bgcolor = colors.success.main;
    }

    return (
      <IconButton
        onPress={onPress}
        icon={icon}
        source={'material-community'}
        size={64}
        style={{backgroundColor: bgcolor}}
        color={colors.primary.content}
        variant={'tertiary'}
      />
    );
  };

  useEffect(() => {
    getTotalBalance();
    getSummary();
  }, []);

  return (
    <Page>
      <Toolbar
        backable={false}
        title={'Dashboard'}
        center
        actionButton={
          <IconButton
            onPress={() => {
              navigate('ProfileScreen');
            }}
            source={'ionicons'}
            color={'white'}
            icon={'person'}
          />
        }
      />
      <Stack spacing={64} p={16} style={{flex: 1}}>
        {/*Grafik*/}
        <Stack style={{flex: 1}} spacing={16} items={'center'}>
          <Typography type={'h2'}>{t('expense')}</Typography>
          <PieChart
            widthAndHeight={250}
            series={series}
            sliceColor={sliceColor}
          />
        </Stack>

        {/*Total Saldo & Menu*/}
        <Stack direction={'row'} spacing={12}>
          {renderMenuBtn()}
          <Stack
            px={8}
            py={12}
            items={'center'}
            content={'center'}
            style={{
              flex: 1,
              backgroundColor: colors.primary.border,
              borderRadius: 12,
            }}>
            <Typography type={'title1'}>Rp. {balance}</Typography>
          </Stack>
          {renderMenuBtn()}
        </Stack>

        {/*Actions*/}
        <Stack direction={'row'} content={'space-between'}>
          {renderRecord('minus')}
          {renderRecord('plus')}
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomeScreen;
