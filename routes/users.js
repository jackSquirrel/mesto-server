const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '../data/users.json');

function findUser(req, res, users) {
  // eslint-disable-next-line arrow-body-style
  const user = users.find((el) => {
    // eslint-disable-next-line no-underscore-dangle
    return el._id === req.params._id;
  });
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
}

router.get('/', (req, res) => {
  const users = fs.createReadStream(fileName, { encoding: 'utf8' });
  res.set('Content-Type', 'application/json');
  users.pipe(res);
});

router.get('/:_id', (req, res) => {
  fs.promises.readFile(fileName, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .then((usersJSON) => findUser(req, res, usersJSON))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
});

module.exports = router;
