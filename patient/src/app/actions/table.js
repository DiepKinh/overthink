import * as ActionTypes from './ActionTypes';
import I18n from '@common/I18n';
import TableServices from '@services/TableServices';

export const getAllTables = () => {
  return dispatch => {
    dispatch({type: 'REQUEST_TABLE'});
    return TableServices.getAllTables()
      .then(({data}) => {
        var _data = data.data;
        dispatch({type: 'GET_ALL_TABLE_SUCCESS', data: _data});
      })
      .catch(message => {
        dispatch({
          type: ActionTypes.GET_ALL_TABLE_FAIL,
          message: I18n.t('app.error'),
        });
      });
  };
};
