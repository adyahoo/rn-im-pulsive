import React from 'react';
import {
  Button,
  Page,
  RHFDatePicker,
  RHFTextField,
  Stack,
  Toolbar,
} from '../../tmd';
import {useLocale} from '../providers/LocaleProvider';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import moment from 'moment';
import RHFSelectModal from '../../tmd/components/RHF/RHFSelectModal';
import {PickerItem} from '../../tmd/model/PickerItem';
import _categories from '../../tmd/data/_categories';
import useExpense from '../providers/ExpenseProvider';
import {goBack} from '../navigations/RootNavigation';

const RecordExpenseScreen = () => {
  const {t} = useLocale();

  const {create, isLoading} = useExpense();

  const schema = yup
    .object({
      amount: yup.string().required(),
      category: yup.string().required(),
      date: yup.string().required(),
      note: yup.string().nullable(),
    })
    .required();

  const defaultValues = {
    amount: '',
    category: '',
    date: moment().toDate(),
    note: null,
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    await create(data, 'plus');
    goBack();
  };

  return (
    <Page>
      <Toolbar title={t('record_expense')} center />
      <FormProvider {...method}>
        <Stack p={16} style={{flex: 1}}>
          <Stack spacing={16} style={{flex: 1}}>
            <RHFDatePicker
              name={'date'}
              label={t('labels.date')}
              placeholder={t('labels.date')}
              requiredLabel
            />
            <RHFTextField
              name={'amount'}
              label={t('labels.amount')}
              placeholder={'Ex: 10000'}
              keyboardType={'number-pad'}
              requiredLabel
            />
            <RHFSelectModal
              label={t('labels.category')}
              name={'category'}
              placeholder={t('category_placeholder')}
              options={_categories.map(it => {
                const i: PickerItem = {
                  id: it.id,
                  name: it.name,
                };

                return i;
              })}
              requiredLabel
            />
            <RHFTextField
              name={'note'}
              label={t('labels.note')}
              placeholder={'Ex: catatan'}
            />
          </Stack>

          <Button
            loading={isLoading}
            onPress={method.handleSubmit(onSubmit)}
            style={{
              marginTop: 16,
            }}
            shape={'rect'}
            fullWidth>
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </Page>
  );
};

export default RecordExpenseScreen;
