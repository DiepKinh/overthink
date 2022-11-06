import * as ActionTypes from './ActionTypes';
import validator from 'validator';
import UserServices from '@services/UserServices';

export const login = params => {
  return dispatch => {
    dispatch({type: ActionTypes.USER_LOGIN_REQUEST});
    const {username, password} = params;

    if (password.length === 0) {
      return dispatch({
        type: ActionTypes.USER_LOGIN_FAIL,
        message: 'The password is required',
      });
    }

    return UserServices.login(params)
      .then(({data}) => {
        dispatch({type: ActionTypes.USER_LOGIN_SUCCESS, data: data});
      })
      .catch(message => {
        console.log('pram', message);
        dispatch({
          type: ActionTypes.USER_LOGIN_FAIL,
          message: 'System or internet error please try again !',
        });
      });
  };
};

export const register = params => {
  return dispatch => {
    dispatch({type: ActionTypes.USER_REGISTER_REQUEST});
    return UserServices.register(params)
      .then(({data}) => {
        dispatch({type: ActionTypes.USER_REGISTER_SUCCESS, data: data});
      })
      .catch(message => {
        console.log('pram', message);
        dispatch({
          type: ActionTypes.USER_REGISTER_FAIL,
          message: 'System or internet error please try again !',
        });
      });
  };
};
export const chinhSuaBenhNhan = params => {
  return dispatch => {
    dispatch({type: ActionTypes.UPDATE_BENHNHAN_REQUEST});

    return UserServices.chinhSuaBenhNhan(params)
      .then(({data}) => {
        dispatch({type: ActionTypes.UPDATE_BENHNHAN_SUCCESS, data});
      })
      .catch(message => {
        dispatch({type: ActionTypes.UPDATE_BENHNHAN_FAIL, message});
      });
  };
};

export const updateUser = params => {
  return dispatch => {
    dispatch({type: ActionTypes.UPDATE_USER_REQUEST});

    return UserServices.updateUser(params)
      .then(({data}) => {
        dispatch({type: ActionTypes.UPDATE_USER_SUCCESS, data});
      })
      .catch(message => {
        dispatch({type: ActionTypes.UPDATE_USER_FAIL, message});
      });
  };
};

export const openTimeStaff = params => {
  return dispatch => {
    dispatch({type: 'REQUEST_TIME_STAFF'});
    return UserServices.openTimeStaff({open_time: params})
      .then(({data}) => {
        dispatch({type: 'OPEN_TIME_STAFF_SUCCESS', data: params});
      })
      .catch(message => {
        dispatch({type: 'OPEN_TIME_STAFF_FAIL', message});
      });
  };
};

export const closeTimeStaff = params => {
  return dispatch => {
    dispatch({type: 'REQUEST_TIME_STAFF'});
    return UserServices.closeTimeStaff({close_time: params})
      .then(({data}) => {
        dispatch({type: 'CLOSE_TIME_STAFF_SUCCESS', data: params});
      })
      .catch(message => {
        dispatch({type: 'CLOSE_TIME_STAFF_FAIL', message});
      });
  };
};

export const getStaffs = () => {
  return dispatch => {
    dispatch({type: 'REQUEST_LIST_STAFF'});
    return UserServices.getStaffs()
      .then(({data}) => {
        dispatch({type: 'UPDATE_LIST_STAFF', data});
      })
      .catch(message => {
        dispatch({type: ActionTypes.GET_STAFFS_FAIL, message});
      });
  };
};

export const logout = params => {
  return dispatch => {
    dispatch({type: 'REQUEST_TIME_STAFF'});
    return UserServices.logoutStaff({close_time: params})
      .then(({data}) => {
        dispatch({type: 'STAFF_LOGOUT_SUCCESS', data: params});
      })
      .catch(message => {
        dispatch({type: 'STAFF_LOGOUT_FAIL', message});
      });
  };
};

export const syncEditingStaffs = staffs => dispatch => {
  dispatch({type: ActionTypes.SYNC_EDITING_STAFFS_REQUEST});
  return Promise.all(
    staffs.map(async params => {
      try {
        const {data} = await UserServices.editStaff(params);
        return data;
      } catch (error) {
        return error;
      }
    }),
  )
    .then(arrayOfValuesOrErrors => {
      const data = arrayOfValuesOrErrors.filter(item => !!item.id);
      const ids = data.map(item => item.id);
      dispatch({type: ActionTypes.SYNC_EDITING_STAFFS_SUCCESS, data, ids});
    })
    .catch(message => {
      dispatch({type: ActionTypes.SYNC_EDITING_STAFFS_FAIL, message});
    });
};

export const syncDeletingStaffs = staffs => dispatch => {
  dispatch({type: ActionTypes.SYNC_DELETING_STAFFS_REQUEST});
  return Promise.all(
    staffs.map(async id => {
      try {
        const {data} = await UserServices.deleteStaff(id);
        return {...data, id};
      } catch (error) {
        return error;
      }
    }),
  )
    .then(arrayOfValuesOrErrors => {
      const data = arrayOfValuesOrErrors.filter(item => !!item.id);
      const ids = data.map(item => item.id);
      dispatch({type: ActionTypes.SYNC_DELETING_STAFFS_SUCCESS, ids});
    })
    .catch(message => {
      dispatch({type: ActionTypes.SYNC_DELETING_STAFFS_FAIL, message});
    });
};
