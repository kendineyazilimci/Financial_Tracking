const Income = require('../models/incomes');

const addIncome = async (userId, amount, category, description) => {
    try {
        const newIncome = await Income.create({
            userId,
            amount,
            category,
            description
        });

        console.log('Gelir eklendi:', newIncome.description);
        return newIncome;
    } catch (error) {
        console.error('Gelir eklenirken hata:', error.message);
    }
};

const deleteIncome = async (userId, incomeId) => {
    try {
        const result = await Income.findOneAndDelete({ _id: incomeId, userId: userId });

        if (result) {
            console.log('Gelir silindi:', result.description);
        } else {
            console.log('Silinecek gelir bulunamadı veya yetki yok.');
        }
        return result;
    } catch (error) {
        console.error('Gelir silinirken hata:', error.message);
    }
};

const getUserIncomes = async (userId) => {
    try {
        const incomes = await Income.find({ userId });

        if (incomes.length === 0) {
            console.log('Bu kullanıcıya ait gelir bulunamadı.');
        } else {
            console.log(`Kullanıcının ${incomes.length} adet geliri bulundu.`);
        }

        return incomes;
    } catch (error) {
        console.error('Gelirler getirilirken hata:', error.message);
    }
};

const getTodayIncomes = async (userId) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const incomes = await Income.find({
            userId: userId,
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        return incomes;
    } catch (error) {
        console.error('Bugünün gelirleri çekilirken hata:', error.message);
        return [];
    }
};
const getMonthIncomes = async (userId) => {
    try {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const endOfMonth = new Date();
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);
        const incomes = await Income.find({
            userId: userId,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        });
        return incomes;
    } catch (error) {
        console.error('Ayın gelirleri çekilirken hata:', error.message);
        return [];
    }
};

const getYearIncomes = async (userId) => {
    try {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999);

        const incomes = await Income.find({
            userId: userId,
            createdAt: { $gte: startOfYear, $lte: endOfYear }
        });
        return incomes;
    } catch (error) {
        console.error('Yılın gelirleri çekilirken hata:', error.message);
        return [];
    }   
};

module.exports = {
    addIncome,
    deleteIncome,
    getUserIncomes,
    getTodayIncomes,
    getMonthIncomes,
    getYearIncomes
};