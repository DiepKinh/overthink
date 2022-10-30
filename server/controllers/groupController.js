const Groups = require('../models/groupModel');

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
