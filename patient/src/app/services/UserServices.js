import {get} from 'lodash';
import http from './http';
import jwt_decode from 'jwt-decode';
export default class User {
  static login(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/user/login', body)
        .then(({data}) => {
          console.log('Login thành công');
          // var user = jwt_decode(data.data.accessToken);
          // http.setAuthorizationHeader(data.data.accessToken);
          // data.data.user = user;
          resolve({data: data});
        })
        .catch(error => {
          console.log('Login Error');
          console.log(error);
          reject(error);
        });
    });
  }

  static register(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/register', body)
        .then(({data}) => {
          console.log('register thành công');
          resolve({data: data});
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static chinhSuaBenhNhan(body) {
    return new Promise((resolve, reject) => {
      http
        .put(`/chinhsuabenhnhan/${body.mabenhnhan}`, body)
        .then(({data}) => {
          console.log('Chỉnh sữa thành công!');
          resolve({data: data});
          console.log(
            '=====chinhsuabenhnhan=====' +
              `/chinhsuabenhnhan/${body.mabenhnhan}`,
          );
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }

  static openTimeStaff(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/user/staff/open', body)
        .then(({data}) => {
          resolve({data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static closeTimeStaff(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/user/staff/close', body)
        .then(({data}) => {
          resolve({data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static logoutStaff(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/user/staff/logout', {})
        .then(({data}) => {
          resolve({data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // static register(body) {
  //   return new Promise((resolve, reject) => {
  //     http
  //       .post('/users/register', body)
  //       .then(({data}) => {
  //         const userInfo = {
  //           id: data._id,
  //           email: data.email,
  //           firstName: get(data, 'firstName', ''),
  //           lastName: get(data, 'lastName', ''),
  //           avatar: get(data, 'avatar', ''),
  //           role: data.role,
  //           token: data.token,
  //           authType: data.authType,
  //         };
  //         resolve({data: userInfo});
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }

  static changePassword(body) {
    return new Promise((resolve, reject) => {
      http
        .put('/users/change_password', body)
        .then(({data}) => {
          resolve({data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateUser(body) {
    return new Promise((resolve, reject) => {
      http
        .put('/users', body)
        .then(({data}) => {
          const userInfo = {
            id: data._id,
            email: data.email,
            firstName: get(data, 'firstName', ''),
            lastName: get(data, 'lastName', ''),
            avatar: get(data, 'avatar', ''),
            role: data.role,
          };
          resolve({data: userInfo});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static getStaffs() {
    return new Promise((resolve, reject) => {
      http
        .get('/users/staff')
        .then(({data}) => {
          const staffs = data.map(item => ({
            id: item._id,
            email: item.email,
            firstName: get(item, 'firstName', ''),
            lastName: get(item, 'lastName', ''),
            avatar: get(item, 'avatar', ''),
            role: item.role,
          }));
          resolve({data: staffs});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static addStaff(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/users/staff', body)
        .then(({data}) => {
          const staff = {
            id: data._id,
            email: data.email,
            firstName: get(data, 'firstName', ''),
            lastName: get(data, 'lastName', ''),
            avatar: get(data, 'avatar', ''),
            role: data.role,
          };
          resolve({data: staff});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static deleteStaff(id) {
    return new Promise((resolve, reject) => {
      http
        .delete(`/users/staff/${id}`)
        .then(({data}) => {
          resolve({data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static editStaff(params) {
    return new Promise((resolve, reject) => {
      http
        .put(`/users/staff/${params.id}`, params)
        .then(({data}) => {
          const staff = {
            id: data._id,
            email: data.email,
            firstName: get(data, 'firstName', ''),
            lastName: get(data, 'lastName', ''),
            avatar: get(data, 'avatar', ''),
            role: data.role,
          };
          resolve({data: staff});
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
