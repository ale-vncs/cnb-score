import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Image from 'react-native-scalable-image'
import Fa from 'react-native-vector-icons/FontAwesome5'

import styles from './styles'

export default ({ navigation }) => {

  useEffect(() => {
    console.log(navigation.getParam('data'))
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Fa name="angle-left" size={35} color={"white"} />
      </TouchableOpacity>
      <View>
        <Image
          width={Dimensions.get('window').width}
          source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg' }}
        />
        <LinearGradient style={styles.linearGradient} colors={["#ffffff00", "black"]} />
        {/* <View style={styles.levelCircle}>
          <Text style={styles.levelCircleText}>13</Text>
        </View> */}
        <View style={styles.imageDetail}>
          <Text style={styles.imageDetailTitle}>Jinx, O gatilho desenfreado</Text>
          <View
            style={styles.imageDetailMore}
          >
            <Text style={styles.imageDetailMoreText}>10/02/1997 - 15:46</Text>
            <Text style={styles.imageDetailMoreText}>160 potnos</Text>
            <View style={styles.imageDetailMatch} />
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          paddingVertical: 10
        }}
      >
        <View>
          <Text style={styles.banTtile}>Bans</Text>
          <View
            style={styles.teamBlue}
          >
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
          </View>
          <View
            style={styles.teamRed}
          >
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
            <Image width={60} resizeMode={'contain'} source={{ uri: 'http://ddragon.leagueoflegends.com/cdn/10.12.1/img/champion/Jinx.png' }} />
          </View>
        </View>
        <View>
          <Text>Objetivos</Text>
          <View>
            <Text>Torres</Text>
            <Text>Dragões</Text>
            <Text>Barons</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}