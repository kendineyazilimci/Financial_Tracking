const Expense = require('../models/expenses');

const addExpense = async (userId, amount, category, description) => {
    try {
        const newExpense = await Expense.create({
            userId,
            amount,
            category,
            description
        });
        console.log('Harcama eklendi:', newExpense.description);
        return newExpense;
    } catch (error) {
        console.error('Harcama eklenirken hata:', error.message);
    }
};

const getUserExpenses = async (userId) => {
    try {
        const expenses = await Expense.find({ userId });

        if (expenses.length === 0) {
            console.log('Bu kullanıcıya ait harcama bulunamadı.');
        } else {
            console.log(`Kullanıcının ${expenses.length} adet harcaması bulundu.`);
        }

        return expenses;
    } catch (error) {
        console.error('Harcamalar çekilirken hata:', error.message);
    }
};

module.exports = {
    addExpense,
    getUserExpenses
};