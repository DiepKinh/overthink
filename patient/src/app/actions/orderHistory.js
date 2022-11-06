import * as ActionTypes from './ActionTypes';
import OrderHistoryServices from '@services/OrderHistoryServices';

export const getAllOrdersHistory = user_id => {
  return dispatch => {
    return OrderHistoryServices.getAllOrdersHistory(user_id)
      .then(({data}) => {
        dispatch({type: 'GET_ALL_ORDER_HISTORY_SUCCESS', data: data.data});
      })
      .catch(message => {
        dispatch({type: 'GET_ALL_ORDER_HISTORY_FAIL', message});
      });
  };
};
