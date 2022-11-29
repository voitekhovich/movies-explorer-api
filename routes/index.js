const router = require('express').Router();
const { celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login, signout } = require('../controllers/login');

const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { loginSсhema } = require('../utils/joiSchemas');

router.post('/signup', celebrate(loginSсhema), createUser);
router.post('/signin', celebrate(loginSсhema), login);

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', signout);

router.use('*', () => {
  throw new NotFoundError('Был запрошен несуществующий роут');
});

module.exports = router;
