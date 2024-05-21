/** @format */

const express = require('express');
const userController = require('./../controllers/userController');
const auth = require('./../controllers/authController');

const router = express.Router();

// authentication related routes 6 in total
router.post('/signup', auth.signUp);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword/:token', auth.resetPassword);

// user persnalization related routes 4 in total
router.use(auth.protect);
router.patch('/updatePassword', auth.updatePassword);
router.patch(
	'/updateMe',
	userController.uploadUserPhoto,
	userController.resizePhoto,
	userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe);

router.use(auth.restrictTo('admin'));
router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(auth.restrictTo('admin'), userController.deleteUser);

module.exports = router;
