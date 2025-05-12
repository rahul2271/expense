import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#953ee2', '#ffc107', '#28a745', '#17a2b8', '#dc3545', '#6f42c1'
      ]
    }]
  };

  return (
    <div style={{ maxWidth: 400, marginTop: 40 }}>
      <h3>Category-wise Expenses</h3>
      <Pie data={data} />
    </div>
  );
}
