const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { key } = require('../keys/token_key');
const NotFoundErr = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const { userNotFound, castErr, validationError, notAllowToChange } = require('../errors/error-messages');

// Получить список всех пользователей

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// Получить отдельного пользователя

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(castErr));
        return;
      }
      next(err);
    });
};

// Создать пользователя

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, about, avatar, email, password: hash })
        .then(() => {
          res.send({ name, about, avatar, email });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(validationError));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

// Обновить информацию профиля

const refreshProfile = (req, res, next) => {
  if (req.body.avatar || req.body.email) {
    next(new ValidationError(notAllowToChange));
  }

  const info = req.body;

  User.findByIdAndUpdate(req.user._id, info, {
    new: true,
    runValidators: true
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
        return;
      }
      next(err);
    });
};

// Обновить аватар

const refreshAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr(userNotFound);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
        return;
      }
      next(err);
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
    .catch(next);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  refreshProfile,
  refreshAvatar,
  login
};
