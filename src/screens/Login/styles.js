import {
  StyleSheet
} from 'react-native';
import colors from '../../assets/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary_color,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 8,
    width: '80%',
    backgroundColor: `rgba(255,255,255,0.1)`,
    paddingLeft: 20,
    color: colors.text_light,
    fontSize: 18
  },
  btnLogin: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary_color,
    borderRadius: 8,
    marginVertical: 15
  },
  btnText: {
    fontSize: 15,
    color: colors.text_light
  },
  recentContainer: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
    height: '30%'
  },
  recentUserTitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  recentUserButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10
  },
  recentUserText: {
    fontSize: 15,
    color: 'white'
  }
}) 