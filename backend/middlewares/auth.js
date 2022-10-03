/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    next(new AuthError('Неверный токен'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
