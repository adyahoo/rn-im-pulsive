import React, {useEffect, useState} from 'react';
import Portal from '../../../../tmd/components/Portal/Portal';
import {Modal, Pressable, View} from 'react-native';
import color from 'color';
import {appTheme, RadioButton} from '../../../../tmd';
import Typography from '../../../../tmd/components/Typography/Typography';
import {useTranslation} from 'react-i18next';
import RadioButtonGroup from '../../../../tmd/components/RadioButton/RadioButtonGroup';

interface ChangeLanguageProps {
  open: boolean;
  onClose: () => void;
}

const ChangeLanguageModal = (props: ChangeLanguageProps) => {
  const {colors} = appTheme();
  const {t, i18n} = useTranslation();

  const [currentLanguage, setCurrentLanguage] = useState<String>(i18n.language);

  const handleClose = () => {
    props.onClose();
  };

  const doChangeLanguage = (value: string) => {
    setCurrentLanguage(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    if (props.open) {
      setCurrentLanguage(i18n.language);
    }
  }, [props.open]);

  return (
    <Portal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.open}
        onRequestClose={handleClose}>
        <View
          style={{
            padding: 32,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Pressable
            onPress={handleClose}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: color(colors.neutral.neutral_100)
                .alpha(0.5)
                .rgb()
                .toString(),
            }}></Pressable>
          <View
            style={{
              margin: 32,
              backgroundColor: colors.neutral.neutral_10,
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 12,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: '100%',
            }}>
            <Typography type={'title3'}>{t('change_language')}</Typography>
            <View style={{height: 12}} />

            <RadioButtonGroup
              onValueChange={doChangeLanguage}
              value={currentLanguage}>
              <RadioButton value={'id'} text={'Bahasa Indonesia'} />
              <RadioButton value={'en'} text={'English'} />
            </RadioButtonGroup>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ChangeLanguageModal;
