const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthorisationError } = require('../utils/errors/AuthorisationError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(new AuthorisationError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorisationError('Неправильные почта или пароль'));
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
