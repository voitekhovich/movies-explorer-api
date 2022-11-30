const mongoose = require('mongoose');

const User = require('../models/user');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const {
  MESSAGE_NO_USER_ID,
  MESSAGE_INCORRECT_USER_DATA,
} = require('../utils/constans');

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(MESSAGE_NO_USER_ID))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchUsersMe = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(MESSAGE_NO_USER_ID))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError(MESSAGE_INCORRECT_USER_DATA));
      } else {
        next(err);
      }
    });
};
