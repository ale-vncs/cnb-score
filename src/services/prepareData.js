import axios from 'axios'

import lodash from 'lodash'
import dataScore from '../assets/dataScore'
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

const lane = {
  top: 'TOP',
  jg: 'JUNGLE',
  mid: 'MID',
  adc: 'DUO_CARRY',
  sup: 'DUO_SUPPORT'
}

export default async (role, data, accountId) => {
  const scoreInfo = dataScore[role].score
  const listChampionAllow = dataScore[role].champions
  const matches = data.matches
  const listPoints = []

  const listMatches = matches.filter(match => {
    if (listChampionAllow.includes(match.champion)) {
      if (match.lane === 'BOTTOM') {
        if (match.role === lane[role]) {
          return match
        }
      } else if (match.lane === lane[role]) {
        return match
      }
    }
  })

  const championList = Object.values(JSON.parse(await AsyncStorage.getItem('championList')))
  const temp = listMatches.slice(0, 2)

  return Promise.all(
    temp.map(match => api.get(`/lol/match/v4/matches/${match.gameId}`))
  ).then(listDataMatch => {
    console.log(listDataMatch)
    listDataMatch.map(({ data }) => {
      const gameDuration = data.gameDuration
      const participationId = data.participantIdentities.filter(part => part.player.accountId === accountId)[0].participantId
      const participantInfo = data.participants.filter(part => part.participantId === participationId)[0]
      const teamInfo = data.teams.filter(team => team.teamId === participantInfo.teamId)[0]

      listPoints.push({
        totalPoints: 0,
        gameDuration,
        teamId: participantInfo.teamId,
        championName: championList.filter(ch => ch.key == participantInfo.championId)[0].name,
        win: participantInfo.stats.win,
        spell: [participantInfo.spell1Id, participantInfo.spell2Id],
        items: [
          participantInfo.stats.item0,
          participantInfo.stats.item1,
          participantInfo.stats.item2,
          participantInfo.stats.item3,
          participantInfo.stats.item4,
          participantInfo.stats.item5,
          participantInfo.stats.item6
        ],
        kills: participantInfo.stats.kills,
        deaths: participantInfo.stats.deaths,
        assists: participantInfo.stats.assists,
        minionsKilled: participantInfo.stats.totalMinionsKilled,
        towerDestroyed: participantInfo.stats.turretKills,
        totalDamageChampion: participantInfo.stats.totalDamageDealtToChampions,
        totalDamageObjectives: participantInfo.stats.damageDealtToObjectives,
        totalDamageSelfMitigated: participantInfo.stats.damageSelfMitigated,
        timeCCingOthers: participantInfo.stats.timeCCingOthers,
        killingSprees: participantInfo.stats.killingSprees,
        multiKill: participantInfo.stats.largestMultiKill,
        wardsKilled: participantInfo.stats.wardsKilled,
        visionScore: participantInfo.stats.visionScore,
        baronKills: teamInfo.baronKills,
        riftHeraldKills: teamInfo.riftHeraldKills,
        dragonKills: teamInfo.dragonKills
      })
    })

    listPoints.map(info => {
      console.log(info, scoreInfo)
      let totalPoints = 0

      totalPoints += info.kills * scoreInfo.kill
      totalPoints += info.deaths * scoreInfo.death
      totalPoints += info.assists * scoreInfo.assist
      totalPoints += (info.win ? scoreInfo.victory : 0)

      if (info.gameDuration < 20) {
        totalPoints += scoreInfo.victoryLess20
      } else if (info.gameDuration < 30) {
        totalPoints += scoreInfo.victoryLess30
      } else if (info.gameDuration > 40) {
        totalPoints += scoreInfo.victoryMore40
      } else if (info.gameDuration > 50) {
        totalPoints += scoreInfo.victoryMore50
      } else if (info.gameDuration > 60) {
        totalPoints += scoreInfo.victoryMore60
      } else if (info.gameDuration > 70) {
        totalPoints += scoreInfo.victoryMore70
      }

      if (role === 'adc') {
        totalPoints += info.timeCCingOthers * scoreInfo.timeCCingOthers
        totalPoints += info.minionsKilled * scoreInfo.minionsKilled
        totalPoints += info.towerDestroyed * scoreInfo.towerDestroyed
        totalPoints += info.totalDamageChampion * scoreInfo.totalDamageChampion
        totalPoints += info.totalDamageObjectives * scoreInfo.totalDamageObjectives
      } else if (role === 'top') {
        totalPoints += info.towerDestroyed * scoreInfo.towerDestroyed
        totalPoints += info.totalDamageChampion * scoreInfo.totalDamageChampion
        totalPoints += info.totalDamageObjectives * scoreInfo.totalDamageObjectives
        totalPoints += info.timeCCingOthers * scoreInfo.timeCCingOthers
        totalPoints += info.totalDamageSelfMitigated * scoreInfo.totalDamageSelfMitigated
        totalPoints += info.minionsKilled * scoreInfo.minionsKilled
      } else if (role === 'mid') {
        totalPoints += info.towerDestroyed * scoreInfo.towerDestroyed
        totalPoints += info.totalDamageChampion * scoreInfo.totalDamageChampion
        totalPoints += info.totalDamageObjectives * scoreInfo.totalDamageObjectives
        totalPoints += info.killingSprees * scoreInfo.killingSprees
        totalPoints += info.multiKill * scoreInfo.multiKill
        totalPoints += info.minionsKilled * scoreInfo.minionsKilled
      } else if (role === 'sup') {
        totalPoints += info.totalDamageChampion * scoreInfo.totalDamageChampion
        totalPoints += info.totalDamageSelfMitigated * scoreInfo.totalDamageSelfMitigated
        totalPoints += info.timeCCingOthers * scoreInfo.timeCCingOthers
        totalPoints += info.wardsKilled * scoreInfo.wardsKilled
        totalPoints += info.visionScore * scoreInfo.visionScore
      } else if (role === 'jg') {
        totalPoints += info.timeCCingOthers * scoreInfo.timeCCingOthers
        totalPoints += info.baronKills * scoreInfo.baronKills
        totalPoints += info.dragonKills * scoreInfo.dragonKills
        totalPoints += info.riftHeraldKills * scoreInfo.riftHeraldKills
      }

      info.totalPoints = parseFloat(totalPoints.toFixed(5))
    })

    const finalList = lodash.orderBy(listPoints, ['totalPoints', 'championName'], ['desc', 'asc'])

    const listChampion = {}
    const best = []
    const other = []

    finalList.map(item => {
      listChampion[item.championName] = []
    })

    Object.keys(listChampion).map(name => {
      listChampion[name] = finalList.filter(ch => ch.championName === name)
      const temp = listChampion[name]
      best.push(...listChampion[name].slice(0, 2))
      other.push(...temp.slice(2))
    })

    best.slice(0, 10)

    const totalPoints = (best.reduce((sum, item) => sum + item.totalPoints, 0) / 10).toFixed(3)

    return {
      totalPoints,
      best,
      other
    }
  })
}