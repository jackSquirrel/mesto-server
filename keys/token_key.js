const { NODE_ENV, JWT_SECRET } = process.env;
if (NODE_ENV === 'production') {
  module.exports.key = JWT_SECRET;
} else {
  module.exports.key = 'some-secret-key';
}
