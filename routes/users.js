const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '../data/users.json');

router.get('/', (req, res) => {
  const users = fs.createReadStream(fileName, { encoding: 'utf8' });
  users.pipe(res);
});

router.get('/:_id', (req, res) => {
  fs.readFile(fileName, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
    // eslint-disable-next-line arrow-body-style
    const user = JSON.parse(data).find((el) => {
      // eslint-disable-next-line no-underscore-dangle
      return el._id === req.params._id;
    });
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(user);
  });
});

module.exports = router;
