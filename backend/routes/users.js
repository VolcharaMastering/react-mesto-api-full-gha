/* eslint-disable linebreak-style */
const express = require('express');
const { validateUpdateAvatar, validateUpdateUser, validateUserId } = require('../middlewares/errorValidator');

const userRouter = express.Router();
const {
  getUsers, getUserById, updateUser, updateUserAvatar, aboutMe,
} = require('../controllers/users');
const NotFound = require('../errors/notFound');

userRouter.get('/', getUsers);
userRouter.get('/me', aboutMe);
userRouter.get('/:userId', validateUserId, getUserById);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateAvatar, updateUserAvatar);
userRouter.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
module.exports = userRouter;
