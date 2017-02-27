const express = require('express'),
      path = require('path'),
      app = express();

const routes = require('./routes')



app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.use( (req,res,next)=>{
  res.locals.getBundleUrl = function(bundleName) {
    return `/assets/${bundleName}.bundle.js`;
  }
  next();
});

app.use('/',routes);






module.exports = app;
