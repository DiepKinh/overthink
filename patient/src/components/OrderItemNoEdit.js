import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import FastImage from 'react-native-fast-image';
import {ResponsiveUtils, Utils} from '@common';
import {pxToPercentage} from '@common/Size.ts';

const dynamicStyles = isDarkMode => {
  return StyleSheet.create({
    viewItemScroll: {
      width: '100%',
      height: pxToPercentage(80),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '2%',
      borderTopWidth: 2,
      borderColor: '#ECECEC',
      backgroundColor: '#FFF',
      paddingHorizontal: '3%',
    },
    productImage: {
      height: pxToPercentage(75),
      width: pxToPercentage(75),
      borderRadius: pxToPercentage(10),
    },
    viewInfoProduct: {
      flexDirection: 'column',
      justifyContent: 'center',
      width: '62%',
      height: pxToPercentage(80),
    },
    viewNameProduct: {
      width: '100%',
      justifyContent: 'center',
    },
    txtName: {
      fontSize: ResponsiveUtils.normalize(17),
      color: '#000',
      fontWeight: 'bold',
    },
    txtPrice: {
      fontSize: ResponsiveUtils.normalize(20),
      color: '#000',
    },
    viewLabelPaid: {
      flexDirection: 'column',
      width: '14%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtLabelQuantity: {
      textAlign: 'center',
      fontSize: ResponsiveUtils.normalize(20),
      color: 'black',
      fontWeight: 'bold',
    },
    hr: {
      backgroundColor: '#ddd',
      width: '96%',
      height: pxToPercentage(1.5),
      alignSelf: 'center',
    },
    txtQuantity: {
      textAlign: 'center',
      fontSize: ResponsiveUtils.normalize(18),
      color: 'black',
      fontWeight: 'bold',
    },
  });
};

const OrderItemNoEdit = ({item, isDarkMode, currency}) => {
  const image = get(item, 'images.0', '');
  const styles = dynamicStyles(isDarkMode);

  return (
    <View>
      <View style={styles.viewItemScroll}>
        <FastImage
          style={styles.productImage}
          source={
            image.length > 0
              ? {uri: image}
              : require('../../assets/logo/logo.png')
          }
          resizeMode={'stretch'}
        />
        <View style={styles.viewInfoProduct}>
          <View style={styles.viewNameProduct}>
            <Text style={styles.txtName}>
              {item.name !== undefined ? item.name : item.variants[0].title}
            </Text>
          </View>
          {item.sale_price !== undefined ? (
            <Text style={styles.txtPrice}>
              {Utils.formatCurrency(item.sale_price, currency, {
                precision: 0,
              })}
            </Text>
          ) : (
            <Text style={styles.txtPrice}>
              {Utils.formatCurrency(item.variants[0].price, currency, {
                precision: 0,
              })}
            </Text>
          )}
        </View>
        <View style={[styles.viewLabelPaid]}>
          {/* <TouchableOpacity
            onPress={e => {
              console.log(JSON.stringify(item.variants[0].price));
            }}> */}
          <Text style={styles.txtLabelQuantity}>{''}</Text>
          {/* </TouchableOpacity> */}
          <Text style={styles.txtQuantity}>{item.quantity}</Text>
        </View>
      </View>
      <View style={styles.hr} />
    </View>
  );
};

export default OrderItemNoEdit;
