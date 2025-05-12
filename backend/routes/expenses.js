const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Create
router.post('/', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json(newExpense);
});

// Read all
router.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
});

// Delete one
router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Delete all
router.delete('/', async (req, res) => {
  await Expense.deleteMany({});
  res.json({ message: 'All expenses deleted' });
});

module.exports = router;
