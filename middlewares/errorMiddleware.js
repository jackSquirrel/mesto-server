// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const { status } = err;
  const { message } = err;

  res.status(status).send({ message });
};

module.exports = {
  errorMiddleware
};
