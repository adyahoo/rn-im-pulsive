/**
 * Created by Widiana Putra on 27/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ButtonScreen from '../screens/components/ButtonScreen';
import TypographyScreen from '../screens/components/TypographyScreen';
import MainScreen from '../screens/MainScreen';
import TextFieldScreen from '../screens/components/TextFieldScreen';
import PickerScreen from '../screens/components/PickerScreen';
import BottomSheetScreen from '../screens/components/BottomSheetScreen';
import LanguageScreen from '../screens/components/LanguageScreen';
import TagScreen from '../screens/components/TagScreen';
import AlertScreen from '../screens/components/AlertScreen';
import SelectorScreen from '../screens/components/SelectorScreen';
import APIScreen from '../screens/components/API/APIScreen';
import FetchDataScreen from '../screens/components/API/FetchDataScreen';
import PaginationScreen from '../screens/components/API/PaginationScreen';
import ChipScreen from '../screens/components/ChipScreen';
import OTPScreen from '../screens/components/OTPScreen';
import FormScreen from '../screens/components/FormScreen';
import {navigationRef} from './RootNavigation';
import LoginScreen from '../screens/components/LoginScreen';
import ImagePickerScreen from '../screens/components/ImagePickerScreen';
import LayoutScreen from '../screens/components/LayoutScreen';
import ModalScreen from '../screens/components/ModalScreen';
import SkeletonScreen from '../screens/components/SkeletonScreen';
import DividerScreen from '../screens/components/DividerScreen';
import TabScreen from '../screens/components/TabScreen';
import AvatarScreen from '../screens/components/AvatarScreen';
import BadgeScreen from '../screens/components/BadgeScreen';
import TooltipScreen from '../screens/components/TooltipScreen';
import TooltipStepperScreen from '../screens/components/TooltipStepperScreen';
import AppNavigationType from './AppNavigationType';
import MapTrackingScreen from '../screens/components/MapTrackingScreen';
import ProgressBarScreen from '../screens/components/ProgressBarScreen';
import SignatureCanvasScreen from '../screens/components/SignatureCanvasScreen';
import ImageScreen from '../screens/components/ImageScreen';
import GalleryListScreen from '../screens/utils/GalleryListScreen';
import StepperScreen from '../screens/components/StepperScreen';
import StripeScreen from '../screens/components/Stripe/StripeScreen';
import SplashScreen from '../screens/SplashScreen';
import {useSelector} from 'react-redux';
import {rootReducer} from '../redux/stores/store';
import CarouselScreen from '../screens/components/CarouselScreen';
import PrinterTDSScreen from '../screens/components/PrinterTDSScreen';
import ThemeTDSScreen from '../screens/components/ThemeTDSScreen';
import {useTheme} from '../../tmd/providers/ThemeProvider';
import BottomNavTDSScreen from '../screens/components/BottomNavTDSScreen';
import SliderTDSScreen from '../screens/components/SliderTDSScreen';
import AccordionTDSScreen from '../screens/components/AccordionTDSScreen';
import ChatGPTScreen from '../screens/components/ChatGPTScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import RecordExpenseScreen from '../screens/RecordExpenseScreen';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator<AppNavigationType>();
  const {isAuthenticated} = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.authReducer,
  );
  const {isLoading: isLoadingSplash} = useSelector(
    (state: ReturnType<typeof rootReducer>) => state.splashReducer,
  );
  const {theme} = useTheme();
  const NavTheme = {
    ...theme,
    colors: {
      ...theme?.colors,
      background: theme?.colors.neutral.neutral_10,
    },
  };
  return (
    <NavigationContainer ref={navigationRef} theme={NavTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoadingSplash ? (
          <>
            <Stack.Screen name={'SplashScreen'} component={SplashScreen} />
          </>
        ) : (
          <>
            {!isAuthenticated ? (
              <>
                <Stack.Screen
                  name={'WelcomeScreen'}
                  component={WelcomeScreen}
                />
                <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
                <Stack.Screen
                  name={'RegisterScreen'}
                  component={RegisterScreen}
                />
              </>
            ) : (
              <>
                <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
                <Stack.Screen
                  name={'ProfileScreen'}
                  component={ProfileScreen}
                />
                <Stack.Screen
                  name={'EditProfileScreen'}
                  component={EditProfileScreen}
                />
                <Stack.Screen
                  name={'RecordExpenseScreen'}
                  component={RecordExpenseScreen}
                />
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
