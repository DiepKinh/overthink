import * as ActionTypes from './ActionTypes';
import I18n from '@common/I18n';
import IpServices from '@services/IpServices';

export const getAllPrinters = () => {
  return dispatch => {
    return IpServices.getAllPrinters()
      .then(({data}) => {
        var _data = data.data;
        dispatch({type: ActionTypes.GET_ALL_IP_SUCCESS, data: [_data]});
      })
      .catch(message => {
        dispatch({
          type: ActionTypes.GET_ALL_ID_IP_FAIL,
          message: I18n.t('app.error'),
        });
      });
  };
};
