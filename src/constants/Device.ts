import { Platform, Dimensions } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('screen');

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

export { DEVICE_HEIGHT, DEVICE_WIDTH, isIOS, isAndroid };
