import { StyleSheet } from 'react-native'
import color from '../../assets/colors'

const imageSize = 50

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  headerBarImage: {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize * 2
  },
  headerBarLevelContainer: {
    borderRadius: 100,
    padding: 5,
    backgroundColor: color.primary_color,
    position: 'absolute',
    bottom: -5,
    right: -5
  },
  headerBarLevelText: {
    color: 'white',
    fontSize: 10
  },
  headerBarText: {
    fontSize: 20,
    marginLeft: 10
  },
  headerBarMenu: {
    position: 'absolute',
    padding: 20,
    top: 0,
    right: 0,
  },
  roleContainer: {
    width: '80%',
    paddingVertical: 5,
    borderRadius: 5,
    elevation: 2,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  roleText: {
    fontSize: 18
  },
  boxMatch: {
    width: '80%',
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginBottom: 20,
    padding: 15
  },
  boxMatchTitle: {
    fontSize: 22,
    marginBottom: 10
  },
  boxMatchContainerRight: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxMatchContainerLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boxMatchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10
  },
  boxMatchStatus: {
    borderRadius: 50,
    width: 13,
    height: 13
  },
  boxMatchChampionName: {
    fontSize: 15,
    marginLeft: 15
  },
  boxMatchPoints: {
    fontSize: 15,
    marginRight: 10
  },
  boxMatchIcon: {
    marginRight: 10
  },
  totalPoints: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16
  }
})