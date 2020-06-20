import React from 'react';
import { Text, View, Dimensions } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, Header } from 'react-navigation-stack';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import SplasScreen from './screens/SplashScreen';
import Login from './screens/Login';
import Main from './screens/Main'
import Details from './screens/Details'

import colors from './assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const iconSize = 25;


const { height, width } = Dimensions.get('screen');

const stackStyle = {
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  cardStyle: {
    backgroundColor: colors.background,
  },
  headerRightContainerStyle: {
    marginRight: 15
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    marginTop: 0,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary_color,
    textAlign: 'center',
    fontSize: 20,
    width: width - 80,
    paddingVertical: 10,
    color: colors.text_light,
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular'
  },
  safeAreaInsets: { //safeAreaInsets
    top: 0,
    bottom: 0
  },
  headerTintColor: colors.primary_color,
  headerBackImage: ({ tintColor }) => (
    <FontAwesomeIcon name="angle-left" color={tintColor} size={iconSize} />
  ),
  headerBackTitleVisible: false
}

const mainStack = createStackNavigator({
  Main: {
    screen: Main
  },
  Detail: {
    screen: Details
  }
})

export default createAppContainer(
  createSwitchNavigator({
    SplasScreen: {
      screen: SplasScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    Main: mainStack
  })
)

