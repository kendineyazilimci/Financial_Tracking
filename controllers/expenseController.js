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

const deleteExpense = async (userId, expenseId) => {
    try {
        const result = await Expense.findOneAndDelete({ _id: expenseId, userId: userId });
        
        if (result) {
            console.log('Harcama silindi:', result.description);
        } else {
            console.log('Silinecek harcama bulunamadı veya yetki yok.');
        }
        return result;
    } catch (error) {
        console.error('Harcama silinirken hata:', error.message);
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

const getTodayExpenses = async (userId) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const expenses = await Expense.find({
            userId: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        return expenses;
    } catch (error) {
        console.error('Bugünün harcamaları çekilirken hata:', error.message);
        return [];
    }
};

const getMonthExpenses = async (userId) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        const expenses = await Expense.find({
            userId: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });
        return expenses;
    } catch (error) {
        console.error('Ayın harcamaları çekilirken hata:', error.message);
        return [];
    }
};

const getYearExpenses = async (userId) => {
    try {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        startOfYear.setHours(0, 0, 0, 0);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31);
        endOfYear.setHours(23, 59, 59, 999);
        const expenses = await Expense.find({
            userId: userId,
            createdAt: { $gte: startOfYear, $lte: endOfYear }
        });
        return expenses;
    } catch (error) {
        console.error('Yılın harcamaları çekilirken hata:', error.message);
        return [];
    }
};

module.exports = {
    addExpense,
    deleteExpense,
    getUserExpenses,
    getTodayExpenses,
    getMonthExpenses,
    getYearExpenses
};