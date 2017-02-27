import $ from 'jquery';
import auth0 from 'auth0-js';

$('#form-login').submit(function(ev) {
  var config = {};
  var webAuth = new auth0.WebAuth({
      domain: "atlassian-cse.auth0.com",
      clientID: "vLFyDYCrf5xNVusuoVEmKiSDkLJA1GA4",
      redirectUri: "http://localhost:9000/login"
  });
  ev.preventDefault();
  var options = config.internalOptions || {};
  options.username = document.getElementById('username').value;
  options.password = document.getElementById('password').value;
  options.connection = 'local';
  options.responseType = "code";
  options.scope = "openid";
  console.log(options);
  webAuth.redirect.loginWithCredentials(options,function(err,r){
    console.log(err);
    console.log(r);
  });
});


$('#google-signin-button').click(function(ev) {
  ev.preventDefault();
  alert('not impleted yet....');
});
