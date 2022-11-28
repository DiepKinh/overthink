const User = require('../models/userModel');
const Email = require('../models/EmailModel');
const EmailOTP = require('../models/EmailOTPModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: 'Incorrect Username or Password', status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: 'Incorrect Username or Password', status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: 'Username already used', status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: 'Email already used', status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    sendOTPEmail({ username, email }, res);
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: 'User id is required ' });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.setUserName = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const username = req.body.username;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        username,
      },
      { new: true }
    );
    return res.json({
      status: true,
      username: userData.username,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setPassword = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        password: hashedPassword,
      },
      { new: true }
    );
    return res.json({
      status: true,
    });
  } catch (ex) {
    next(ex);
  }
};

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'login',
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
const sendOTPEmail = async ({ username, email }, res, next) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Verify your Email',
      html: `<p> Enter <b>${otp}</b> in the app to verify your email address and complete</p>`,
    };

    const saltRounds = 10;

    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = await new EmailOTP({
      userName: username,
      otp: hashedOTP,
      createAt: Date.now(),
      expireAt: Date.now() + 3600000,
    });

    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);

    res.json({
      status: 'PEDDING',
      message: 'Verifation otp email sent',
      date: {
        userName: userName,
        email,
      },
    });
  } catch (ex) {
    // next(ex);
  }
};

module.exports.getOTP = async (req, res, next) => {
  const { username, otp } = req.body;
  try {
    const user = await EmailOTP.findOne({ userName: username });
    if (!user) return res.json({ msg: 'Incorrect Username', status: false });
    const isPasswordValid = await bcrypt.compare(otp, user.otp);
    if (!isPasswordValid) return res.json({ msg: 'OTP Fail', status: false });
    return res.json({ status: true });
  } catch (ex) {
    next(ex);
  }
};
