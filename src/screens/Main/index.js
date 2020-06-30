import React, { useEffect, useState, useRef } from 'react'
import qs from 'qs'
import moment from 'moment'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Picker
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'
import url from '../../assets/url'
import classes from './styles'
import colors from '../../assets/colors'
import api from '../../services/api'
import calculatePoints from '../../services/calculatePoints'

import Fa from 'react-native-vector-icons/FontAwesome5'

export default ({ navigation }) => {

  const menu = useRef()
  const [userData, setUserData] = useState({})
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bestMatches, setBestMatches] = useState([])
  const [otherMatches, setOtherMatches] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    (async () => {
      setUserData(JSON.parse(await AsyncStorage.getItem('accountId')))
      setRole('adc')
    })()
  }, [])

  useEffect(() => {
    if (role) {
      (async () => {
        setLoading(true)
        const query = qs.stringify({
          queue: 420,
          season: 13,
          beginTime: moment(new Date('2020-06-18')).unix()
        })
        const { data } = await api.get(`/lol/match/v4/matchlists/by-account/${userData.accountId}?${query}`)

        if (data) {
          let {
            totalPoints,
            best,
            other
          } = await calculatePoints(role, data, userData.accountId)

          setTotalPoints(totalPoints)
          setOtherMatches(other)
          setBestMatches(best)
        }
        setLoading(false)
      })()
    }
  }, [role])

  return (
    <View style={classes.container}>
      <View style={classes.headerBar}>
        <View>
          <Image
            source={{ uri: url.profile_icon + '/' + userData.profileIconId + '.png' }}
            style={classes.headerBarImage}
          />
          <View
            style={classes.headerBarLevelContainer}
          >
            <Text style={classes.headerBarLevelText}>{userData.summonerLevel}</Text>
          </View>
        </View>
        <Text style={classes.headerBarText}>Olá, {userData.name}</Text>
        <TouchableOpacity
          style={classes.headerBarMenu}
          onPress={() => menu.current.show()}
        >
          <Fa name="ellipsis-v" size={30} />
          <Menu
            ref={menu}
          >
            <MenuItem onPress={() => setRole('top')}>Top</MenuItem>
            <MenuItem onPress={() => setRole('jg')}>Jg</MenuItem>
            <MenuItem onPress={() => setRole('mid')}>Mid</MenuItem>
            <MenuItem onPress={() => setRole('adc')}>Adc</MenuItem>
            <MenuItem onPress={() => setRole('sup')}>Sup</MenuItem>
          </Menu>
        </TouchableOpacity>
      </View>
      <View style={classes.roleContainer}>
        <Text style={classes.roleText}>Função: {role}</Text>
      </View>
      <View style={classes.boxMatch}>
        <Text style={classes.boxMatchTitle}>Melhores Partidas</Text>
        {loading ? (
          <ActivityIndicator size='large' color={colors.primary_color} />
        ) : (
            <ScrollView>
              {bestMatches.map((mtc, index) => (
                <TouchableOpacity
                  key={index}
                  style={classes.boxMatchButton}
                  onPress={() => console.log(mtc.championName)}
                >
                  <View style={classes.boxMatchContainerLeft}>
                    <View style={{ ...classes.boxMatchStatus, backgroundColor: (mtc.win ? '#49E296' : '#FF5858') }} />
                    <Text style={classes.boxMatchChampionName} >{mtc.championName}</Text>
                  </View>
                  <View style={classes.boxMatchContainerLeft}>
                    <Text style={classes.boxMatchPoints} >{mtc.totalPoints} P</Text>
                    <Fa name="angle-right" style={classes.boxMatchIcon} size={20} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        <Text style={classes.totalPoints}>Seus pontos: {totalPoints}</Text>
      </View>
      <View style={classes.boxMatch}>
        <Text style={classes.boxMatchTitle}>Outras Partidas</Text>
        {loading ? (
          <ActivityIndicator size='large' color={colors.primary_color} />
        ) : (
            <ScrollView>
              {otherMatches.map(mtc => (
                <TouchableOpacity
                  style={classes.boxMatchButton}
                  onPress={() => console.log(mtc.championName)}
                >
                  <View style={classes.boxMatchContainerLeft}>
                    <View style={{ ...classes.boxMatchStatus, backgroundColor: (mtc.win ? '#49E296' : '#FF5858') }} />
                    <Text style={classes.boxMatchChampionName} >{mtc.championName}</Text>
                  </View>
                  <View style={classes.boxMatchContainerLeft}>
                    <Text style={classes.boxMatchPoints} >{mtc.totalPoints} P</Text>
                    <Fa name="angle-right" style={classes.boxMatchIcon} size={20} />
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
      </View>
    </View>
  )
}