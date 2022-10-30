const {
  createGroup,
  getGroup,
  leaveGroup,
} = require('../controllers/groupController');
const router = require('express').Router();

router.post('/creategroup/', createGroup);
router.get('/getgroup/:id', getGroup);
router.post('/leavegroup/:id', leaveGroup);

module.exports = router;
