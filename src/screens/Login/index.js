import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import api from '../../services/api'
import styles from './styles'

export default ({ navigation }) => {

  const [user, setUser] = useState('')

  const onSubmit = async () => {
    const { data } = await api.get(`/lol/summoner/v4/summoners/by-name/${user}`)
    if (data) {
      await AsyncStorage.setItem('accountId', JSON.stringify(data))
      navigation.navigate('Main')
    }
  }

  return (
    <View
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="white"
        onChangeText={setUser}
        value={user}
      />
      <TouchableOpacity
        style={styles.btnLogin}
        onPress={onSubmit}
      >
        <Text style={styles.btnText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  )
}