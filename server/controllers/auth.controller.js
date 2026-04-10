const userModel = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const tokenBlacklistModel = require('../models/blacklist.model.js');


// /** *
//  * @name registerUserController
//  * @description This function registers a new user in the database. It checks if the username or email already exists, hashes the password, and saves the user to the database.
//  * 
//  * @access Public  
//  * */

async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const isUseralreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });
    if (isUseralreadyExists) {
        return res.status(400).json({
            message: 'Username or email already exists'
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
        username,
        email,
        password: hashedPassword
    });

    await user.save();


    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username
        }
    });


}

/**
 * @name loginUserController
 * @description This function logs in a user by checking the email and password. If the credentials are correct, it generates a JWT token and sends it back to the client.
 * @access Public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username
        }
    });
}


/**
 * @route GET /api/auth/logout
 * @desc Logout a user by clearing the token from cookies and adding into blacklist
 * @access Public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    // Add token to blacklist
    await tokenBlacklistModel.create({ token });

    // Clear the token from cookies
    res.clearCookie('token', { path: '/' });

    res.status(200).json({ message: 'User logged out successfully' });
}

/**
 * @name getMeController
 * @description This function retrieves the details of the logged-in user. It uses the user ID from the JWT token to fetch the user information from the database and sends it back to the client.
 * @access Private 
 */
async function getMeController(req, res) {
    const userId = req.user.userId;
    const user = await userModel.findById(userId).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        message: 'User details retrieved successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};