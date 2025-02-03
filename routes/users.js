const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { forwardAuthenticated } = require('../config/auth');

// Load User Model
const User = require('../models/User');

const redirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
};

router.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', {
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', {
    isAuthenticated: req.isAuthenticated()
  });
});

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email is already registered' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            console.error('Error generating salt:', err);
            req.flash('error_msg', 'Something went wrong. Please try again.');
            return res.redirect('/users/register');
          }
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.error('Error hashing password:', err);
              req.flash('error_msg', 'Something went wrong. Please try again.');
              return res.redirect('/users/register');
            }
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch((err) => {
                console.error('Error saving user:', err);
                req.flash('error_msg', 'Something went wrong. Please try again.');
                res.redirect('/users/register');
              });
          });
        });
      }
    });
  }
});

router.post('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.error('Error logging out:', err);
      return next(err);
    }
    res.redirect('/users/login');
  });
});

module.exports = router;
