import * as ActionTypes from '../actions/ActionTypes';

const defaultState = {
  lich: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
  gio: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
  lichkham: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
  lichbenhnhan: {
    status: '',
    result: null,
    error: null,
    requesting: true,
  },
  updateLichKham: {
    status: '',
    result: [],
    error: null,
    requesting: true,
  },
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_LICH_REQUEST: {
      return {
        ...state,
        lich: {
          ...state.lich,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_LICH_SUCCESS: {
      return {
        ...state,
        lich: {
          ...state.lich,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.GET_LICH_FAIL: {
      return {
        ...state,
        lich: {
          ...state.lich,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    case ActionTypes.GET_LICH_THEO_NGAY_REQUEST: {
      return {
        ...state,
        gio: {
          ...state.gio,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_LICH_THEO_NGAY_SUCCESS: {
      return {
        ...state,
        gio: {
          ...state.gio,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.GET_LICH_THEO_NGAY_FAIL: {
      return {
        ...state,
        gio: {
          ...state.gio,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    case ActionTypes.GET_LICH_KHAM_REQUEST: {
      return {
        ...state,
        lichkham: {
          ...state.lichkham,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_LICH_KHAM_SUCCESS: {
      return {
        ...state,
        lichkham: {
          ...state.lichkham,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.GET_LICH_KHAM_FAIL: {
      return {
        ...state,
        lichkham: {
          ...state.lichkham,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    case ActionTypes.UPDATE_LICH_KHAM_REQUEST: {
      return {
        ...state,
        updateLichKham: {
          ...state.updateLichKham,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.UPDATE_LICH_KHAM_SUCCESS: {
      return {
        ...state,
        updateLichKham: {
          ...state.updateLichKham,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.UPDATE_LICH_KHAM_FAIL: {
      return {
        ...state,
        updateLichKham: {
          ...state.updateLichKham,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    case ActionTypes.GET_LIST_LICH_BN_REQUEST: {
      return {
        ...state,
        lichbenhnhan: {
          ...state.lichbenhnhan,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_LIST_LICH_BN_SUCCESS: {
      return {
        ...state,
        lichbenhnhan: {
          ...state.lichbenhnhan,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }

    case ActionTypes.GET_LIST_LICH_BN_FAIL: {
      return {
        ...state,
        lichbenhnhan: {
          ...state.lichbenhnhan,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }

    // case ActionTypes.UPDATE_ORDER_SUCCESS: {
    //   console.log('Update Order Success');
    //   return {
    //     ...state,
    //     updateOrder: {
    //       ...state.updateOrder,
    //       error: null,
    //       status: 'success',
    //       requesting: false,
    //     },
    //   };
    // }

    // case 'UPDATE_ORDER_FAIL': {
    //   console.log('Update Order faile');
    //   return {
    //     ...state,
    //     updateOrder: {
    //       requesting: false,
    //       error: action.data,
    //       status: 'error',
    //     },
    //   };
    // }

    // case ActionTypes.ADD_ORDER_REQUEST: {
    //   return {
    //     ...state,
    //     addOrder: {
    //       result: null,
    //       requesting: true,
    //       error: null,
    //       status: '',
    //     },
    //   };
    // }
    // case 'ADD_ORDER_SUCCESS': {
    //   return {
    //     ...state,
    //     addOrder: {
    //       ...state.addOrder,
    //       result: action.data,
    //       requesting: false,
    //       status: 'success',
    //     },
    //     orders: {
    //       ...state.orders,
    //       result: [...state.orders.result, action.data],
    //     },
    //   };
    // }
    // case 'ADD_ORDER_FAIL': {
    //   return {
    //     ...state,
    //     addOrder: {
    //       ...state.addOrder,
    //       error: action.message,
    //       requesting: false,
    //       status: 'error',
    //     },
    //   };
    // }

    default:
      return state;
  }
}
