import React, {ReactNode} from 'react';
import {appTheme, Button, Icon, Image, Page, Stack, Toolbar} from '../../tmd';
import Typography from '../../tmd/components/Typography/Typography';
import {TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {User} from '../models/auth/Auth';
import {useAuth} from '../providers/AuthProvider';
import {useModal} from '../../tmd/providers/ModalProvider';
import {navigate} from '../navigations/RootNavigation';
import {useLocale} from '../providers/LocaleProvider';

const ProfileScreen = () => {
  const {colors} = appTheme();
  const {t, i18n} = useLocale();
  const {logout, isLoadingLogout} = useAuth();
  const {showChangeLanguageModal, hideChangeLanguageModal} = useModal();

  const user: User = useSelector(state => state.authReducer.user);

  const renderMenu = (icon: ReactNode, title: string, onPress: () => void) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Stack
          direction={'row'}
          items={'center'}
          px={12}
          py={10}
          style={{backgroundColor: 'white', borderRadius: 8}}>
          {icon}
          <View style={{width: 12}} />
          <Typography type={'label2'}>{title}</Typography>
        </Stack>
      </TouchableOpacity>
    );
  };

  const doLogout = () => {
    logout();
  };

  const doChangeLanguage = () => {
    showChangeLanguageModal();
  };

  return (
    <Page>
      <Toolbar title={'Profile'} center />
      <Stack style={{flex: 1}}>
        <Stack style={{flex: 1}}>
          <Image
            style={{height: 300}}
            source={{uri: 'data:image/png;base64,' + user.thumbnail}}
          />
          <Stack items={'center'} style={{transform: [{translateY: -40}]}}>
            <Image
              style={{height: 80, width: 80, borderRadius: 24}}
              source={{uri: 'data:image/png;base64,' + user.profile}}
              resizeMode={'contain'}
            />
            <View style={{height: 12}} />
            <Typography type={'body2'}>{user.name}</Typography>
          </Stack>
          <Stack px={16}>
            {renderMenu(
              <Icon icon={'account-edit'} source={'material-community'} />,
              t('edit_profile'),
              () => {
                navigate('EditProfileScreen');
              },
            )}
            <View style={{height: 12}} />
            {renderMenu(
              <Icon icon={'globe-outline'} source={'ionicons'} />,
              t('change_language'),
              doChangeLanguage,
            )}
          </Stack>
        </Stack>
        <Button
          onPress={doLogout}
          color={colors.danger.main}
          style={{margin: 16}}
          shape={'rect'}
          loading={isLoadingLogout}
          fullWidth>
          Log Out
        </Button>
      </Stack>
    </Page>
  );
};

export default ProfileScreen;
