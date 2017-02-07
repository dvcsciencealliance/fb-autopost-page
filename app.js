var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var FB = require('fb');
FB.setAccessToken(config.user_access_token);

var Post = require('./models/Post');

function getLastTime(callback) {
  Post.find().limit(25).sort('-updated_time')
  .exec(function(err, posts) {
    if (err) {
      return console.error(err);
    }
    var time;
    if (posts.length > 0) {
      time = posts[0].updated_time;
    } else {
      time = config.start_time;
    }
    return callback(time);
  });
}

function isPostable(post) {
  if (post && post.message && post.message.includes(config.trigger_phrase)) {
    return true;
  } else {
    return false;
  }
}

function containsPost(post) {
  if (post && post.id) {
    Post.findOne({
      id: post.id
    }).exec(function(err, post) {
      if (post) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
}

function addPostToDatabase(post) {
  var db_post = new Post({
    id: post.id,
    updated_time: post.updated_time,
    user: post.from.name,
    page: post.to.data[0].name,
    message: post.message,
    link: post.link,
  });
  db_post.save(function(err) {
    if (err) {
      return console.error(err);
    }
    console.log(db_post.id + " added to database");
  });
  return db_post;
}

function addPostToPage(db_post) {
  FB.setAccessToken(config.page_access_token);
  console.log(db_post);
  FB.api(config.main_page_id + '/feed', 'post', {
    message: db_post.user + " posted to " + db_post.page + ": " + db_post.message + "\n" + db_post.link
  }, function (res) {
    if (!res || res.error) {
      return console.log(!res ? 'error occurred' : res.error);
    }
    console.log(db_post.id + " added to page");
  });
}

getLastTime(function(lastTime) {
  console.log("Time: " + lastTime);
  config.page_ids.forEach(function(page_id) {
    FB.api(
      page_id + '/feed?fields=id,updated_time,message,link,from,to&date_format=U&since=' + lastTime, 
      function (res) {
        if (!res || res.error) {
          return console.log(!res ? 'error occurred' : res.error);
        }
        res.data.forEach(function(post) {
          if (isPostable(post) && !containsPost(post)) {
            var db_post = addPostToDatabase(post);
            addPostToPage(db_post);
          }
        }); 
      });
  });
});
