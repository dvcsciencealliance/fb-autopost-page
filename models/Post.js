var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  id: Number,
  created_time: Number,
  user: String,
  page: String,
  message: String,
  picture: String,
  link: String,
});

module.exports = Post;
