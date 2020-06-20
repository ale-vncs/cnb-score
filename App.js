import React from 'react';
import Routes from './src/routes';
import FlashMessage from "react-native-flash-message";
import { StatusBar } from 'react-native';

import colors from './src/assets/colors';

export default () => {

  return (
    <>
      <StatusBar backgroundColor={colors.primary_color} />
      <Routes />
      <FlashMessage
        position="bottom"
        autoHide={true}
        duration={5000}
      />
    </>
  )
}
