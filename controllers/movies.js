const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.postMovies = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Переданы некорректные данные при создании записи о фильме'));
      } else {
        next(err);
      }
    });
};

module.exports.delMoviesById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Фильм с указанным _id не найдена'))
    .then((movie) => {
      if (!(movie.owner.toString() === req.user._id)) {
        return next(new ForbiddenError('Попытка удалить чужую запись фильма'));
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .orFail(new NotFoundError('Фильм с указанным _id не найдена'))
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((err) => {
          if (err instanceof mongoose.Error.CastError) {
            next(new IncorrectDataError('Некорректно указан _id фильма'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError('Некорректно указан _id фильма'));
      } else {
        next(err);
      }
    });
};
