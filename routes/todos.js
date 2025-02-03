const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const Todo = require('../models/Todo');

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.render('todos', {
      todos,
      user: req.user,
      messages: {
        success: req.flash('success'),
        error: req.flash('error')
      }
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading todos');
    res.redirect('/dashboard');
  }
});

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
