import * as ActionTypes from '../actions/ActionTypes';
const defaultState = {
  ip: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_IP_SUCCESS: {
      return {
        ...state,
        ip: {
          ...state.ip,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.GET_ALL_ID_IP_FAIL: {
      return {
        ...state,
        ip: {
          ...state.ip,
          error: action.message,
          status: 'error',
        },
      };
    }
    default:
      return state;
  }
}
