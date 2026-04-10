require("dotenv").config();

const app = require('./app');
const connectToDB = require('./config/db');

connectToDB().then(() => {
  console.log("Database connected");
}).catch(err => {
  console.error("Database connection failed", err);
});

app.get('/', async (req, res) => {

  res.send('hello this is home!');

});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

module.exports = app;