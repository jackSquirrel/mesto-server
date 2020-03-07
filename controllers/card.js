const Card = require('../models/card');

const errorMessage = "Что-то пошло не так";

const getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }));
};

const createCard = (req, res) => {
  const { name, link, createdAt } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner, createdAt })
    .then(card => res.send(card))
    .catch((err) => res.status(400).send({ message: err.message || errorMessage }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }));
};

const removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike
};
