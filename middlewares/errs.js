const { MESSAGE_SERVER_ERR } = require('../utils/constans');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? MESSAGE_SERVER_ERR
        : message,
    });
  next();
});
