import {persistCombineReducers} from 'redux-persist';
import storage from '@react-native-community/async-storage';
import {createWhitelistFilter} from 'redux-persist-transform-filter';

import userReducers from './user';
import settingReducers from './setting';
import chuyenKhoaReducers from './chuyenkhoa';
import bacsiReducers from './bacsi';
import lichReducers from './lich';
import printerReducers from './printer';
import tableReducers from './table';
import ipReducers from './ipPrinter';
import storeReducers from './store';
import orderHistoryReducers from './orderHistory';

const config = {
  key: 'root',
  storage,
  transforms: [
    createWhitelistFilter('userReducers', ['login.result']),
    createWhitelistFilter('settingReducers'),
    createWhitelistFilter('printerReducers', ['print']),
  ],
};

const appReducer = persistCombineReducers(config, {
  userReducers,
  settingReducers,
  chuyenKhoaReducers,
  bacsiReducers,
  lichReducers,
  printerReducers,
  tableReducers,
  ipReducers,
  storeReducers,
  orderHistoryReducers,
});

export default reducers = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    storage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};
