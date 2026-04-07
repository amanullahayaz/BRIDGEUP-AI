require('express');
require("dotenv").config();

const app = require('./app');
const connectToDB = require('./config/db');
const invokeGeminiAi=require('./services/ai.service');
connectToDB(); //DB connection
invokeGeminiAi(); //Test Gemini AI
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});