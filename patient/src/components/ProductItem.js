import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import FastImage from 'react-native-fast-image';
import {ResponsiveUtils, Colors, Utils, ThemeUtils} from '@common';
const image_icon = require('@assets/icons/image_product_cash.jpg');
const dynamicStyles = isDarkMode => {
  return StyleSheet.create({
    productItem: {
      backgroundColor: isDarkMode
        ? Colors.selectBgColor.dark
        : Colors.selectBgColor.light,
      height: ResponsiveUtils.normalize(158),
      width: '25%',
      borderRadius: 2,
    },
    productImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    viewBottomProduct: {
      backgroundColor: 'rgba(0, 0, 0, 0.35)',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    productImageEmpty: {
      marginTop: ResponsiveUtils.normalize(7),
      width: ResponsiveUtils.normalize(80),
      height: ResponsiveUtils.normalize(80),
    },
    productName: {
      textAlign: 'center',
      fontSize: ResponsiveUtils.normalize(18),
      marginHorizontal: 4,
      color: 'white',
      fontWeight: 'bold',
      padding: 4,
    },
    productPrice: {
      fontSize: ResponsiveUtils.normalize(18),
      color: 'white',
      fontWeight: 'bold',
      padding: 4,
      textAlign: 'center',
    },
  });
};

const ProductItem = ({item, isDarkMode, onPress, currency}) => {
  const styles = dynamicStyles(isDarkMode);
  const image = get(item, 'images.0','');

  console.log(image);
  return (
    <TouchableOpacity style={styles.productItem} onPress={onPress}>
      {image != '' && image != undefined ? (
        <FastImage
          style={styles.productImage}
          source={{uri: image}}
          resizeMode={'stretch'}
        />
      ) : (
        <FastImage
          style={styles.productImage}
          source={image_icon}
          resizeMode={'stretch'}
        />
      )}
      <View style={styles.viewBottomProduct}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>
          {Utils.formatCurrency(item.sale_price, currency, {precision: 0})}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(ProductItem);
