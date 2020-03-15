const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      // eslint-disable-next-line no-useless-escape
      validator: (link) => /https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@\/]*#?)?(?:.(?:jpg|jpeg|png))?/.test(link),
      message: (props) => `${props.value} неверный формат ссылки`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /[-.\w]+@[-\w]+\.[a-z]+/.test(email),
      message: (props) => `${props.value} неверный формат email`
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
},
{ versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next({
          message: 'Неправильная почта или пароль',
          status: 401
        });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next({
              message: 'Неправильная почта или пароль',
              status: 401
            });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
