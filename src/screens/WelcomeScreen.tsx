import React from 'react';
import {appTheme, Button, Page, Stack} from '../../tmd';
import WelcomeIllust from '../assets/illusts/welcome.svg';
import {Dimensions, View} from 'react-native';
import Typography from '../../tmd/components/Typography/Typography';
import {navigate} from '../navigations/RootNavigation';
import {useLocale} from '../providers/LocaleProvider';

const screenWidth = Dimensions.get('screen').width;
const WelcomeScreen = () => {
  const {t} = useLocale();
  const {colors} = appTheme();

  return (
    <Page statusBarColor={colors.primary.surface}>
      <Stack style={{flex: 1, alignItems: 'center'}}>
        <WelcomeIllust />
        <View style={{height: 20}} />
        <Typography type={'h3'}>{t('welcome_title')}</Typography>
        <View style={{height: 12}} />
        <Typography
          type={'title3'}
          color={colors.text}
          style={{textAlign: 'center'}}>
          {t('welcome_subtitle')}
        </Typography>
      </Stack>

      <Stack p={16}>
        <Button
          onPress={() => {
            navigate('LoginScreen');
          }}
          shape={'rect'}
          fullWidth>
          {t('login')}
        </Button>
        <View style={{height: 16}} />
        <Button
          onPress={() => {
            navigate('RegisterScreen');
          }}
          variant={'secondary'}
          shape={'rect'}
          fullWidth>
          {t('register')}
        </Button>
      </Stack>
    </Page>
  );
};

export default WelcomeScreen;
