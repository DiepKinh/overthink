import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import NumericInput from 'react-native-numeric-input';
import FastImage from 'react-native-fast-image';
import {ResponsiveUtils, Colors, Utils} from '@common';
import {pxToPercentage} from '@common/Size.ts';
const image_icon = require('@assets/icons/image_product_cash.jpg');
const dynamicStyles = isDarkMode => {
  return StyleSheet.create({
    numbericInputBtn: {
      color: '#FFF',
      fontSize: pxToPercentage(25),
    },
    viewContainer: {
      height: pxToPercentage(29),
      width: '90%',
    },
    viewItemScroll: {
      width: '100%',
      height: pxToPercentage(80),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: '2%',
      borderTopWidth: 2,
      borderColor: '#ECECEC',
    },
    productImage: {
      height: pxToPercentage(75),
      width: pxToPercentage(75),
      borderRadius: pxToPercentage(10),
    },
    viewInfoProduct: {
      flexDirection: 'column',
      justifyContent: 'center',
      width: '52%',
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
    viewQuantity: {
      flexDirection: 'row',
      width: '24%',
      height: pxToPercentage(80),
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewLabelPaid: {
      flexDirection: 'column',
      width: '24%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    txtLabelQuantity: {
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    txtLabelTotal: {
      textAlign: 'center',
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    txtInput: {
      color: 'black',
      fontSize: ResponsiveUtils.normalize(15),
      fontWeight: 'bold',
    },
  });
};

const OrderItem = ({
  item,
  isDarkMode,
  currency,
  onChange = () => {},
  itemPaid,
}) => {
  const numbericButtonBg = isDarkMode
    ? Colors.containerBgColor.dark
    : Colors.containerBgColor.light;
  const numbericValueColor = isDarkMode
    ? Colors.primaryTextColor.dark
    : Colors.primaryTextColor.light;
  const image = get(item, 'images.0', '');
  const styles = dynamicStyles(isDarkMode);
  const totalPrice = get(item, 'sale_price', 0) * item.quantity;
  if (item.name == undefined) item.name = get(item, 'variants.0.title');

  if (item.sale_price == undefined) item.sale_price = item.price;

  return (
    <View style={styles.viewItemScroll}>
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
      {/* <FastImage
        style={styles.productImage}
        source={
          image.length > 0
            ? {uri: image}
            : require('../../assets/logo/logo.png')
        }
        resizeMode={'stretch'}
      /> */}
      <View style={styles.viewInfoProduct}>
        <TouchableOpacity
          onPress={e => {
            console.log(JSON.stringify(item.quantity));
          }}
          style={styles.viewNameProduct}>
          <Text style={styles.txtName}>{item.name}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.txtName}>{item.name}</Text> */}
        <Text style={styles.txtPrice}>
          {Utils.formatCurrency(item.sale_price, currency, {
            precision: 0,
          })}
        </Text>
      </View>
      <View style={[styles.viewQuantity]}>
        <NumericInput
          minValue={0}
          initValue={item.quantity}
          onChange={onChange}
          totalWidth={pxToPercentage(85)}
          totalHeight={pxToPercentage(30)}
          rounded
          editable={false}
          borderColor="#EEEEEE"
          textColor={numbericValueColor}
          iconStyle={styles.numbericInputBtn}
          rightButtonBackgroundColor={'#15B101'}
          leftButtonBackgroundColor={'#15B101'}
          separatorWidth={0}
          containerStyle={styles.viewContainer}
          inputStyle={styles.txtInput}
        />
      </View>
    </View>
  );
};

export default OrderItem;
