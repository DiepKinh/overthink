import * as ActionTypes from './ActionTypes';
import StoreServices from '@services/StoreServices';

export const getAllStores = () => {
  return dispatch => {
    dispatch({type: 'GET_ALL_STORE_REQUEST'});
    return StoreServices.getAllStores()
      .then(({data}) => {
        dispatch({type: 'GET_ALL_STORE_SUCCESS', data: data});
      })
      .catch(message => {
        dispatch({type: 'GET_ALL_STORE_FAIL', message});
      });
  };
};
