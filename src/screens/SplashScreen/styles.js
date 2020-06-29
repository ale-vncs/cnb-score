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
  loadingBox: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  loadingText: {
    marginLeft: 20,
    color: colors.text_light,
  }
}) 