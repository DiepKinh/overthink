const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    userCreate: {
      type: String,
      ref: 'User',
      required: true,
    },
    nameGroup: {
      type: String,
      required: true,
      min: 1,
      max: 20,
      unique: true,
    },
    listUser: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Groups', MessageSchema);
