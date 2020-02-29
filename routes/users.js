const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { getUsers, getUser, createUser, refreshProfile, refreshAvatar } = require('../controllers/user');

const fileName = path.join(__dirname, '../data/users.json');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', refreshProfile);
router.patch('/me/avatar', refreshAvatar);

module.exports = router;
