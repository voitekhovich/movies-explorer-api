require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const errs = require('./middlewares/errs');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const { limiter } = require('./utils/rateLimiter');

const { DEV_PORT, DEV_MONGO_DB_URL, dateOptions } = require('./utils/constans');

const {
  PORT = DEV_PORT,
  MONGO_DB_URL = DEV_MONGO_DB_URL,
} = process.env;

const app = express();

mongoose.connect(MONGO_DB_URL);

app.use(cors);

app.use(requestLogger);

app.use(limiter);
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'));

app.use(errorLogger);

app.use(errors());
app.use(errs);

app.listen(PORT, () => {
  console.log(`${(new Date().toLocaleString('ru', dateOptions))}: App listening on port ${PORT}`);
});
