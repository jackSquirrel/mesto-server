const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (link) => {
        return /https?:\/\/(www\.)?(?:[-\w\.]+\.[a-z]+)(?:\/[-\w\@\/]*#?)?.(?:jpg|jpeg|png)/.test(link);
      },
      message: props => `${props.value} неверный формат ссылки`
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{ versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
