const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    userSurname: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
    userJoinDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Users', usersSchema);