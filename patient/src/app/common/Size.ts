import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
// default: 812 x 375, iPhone 11 Pro
const percentageWidth: number = width / 375;

export const isEmpty = (value: any): boolean => {
  return value === undefined || value === '' || value === null;
};

export const fontSize = (value: number): number => {
  return wp(value) * 1.23;
};

export const averageHW = (value: number): number => {
  return wp(value) * 1.23;
};

export const pxToPercentage = (value: number): number => {
  return percentageWidth * value;
};
