const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, refreshProfile, refreshAvatar } = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.patch('/me', celebrate({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30)
}), refreshProfile);
router.patch('/me/avatar', celebrate({
  // eslint-disable-next-line no-useless-escape
  avatar: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/)
}), refreshAvatar);

module.exports = router;
