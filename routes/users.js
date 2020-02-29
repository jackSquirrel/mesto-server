const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getUsers, getUser, createUser } = require('../controllers/user');

const fileName = path.join(__dirname, '../data/users.json');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);

module.exports = router;
