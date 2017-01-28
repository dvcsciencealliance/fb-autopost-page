var config = require('./config');
var FB = require('fb');
var Post = require('./models/post');

FB.setAccessToken(config.access_token);

function post(message, id, page_id) {
  
}

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

