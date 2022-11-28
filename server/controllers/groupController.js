const Groups = require('../models/groupModel');
const Messagesgroup = require('../models/messageGroupModel');
const User = require('../models/userModel');

module.exports.createGroup = async (req, res, next) => {
  const { userCreate, nameGroup, listUser } = req.body;

  try {
    const data = await Groups.create({
      userCreate: userCreate,
      nameGroup: nameGroup,
      listUser: listUser,
    });

    if (data)
      return res.json({ msg: 'Message added successfully.', status: true });
    else
      return res.json({
        msg: 'Failed to add message to the database',
        status: false,
      });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getGroup = async (req, res, next) => {
  const id = req.params.id;
  try {
    const contactsGroup = await Groups.find({
      listUser: {
        $all: id,
      },
    }).sort({ updatedAt: 1 });
    return res.json(contactsGroup);
  } catch (ex) {
    next(ex);
  }
};

module.exports.leaveGroup = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const groupId = req.params.id;
    const dataFind = await Groups.findById(groupId);
    let array = new Array();
    for (const value of dataFind.listUser) {
      if (value != userId) {
        array.push(value);
      }
    }
    const groupNew = await Groups.findByIdAndUpdate(
      groupId,
      {
        listUser: array,
      },
      { new: true }
    );
    if (groupNew) return res.json('Leave group successfully.');
    else return res.json('Failed to leave group');
  } catch (ex) {
    next(ex);
  }
};

module.exports.deleteGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const dataDelete = await Groups.remove({ _id: groupId });
    const dataMesDelete = await Messagesgroup.remove({ group: groupId });
    if (dataDelete && dataMesDelete)
      return res.json('Delete group successfully.');
    else return res.json('Failed to delete group');
  } catch (ex) {
    next(ex);
  }
};

module.exports.adminLeaveGroup = async (req, res, next) => {
  try {
    const userCreateNewId = req.body.userNewId;
    const userId = req.body.userId;
    const groupId = req.params.id;
    const dataFind = await Groups.findById(groupId);
    let array = new Array();
    for (const value of dataFind.listUser) {
      if (value != userId) {
        array.push(value);
      }
    }
    const groupNew = await Groups.findByIdAndUpdate(
      groupId,
      {
        listUser: array,
        userCreate: userCreateNewId,
      },
      { new: true }
    );
    if (groupNew) return res.json('Leave group successfully.');
    else return res.json('Failed to leave group');
  } catch (ex) {
    next(ex);
  }
};

module.exports.findListUserFromGroup = async (req, res, next) => {
  try {
    const groupId = req.body.group;
    const dataFind = await Groups.findById(groupId);
    let array = new Array();
    for (const value of dataFind.listUser) {
      if (value) {
        array.push(value);
      }
    }
    console.log('dataFind', dataFind.listUser);
    let list = new Array();
    for (i = 0; i < array.length; i++) {
      console.log('dsfas array[i]', array[i]);
      const dataFindUser = await User.findById(array[i]);
      if (dataFindUser) {
        list.push(dataFindUser);
      }
    }
    res.json(list);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addTV = async (req, res, next) => {
  const { listUser } = req.body;

  try {
    const data = await Groups.updateOne({
      listUser: listUser,
    });

    if (data) return res.json({ msg: 'Added successfully.', status: true });
    else
      return res.json({
        msg: 'Failed to add message to the database',
        status: false,
      });
  } catch (ex) {
    next(ex);
  }
};
