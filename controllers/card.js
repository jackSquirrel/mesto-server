const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const NotEnoughRights = require('../errors/not-enough-rights');
const { validationError, cardNotFound, noRightsToRem, castErr } = require('../errors/error-messages');

// Получить список всех карточек

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// Создание карточки

const createCard = (req, res, next) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner, createdAt })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationError));
        return;
      }
      next(err);
    });
};

// Удаление карточки

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      if (card.owner.toString() !== req.user._id) {
        throw new NotEnoughRights(noRightsToRem);
      }
      Card.findByIdAndRemove(cardId)
        .then(() => res.send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(castErr));
        return;
      }
      next(err);
    });
};

// Поставить лайк

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(castErr));
        return;
      }
      next(err);
    });
};

// Убрать лайк

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(cardNotFound);
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(castErr));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike
};
