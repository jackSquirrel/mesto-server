const Card = require('../models/card');

const errorMessage = 'Что-то пошло не так';

// Получить список всех карточек

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message || errorMessage }));
};

// Создание карточки

const createCard = (req, res) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user;

  Card.create({ name, link, owner, createdAt })
    .then((card) => res.send(card))
    .catch((err) => res.status(400).send({ message: err.message || errorMessage }));
};

// Удаление карточки

const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return Promise.reject(new Error('Недостаточно прав, чтобы удалить карточку'));
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then(() => res.send(card))
        .catch((err) => res.status(500).send({ message: err.message || errorMessage }));
    })
    .catch((err) => res.status(401).send({ message: err.message || errorMessage }));
};

// Поставить лайк

const setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message || errorMessage }));
};

// Убрать лайк

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message || errorMessage }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike
};
