var FB = require('fb');
var config = require('./config');

FB.setAccessToken(config.access_token);

config.page_ids.forEach(function(page_id) {
  FB.api(
    page_id + '/feed?since=' + config.last_updated + '&date_format=U', 
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
