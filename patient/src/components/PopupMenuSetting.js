import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {get} from 'lodash';
import Modal from './Modal';
import {ResponsiveUtils, ThemeUtils, Colors} from '@common';
import {useDispatch} from 'react-redux';
const menus = [
  {name: 'Orders Management', route: 'Order'},
  {name: 'Setting Prints', route: 'EditProfileScreen'},
  {name: 'My Profile', route: 'ChangePassword'},
  {name: 'Setting Other', route: 'Setting'},
  {name: 'Help', route: 'EditProfileScreen'},
  {name: 'Contact Anreji', route: 'Contact'},
];

const dynamicStyles = isDarkMode => {
  return StyleSheet.create({
    container: {
      width: ResponsiveUtils.normalize(Dimensions.get('window').width * 0.8),
      paddingVertical: ResponsiveUtils.normalize(8),
    },
    modal: {
      flex: 1,
      alignItems: 'center',
    },
    list: {
      width: '100%',
      height: '100%',
    },

    menuItem: {
      paddingHorizontal: ResponsiveUtils.normalize(34),
      paddingVertical: ResponsiveUtils.normalize(8),
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 2,
      borderWidth: 1,
      height: ResponsiveUtils.normalize(60),
      marginVertical: ResponsiveUtils.normalize(3),
      flexDirection: 'row',
    },
    imageItem: {
      height: ResponsiveUtils.normalize(50),
      width: ResponsiveUtils.normalize(50),
      borderRadius: 10,
    },
    menuText: {
      fontSize: ResponsiveUtils.normalize(14),
      paddingHorizontal: ResponsiveUtils.normalize(20),
      textAlign: 'center',
      color: 'black',
      ...ThemeUtils.fontMaker({weight: '400'}),
    },
  });
};

const styles = dynamicStyles(false);

class PopupMenuSetting extends Component {
  static _ref = null;
  static setRef(ref = {}) {
    this._ref = ref;
  }

  static getRef() {
    return this._ref;
  }

  static clearRef() {
    this._ref = null;
  }
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  _setState(reducer) {
    return new Promise(resolve => this.setState(reducer, () => resolve()));
  }
  show() {
    this._setState({show: true});
  }

  hide() {
    this._setState({show: false});
  }
  static show() {
    this._ref.show();
  }
  static hide() {
    this._ref.hide();
  }

  render() {
    const {show} = this.state;
    const {data, onRequestClose, navigation} = this.props;
    return (
      <Modal
        visible={show}
        onRequestClose={onRequestClose}
        title="Menu"
        modalStyle={styles.modal}
        containerStyle={styles.container}>
        <FlatList
          style={styles.list}
          data={[
            {
              name: 'Orders Management',
              router: 'ManagmentOrder',
              icon: require('@assets/icons/DanhSachDon.png'),
            },
            {
              name: 'Products Management',
              router: 'Products',
              icon: require('@assets/icons/SanPham.png'),
            },
            {
              name: 'Setting Bill',
              router: 'PrinterScreen',
              icon: require('@assets/icons/ic_bill.png'),
            },
            {
              name: 'Setting',
              router: 'Setting',
              icon: require('@assets/icons/setting.png'),
            },
            {
              name: 'Log out',
              router: 'LoginScreen',
              icon: require('@assets/icons/setting.png'),
            },
          ]}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={e => {
                  console.log(item.router);
                  navigation.navigate(item.router);
                  this._setState({show: false});
                }}
                style={styles.menuItem}>
                <Image style={styles.imageItem} source={item.icon} />

                <Text style={styles.menuText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.separatorImage} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </Modal>
    );
  }
}

export default PopupMenuSetting;
