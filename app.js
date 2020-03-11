const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createUser = require('./controllers/user').createUser;
const login = require('./controllers/user').login;
const { auth } = require('./middlewares/auth');

const { PORT, cardsRouter, usersRouter } = require('./config');

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT);
