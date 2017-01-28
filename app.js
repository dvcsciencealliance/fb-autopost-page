var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var FB = require('fb');
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var routes = require('./routes');
var app = express();
app.use('/', routes);

var Post = require('./models/post');

function getLastPostIdOfPage(page_id) {
  Post.findOne({
    page_id: page_id
  }, function(err, post) {
    if (err) {
      console.error(err);
    }

    return post.id;
  });
}

function savePost(message, id, page_id) {
  var post = new Post({
    message: message,
    id: id,
    page_id: page_id
  });
  post.save(function(err) {
    if (err) {
      console.error(err);
    }
  });
}

config.page_ids.forEach(function(page_id) {
  var lastPostId = getLastPostIdOfPage(page_id);
  FB.api(
    "/{post-id}/posts",
    function (response) {
      if (response && !response.error) {
        
      }
    }
    );
  while (postId !== lastPostId) {

  }
});


