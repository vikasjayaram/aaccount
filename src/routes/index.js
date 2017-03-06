const express = require('express'),
	  passport = require('passport'),
	  ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(),
      router = express.Router();


router.get('/', (req,res) => {
  res.redirect('/login');
});

router.get('/login', (req,res) => {
  res.render('login');
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

router.get('/callback'
	, passport.authenticate('auth0', { failureRedirect: '/login' })
	, (req, res) => {
      res.redirect('/profile');
});

/*
* Logged in user routes
*/

router.get('/profile', ensureLoggedIn, (req,res)=> {
  res.render('profile', {user: req.user});
});

router.get('/account_settings', ensureLoggedIn, (req,res)=> {
  res.render('account_settings', {user: req.user});
});

router.get('/change_email', ensureLoggedIn, (req,res)=> {
  res.render('chng_email', {user: req.user});
});

router.get('/change_password', ensureLoggedIn, (req,res)=> {
  res.render('chng_pwd', {user: req.user});
});

router.get('/mfa', ensureLoggedIn, (req,res)=> {
  res.render('mfa', {user: req.user});
});

router.get('/dev_portal', ensureLoggedIn, (req,res)=> {
  res.render('dev_portal', {user: req.user});
});

router.get('/app_specific', ensureLoggedIn, (req,res)=> {
  res.render('app_specific', {user: req.user});
});
module.exports = router;
