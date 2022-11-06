import * as ActionTypes from '../actions/ActionTypes';

const defaultState = {
  print: {
    port: '',
    host: '',
  },
};
export default function base(state = defaultState, action) {
  switch (action.type) {
    case 'GET_ALL_PRINTER': {
      return state;
    }

    case ActionTypes.ADD_IP_SUCCESS: {
      return {
        ...state,
        print: {
          port: action.data.port,
          host: action.data.host,
        },
      };
    }
    default:
      return state;
  }
}
