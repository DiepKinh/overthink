const {
  addMessage,
  getMessages,
  addMessageGroup,
  getMessagesGroup,
} = require('../controllers/messageController');
const router = require('express').Router();

router.post('/addmsg/', addMessage);
router.post('/getmsg/', getMessages);

router.post('/addmessgroup/', addMessageGroup);
router.post('/getmessgroup/', getMessagesGroup);
module.exports = router;
