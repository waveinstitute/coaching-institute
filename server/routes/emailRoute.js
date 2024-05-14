/** @format */

const emailController = require('../controllers/emailController');
const express = require('express');
const Router = express.Router();

Router.post('/signUp', emailController.signUpMail);
Router.post('/sendEnquiry', emailController.sendEnquiryMail);

module.exports = Router;
