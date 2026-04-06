const express = require('express');

const authRouter = express.Router();
const authmiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post('/register', authController.registerUserController);
/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */

authRouter.post('/login', authController.loginUserController);


/**
 * @route GET /api/auth/logout
 * @desc Logout a user by clearing the token from cookies and adding into blacklist
 * @access Public
 */
authRouter.get('/logout', authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @desc Get the details of the logged in user
 * @access Private
 */

authRouter.get('/get-me',authController.getMeController); 

module.exports = authRouter;
