import { StyleSheet, Dimensions } from 'react-native'
import color from '../../assets/colors'

const { width } = Dimensions.get('window');
const imageSize = 40
const matchPointSize = 20

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    padding: 13,
    zIndex: 4
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    height: '70%',
    width: '100%'
  },
  levelCircle: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: "center",
    alignItems: 'center',
    top: 8,
    right: 8,
    borderRadius: imageSize * 2,
    width: imageSize,
    height: imageSize,
    zIndex: 45
  },
  levelCircleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  imageDetail: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    paddingLeft: 15,
    justifyContent: 'flex-end',
    paddingVertical: 15
  },
  imageDetailTitle: {
    color: 'white',
    fontSize: 23
  },
  imageDetailMore: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20
  },
  imageDetailMoreText: {
    color: 'white',
    fontSize: 12,
  },
  imageDetailMatch: {
    width: matchPointSize,
    height: matchPointSize,
    borderRadius: matchPointSize * 2,
    backgroundColor: color.win_color
  },
  banTtile: {
    fontSize: 20,
    textAlign: 'center'
  },
  teamBlue: {
    height: 90,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.team_blue,
  },
  teamRed: {
    height: 90,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.team_red,
  }
})