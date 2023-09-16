import React, {useState} from 'react';
import HomeScreen from './src/screens/Home/homeScreen';
import Navigation from './src/config/navigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function App() {
  // return <HomeScreen />;
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
