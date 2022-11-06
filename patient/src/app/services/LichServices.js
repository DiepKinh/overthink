import http from './http';
import moment from 'moment';

export default class Lich {
  static getLichKham(query) {
    console.log('query', query);
    if (query == undefined) query = '';
    return new Promise((resolve, reject) => {
      http
        .get(`/listlichkham/${query.mabacsi}`)
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static getLichKhamTheoNgay(query, ngay) {
    if (query == undefined) query = '';
    return new Promise((resolve, reject) => {
      http
        .get(
          `/listlichkham/${query.mabacsi}/${moment(ngay).format('YYYY-MM-DD')}`,
        )
        .then(({data}) => {
          resolve({data: data});
          console.log(
            '=====ngay=====' +
              `/listlichkham/${query.mabacsi}/${moment(ngay).format(
                'YYYY-MM-DD',
              )}`,
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static getLichKhamTheoNgayGio(query, ngay, gio) {
    if (query == undefined) query = '';
    return new Promise((resolve, reject) => {
      http
        .get(
          `/listlichkham/${query.mabacsi}/${moment(ngay).format(
            'YYYY-MM-DD',
          )}/${gio}`,
        )
        .then(({data}) => {
          resolve({data: data});
          console.log(
            '=====ngay=====' +
              `/listlichkham/${query.mabacsi}/${moment(ngay).format(
                'YYYY-MM-DD',
              )}/${gio}`,
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateLichKham(query) {
    if (query == undefined) query = '';
    return new Promise((resolve, reject) => {
      http
        .put(`/chinhsualichkham/${query.masolich}`, query)
        .then(({data}) => {
          resolve({data: data});
          console.log('=====lich=====' + `/chinhsualichkham/${query.masolich}`);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static getLichKhamBenhNhan(query) {
    if (query == undefined) query = '';
    return new Promise((resolve, reject) => {
      http
        .get(`/listlichkhambenhnhan/${query.mabenhnhan}`)
        .then(({data}) => {
          resolve({data: data});
          console.log(
            '=====getLichKhamBenhNhan=====' +
              `/listlichkhambenhnhan/${query.mabenhnhan}`,
          );
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static getAllPaymentMethods() {
    return new Promise((resolve, reject) => {
      http
        .get('/payment')
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          console.log('Error Order: ' + error);
          reject(error);
        });
    });
  }

  static addOrder(body) {
    return new Promise((resolve, reject) => {
      http
        .post('/order/add', body)
        .then(({data}) => {
          console.log('Add thành công');
          resolve({data: data});
        })
        .catch(error => {
          console.log('Lỗi add');
          console.log(error);
          reject(error);
        });
    });
  }

  static updateOrder(body) {
    return new Promise((resolve, reject) => {
      http
        .patch(`/order/update/${body.order_id}`, body)
        .then(({data}) => {
          console.log('update thành công');
          resolve({data: data});
        })
        .catch(error => {
          console.log('Lỗi update');
          console.log(error);
          reject(error);
        });
    });
  }
}
