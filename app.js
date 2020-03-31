const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { createUser } = require('./controllers/user');
const { login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, cardsRouter, usersRouter } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/),
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
}), login);
app.use(auth);
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', (req, res, next) => {
  next({
    message: 'Страница не найдена',
    status: 404
  });
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
