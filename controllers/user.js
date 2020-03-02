const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }))
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar }, { runValidators: true })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
};

const refreshProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true
  })
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }))
};

const refreshAvatar = (req, res) => {
  const avatar = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => res.send(user))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так' }));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  refreshProfile,
  refreshAvatar
}