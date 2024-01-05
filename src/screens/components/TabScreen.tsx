import React, {useState} from 'react';
import {useWindowDimensions, View, Dimensions} from 'react-native';
import {Page} from '../../../tmd';
import Typography from '../../../tmd/components/Typography/Typography';
import Tab from '../../../tmd/components/Tab/Tab';
import Toolbar from '../../../tmd/components/Toolbar/Toolbar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import AppNavigationType from '../../navigations/AppNavigationType';

interface FirstProp {
  passed: string;
}

const FirstRoute = (props: FirstProp) => (
  <View style={{flex: 1}}>
    <Typography>First {props.passed}</Typography>
  </View>
);

const SecondRoute = () => (
  <View style={{flex: 1}}>
    <Typography>Second</Typography>
  </View>
);

const ThirdRoute = () => (
  <View style={{flex: 1}}>
    <Typography>Third</Typography>
  </View>
);
const ForthRoute = () => (
  <View style={{flex: 1}}>
    <Typography>Forth</Typography>
  </View>
);

const renderScene = ({route}) => {
  switch (route.key) {
    case 'first':
      return <FirstRoute passed={'Widiana'} />;
    case 'second':
      return <SecondRoute />;
    case 'third':
      return <ThirdRoute />;
    default:
      return <ForthRoute />;
  }
};

export default function TabScreen({
  navigation,
  route,
}: NativeStackScreenProps<AppNavigationType, 'TabScreen'>) {
  const initialIndex = route.params?.initialIndex ?? 0;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(initialIndex);
  const [routes] = useState([
    {
      key: 'first',
      title: 'New',
      iconProp: {
        icon: 'location',
      },
    },
    {key: 'second', title: 'Selesai'},
    {key: 'third', title: 'Third'},
    {key: 'forth', title: 'Forth'},
  ]);

  return (
    <>
      <Page>
        <Toolbar title={'TabScreen'} elevation={0} />
        <Tab
          lazy={true}
          // swipeEnabled={false}
          // tabBarPosition={"bottom"}
          tabBarPosition={'top'}
          scrollable={false}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{
            width: layout.width,
          }}
        />
      </Page>
    </>
  );
}
