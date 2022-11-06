import * as ActionTypes from '../actions/ActionTypes';
const defaultState = {
  orderHistory: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_ORDER_HISTORY_SUCCESS: {
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
          result: [...action.data],
          status: 'success',
          requesting: false,
        },
      };
    }

    case ActionTypes.GET_ALL_ORDER_HISTORY_FAIL: {
      return {
        ...state,
        orderHistory: {
          ...state.orderHistory,
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
