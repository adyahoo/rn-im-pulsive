import {SelectedMap} from '../../tmd/components/picker/MapPicker';
import {GalleryItem} from '../../tmd/types/types';

export type BottomTabNavigationType = {
  ButtonScreen: undefined;
  AlertScreen: undefined;
  TagScreen: undefined;
  ImageScreen: undefined;
};

type AppNavigationType = {
  //integration
  StripeScreen: undefined;
  //utils
  GalleryListScreen: {
    images: GalleryItem[];
    title?: string;
  };
  //end utils
  SplashScreen: undefined;
  StepperScreen: undefined;
  ImageScreen: undefined;
  SignatureCanvasScreen: undefined;
  ProgressBarScreen: undefined;
  MapTrackingScreen: undefined;
  LoginScreen: undefined;
  MainScreen: undefined;
  ImagePickerScreen: undefined;
  ButtonScreen: undefined;
  TypographyScreen: undefined;
  TextFieldScreen: undefined;
  PickerScreen: undefined;
  BottomSheetScreen: undefined;
  ModalScreen: undefined;
  TagScreen: undefined;
  AlertScreen: undefined;
  SelectorScreen: undefined;
  LanguageScreen: undefined;
  APIScreen: undefined;
  FetchDataScreen: undefined;
  PaginationScreen: undefined;
  ChipScreen: undefined;
  OTPScreen: undefined;
  FormScreen: undefined;
  LayoutScreen: undefined;
  TabScreen: {
    initialIndex?: number;
  };
  AvatarScreen: undefined;
  BadgeScreen: undefined;
  TooltipScreen: undefined;
  TooltipStepperScreen: undefined;
  SkeletonScreen: undefined;
  DividerScreen: undefined;
  CarouselScreen: undefined;
  PrinterTDSScreen: undefined;
  ThemeTDSScreen: undefined;
  SliderTDSScreen: undefined;
  BottomNavTDSScreen: undefined;
  AccordionTDSScreen: undefined;

  ChatGPTScreen: undefined;
};
export default AppNavigationType;
