const jwt = require('jsonwebtoken');
const { AuthorisationError } = require('../utils/errors/AuthorisationError');

const {
  DEV_JWT_SECRET,
  MESSAGE_NO_AUTHORIZED,
  MESSAGE_BAD_TOKEN,
} = require('../utils/constans');

const { JWT_SECRET = DEV_JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthorisationError(MESSAGE_NO_AUTHORIZED));
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthorisationError(MESSAGE_BAD_TOKEN));
  }
  req.user = payload;
  return next();
};
