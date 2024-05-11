import React, {useEffect} from 'react';
import {Page, Stack, Toast} from '../../tmd';
import Typography from '../../tmd/components/Typography/Typography';
import {useDispatch} from 'react-redux';

export default function SplashScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    handleRouting();
  }, []);

  const handleRouting = () => {
    setTimeout(routeStart, 3000);
  };

  const routeStart = () => {
    dispatch({
      type: 'DONE_LOADING_SPLASH',
    });
  };

  return (
    <Page>
      <Stack style={{flex: 1}} items={'center'} content={'center'}>
        <Typography style={{textAlign: 'center'}} type={'label1'}>
          RN Starter Kit
        </Typography>
      </Stack>
    </Page>
  );
}
