import * as ActionTypes from './ActionTypes';

export const toggleOnlineMode = () => {
  return dispatch => {
    dispatch({type: ActionTypes.GET_CUSTOMERS_REQUEST});

    return CustomerServices.getCustomers()
      .then(({data}) => {
        dispatch({type: ActionTypes.GET_CUSTOMERS_SUCCESS, data});
      })
      .catch(message => {
        dispatch({type: ActionTypes.GET_CUSTOMERS_FAIL, message});
      });
  };
};
