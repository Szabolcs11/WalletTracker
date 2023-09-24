import React from 'react';
import Navigation from './src/config/navigation';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

export default function App() {
  return (
    <>
      <Navigation />
      <Toast />
    </>
  );
}
