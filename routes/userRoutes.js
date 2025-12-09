const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const navbarLinks = [
    { id: 1, name: "Ana Sayfa", path: "/" },
    { id: 2, name: "Bugün", path: "/today" },
    { id: 3, name: "Bu Ay", path: "/thismonth" },
    { id: 4, name: "Bu Yıl", path: "/thisyear" },
];
const expenses = [
    {
        id: 1,
        userId: 1,
        type: "expense",
        amount: 400,
        description: "Sigara",
        date: "2025-12-09"
    },
    {
        id: 2,
        userId: 1,
        type: "expense",
        amount: 100,
        description: "Yemek",
        date: "2025-12-09"
    },
    {
        id: 3,
        userId: 1,
        type: "expense",
        amount: 250,
        description: "Yemek",
        date: "2025-12-09"
    },
    {
        id: 4,
        userId: 1,
        type: "expense",
        amount: 250,
        description: "Yemek",
        date: "2025-12-09"
    }
];

const incomes = [
    {
        id: 1,
        userId: 1,
        type: "income",
        amount: 1500,
        description: "İş",
        date: "2025-12-09"
    },
    {
        id: 2,
        userId: 1,
        type: "income",
        amount: 500,
        description: "Freelance",
        date: "2025-12-09"
    }
];

router.get("/", (req, res) => {
    res.render('../views/userViews/homepage.ejs', { navbarLinks, expenses, incomes });
});

router.get("/today", (req, res) => {
    res.render('../views/userViews/today.ejs', { navbarLinks, expenses, incomes });
});

router.get("/thismonth", (req, res) => {
    res.render('../views/userViews/thismonth.ejs', { navbarLinks, expenses, incomes });
});

router.get("/thisyear", (req, res) => {
    res.render('../views/userViews/thisyear.ejs', { navbarLinks, expenses, incomes });
});

module.exports = router;