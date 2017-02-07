var FB = require('fb');
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

FB.setAccessToken(config.access_token);

var Post = require('./models/Post');

var post = new Post({
  id: 123,
  created_time: 2,
  user: "user",
  page: "page",
  message: "message",
  picture: "picture",
  link: "link",
});
post.save(function(err) {
  if (err) {
    return console.error(err);
  }
});

function getLastTime() {
  Post.find().limit(25).sort('-created_time')
  .exec(function(err, posts) {
    if (posts.length > 50) {
      return posts[0].created_time;
    } else {
      return config.start_time;
    }
  });
}

var lastTime = getLastTime();
console.log(lastTime);
/*
config.page_ids.forEach(function(page_id) {
  FB.api(
    page_id + '/feed?since=' + lastTime + '&date_format=U', 
    function (res) {
      if (!res || res.error) {
       console.log(!res ? 'error occurred' : res.error);
       return;
     }
     res.data.forEach(function(post) {
      FB.api(config.main_page_id + '/feed', 'post', {
        link: 'https://www.facebook.com/' + config.main_page_id + '/posts/' + post.id
      }, function (res) {
        if (!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }
        console.log('Post Id: ' + res.id);
      });
    }); 
   });
});
*/