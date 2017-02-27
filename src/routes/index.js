const express = require('express'),
      router = express.Router();

router.get('/login', (req,res) => {
  if (req.query.code) {
    //TODO: exchange for token
    return res.redirect('profile');
  }
  res.render('login');
});


router.get('/profile', (req,res)=> {
  var username = req.username || "sam";
  res.render('profile', {name:username});
});

module.exports = router;
