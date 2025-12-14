const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { addUser, getUser } = require('./controllers/userController');
const { addExpense, getUserExpenses } = require('./controllers/expenseController');
const { addIncome, getUserIncomes } = require('./controllers/incomeController');

const port = process.env.PORT || 3000;

connectDB().then(async () => {

    await getUserExpenses(1);
    await getUserIncomes(1);
    await getUser(1);
    app.listen(port, () => {
        console.log(`Sunucu ${port} portunda çalışıyor`);
    });
});

app.set('view engine', 'ejs');
