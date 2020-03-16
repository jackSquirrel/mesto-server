const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const key = require('../keys/token_key');

// Получить список всех пользователей

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next({
        message: err.name === err.message,
        status: err.name === 500
      });
    });
};

// Получить отдельного пользователя

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next({
          message: 'Пользователь не найден',
          status: 404
        });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      next({
        message: err.name === 'CastError' ? 'Пользователь не существует' : err.message,
        status: err.name === 'CastError' ? 404 : 500
      });
    });
};

// Создать пользователя

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => res.send(user))
        .catch((err) => {
          next({
            message: err.message,
            status: err.name === 'ValidationError' ? 400 : 500
          });
        });
    })
    .catch((err) => {
      next({
        message: err.message,
        status: 500
      });
    });
};

// Обновить информацию профиля

const refreshProfile = (req, res, next) => {
  if (req.body.avatar || req.body.email) {
    next({
      message: 'Попытка изменить недоступное поле',
      status: 400
    });
  }

  const info = req.body;

  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true
  })
    .then((user) => res.send(user))
    .catch((err) => {
      next({
        message: err.message,
        status: err.name === 'ValidationError' ? 400 : 500
      });
    });
};

// Обновить аватар

const refreshAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => res.send(user))
    .catch((err) => {
      next({
        message: err.message,
        status: err.name === 'ValidationError' ? 400 : 500
      });
    });
};

// Авторизироваться

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        key,
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true
        })
        .send({ token });
    })
    .catch((err) => {
      next({
        message: err.message,
        status: 500
      });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  refreshProfile,
  refreshAvatar,
  login
};
