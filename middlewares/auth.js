/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { key } = require('../keys/token_key');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, key);
  } catch (err) {
    return res.status(401).send({ message: 'Ошбика авторизации' });
  }

  req.user = payload;
  next();
};

module.exports = {
  auth
};
