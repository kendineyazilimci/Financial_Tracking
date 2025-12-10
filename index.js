const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const { addExpense } = require('./dbProcesses/dbCRUD');


app.set('view engine', 'ejs');

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRoutes);

addExpense(100, "test", "test");

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});