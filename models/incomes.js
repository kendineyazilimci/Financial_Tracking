const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, default: 'Genel' },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);