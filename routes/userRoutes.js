const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs"); 

const navbarLinks = [
    {id: 1, name: "Ana Sayfa", path: "/" },
    {id: 2, name: "Bugün", path: "/today" },
    {id: 3, name: "Bu Ay", path: "/thismonth" },
    {id: 4, name: "Bu Yıl", path: "/thisyear" },
];

router.get("/", (req, res) => {
    res.render('../views/userViews/homepage.ejs', { navbarLinks }); 
});

router.get("/contact", (req, res) => {
    res.render('../views/userViews/today.ejs', { navbarLinks });
});

router.get("/about", (req, res) => { 
    res.render('../views/userViews/thismonth.ejs', { navbarLinks }); 
});

router.get("/whereami", (req, res) => {
    res.render('../views/userViews/thisyear.ejs', { navbarLinks });
});

module.exports = router;