const {
  createGroup,
  getGroup,
  leaveGroup,
  deleteGroup,
  adminLeaveGroup,
  findListUserFromGroup,
  addTV,
} = require('../controllers/groupController');
const router = require('express').Router();

router.post('/creategroup/', createGroup);
router.get('/getgroup/:id', getGroup);
router.post('/leavegroup/:id', leaveGroup);
router.post('/deletegroup/:id', deleteGroup);
router.post('/adminleavegroup/:id', adminLeaveGroup);
router.post('/findlistusergroup/', findListUserFromGroup);
router.post('/addTV', addTV);

module.exports = router;
