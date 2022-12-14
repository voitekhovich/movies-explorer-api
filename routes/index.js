const router = require('express').Router();
const { celebrate } = require('celebrate');
const cookieParser = require('cookie-parser');
const { createUser, login, signout } = require('../controllers/login');

const { MESSAGE_404 } = require('../utils/constans');

const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors/NotFoundError');
const { signUpSсhema, signInSсhema } = require('../utils/joiSchemas');

router.post('/signup', celebrate(signUpSсhema), createUser);
router.post('/signin', celebrate(signInSсhema), login);

router.use(cookieParser());
router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.post('/signout', signout);

router.use('*', () => {
  throw new NotFoundError(MESSAGE_404);
});

module.exports = router;
