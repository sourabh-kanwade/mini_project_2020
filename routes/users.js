var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
//User Model
const User = require('../models/User');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
/* GET  login page */
router.get('/login', (req, res) => {
  res.render('login');
});
//GET Register page
router.get('/register', (req, res) => {
  res.render('register');
});
//Register handle
router.post('/register', (req, res) => {
  const { name, username, email, password, password2 } = req.body;
  let errors = [];
  //Check required fields
  if (!username || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  //Ckeck password match
  if (password !== password2) {
    errors.push({ msg: 'Password do not match' });
  }
  //Check pass length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', { errors, name, username, email });
  } else {
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          //User Exists
          errors.push({ msg: 'Email is already is registered !' });
          res.render('register', { errors, name, username, email });
        } else {
          const newUser = new User({
            name,
            username,
            email,
            password
          });
          //hash password
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            //set password to hash
            newUser.password = hash;
            //save user
            newUser.save()
              .then(user=>{
                
                  res.redirect('/users/login')
                })
              .catch(err => console.log(err));
          }))
        }
      });
  }
});

//Login handle
router.post('/login', passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect:'/users/login',
    failureFlash:true
}))

//GET Logout page
router.get('/logout', (req, res) => {
  res.render('logout');
});
module.exports = router;
