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

const handleDeleteExpense = async (req, res) => {
    try {
        const userId = req.session.userID;
        const expenseId = req.params.id;

        if (!userId) {
            return res.redirect('/login');
        }

        await expenseController.deleteExpense(userId, expenseId);
        
        res.redirect(req.get('referer') || '/today');

    } catch (error) {
        console.error('Silme işlemi hatası:', error);
        res.redirect('/today');
    }
};

const handleDeleteIncome = async (req, res) => {
    try {
        const userId = req.session.userID;
        const incomeId = req.params.id;

        if (!userId) {
            return res.redirect('/login');
        }

        await incomeController.deleteIncome(userId, incomeId);

        res.redirect(req.get('referer') || '/today');

    } catch (error) {
        console.error('Silme işlemi hatası:', error);
        res.redirect('/today');
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
const getMonthPage = async (req, res) => {
    try {
        const userId = req.session.userID;
        if (!userId) return res.redirect('/login');
        
        // Verileri çek
        const expenses = await expenseController.getMonthExpenses(userId);
        const incomes = await incomeController.getMonthIncomes(userId);

        // --- YENİ KISIM: GRUPLAMA İŞLEMİ ---
        const groupedExpenses = groupByCategory(expenses);
        const groupedIncomes = groupByCategory(incomes);

        // Toplamları hesapla (Eski mantıkla aynı)
        let totalExpense = 0;
        let totalIncome = 0;
        if (expenses) expenses.forEach(e => totalExpense += e.amount);
        if (incomes) incomes.forEach(i => totalIncome += i.amount);
        
        res.render('userViews/thisMonth', {
            // Artık sayfaya ham veriyi değil, gruplanmış veriyi gönderiyoruz
            groupedExpenses: groupedExpenses, 
            groupedIncomes: groupedIncomes,
            totalExpense: totalExpense,
            totalIncome: totalIncome
        });
        
    } catch (error) {
        console.error('Sayfa yükleme hatası:', error);
        res.status(500).send('Bir hata oluştu.');
    }
};

const getYearPage = async (req, res) => {
    try {
        const userId = req.session.userID;
        if (!userId) return res.redirect('/login');

        const expenses = await expenseController.getYearExpenses(userId);
        const incomes = await incomeController.getYearIncomes(userId);  

        // --- YENİ KISIM: GRUPLAMA İŞLEMİ ---
        const groupedExpenses = groupByCategory(expenses);
        const groupedIncomes = groupByCategory(incomes);

        let totalExpense = 0;
        let totalIncome = 0;
        if (expenses) expenses.forEach(e => totalExpense += e.amount);
        if (incomes) incomes.forEach(i => totalIncome += i.amount);

        res.render('userViews/thisYear', {
            groupedExpenses: groupedExpenses, // Değişti
            groupedIncomes: groupedIncomes,   // Değişti
            totalExpense: totalExpense,
            totalIncome: totalIncome
        });
    } catch (error) {
        console.error('Sayfa yükleme hatası:', error);
        res.status(500).send('Bir hata oluştu.');
    }
};

// Yardımcı Fonksiyon: Verileri kategoriye göre gruplar
const groupByCategory = (items) => {
    const groups = {};
    
    if (items) {
        items.forEach(item => {
            const catName = item.category || 'Diğer'; // Kategori yoksa 'Diğer' yap
            
            // Eğer bu kategori henüz oluşturulmadıysa başlat
            if (!groups[catName]) {
                groups[catName] = {
                    totalAmount: 0,
                    items: []
                };
            }
            
            // Veriyi ilgili kategoriye ekle
            groups[catName].items.push(item);
            groups[catName].totalAmount += item.amount;
        });
    }
    return groups;
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
    handleAddIncome,
    handleAddExpense,
    handleDeleteExpense,
    handleDeleteIncome,
    getTodayPage,
    getMonthPage,
    getYearPage,
    groupByCategory
};