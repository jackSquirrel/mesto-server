const Card = require('../models/card');

// Получить список всех карточек

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next({
        message: err.message,
        status: 500
      });
    });
};

// Создание карточки

const createCard = (req, res, next) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner, createdAt })
    .then((card) => res.send(card))
    .catch((err) => {
      next({
        message: err.message,
        status: err.name === 'ValidationError' ? 400 : 500
      });
    });
};

// Удаление карточки

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next({
          message: 'Недостаточно прав, чтобы удалить карточку',
          status: 403
        });
        return;
      }
      Card.findByIdAndRemove(cardId)
        .then(() => res.send(card))
        .catch((err) => {
          next({
            message: err.message,
            status: 500
          });
        });
    })
    .catch((err) => {
      next({
        message: err.name === 'CastError' ? 'Карточка не существует' : err.message,
        status: err.name === 'CastError' ? 404 : 500
      });
    });
};

// Поставить лайк

const setLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      next({
        message: err.name === 'CastError' ? 'Карточка не существует' : err.message,
        status: err.name === 'CastError' ? 404 : 500
      });
    });
};

// Убрать лайк

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      next({
        message: err.name === 'CastError' ? 'Карточка не существует' : err.message,
        status: err.name === 'CastError' ? 404 : 500
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike
};
