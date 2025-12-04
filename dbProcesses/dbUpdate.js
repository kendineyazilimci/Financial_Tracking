const dbUpdate = {
    updateUser: "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?"
};

module.exports = dbUpdate;