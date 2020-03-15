const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

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

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', (req, res, next) => {
  next({
    message: 'Страница не найдена',
    status: 404
  });
});
app.use(errorMiddleware);

app.listen(PORT);
