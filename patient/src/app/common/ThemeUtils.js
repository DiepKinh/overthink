import {DynamicValue} from 'react-native-dark-mode';

import {Platform} from 'react-native';
import Themes from './Themes';

export const getDynamicValue = key => {
  return new DynamicValue(Themes.LightTheme[key], Themes.DarkTheme[key]);
};

const font = {
  weights: Platform.select({
    ios: {
      400: 'system font',
      500: 'system font',
      600: 'system font',
      700: 'system font',
    },
    android: {
      400: 'SF-Pro-Text-Regular',
      500: 'SF-Pro-Text-Medium',
      600: 'SF-Pro-Text-Semibold',
      700: 'SF-Pro-Text-Bold',
    },
  }),
};

export const fontMaker = (options = {}) => {
  let {weight} = options;

  //not use that font for android
  // if (Platform.OS === 'android') {
  //   return {
  //     fontWeight: weight || '400',
  //   };
  // }

  const fontFamily = font.weights[weight]
    ? font.weights[weight]
    : 'system font';

  return {fontFamily};
};
