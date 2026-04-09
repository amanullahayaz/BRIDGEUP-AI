require('express');
require("dotenv").config();

const app = require('./app');
const connectToDB = require('./config/db');

connectToDB(); //DB connection

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});