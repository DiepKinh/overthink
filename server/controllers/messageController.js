const Messages = require('../models/messageModel');
const Messagesgroup = require('../models/messageGroupModel');

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: 'Message added successfully.' });
    else return res.json({ msg: 'Failed to add message to the database' });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getMessagesGroup = async (req, res, next) => {
  try {
    const { usersend, group } = req.body;
    const messages = await Messagesgroup.find({
      group: {
        $all: group,
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = messages.map(msg => {
      return {
        fromSelf: msg.usersend.toString() === usersend,
        message: msg.message.text,
        avatarImage: msg.avatarImage,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessageGroup = async (req, res, next) => {
  try {
    const { message, usersend, group, avatarImage } = req.body;
    const data = await Messagesgroup.create({
      message: { text: message },
      usersend: usersend,
      group: group,
      avatarImage: avatarImage,
    });

    if (data) return res.json({ msg: 'Message added successfully.' });
    else return res.json({ msg: 'Failed to add message to the database' });
  } catch (ex) {
    next(ex);
  }
};
