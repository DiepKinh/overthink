const mongoose = require('mongoose');

const EmailSchema = mongoose.Schema({
  userName: String,
  email: String,
  verified: Boolean,
});

module.exports = mongoose.model('Emails', EmailSchema);
