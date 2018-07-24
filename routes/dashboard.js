var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');

// get dashboard
router.get('/', function(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect('login');
  }
  else {
    res.render('dashboard');
  }
  console.log(req.user);
  console.log(req.isAuthenticated());
});

module.exports = router;
