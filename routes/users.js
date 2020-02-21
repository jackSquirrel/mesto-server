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
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
});

module.exports = router;
