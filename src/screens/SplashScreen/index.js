import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, ActivityIndicator, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'
import axios from 'axios'

import url from '../../assets/url'
import cnbChallengerCode from '../../assets/cnbChallengerCode'
import colors from '../../assets/colors'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

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
    if (appIsReady) setTimeout(() => navigation.navigate('Detail'), 500)
  }, [appIsReady])

  const getChampionData = async () => {
    setInfoMsg('Carregnado lista de campeões')
    const result = await axios.get(url.champion_list)

    if (result && result.data) {
      await AsyncStorage.setItem('championList', JSON.stringify(result.data.data))
    }
  }

  const getAllListCnb = async () => {
    setInfoMsg('Carregando lista cnb')
    return Promise.all(
      cnbChallengerCode.map(name => axios.get(url.cnb_api + name))
    ).then((data) => {
      data.map(async item => {
        const url = item.config.url.split('/')
        const challengerCode = url[url.length - 1]
        console.log(Object.keys(item.data.payload))

        await AsyncStorage.setItem(challengerCode, JSON.stringify(item.data.payload))

      })
    })
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
    //await getAllListCnb()
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