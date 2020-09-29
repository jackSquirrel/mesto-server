const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { auth } = require('../middlewares/auth');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/user');
const NotFoundError = require('../errors/not-found-err');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/),
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().required().alphanum().min(6).max(15)
  })
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
}), login);

router.use(auth);

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);

router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
