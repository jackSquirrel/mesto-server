const router = require('express').Router();
const { getUsers, getUser, refreshProfile, refreshAvatar } = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', refreshProfile);
router.patch('/me/avatar', refreshAvatar);

module.exports = router;
