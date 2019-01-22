import { Platform } from 'react-native'

let platformDiff = {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios'
}

export default platformDiff