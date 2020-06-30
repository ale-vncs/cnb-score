import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard
} from 'react-native'
import Fa from 'react-native-vector-icons/FontAwesome5'
import api from '../../services/api'
import styles from './styles'

export default ({ navigation }) => {

  const [user, setUser] = useState('')
  const [recentUser, setRecentUser] = useState([])
  const [onFocus, setOnFocus] = useState(false)

  useEffect(() => {
    const listener = navigation.addListener('willFocus', async () => {
      await getRecentList()
    })
    getRecentList()

    return () => {
      listener.remove()
    }
  }, [])

  const getRecentList = async () => {
    const list = await AsyncStorage.getItem('recentUser')
    if (list) {
      setRecentUser(JSON.parse(list))
    }
  }

  const onSubmit = async (name = null) => {
    const nickname = name ? name : user
    const { data } = await api.get(`/lol/summoner/v4/summoners/by-name/${nickname}`)
    if (data) {
      //await AsyncStorage.removeItem('recentUser')
      let recentList = await AsyncStorage.getItem('recentUser')
      if (recentList) {
        const list = new Set(JSON.parse(recentList))
        list.add(nickname)
        await AsyncStorage.setItem('recentUser', JSON.stringify([...list]))
      } else {
        await AsyncStorage.setItem('recentUser', JSON.stringify([nickname]))
      }
      await AsyncStorage.setItem('accountId', JSON.stringify(data))
      navigation.navigate('Main')
    }
  }

  const removeRecent = async (index) => {
    let temp = recentUser
    temp.splice(index, 1)
    setRecentUser([...temp])
    await AsyncStorage.setItem('recentUser', JSON.stringify(temp))
  }

  useEffect(() => {
    const k1 = Keyboard.addListener("keyboardDidShow", () => setOnFocus(true));
    const k2 = Keyboard.addListener("keyboardDidHide", () => setOnFocus(false));

    return () => {
      k1.remove()
      k2.remove()
    };
  }, []);

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
        onPress={() => onSubmit()}
      >
        <Text style={styles.btnText}>Buscar</Text>
      </TouchableOpacity>
      {!onFocus &&
        <View
          style={styles.recentContainer}
        >
          <Text style={styles.recentUserTitle}>Buscas recentes</Text>
          {recentUser.length ?
            <ScrollView>
              {recentUser.map((user, index) => (
                <View key={user} style={styles.recentUserButton}>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => {
                    onSubmit(user)
                  }}>
                    <Text style={styles.recentUserText}>{user}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeRecent(index)}>
                    <Fa name="times" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
            :
            <Text style={styles.recentUserText}>Sem jogadores recentes</Text>
          }
        </View>
      }
    </View >
  )
}