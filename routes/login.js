var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mysql = require('mysql');

var conn = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : '$p@r2018U5Xelect123'
});

// Login
router.get('/', function(req, res) {
  // res.locals.loginMessage = req.flash('loginMessage');
  res.render('login', {
    loginMessage : req.flash('loginMessage')
  });
  console.log('Im in this rn');
});

passport.use('local-login', new localStrategy({usernameField : 'email', passwordField : 'password', passReqToCallback : true},
  function(req, email, password, done){
    conn.query('Use UserDB;');
    conn.query("SELECT * FROM ClientData WHERE email = \'" +email +"\';",function(err,rows){
      if (err) {
        return done(err);
      }
      if (!rows.length) {
        console.log('no user found');
        return done(null, false, req.flash('loginMessage', 'Invalid Email')); // req.flash is the way to set flashdata using connect-flash
      }
      // if the user is found but the password is wrong
      if (!( rows[0].password == password)) {
        console.log('wrong password');
        return done(null, false, req.flash('loginMessage', 'Invalid Password')); // create the loginMessage and save it to session as flashdata
      }
      // all is well, return successful user
      console.log('success!!!');
      req.login(rows[0].email, function(err) {
        console.log('Im logged in');
      })
      return done(null, rows[0]);
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  conn.query("select email from ClientData where email = \'"+email +"\';",function(err,rows){
			done(null, rows[0]);
		});
});

router.post('/',
  passport.authenticate('local-login', {successRedirect:'/dashboard', failureRedirect:'/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/dashboard');
});


// router.post('/', function(req, res, next) {
//   passport.authenticate('local-login', function(err, user, info) {
//     if (err) {
//       console.log("ARE WE HERE");
//       res.render('login', {
//         errors:"there's a fucking error"
//       });
//     }
//     if (!user) {
//       console.log("or HERE");
//       var error = "Email not valid";
//       res.render('login', {
//         errors:"sum ting wong"
//       });
//     }
//     else {
//       res.redirect('/dashboard');
//     }
//   })(req, res, next);
// });

// router.post('/', function(req, res, next) {
//   passport.authenticate('local-login', function(err, user, info) {
//     if (err) { return res.render('login', {errors:err}); }
//     else { return res.redirect('/dashboard'); }
//   })
// });

// router.post('/', function(req, res, next) {
//
//   var email = req.body.email;
//   var password = req.body.password;
//
//   // may not be necessary with bootstrap built in checking
//   // req.checkBody('email', 'Email is required').notEmpty();
//   req.checkBody('email', 'Email is invalid').isEmail();
//   // req.checkBody('password', 'password is required').notEmpty();
//
//   var errors = req.validationErrors();
//
//   if (errors) {
//     res.render('login', {
//       errors:errors
//     });
//     console.log('We got errrors');
//   } else {
//     res.redirect('/dashboard');
//     console.log('We good');
//   }
// });

module.exports = router;
