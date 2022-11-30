module.exports.DEV_PORT = 3000;
module.exports.DEV_MONGO_DB_URL = 'mongodb://localhost:27017/moviesdb';
module.exports.DEV_JWT_SECRET = 'dev-secret';
module.exports.DEV_JWT_EXPIRESIN = '7d';

module.exports.regex = /^https?:\/\/(www.)?[\w\-._~:/?#[\]@!$&'()*+,;=]*\.[\w]*(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?/i;
module.exports.dateOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timezone: 'Europe/Moscow',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

module.exports.MESSAGE_NO_USER_ID = 'Пользователь с указанным _id не найден';
module.exports.MESSAGE_INCORRECT_USER_DATA = 'Переданы некорректные данные пользователя';
module.exports.MESSAGE_CONFLICT_EMAIL = 'Такой e-mail уже существует';
module.exports.MESSAGE_USER_AUTHORIZED = 'Пользователь авторизован';
module.exports.MESSAGE_EXIT = 'Выход';

module.exports.MESSAGE_NO_MOVIE_ID = 'Фильм с указанным _id не найден';
module.exports.MESSAGE_INCORRECT_MOVIE_DATA = 'Переданы некорректные данные фильма';
module.exports.MESSAGE_TRY_MOVIE_DEL = 'Попытка удалить чужую запись';
module.exports.MESSAGE_INCORRECT_MOVIE_ID = 'Некорректно указан _id фильма';
module.exports.MESSAGE_CONFLICT_MOVIE_ID = 'Фильм с таким id уже существует';

module.exports.MESSAGE_NO_AUTHORIZED = 'Пользователь не авторизован';
module.exports.MESSAGE_BAD_TOKEN = 'Неверный токен';
module.exports.MESSAGE_BAD_PASSWORD = 'Неправильный email или пароль';

module.exports.MESSAGE_404 = 'Был запрошен несуществующий роут';
module.exports.MESSAGE_SERVER_ERR = 'На сервере произошла ошибка';
