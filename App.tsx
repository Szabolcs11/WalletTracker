import React, {useEffect} from 'react';
import Navigation from './src/config/navigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
