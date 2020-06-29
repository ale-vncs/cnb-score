import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, ActivityIndicator, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import axios from 'axios'

import url from '../../assets/url'
import colors from '../../assets/colors'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';

export default ({ navigation }) => {
  const [appIsReady, setAppIsReady] = useState(false)
  const [infoMsg, setInfoMsg] = useState('Carregando')

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync()
      prepareResources()
    })()
  }, [])

  useEffect(() => {
    if (appIsReady) setTimeout(() => navigation.navigate('Login'), 500)
  }, [appIsReady])

  const getChampionData = async () => {
    setInfoMsg('Carregnado lista de campeões')
    const result = await axios.get(url.champion_list)

    if (result && result.data) {
      await AsyncStorage.setItem('championList', JSON.stringify(result.data.data))
    }
  }

  const prefetchImage = async () => {
    setInfoMsg('Carregando imagens de campeões')
    const champion_list = Object.values(global.champion_list)
    champion_list.map(champ => {
      const uri_img = url.champion_splash_img + '/' + champ.id + '_0.jpg'
      console.log(champ.name, uri_img)
      Image.prefetch(uri_img)
    })
  }

  const prepareResources = async () => {
    await getChampionData()
    //await prefetchImage()
    setInfoMsg('Tudo completo :)')
    setAppIsReady(true)
  };

  return (
    <View
      style={styles.container}
    >
      <Text>CNB SOCRE</Text>
      <View style={styles.loadingBox}>
        {
          !appIsReady && <ActivityIndicator size="large" color={colors.text_light} />
        }
        <Text style={styles.loadingText}>{infoMsg}</Text>
      </View>
    </View>
  )
}