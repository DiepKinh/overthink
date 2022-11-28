const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  setUserName,
  setPassword,
  getOTP,
} = require('../controllers/userController');

const router = require('express').Router();

router.post('/login', login);
router.post('/register', register);
router.get('/allusers/:id', getAllUsers);
router.post('/setavatar/:id', setAvatar);
router.get('/logout/:id', logOut);
router.post('/updateUserName/:id', setUserName);
router.post('/updatePassword/:id', setPassword);
router.post('/inputOTP', getOTP);

module.exports = router;
