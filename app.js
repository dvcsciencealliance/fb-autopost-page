#!/usr/bin/env node
var DB_URL = 'mongodb://heroku_pd20fzf7:raeil2305lh8usgscha4rl1rls@ds133279.mlab.com:33279/heroku_pd20fzf7;';
var FB_PAGE_IDS = ['684072461662066'];
var APP_VERSION = 'v2.8';
var APP_ID = '156637641488227';
var APP_SECRET = '0b6870f7abd9fd6d5d3e85ed2430dfe9';

var mongoose = require('mongoose');
mongoose.connect(DB_URL);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Post = mongoose.model('Post', {
  message: String,
  id: String,
  page_id: String
});

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

FB.init({
  appId      : APP_ID,
  xfbml      : true,
  version    : APP_VERSION
});

FB_PAGE_IDS.forEach(function(page_id) {
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



