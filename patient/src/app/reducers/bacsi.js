import * as ActionTypes from '../actions/ActionTypes';

const defaultState = {
  bacsis: {
    status: '',
    result: [],
    error: null,
    requesting: false,
  },
  bacsichuyenkhoa: {
    status: '',
    result: [],
    error: null,
    requesting: false,
  },
  deletedProducts: [],
  addProduct: {
    status: '',
    result: null,
    error: null,
    requesting: false,
  },
  syncAddProducts: {
    status: '',
    result: null,
    error: null,
    requesting: false,
  },
  syncEditingProducts: {
    status: '',
    result: null,
    error: null,
    requesting: false,
  },
};

export default function base(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_BACSI_REQUEST: {
      return {
        ...state,
        bacsis: {
          ...state.bacsis,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_ALL_BACSI_SUCCESS: {
      return {
        ...state,
        bacsis: {
          ...state.bacsis,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }
    case ActionTypes.GET_ALL_BACSI_FAIL: {
      return {
        ...state,
        bacsis: {
          ...state.bacsis,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case ActionTypes.GET_BACSI_CHUYENKHOA_REQUEST: {
      return {
        ...state,
        bacsichuyenkhoa: {
          ...state.bacsichuyenkhoa,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.GET_BACSI_CHUYENKHOA_SUCCESS: {
      return {
        ...state,
        bacsichuyenkhoa: {
          ...state.bacsichuyenkhoa,
          result: [...action.data],
          requesting: false,
          status: 'success',
        },
      };
    }
    case ActionTypes.GET_BACSI_CHUYENKHOA_FAIL: {
      return {
        ...state,
        bacsichuyenkhoa: {
          ...state.bacsichuyenkhoa,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case ActionTypes.ADD_PRODUCT_REQUEST: {
      return {
        ...state,
        addProduct: {
          result: null,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        addProduct: {
          ...state.addProduct,
          result: action.data,
          requesting: false,
          status: 'success',
        },
        products: {
          ...state.products,
          result: [...state.products.result, action.data],
        },
      };
    }
    case ActionTypes.ADD_PRODUCT_FAIL: {
      return {
        ...state,
        addProduct: {
          ...state.addProduct,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case ActionTypes.DELETE_PRODUCT_REQUEST: {
      return {
        ...state,
        products: {
          ...state.products,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.DELETE_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          result: state.products.result.filter(item => item.id !== action.id),
          status: 'success',
        },
      };
    }
    case ActionTypes.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.message,
          status: 'error',
        },
      };
    }
    case ActionTypes.SAVE_PRODUCT_DELETED: {
      return {
        ...state,
        deletedProducts: [...state.deletedProducts, action.id],
        products: {
          ...state.products,
          result: state.products.result.filter(item => item.id !== action.id),
          status: 'success',
        },
      };
    }
    case ActionTypes.EDIT_PRODUCT_REQUEST: {
      return {
        ...state,
        products: {
          ...state.products,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.EDIT_PRODUCT_SUCCESS: {
      return {
        ...state,
        products: {
          ...state.products,
          result: state.products.result.map(item =>
            item.id === action.data.id ? action.data : item,
          ),
          status: 'success',
        },
      };
    }
    case ActionTypes.EDIT_PRODUCT_FAIL: {
      return {
        ...state,
        products: {
          ...state.products,
          error: action.message,
          status: 'error',
        },
      };
    }
    case ActionTypes.SYNC_ADD_PRODUCTS_REQUEST: {
      return {
        ...state,
        syncAddProducts: {
          ...state.syncAddProducts,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.SYNC_ADD_PRODUCTS_SUCCESS: {
      return {
        ...state,
        syncAddProducts: {
          ...state.syncAddProducts,
          result: action.data,
          requesting: false,
          status: 'success',
        },
        products: {
          ...state.products,
          result: [
            ...state.products.result.filter(
              item => !action.localIds.includes(item.id),
            ),
            ...action.data,
          ],
        },
      };
    }
    case ActionTypes.SYNC_ADD_PRODUCTS_FAIL: {
      return {
        ...state,
        syncAddProducts: {
          ...state.syncAddProducts,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case ActionTypes.SYNC_EDITING_PRODUCTS_REQUEST: {
      return {
        ...state,
        syncEditingProducts: {
          ...state.syncEditingProducts,
          requesting: true,
          error: null,
          status: '',
        },
      };
    }
    case ActionTypes.SYNC_EDITING_PRODUCTS_SUCCESS: {
      return {
        ...state,
        syncEditingProducts: {
          ...state.syncEditingProducts,
          result: action.data,
          requesting: false,
          status: 'success',
        },
        products: {
          ...state.products,
          result: state.products.result.map(item => {
            const index = action.ids.indexOf(item.id);
            return index > -1 ? action.data[index] : item;
          }),
        },
      };
    }
    case ActionTypes.SYNC_EDITING_PRODUCTS_FAIL: {
      return {
        ...state,
        syncEditingProducts: {
          ...state.syncEditingProducts,
          error: action.message,
          requesting: false,
          status: 'error',
        },
      };
    }
    case ActionTypes.SYNC_DELETING_PRODUCTS_SUCCESS: {
      return {
        ...state,
        deletedProducts: state.deletedProducts.filter(
          id => !action.ids.includes(id),
        ),
      };
    }

    default:
      return state;
  }
}
