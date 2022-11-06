import http from './http';

export default class ChuyenKhoa {
  static getAllChuyenKhoa() {
    return new Promise((resolve, reject) => {
      http
        .get('/listchuyenkhoa')
        .then(({data}) => {
          resolve({data: data});
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // static addCategory(body) {
  //   return new Promise((resolve, reject) => {
  //     http
  //       .post('/categories', body)
  //       .then(({data}) => {
  //         const category = {
  //           code: data.code,
  //           image: data.image,
  //           name: data.name,
  //           id: data._id,
  //         };
  //         resolve({data: category});
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }

  // static deleteCategory(id) {
  //   return new Promise((resolve, reject) => {
  //     http
  //       .delete(`/categories/${id}`)
  //       .then(({data}) => {
  //         resolve({data});
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }

  // static editCategory(params) {
  //   return new Promise((resolve, reject) => {
  //     http
  //       .put(`/categories/${params.id}`, params)
  //       .then(({data}) => {
  //         const category = {
  //           code: data.code,
  //           image: data.image,
  //           name: data.name,
  //           id: data._id,
  //         };
  //         resolve({data: category});
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // }
}
