const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/'; // or MongoDB Atlas URL

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Expense Schema
const ExpenseSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  note: String,
  date: Date
});
const Expense = mongoose.model('Expense', ExpenseSchema);

// Routes
app.get('/api/expenses', async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
});

app.post('/api/expenses', async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json({ message: 'Expense added' });
});

app.delete('/api/expenses/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Expense deleted' });
});

app.delete('/api/expenses', async (req, res) => {
  await Expense.deleteMany({});
  res.json({ message: 'All expenses deleted' });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
