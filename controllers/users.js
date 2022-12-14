const mongoose = require('mongoose');

const User = require('../models/user');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

const {
  MESSAGE_NO_USER_ID,
  MESSAGE_INCORRECT_USER_DATA,
  MESSAGE_CONFLICT_EMAIL,
} = require('../utils/constans');
const { ConflictError } = require('../utils/errors/ConflictError');

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
        return next(new IncorrectDataError(MESSAGE_INCORRECT_USER_DATA));
      }
      if (err.code === 11000) {
        return next(new ConflictError(MESSAGE_CONFLICT_EMAIL));
      }
      return next(err);
    });
};
