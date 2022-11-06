/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import {get} from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native';
import I18n from '@common/I18n';
import {ActionCreators} from '@actions';
import {
  Styles as stylesCommon,
  ResponsiveUtils,
  Colors,
  Config,
  ThemeUtils,
} from '@common';
import PopupMenuSetting from '@components/PopupMenuSetting';
import {Select, Option} from 'react-native-chooser';

const {Popover} = renderers;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  containerOnlineMode: {
    width: ResponsiveUtils.normalize(120),
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnNotification: {
    marginRight: ResponsiveUtils.normalize(24),
    alignSelf: 'center',
  },
  txtMode: {
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
  },
  label: {
    width: ResponsiveUtils.normalize(150),
    fontSize: ResponsiveUtils.normalize(14),
    color: ThemeUtils.getDynamicValue('primaryTextColor'),
    ...ThemeUtils.fontMaker({weight: '500'}),
  },
  icNotifications: {
    width: ResponsiveUtils.normalize(42),
    height: ResponsiveUtils.normalize(42),
    resizeMode: 'contain',
  },
  numberOfNotifications: {
    width: ResponsiveUtils.normalize(18),
    height: ResponsiveUtils.normalize(18),
    borderRadius: ResponsiveUtils.normalize(9),
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lbNumberNotifications: {
    color: '#FFF',
    fontSize: ResponsiveUtils.normalize(8),
    ...ThemeUtils.fontMaker({weight: '700'}),
  },
  userInfoWrapper: {
    paddingLeft: ResponsiveUtils.normalize(5),
    paddingRight: ResponsiveUtils.normalize(23),
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.borderColor.light,
  },
  viewBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ResponsiveUtils.normalize(5),
    height: ResponsiveUtils.normalize(50),
    borderWidth: 1,
    borderColor: '#F26F21',
  },
  txtBtnSl: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: ResponsiveUtils.normalize(18),
  },
  viewBackR: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  viewPopUpSl: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderRadius: ResponsiveUtils.normalize(10),
    width: '60%',
  },
  txtPopupSl: {
    color: '#000000',
    textAlign: 'center',
  },
});

const Header = ({navigation, notifications, title}) => {
  return (
    <View style={stylesCommon.headerStyle}>
      {title != 'Dashboard' && (
        <TouchableOpacity
          onPress={e => {
            navigation.navigate('DashboardScreen');
          }}
          style={stylesCommon.headerLeft}>
          <Icon
            style={stylesCommon.headerIconBack}
            name="arrow-left"
            size={ResponsiveUtils.normalize(34)}
            color="#ffffff"
          />
        </TouchableOpacity>
      )}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: '100%',
        }}>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
          }}>
          {title}
        </Text>
      </View>

      <View style={stylesCommon.headerRight} />
      <View style={stylesCommon.headerRight}>
        {notifications && (
          <TouchableOpacity
            style={styles.btnNotification}
            onPress={screenProps.openNotification}>
            <Image
              source={require('@assets/icons/ic_notifications.png')}
              style={styles.icNotifications}
            />
            <View style={styles.numberOfNotifications}>
              <Text style={styles.lbNumberNotifications}>
                {notifications.length}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {/* 
        <TouchableOpacity
          style={[styles.row, styles.userInfoWrapper]}
          onPress={() => PopupMenuSetting.show()}>
          <Icon
            size={ResponsiveUtils.normalize(40)}
            name={'bars'}
            color={'white'}
          />
        </TouchableOpacity> */}
        <PopupMenuSetting
          ref={ref => PopupMenuSetting.setRef(ref)}
          onRequestClose={() => {
            PopupMenuSetting.hide();
          }}
          navigation={navigation}
        />
      </View>
    </View>
  );
};
export default Header;
