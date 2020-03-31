const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, refreshProfile, refreshAvatar } = require('../controllers/user');

router.get('/', getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required()
  }).unknown(true)
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  }),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required()
    })
  }).unknown(true)
}), refreshProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/)
  }),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required()
    })
  }).unknown(true)
}), refreshAvatar);

module.exports = router;
