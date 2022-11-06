import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ResponsiveUtils, Colors, ThemeUtils} from '@common';
import * as Progress from 'react-native-progress';
import I18n from '@common/I18n';

const dynamicStyles = isDarkMode => {
  return StyleSheet.create({
    container: {
      backgroundColor: isDarkMode
        ? Colors.containerBgColor.dark
        : Colors.containerBgColor.light,
      height: ResponsiveUtils.normalize(150),
      width: ResponsiveUtils.normalize(150),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      alignSelf: 'center',
      position: 'absolute',
      top: Dimensions.get('window').height / 2 - ResponsiveUtils.normalize(100),
      elevation: 10,
    },
    title: {
      fontSize: ResponsiveUtils.normalize(16),
      color: isDarkMode
        ? Colors.primaryTextColor.dark
        : Colors.primaryTextColor.light,
      ...ThemeUtils.fontMaker({weight: '700'}),
    },
  });
};

const LoadingProgress = props => {
  const {isDarkMode, title, height, width} = props;
  const styles = dynamicStyles(isDarkMode);

  return (
    <View style={styles.container}>
      {/* <Progress.Circle size={50} indeterminate={true} /> */}
      <ActivityIndicator size={60} color={Colors.primaryColor.light} />
      <Text style={styles.title}>{I18n.t('dashboard.loading')}</Text>
    </View>
  );
};

export default LoadingProgress;
