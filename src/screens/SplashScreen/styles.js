import {
  StyleSheet
} from 'react-native';
import colors from '../../assets/colors'

const boxSize = 200;
const boxSizeDetail = 95;

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary_color,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.text_light,
    position: 'absolute',
    bottom: 30
  }
}) 