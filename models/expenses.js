const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);