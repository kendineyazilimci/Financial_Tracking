const { mongoose } = require('./dbConnection');
const { usersSchema, expenseSchema, incomeSchema } = require('./dbConfig');
const Users = mongoose.model('Users', usersSchema, "users");
const Expense = mongoose.model('Expense', expenseSchema, "expenses");
const Income = mongoose.model('Income', incomeSchema, "incomes");

async function addUser(id, name, surname, email, password) {
    try {
        const newUser = new Users({
            userId: id,
            userName: name,
            userSurname: surname,
            userEmail: email,
            userPassword: password,
            userJoinDate: new Date()
        });

        const result = await newUser.save();
        console.log('User added:', result);
        return result;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
}
async function addExpense(amount, category, description) {
    try {
        const newExpense = new Expense({
            expenseAmount: amount,
            expenseCategory: category,
            expenseDescription: description,
            expenseDate: new Date()
        });

        const result = await newExpense.save();
        console.log('Expense added:', result);
        return result;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
}

async function addIncome(amount, category, description) {
    try {
        const newIncome = new Income({
            incomeAmount: amount,
            incomeCategory: category,
            incomeDescription: description,
            incomeDate: new Date()
        });

        const result = await newIncome.save();
        console.log('Income added:', result);
        return result;
    } catch (error) {
        console.error('Error adding income:', error);
        throw error;
    }
}

module.exports = {
    addUser,
    addExpense,
    addIncome
};
