const mongoose = require('mongoose');
const User = require('../models/user');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

module.exports.getUsersMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchUsersMe = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail(new NotFoundError('Пользователь с указанным _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
};
