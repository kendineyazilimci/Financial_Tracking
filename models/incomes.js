const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Income', incomeSchema);