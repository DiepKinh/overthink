import http from './http';

export default class OrderHistory {
  static getAllOrdersHistory(user_id) {
    if (user_id === undefined) {
      user_id = '';
    }
    return new Promise((resolve, reject) => {
      http
        .get(`/order?today=true?employee_id=${user_id}`)
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
