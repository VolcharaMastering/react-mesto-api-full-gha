/* eslint-disable linebreak-style */
const express = require('express');
const { validateCreateCard, validateCardId } = require('../middlewares/errorValidator');

const cardsRouter = express.Router();
const {
  getCards, delCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const NotFound = require('../errors/notFound');

cardsRouter.get('/', getCards);
cardsRouter.delete('/:cardId', validateCardId, delCardById);
cardsRouter.post('/', validateCreateCard, createCard);
cardsRouter.delete('/:cardId/likes', validateCardId, dislikeCard);
cardsRouter.put('/:cardId/likes', validateCardId, likeCard);
cardsRouter.all('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
module.exports = cardsRouter;
