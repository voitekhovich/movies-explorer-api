const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getMovies, postMovies, delMoviesById,
} = require('../controllers/movies');
const { movieSсhema, movieIdSсhema } = require('../utils/joiSchemas');

router.get('/', getMovies);
router.post('/', celebrate(movieSсhema), postMovies);
router.delete('/:movieId', celebrate(movieIdSсhema), delMoviesById);

module.exports = router;
