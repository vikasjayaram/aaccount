const express = require('express'),
      router = express.Router();

router.get('/', (req,res) => {
  res.redirect('/login');
});

router.get('/login', (req,res) => {
  res.render('login');
});



module.exports = router;
