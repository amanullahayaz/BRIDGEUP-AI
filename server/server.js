require("dotenv").config();

const app = require('./app');
const connectToDB = require('./config/db');

let isConnected = false;

async function connectDBOnce() {
  if (!isConnected) {
    await connectToDB();
    isConnected = true;
  }
}

app.get('/', async (req, res) => {
  try {
    await connectDBOnce();
    res.send('hello this is home!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;