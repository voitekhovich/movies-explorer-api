const mongoose = require('mongoose');

const Movie = require('../models/movie');
// const { ForbiddenError } = require('../utils/errors/ForbiddenError');
const { IncorrectDataError } = require('../utils/errors/IncorrectDataError');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { ConflictError } = require('../utils/errors/ConflictError');

const {
  MESSAGE_NO_MOVIE_ID,
  MESSAGE_INCORRECT_MOVIE_DATA,
  // MESSAGE_TRY_MOVIE_DEL,
  MESSAGE_INCORRECT_MOVIE_ID,
  MESSAGE_CONFLICT_MOVIE_ID,
} = require('../utils/constans');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.postMovies = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError(MESSAGE_INCORRECT_MOVIE_DATA));
      }
      if (err.code === 11000) {
        return next(new ConflictError(MESSAGE_CONFLICT_MOVIE_ID));
      }
      return next(err);
    });
};

module.exports.delMoviesById = (req, res, next) => {
  Movie.findByIdAndRemove(req.params._id)
    .orFail(new NotFoundError(MESSAGE_NO_MOVIE_ID))
    .then((deletedMovie) => res.send(deletedMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError(MESSAGE_INCORRECT_MOVIE_ID));
      } else {
        next(err);
      }
    });
};

// module.exports.delMoviesById = (req, res, next) => {
//   Movie.findById(req.params.movieId)
//     .orFail(new NotFoundError(MESSAGE_NO_MOVIE_ID))
//     .then((movie) => {
//       if (!(movie.owner.toString() === req.user._id)) {
//         return next(new ForbiddenError(MESSAGE_TRY_MOVIE_DEL));
//       }

//       return Movie.findByIdAndRemove(req.params.movieId)
//         .orFail(new NotFoundError(MESSAGE_NO_MOVIE_ID))
//         .then((deletedMovie) => res.send(deletedMovie));
//     })
//     .catch((err) => {
//       if (err instanceof mongoose.Error.CastError) {
//         next(new IncorrectDataError(MESSAGE_INCORRECT_MOVIE_ID));
//       } else {
//         next(err);
//       }
//     });
// };
