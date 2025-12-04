const dbInsert = {
    insertUser: "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
};

module.exports = dbInsert;