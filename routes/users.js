const router = require('express').Router();
const { getUsers, getUser, createUser, refreshProfile, refreshAvatar } = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', refreshProfile);
router.patch('/me/avatar', refreshAvatar);

module.exports = router;
