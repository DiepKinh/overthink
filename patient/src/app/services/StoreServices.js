import http from './http';

export default class Common {
  static getAllStores() {
    return new Promise((resolve, reject) => {
      http
        .get('/store')
        .then(({data}) => {
          var _data = [];
          if (data.data !== undefined) {
            data.data.map(item => {
              if (item.active) _data.push(item);
            });
          }
          resolve({data: _data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
