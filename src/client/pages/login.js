import $ from 'jquery';
import Auth0 from 'auth0-js';

$('#login-submit').click(function(ev) {
  var config = {};
  var webAuth = new Auth0.WebAuth({
      domain: __AUTH0_DOMAIN__,
      clientID: __AUTH0_CLIENT_ID__,
      redirectUri: __AUTH0_CALLBACK_URL__
  });
  ev.preventDefault();
  var options = config.internalOptions || {};
  options.username = document.getElementById('username').value;
  options.password = document.getElementById('password').value;
  options.connection = __AUTH0_CONNECTION__;
  options.responseType = "code";
  options.scope = __SCOPE__;
  webAuth.redirect.loginWithCredentials(options,function(err,r){
    console.log(err);
    console.log(r);
    if (err) {
      document.getElementById("login_failed").innerHTML = err.description;
    }
  });
});


$('#google-signin-button').click(function(ev) {
  ev.preventDefault();
  alert('not impleted yet....');
});
