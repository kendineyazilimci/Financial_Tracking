const mongoose = require('mongoose');
const { config } = require('./dbConfig');

const dbConnection = mongoose.connect(config.dbConnect.uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = {
    dbConnection,
    mongoose
};
