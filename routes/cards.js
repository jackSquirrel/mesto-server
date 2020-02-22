const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '../data/cards.json');

router.get('/', (req, res) => {
  const cards = fs.createReadStream(fileName, { encoding: 'utf8' });
  res.set('Content-Type', 'application/json');
  cards.pipe(res);
});

module.exports = router;
