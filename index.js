const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const session = require('express-session');
const flash = require('connect-flash');

const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'gizliAnahtar',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    
    res.locals.userID = req.session.userID;
    next();
});


app.use(userRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Sunucu ${port} portunda çalışıyor...`);
    });
}).catch(err => {
    console.error("Veritabanı bağlantı hatası:", err);
});