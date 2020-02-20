const router = require('express').Router();
const users = require('../data/users.json');

router.get('/', (req, res) => {
  res.send(users);
});

router.get('/:_id', (req, res) => {
  const user = users.find((el) => {
    // eslint-disable-next-line no-underscore-dangle
    return el._id === req.params._id;
  });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'Пользователь не найден' });
  }
});

module.exports = router;
