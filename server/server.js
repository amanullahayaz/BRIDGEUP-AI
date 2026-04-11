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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;