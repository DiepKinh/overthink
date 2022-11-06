import {Currencies} from '@common/data/Currencies';
import * as ActionTypes from '../actions/ActionTypes';
import {languages} from '@common/data/Languages';

const defaultState = {
  stores: [],
  storeCurrent: {},
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

    case 'SET_STORE': {
      return {
        ...state,
        storeCurrent: action.data,
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
