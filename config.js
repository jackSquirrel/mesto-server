const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

module.exports = { PORT, cardsRouter, usersRouter };
