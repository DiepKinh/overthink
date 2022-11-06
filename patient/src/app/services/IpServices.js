import http from './http';

export default class Ip {
  static getAllPrinters() {
    return new Promise((resolve, reject) => {
      http
        .get('/app_setting/printers')
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
