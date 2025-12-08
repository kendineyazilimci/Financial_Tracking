const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const connection = require('./dbProcesses/dbConnection');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});