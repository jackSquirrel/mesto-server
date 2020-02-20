const errorMidleware = (err, req, res, next) => {
  const errorMessage = { message: 'Запрашиваемый ресурс не найден' };

  res.status(404).send(errorMessage);
};

module.exports = errorMidleware;
