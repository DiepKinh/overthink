const mongoose = require('mongoose');

const EmailOTPSchema = mongoose.Schema({
  userName: String,
  otp: String,
  createAt: Date,
  expireAt: Date,
});

module.exports = mongoose.model('EmailOTP', EmailOTPSchema);
