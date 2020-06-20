import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'

import colors from '../../assets/colors'
import styles from './styles'

export default ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync()
      prepareResources()
    })()
  }, [])

  useEffect(() => {
    (async () => {
      //await SplashScreen.hideAsync()
      //navigation.navigate('Login')
    })()
  }, [appIsReady])

  const performAPICalls = async () => { }
  const downloadAssets = async () => { }

  const prepareResources = async () => {
    await performAPICalls();
    await downloadAssets();

    //setAppIsReady(true)
  };

  return (
    <View
      style={styles.container}
    >
      <Text>CNB SOCRE</Text>
      <Text style={styles.loadingText}>Carregando</Text>
    </View>
  )
}