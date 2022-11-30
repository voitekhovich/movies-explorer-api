const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const { ConflictError } = require('../utils/errors/ConflictError');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');

const {
  DEV_JWT_SECRET,
  DEV_JWT_EXPIRESIN,
  MESSAGE_INCORRECT_USER_DATA,
  MESSAGE_CONFLICT_EMAIL,
  MESSAGE_USER_AUTHORIZED,
  MESSAGE_EXIT,
} = require('../utils/constans');

const { JWT_SECRET = DEV_JWT_SECRET, JWT_EXPIRESIN = DEV_JWT_EXPIRESIN } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.send(userObj);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new IncorrectDataError(MESSAGE_INCORRECT_USER_DATA));
      }
      if (err.code === 11000) {
        return next(new ConflictError(MESSAGE_CONFLICT_EMAIL));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRESIN },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: MESSAGE_USER_AUTHORIZED });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res.clearCookie('jwt').send({ message: MESSAGE_EXIT });
};
