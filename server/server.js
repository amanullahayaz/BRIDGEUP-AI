require("dotenv").config();

const app = require('./app');
// const connectToDB = require('./config/db');

// let isConnected = false;
// 
// async function connectDBOnce() {
//   if (!isConnected) {
//     await connectToDB();
//     isConnected = true;
//   }
// }

app.get('/', async (req, res) => {
  
    res.send('hello this is home!');
  
});

module.exports = app;