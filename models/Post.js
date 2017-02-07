var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  id: String,
  updated_time: String,
  user: String,
  page: String,
  message: String,
  picture: String,
  link: String,
});

module.exports = Post;
