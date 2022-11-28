const Users = require('../models/Users');
const bcrypt = require('bcryptjs');

class UserController {
  // [GET] /patient/list
  list(req, res) {
    Users.find({}, function (err, users) {
      if (!err) {
        res.json(users);
      } else {
        res.status(400).json({ error: 'ERROR!!!' });
      }
    });
  }

  // [GET] /benhnhan
  login(req, res) {
    Users.findOne(
      // { sodienthoai: req.body.sodienthoai, matkhau: req.body.matkhau },
      { username: req.body.username, password: req.body.password },

      function (err, user) {
        if (!err) {
          if (user == null) {
            res.send({
              success: false,
              message: 'Tên đăng nhập không đúng!',
            });
          } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
              res.send({
                success: true,
                data: user,
              });
            } else {
              res.send({
                success: false,
                message: 'Mật khẩu không đúng!',
              });
            }
          }
        } else {
          res.status(400).json({ error: 'ERROR!!!' });
        }
      }
    );
  }

  // [GET] /benhnhan
  register(req, res) {
    const benhnhan = new Users(req.body);
    benhnhan
      .save()
      .then(() => {
        res.send({
          success: true,
          message: 'Đăng ký tài khoản thành công!',
        });
      })
      .catch(error => {
        res.status(400).json({ error: 'ERROR!!!' });
      });
  }

  // [POST] /patient/register
  registerPatient(req, res, next) {
    const body = { ...req.body };
    const patient = new Users(req.body);
    patient
      .save()
      .then(() => res.json(patient))
      .catch(error => {});
  }
}
module.exports = new UserController();
