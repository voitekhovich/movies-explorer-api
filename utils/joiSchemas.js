const { Joi } = require('celebrate');
const { regex } = require('./constans');

module.exports.loginSсhema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
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
    image: Joi.string().required().pattern(new RegExp(regex)),
    trailerLink: Joi.string().required().pattern(new RegExp(regex)),
    thumbnail: Joi.string().required().pattern(new RegExp(regex)),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

module.exports.movieIdSсhema = {
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
};
