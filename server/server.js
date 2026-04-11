require("dotenv").config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const connectToDB = require('./config/db');

// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

const app = express();
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function(origin, callback) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        if (!origin || origin === frontendUrl || origin.endsWith('.vercel.app') || origin.startsWith('http://localhost:')) {
            callback(null, origin); // Access-Control-Allow-Origin will correctly respond with the incoming origin
        } else {
            callback(new Error('Blocked by CORS'));
        }
    },
    credentials: true
}));

connectToDB().then(() => {
  console.log("Database connected");
}).catch(err => {
  console.error("Database connection failed", err);
});

// using all the routes here
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

app.get('/', async (req, res) => {
  res.send('hello this is home!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;