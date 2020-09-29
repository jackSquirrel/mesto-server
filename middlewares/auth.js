/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { key } = require('../keys/token_key');
const AuthError = require('../errors/auth-error');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    next(new AuthError('Ошибка авторизации'));
  }

  req.user = payload;
  next();
};

module.exports = {
  auth
};
