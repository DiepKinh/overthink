/* eslint-disable radix */
import React, {Component} from 'react';
import {View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import {connect} from 'react-redux';
import {ActionCreators} from '@actions';
import {bindActionCreators} from 'redux';
import {StackActions, NavigationActions} from 'react-navigation';
import {DarkModeProvider} from 'react-native-dark-mode';
import {MenuProvider} from 'react-native-popup-menu';
import * as RNLocalize from 'react-native-localize';
import moment from 'moment';
import {get} from 'lodash';
import socket from '@common/server';

import {Utils} from '@common';
import ModalQuickLinks from '@components/ModalQuickLinks';
import ModalNotification from '@components/ModalNotification';
import {languages} from '@common/data/Languages';
import I18n from '@common/I18n';
import Router from './Router';
import Orientation from 'react-native-orientation-locker';
import {getAllToppings} from '../actions/topping';
const notifications = ['English', 'Vietnamese', 'China', 'Laos'];
require('../common/server');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleQuickLinks: false,
      visbleNotification: false,
      pageTitle: '',
    };
    this._subscription = null;
    this.setLanguage();
  }

  async componentDidMount() {
    Orientation.lockToPortrait();
    socket.on('on_change_table', data => {
      const {getAllTables, userReducers} = this.props;
      console.log(JSON.stringify(data));
      console.log(userReducers.login.user.business_id);
      if (userReducers.login.user.business_id != undefined) {
        var arr = new String(data).split('#');
        if (parseInt(userReducers.login.user.business_id) == parseInt(arr[0]))
          getAllTables();
      }
    });

    socket.on('on_change_printer', data => {
      const {getAllPrinters, userReducers} = this.props;
      if (userReducers.login.user.business_id != undefined) {
        var arr = new String(data).split('#');
        if (parseInt(userReducers.login.user.business_id) == parseInt(arr[0]))
          getAllPrinters();
      }
    });

    socket.on('on_change_product', data => {
      const {getAllProducts, userReducers} = this.props;
      if (userReducers.login.user.business_id != undefined) {
        var arr = new String(data).split('#');
        if (parseInt(userReducers.login.user.business_id) == parseInt(arr[0]))
          getAllProducts();
      }
    });

    socket.on('on_change_category', data => {
      const {getCategories, userReducers} = this.props;
      if (userReducers.login.user.business_id != undefined) {
        var arr = new String(data).split('#');
        if (parseInt(userReducers.login.user.business_id) == parseInt(arr[0]))
          getCategories();
      }
    });

    socket.on('on_change_staff', data => {
      const {getStaffs, userReducers} = this.props;
      if (userReducers.login.user.business_id != undefined) {
        var arr = new String(data).split('#');
        if (parseInt(userReducers.login.user.business_id) == parseInt(arr[0]))
          getStaffs();
      }
    });

    this._subscription = NetInfo.addEventListener(
      this._handleConnectionInfoChange,
    );
  }

  componentWillUnmount() {
    this._subscription && this._subscription();
  }

  setLanguage = () => {
    const {language, changeLanguage} = this.props;
    if (!language) {
      const locales = RNLocalize.getLocales();
      let defaultLang = languages[0];
      if (Array.isArray(locales)) {
        const deviceLang = languages.filter(
          item => item.value === locales[0].languageTag,
        );
        if (deviceLang.length > 0) {
          defaultLang = deviceLang[0];
        }
      }
      changeLanguage(defaultLang);
    } else {
      I18n.locale = language.value;
      moment.locale(language.value.substring(0, 2));
    }
  };

  _handleConnectionInfoChange = state => {
    const {connectionInfoChange} = this.props;
    connectionInfoChange(state.isInternetReachable);
    if (state.isInternetReachable) {
      // alert('Have Internet, Sycning Data !!');
      this.syncData();
    } else {
      // alert("Don't Have Internet, Enable Mod POS Off !!");
    }
  };

  syncData = async () => {
    this.refreshData();
  };

  refreshData = () => {
    const {
      productReducers,
      categoryReducers,
      orderReducers,
      getCategories,
      getAllProducts,
      // getAllOrders,
      getAllOptions,
      optionReducers,
      getAllToppings,
      toppingReducers,
    } = this.props;
    if (!categoryReducers.categories.requesting) {
      getCategories();
    }
    if (!productReducers.products.requesting) {
      getAllProducts();
    }
    // if (!orderReducers.orders.requesting) {
    //   getAllOrders();
    // }

    if (!toppingReducers.topping.requesting) {
      getAllToppings();
    }

    if (!optionReducers.options.requesting) {
      getAllOptions();
    }
  };

  openQuickLink = link => {
    this.toggleQuickLinks();
    this.navigate({routeName: link.key});
  };

  navigate = ({routeName, params}) => {
    this.navigatorRef.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };

  handleNavigationChange = (prevState, newState, action) => {
    if (action.type !== 'Navigation/COMPLETE_TRANSITION') {
      const pageTitle = Utils.getPageTitle(newState);
      if (pageTitle) {
        this.setState({
          pageTitle,
        });
      }
    }
  };

  toggleQuickLinks = () => {
    const {visibleQuickLinks} = this.state;
    this.setState({
      visibleQuickLinks: !visibleQuickLinks,
    });
  };

  toggleNotification = () => {
    const {visbleNotification} = this.state;
    this.setState({
      visbleNotification: !visbleNotification,
    });
  };

  handleLogout = () => {
    const {logout} = this.props;
    logout();
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
      });
      this.navigatorRef.dispatch(resetAction);
    }, 500);
  };

  render() {
    const {loginReducer, isDarkMode} = this.props;
    const {visibleQuickLinks, pageTitle, visbleNotification} = this.state;
    const userInfo = loginReducer.result;

    return (
      <View style={{flex: 1}}>
        <DarkModeProvider mode={isDarkMode ? 'dark' : 'light'}>
          <MenuProvider>
            <Router
              ref={ref => {
                this.navigatorRef = ref;
              }}
              screenProps={{
                title: pageTitle,
                showNotifications: () => {},
                openQuickLinks: this.toggleQuickLinks,
                openNotification: this.toggleNotification,
                logout: this.handleLogout,
                userInfo,
                isDarkMode,
              }}
              onNavigationStateChange={this.handleNavigationChange}
            />
          </MenuProvider>
          <ModalQuickLinks
            visible={visibleQuickLinks}
            close={this.toggleQuickLinks}
            openQuickLink={this.openQuickLink}
          />
          <ModalNotification
            visible={visbleNotification}
            onRequestClose={this.toggleNotification}
            isDarkMode={isDarkMode}
            data={notifications}
          />
        </DarkModeProvider>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect(
  state => ({
    loginReducer: state.userReducers.login,
    isDarkMode: state.settingReducers.isDarkMode,
    language: state.settingReducers.language,
    currency: state.settingReducers.currency,
    categoryReducers: state.categoryReducers,
    orderReducers: state.orderReducers,
    productReducers: state.productReducers,
    customerReducers: state.customerReducers,
    couponReducers: state.couponReducers,
    userReducers: state.userReducers,
    toppingReducers: state.toppingReducers,
    optionReducers: state.optionReducers,
    orderHistoryReducers: state.orderHistoryReducers,
  }),
  mapDispatchToProps,
)(App);
