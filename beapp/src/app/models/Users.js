const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const Users = new Schema(
  {
    _id: { type: String, maxLength: 255 },
    username: { type: String, maxLength: 255 },
    email: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 },
    isAvatarImageSet: { type: Boolean },
    avatarImage: { type: String, maxLength: 255 },
  },
  {
    timestamps: true,
  }
);

Users.pre('save', function (next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

mongoose.plugin(slug);
Users.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Users', Users);
