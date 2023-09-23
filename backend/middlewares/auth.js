const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { SECRET_KEY = 'some-secret-key' } = process.env;


  module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const error = new UnauthorizedError('Необходима авторизация');
      error.statusCode = 401;
      next(error);
    } else {
      next();
    }
  ;

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    const error = new UnauthorizedError('Необходима авторизация');
    error.statusCode = 401;
    return next(error);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
