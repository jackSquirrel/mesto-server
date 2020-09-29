const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard, setLike, removeLike } = require('../controllers/card');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/)
  })
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required()
  }).unknown(true),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required()
  }).unknown(true),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
}), setLike);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().required()
  }).unknown(true),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
}), removeLike);

module.exports = router;
