const User = require('../models/user');
const bcrypt = require('bcryptjs');

const errorMessage = "Что-то пошло не так";

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send(user))
    .catch(() => res.status(500).send({ message: err.message || errorMessage }))
};

const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;



  User.create({ name, about, avatar, email, password })
    .then(user => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message || errorMessage }));
};

const refreshProfile = (req, res) => {
  if (req.body.avatar){
    res.status(400).send({ message: errorMessage });
  }

  const info = req.body;

  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true
  })
    .then(user => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message || errorMessage }))
};

const refreshAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ message: err.message || errorMessage }))
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  refreshProfile,
  refreshAvatar
}