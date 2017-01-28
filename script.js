$(document).ready(function() {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : 'your-app-id',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();
  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  $("#authenticate").on("click", function() {
    controllers.updateLength();
  });
});

var controllers = {
  readFile: function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#file").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      $("#file").css("display", "block");
    }
  }
};

var view = {
  resetFocus: function() {
    $("#message").focus();
  },
  resetMessage: function() {
    $("#message").val("");
  }
};
