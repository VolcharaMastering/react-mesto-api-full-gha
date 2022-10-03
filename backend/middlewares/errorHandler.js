const ServerError = require('../errors/serverError');

/* eslint-disable linebreak-style */
const errorHandler = (err, req, res, next) => {
  if (err.code) {
    res.status(err.code).send({ message: err.message });
    return;
  }

  next(new ServerError('Произошла ошибка на сервере'));
};
module.exports = errorHandler;
