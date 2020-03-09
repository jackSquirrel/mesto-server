const mongoose = require("mongoose");

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
      validator: (link) => {
        return /https?:\/\/(www\.)?(?:[-\w\.]+\.[a-z]+)(?:\/[-\w\@\/]*#?)?.(?:jpg|jpeg|png)/.test(link);
      },
      message: props => `${props.value} неверный формат ссылки`
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return /[-\.\w]+@[-\w]+\.[a-z]+/.test(email);
      },
      message: props => `${props.value} неверный формат email`
    }
  },
  password: {
    type: String,
    required: true
  }
},
{ versionKey: false });

module.exports = mongoose.model('user', userSchema);
