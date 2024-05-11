import React from 'react';
import {appTheme, Button, Page, RHFTextField, Stack} from '../../tmd';
import {ScrollView, Text, View} from 'react-native';
import {useAuth} from '../providers/AuthProvider';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Typography from '../../tmd/components/Typography/Typography';
import {navigate} from '../navigations/RootNavigation';

const RegisterScreen = () => {
  const {register, isLoadingSubmit} = useAuth();
  const {colors} = appTheme();

  const schema = yup
    .object({
      email: yup.string().email().required(),
      name: yup.string().required(),
      password: yup.string().required().min(8),
      confirm_password: yup
        .string()
        .required()
        .oneOf([yup.ref('password'), null], 'Confirmation password not match'),
    })
    .required();

  const defaultValues = {
    email: '',
    name: '',
    password: '',
    confirm_password: '',
  };

  const method = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    await register(data?.email, data?.name, data?.password);
  };

  const navigateLogin = () => {
    navigate('LoginScreen');
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
            <Typography type={'title1'}>Register</Typography>

            <View>
              <RHFTextField
                name={'name'}
                label={'Name'}
                placeholder={'Ex: mamank skkrtt'}
              />
            </View>

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
                placeholder={'Enter your password'}
                password
              />
            </View>

            <View>
              <RHFTextField
                name={'confirm_password'}
                label={'Confirm Password'}
                placeholder={'Enter your confirmation password'}
                password
              />
            </View>

            <Typography>
              Already have an account?
              <Text
                onPress={navigateLogin}
                style={{color: colors.secondary.main}}>
                {' '}
                Login Here!
              </Text>
            </Typography>

            <Button
              loading={isLoadingSubmit}
              onPress={method.handleSubmit(onSubmit)}
              style={{
                marginTop: 24,
              }}
              fullWidth>
              Register
            </Button>
          </Stack>
        </FormProvider>
      </ScrollView>
    </Page>
  );
};

export default RegisterScreen;
