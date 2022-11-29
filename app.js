const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errs = require('./middlewares/errs');

const {
  PORT = 3000,
  MONGO_DB_URL = 'mongodb://localhost:27017/moviesdb',
} = process.env;

const app = express();

mongoose.connect(MONGO_DB_URL);

app.use(require('./routes'));

app.use(errors());
app.use(errs);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
