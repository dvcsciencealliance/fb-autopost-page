var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var Post = require('./models/post');

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

var FB = require('fb');
FB.setAccessToken(config.access_token);

config.page_ids.forEach(function(page_id) {
  FB.api(
    page_id + '/feed?since=' + config.last_updated + '&date_format=U', 
    function (res) {
      if (!res || res.error) {
       console.log(!res ? 'error occurred' : res.error);
       return;
     }
     
   });
});

