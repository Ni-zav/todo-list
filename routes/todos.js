const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Load Todo Model
const Todo = require('../models/Todo');

// Todo List Page
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.render('todos', {
      todos,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading todos');
    res.redirect('/dashboard');
  }
});

// Add Todo Handle
router.post('/add', ensureAuthenticated, async (req, res) => {
  try {
    const newTodo = new Todo({
      user: req.user.id,
      task: req.body.task,
    });

    await newTodo.save();
    req.flash('success', 'Todo added successfully');
    res.redirect('/todos');
  } catch (err) {
    req.flash('error', 'Failed to add todo');
    res.redirect('/todos');
  }
});

// Update Todo Handle
router.put('/update/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { task: req.body.task, completed: req.body.completed === 'on' }
    );
    req.flash('success', 'Todo updated successfully');
    res.redirect('/todos');
  } catch (err) {
    req.flash('error', 'Failed to update todo');
    res.redirect('/todos');
  }
});

// Delete Todo Handle
router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, user: req.user.id });
    req.flash('success', 'Todo deleted successfully');
    res.redirect('/todos');
  } catch (err) {
    req.flash('error', 'Failed to delete todo');
    res.redirect('/todos');
  }
});

module.exports = router;