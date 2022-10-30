const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    usersend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
      required: true,
    },
    avatarImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Messagesgroup', MessageSchema);
