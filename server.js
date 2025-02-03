// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

// Load environment variables (if using .env file)
require('dotenv').config();

// Passport Config
require('./config/passport')(passport);

// Database Config
const dbURI = 'mongodb://127.0.0.1:27017/todo-list-app'; // Updated MongoDB URI

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

// EJS Middleware
app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Method Override Middleware
app.use(methodOverride('_method'));

// Set the views directory (optional if it's 'views')
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts middleware
app.use(expressLayouts);

// (Optional) Set the default layout (if your layout file is not named 'layout.ejs')
app.set('layout', 'layouts/layout');

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }),
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash Middleware
app.use(flash());

// Global Variables for Flash Messages
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Global variables middleware
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Your routes
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });
});

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const todoRoutes = require('./routes/todos');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));