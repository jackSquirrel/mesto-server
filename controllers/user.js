const User = require('../models/user');

const errorMessage = "Что-то пошло не так";

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: errorMessage }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: errorMessage }))
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message }));
};

const refreshProfile = (req, res) => {
  const info = req.body;

  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true
  })
    .then(user => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message }))
};

const refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message }))
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  refreshProfile,
  refreshAvatar
}