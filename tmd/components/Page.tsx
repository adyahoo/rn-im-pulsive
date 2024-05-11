import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import Color from 'color';
import React from 'react';
import {appTheme} from '../core/theming';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  statusBarColor?: string;
  bgColor?: string;
  styles?: StyleProp<ViewStyle>;
}

export default function Page({
  children,
  statusBarColor,
  bgColor,
  styles,
}: Props) {
  const {colors} = appTheme();
  const statusBarBackgroundColor = statusBarColor ?? colors.primary.main;
  const isLight = Color(statusBarBackgroundColor).isLight();
  const isFocused = useIsFocused();
  const isIos = Platform.OS === 'ios';

  const CStatusBar = ({
    backgroundColor = colors.primary.surface,
    ...props
  }: any) => (
    <>
      {isIos ? (
        <View
          style={[
            {
              height: useSafeAreaInsets().top,
            },
            {backgroundColor},
          ]}>
          <SafeAreaView style={[{flex: 1}]}>
            <StatusBar
              translucent
              backgroundColor={backgroundColor}
              barStyle={isLight ? 'dark-content' : 'light-content'}
              {...props}
            />
          </SafeAreaView>
        </View>
      ) : (
        <>
          {isFocused && (
            <StatusBar
              backgroundColor={statusBarBackgroundColor}
              barStyle={isLight ? 'dark-content' : 'light-content'}
              {...props}
            />
          )}
        </>
      )}
    </>
  );

  return (
    <>
      <CStatusBar backgroundColor={statusBarBackgroundColor} />
      <SafeAreaView
        style={[
          {flex: 1},
          bgColor
            ? {backgroundColor: bgColor}
            : {backgroundColor: colors.primary.surface},
          styles,
        ]}>
        {isIos ? (
          <KeyboardAvoidingView
            behavior={isIos ? 'padding' : 'height'}
            keyboardVerticalOffset={isIos ? useSafeAreaInsets().top : 0}
            style={{flex: 1}}>
            {children}
          </KeyboardAvoidingView>
        ) : (
          <>{children}</>
        )}
      </SafeAreaView>
    </>
  );
}
