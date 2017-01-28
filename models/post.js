var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  message: String,
  id: String,
  page_id: String
});

module.exports = Post;
