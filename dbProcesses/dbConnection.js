const mysql = require('mysql2');
const config = require('./config');
const dbQuery = require('./dbQuery');
const dbInsert = require('./dbInsert');
const dbUpdate = require('./dbUpdate');
const dbDelete = require('./dbDelete');

let connection = mysql.createConnection({
    host: config.dbConnect.host,
    user: config.dbConnect.user,
    password: config.dbConnect.password,
    database: config.dbConnect.database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    connection.query(dbQuery.selectUsers, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        console.log('Connected to MySQL database');
    });
});

module.exports = connection;
