import * as ActionTypes from '../actions/ActionTypes';
const defaultState = {
  table: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case 'REQUEST_TABLE': {
      return {
        ...state,
        table: {
          ...state.table,
          requesting: true,
        },
      };
    }

    case 'GET_ALL_TABLE_SUCCESS': {
      return {
        ...state,
        table: {
          ...state.table,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case 'GET_ALL_TABLE_FAIL': {
      return {
        ...state,
        table: {
          ...state.table,
          error: action.message,
          status: 'error',
          requesting: false,
        },
      };
    }
    default:
      return state;
  }
}
