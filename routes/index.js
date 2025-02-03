const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/', forwardAuthenticated, (req, res) => {
  res.render('welcome', {
    isAuthenticated: req.isAuthenticated()
  });
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('dashboard', {
    user: req.user,
    isAuthenticated: true
  });
});

module.exports = router;
