import {get} from 'lodash';
import * as ActionTypes from './ActionTypes';
import LichServices from '@services/LichServices';

export const getLichKham = params => dispatch => {
  dispatch({type: ActionTypes.GET_LICH_REQUEST});
  const body = {
    ...params,
  };
  return LichServices.getLichKham(body)
    .then(({data}) => {
      dispatch({type: ActionTypes.GET_LICH_SUCCESS, data: data});
    })
    .catch(message => {
      dispatch({type: ActionTypes.GET_LICH_FAIL, message});
    });
};

export const getLichKhamTheoNgay = (params, ngay) => dispatch => {
  dispatch({type: ActionTypes.GET_LICH_THEO_NGAY_REQUEST});
  const body = {
    ...params,
  };
  const bodyNgay = {
    ...ngay,
  };
  console.log('======params', body.mabacsi);
  console.log('======ngay', ngay + '');

  return LichServices.getLichKhamTheoNgay(body, bodyNgay)
    .then(({data}) => {
      dispatch({type: ActionTypes.GET_LICH_THEO_NGAY_SUCCESS, data: data});
    })
    .catch(message => {
      dispatch({type: ActionTypes.GET_LICH_THEO_NGAY_FAIL, message});
    });
};

export const getLichKhamTheoNgayGio = (params, ngay, gio) => dispatch => {
  dispatch({type: ActionTypes.GET_LICH_KHAM_REQUEST});
  const body = {
    ...params,
  };
  const bodyNgay = {
    ...ngay,
  };

  console.log('======params', body.mabacsi);
  console.log('======ngay', ngay + '');
  console.log('======gio', gio + '');

  return LichServices.getLichKhamTheoNgayGio(body, bodyNgay, gio)
    .then(({data}) => {
      dispatch({type: ActionTypes.GET_LICH_KHAM_SUCCESS, data: data});
    })
    .catch(message => {
      dispatch({type: ActionTypes.GET_LICH_KHAM_FAIL, message});
    });
};

export const updateLichKham = params => dispatch => {
  dispatch({type: ActionTypes.UPDATE_LICH_KHAM_REQUEST});
  const body = {
    ...params,
  };
  console.log('======params', body.masolich);
  console.log('======body', body);

  return LichServices.updateLichKham(body)
    .then(({data}) => {
      dispatch({type: ActionTypes.UPDATE_LICH_KHAM_SUCCESS, data: data});
    })
    .catch(message => {
      dispatch({type: ActionTypes.UPDATE_LICH_KHAM_FAIL, message});
    });
};

export const getLichKhamBenhNhan = params => dispatch => {
  dispatch({type: ActionTypes.GET_LIST_LICH_BN_REQUEST});
  const body = {
    ...params,
  };
  console.log('======params', body.mabenhnhan);

  return LichServices.getLichKhamBenhNhan(body)
    .then(({data}) => {
      dispatch({type: ActionTypes.GET_LIST_LICH_BN_SUCCESS, data: data});
    })
    .catch(message => {
      dispatch({type: ActionTypes.GET_LIST_LICH_BN_FAIL, message});
    });
};

export const addOrder = params => dispatch => {
  dispatch({type: ActionTypes.ADD_ORDER_REQUEST});
  const body = {
    ...params,
  };
  return LichServices.addOrder(body)
    .then(({data}) => {
      const order = {
        ...data,
      };
      dispatch({type: 'ADD_ORDER_SUCCESS', data: order.data});
    })
    .catch(message => {
      dispatch({type: 'ADD_ORDER_FAIL', message: message});
    });
};

export const updateOrder = params => dispatch => {
  dispatch({type: 'REQUEST_ORDERS'});
  const body = {
    ...params,
  };
  return LichServices.updateOrder(body)
    .then(({data, status}) => {
      const orderUpdated = {
        ...data,
      };
      dispatch({type: ActionTypes.UPDATE_ORDER_SUCCESS, data: orderUpdated});
    })
    .catch(message => {
      console.log(message);
      dispatch({type: 'UPDATE_ORDER_FAIL', message});
    });
};
