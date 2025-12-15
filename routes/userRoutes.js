const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getTodayPage, 
    handleAddExpense,
    handleAddIncome
} = require('../controllers/userController');

const navbarLinks = [
    { id: 1, name: "Ana Sayfa", path: "/" },
    { id: 2, name: "Bugün", path: "/today" },
    { id: 3, name: "Bu Ay", path: "/thismonth" },
    { id: 4, name: "Bu Yıl", path: "/thisyear" },
    { id: 5, name: "Sign Up", path: "/signUp" },
    { id: 6, name: "Giriş Yap", path: "/login" }
];

router.use((req, res, next) => {
    res.locals.navbarLinks = navbarLinks;
    res.locals.user = req.session.userID || null; 
    next();
});

router.get("/", (req, res) => {
    res.render('userViews/homepage.ejs'); 
});

router.get('/today', getTodayPage);

router.get("/thismonth", (req, res) => {
    res.render('userViews/thismonth.ejs');
});

router.get("/thisyear", (req, res) => {
    res.render('userViews/thisyear.ejs');
});

router.get("/signup", (req, res) => {
    res.render('loginSignup/signUp.ejs');
});

router.get("/login", (req, res) => {
    res.render('loginSignup/login.ejs');
});

router.get('/logout', logoutUser);

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.post('/add-expense', handleAddExpense);
router.post('/add-income', handleAddIncome);

module.exports = router;