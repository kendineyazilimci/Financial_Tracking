const dbQuery = {
    selectUsers: "SELECT * FROM users",
    selectUsersExpensesById: "SELECT * FROM expenses WHERE user_id = ?",
    selectUsersIncomeById: "SELECT * FROM income WHERE user_id = ?"
};
module.exports = dbQuery;