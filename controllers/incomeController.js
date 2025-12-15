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

module.exports = {
    addIncome,
    getUserIncomes,
    getTodayIncomes 
};