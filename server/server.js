require('express');
require("dotenv").config();

const app = require('./app');
const connectToDB = require('./config/db');

connectToDB(); //DB connection


app.get('/', (req, res) => {
  res.send('hello this is home!');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});