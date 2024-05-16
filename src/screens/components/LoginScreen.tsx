/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {appTheme, Button, RHFTextField} from '../../../tmd';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../providers/AuthProvider';
import Page from '../../../tmd/components/Page';
import Stack from '../../../tmd/components/Layout/Stack';
import Typography from '../../../tmd/components/Typography/Typography';
import {navigate} from '../../navigations/RootNavigation';
import {useTranslation} from 'react-i18next';

export default function LoginScreen() {
  const {login, isLoadingSubmit} = useAuth();
  const {colors} = appTheme();
  const {t} = useTranslation();

  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required().min(8),
    })
    .required();

  const defaultValues = {
    email: '',
    password: '',
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    await login(data?.email, data?.password);
  };

  const navigateRegister = () => {
    navigate('RegisterScreen');
  };

  return (
    <Page statusBarColor={colors.primary.surface}>
      <ScrollView
        scrollEnabled={false}
        style={{
          flex: 1,
        }}>
        <FormProvider {...method}>
          <Stack
            p={16}
            spacing={16}
            style={{
              flex: 1,
            }}>
            <Typography type={'title1'}>Login</Typography>
            <View>
              <RHFTextField
                name={'email'}
                label={'Email'}
                placeholder={'Ex: mamank@skkrtt.com'}
              />
            </View>

            <View>
              <RHFTextField
                name={'password'}
                label={'Password'}
                placeholder={t('enter_password')}
                password
              />
            </View>

            <Typography>
              {t('dont_have_account')}
              <Text
                onPress={navigateRegister}
                style={{color: colors.secondary.main}}>
                {' '}
                {t('register_here')}
              </Text>
            </Typography>

            <Button
              loading={isLoadingSubmit}
              onPress={method.handleSubmit(onSubmit, e => {
                console.log(e);
              })}
              style={{
                marginTop: 24,
              }}
              shape={'rect'}
              fullWidth>
              {t('login')}
            </Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
}
