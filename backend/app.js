/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
// const path = require('path');
// const bodyParser =require('body-parser');
const { createUser, login } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/errorValidator');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/notFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);
app.post('/signin/', validateLogin, login);
app.post('/signup/', validateCreateUser, createUser);
app.use(auth);
app.use(require('./routes/cards'));
app.use(require('./routes/users'));

app.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
}

connect();
