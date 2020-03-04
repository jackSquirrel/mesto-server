const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner, likes, createdAt })
    .then(card => res.send(card))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike
};
