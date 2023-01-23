const { Joi } = require('celebrate');
const validator = require('validator');
const { MESSAGE_INCORRECT_URL } = require('./constans');

const validEmail = (value, helpers) => {
  if (validator.isURL(value)) return value;
  return helpers.message(MESSAGE_INCORRECT_URL);
};

module.exports.signUpSсhema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports.signInSсhema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports.userSсhema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
};

module.exports.movieSсhema = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validEmail),
    trailerLink: Joi.string().required().custom(validEmail),
    thumbnail: Joi.string().required().custom(validEmail),
    movieId: Joi.number().required().min(0),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.movieIdSсhema = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
};
