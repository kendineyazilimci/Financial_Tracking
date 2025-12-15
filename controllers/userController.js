const User = require('../models/users');
const expenseController = require('./expenseController');
const incomeController = require('./incomeController');

const registerUser = async (req, res) => {
    try {
        const { userName, userSurname, userEmail, userPassword } = req.body;

        if(!userName || !userSurname || !userEmail || !userPassword) {
            req.flash('errorMessage', 'Lütfen tüm alanları doldurun.');
            return res.redirect('/signup');
        }

        const newUser = new User({
            userName, userSurname, userEmail, userPassword
        });

        await newUser.save();
        
        req.flash('successMessage', 'Kayıt başarılı! Giriş yapabilirsiniz.');
        res.redirect('/login');

    } catch (error) {
        req.flash('errorMessage', 'Hata oluştu: ' + error.message);
        res.redirect('/signup');
    }
};

const loginUser = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        const user = await User.findOne({ userEmail: userEmail });

        if (user && user.userPassword === userPassword) {
            req.session.userID = user._id;

            console.log("Giriş yapıldı:", user.userName);
            res.redirect('/'); 
        } else {
            req.flash('errorMessage', 'Email veya şifre yanlış!');
            res.redirect('/login');
        }

    } catch (error) {
        req.flash('errorMessage', 'Sunucu hatası.');
        res.redirect('/login');
    }
};
const handleAddExpense = async (req, res) => {
    try {
        const userId = req.session.userID;
        const { description, amount, category } = req.body;

        await expenseController.addExpense(userId, amount, category || 'Genel', description);

        res.redirect('/today');

    } catch (error) {
        console.error(error);
        res.send("Harcama eklenirken hata oluştu.");
    }
};

const handleAddIncome = async (req, res) => {
    try {
        const userId = req.session.userID;
        const { description, amount, category } = req.body;

        await incomeController.addIncome(userId, amount, category || 'Genel', description);

        res.redirect('/today');

    } catch (error) {
        console.error(error);
        res.send("Gelir eklenirken hata oluştu.");
    }
};

const getTodayPage = async (req, res) => {
    try {
        const userId = req.session.userID;
        if (!userId) {
            return res.redirect('/login');
        }
        
        const expenses = await expenseController.getTodayExpenses(userId);
        
        const incomes = await incomeController.getTodayIncomes(userId);
        
        let totalExpense = 0;
        let totalIncome = 0;
        
        if (expenses) expenses.forEach(e => totalExpense += e.amount);
        if (incomes) incomes.forEach(i => totalIncome += i.amount);
        
        res.render('userViews/today', {
            expenses: expenses,
            incomes: incomes,
            totalExpense: totalExpense,
            totalIncome: totalIncome
        });
        
    } catch (error) {
        console.error('Sayfa yükleme hatası:', error);
        res.status(500).send('Bir hata oluştu.');
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getTodayPage,
    handleAddExpense,
    handleAddIncome
};