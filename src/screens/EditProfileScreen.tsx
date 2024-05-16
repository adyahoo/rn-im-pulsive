import React from 'react';
import {Button, Page, RHFTextField, Stack, Toolbar} from '../../tmd';
import {ScrollView, View} from 'react-native';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';
import RHFImagePicker from '../../tmd/components/RHF/RHFImagePicker';
import useProfile from '../providers/ProfileProvider';
import {User} from '../models/auth/Auth';
import {goBack} from '../navigations/RootNavigation';
import {useLocale} from '../providers/LocaleProvider';

const EditProfileScreen = () => {
  const {t} = useLocale();

  const user = useSelector(state => state.authReducer.user);

  const {isLoading, update} = useProfile();

  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      thumbnail: yup.string().nullable(),
      profile: yup.string().nullable(),
    })
    .required();

  const defaultValues: User = {
    ...user,
    email: user.email,
    name: user.name,
    thumbnail: user.thumbnail,
    profile: user.profile,
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: User) => {
    await update(data);
    goBack();
  };

  return (
    <Page>
      <Toolbar title={t('edit_profile')} center />
      <FormProvider {...method}>
        <Stack
          p={16}
          spacing={16}
          style={{
            flex: 1,
          }}>
          <ScrollView contentContainerStyle={{flex: 1}}>
            <Stack style={{flex: 1}}>
              <RHFImagePicker
                name={'thumbnail'}
                label={t('select_thumbnail')}
              />
              <View style={{height: 12}} />
              <RHFImagePicker name={'profile'} label={t('select_profile')} />

              <View>
                <RHFTextField
                  name={'name'}
                  label={'Name'}
                  placeholder={'Ex: mamank skkrtt'}
                  requiredLabel
                />
              </View>

              <View>
                <RHFTextField
                  name={'email'}
                  label={'Email'}
                  placeholder={'Ex: mamank@skkrtt.com'}
                  requiredLabel
                />
              </View>
            </Stack>

            <Button
              loading={isLoading}
              onPress={method.handleSubmit(onSubmit)}
              style={{
                marginTop: 24,
              }}
              shape={'rect'}
              fullWidth>
              {t('register')}
            </Button>
          </ScrollView>
        </Stack>
      </FormProvider>
    </Page>
  );
};

export default EditProfileScreen;
