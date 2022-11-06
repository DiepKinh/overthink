import {Currencies} from '@common/data/Currencies';
import * as ActionTypes from '../actions/ActionTypes';
import {languages} from '@common/data/Languages';

const defaultState = {
  isDarkMode: false,
  isOfflineMode: false,
  language: languages[0],
  currency: Currencies[0],
  name_restaurant: 'Anreji',
  phone_restaurant: '000000',
  id_restaurant: 1,
  defaultMethod: 'CASH',
  stores: [],
  requesting: false,
  error: '',
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case 'GET_ALL_STORE_REQUEST':
      return {
        ...state,
        requesting: true,
      };
    case 'GET_ALL_STORE_SUCCESS':
      return {
        ...state,
        stores: action.data,
        requesting: false,
      };
    case 'GET_ALL_STORE_FAIL':
      return {
        ...state,
        stores: [],
        error: action.data,
        requesting: false,
      };

    case ActionTypes.USER_CHANGE_LANG: {
      return {
        ...state,
        language: action.data,
      };
    }
    case ActionTypes.USER_TOGGLE_DARK_MODE: {
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    }
    case ActionTypes.CONNECTION_INFO_CHANGE: {
      return {
        ...state,
        isOfflineMode: !action.isConnected,
      };
    }
    case ActionTypes.USER_CHANGE_CURRENCY: {
      return {
        ...state,
        currency: action.data,
      };
    }

    case 'SET_DEFAULT_METHOD': {
      return {
        ...state,
        defaultMethod: action.data,
      };
    }

    default:
      return state;
  }
}
