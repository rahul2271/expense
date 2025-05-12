import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseChart from './ExpenseChart';

const API_URL = 'http://localhost:5000/api/expenses';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: '', category: '', note: '', date: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(API_URL);
    setExpenses(res.data);
  };

  const addExpense = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    setForm({ amount: '', category: '', note: '', date: '' });
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchExpenses();
  };

  const deleteAll = async () => {
    await axios.delete(API_URL);
    fetchExpenses();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Expense Tracker</h2>
      <form onSubmit={addExpense}>
        <input type="number" placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
        <input type="text" placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <button type="submit">Add</button>
      </form>

      <button style={{ marginTop: 20 }} onClick={deleteAll}>Delete All</button>

      <ul style={{ marginTop: 20 }}>
        {expenses.map(exp => (
          <li key={exp._id}>
            ₹{exp.amount} - {exp.category} ({new Date(exp.date).toLocaleDateString()}) - {exp.note}
            <button onClick={() => deleteExpense(exp._id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>

      {expenses.length > 0 && <ExpenseChart expenses={expenses} />}
    </div>
  );
}

export default App;
