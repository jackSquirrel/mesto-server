const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getCards, createCard, deleteCard, setLike, removeLike } = require('../controllers/card');

const fileName = path.join(__dirname, '../data/cards.json');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
