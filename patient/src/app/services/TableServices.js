import http from './http';

export default class Table {
  static getAllTables() {
    return new Promise((resolve, reject) => {
      http
        .get('/listbacsi')
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
