const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.get('/danhsachbenhnhan', userController.list);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/taotaikhoan', userController.registerPatient);

module.exports = router;
