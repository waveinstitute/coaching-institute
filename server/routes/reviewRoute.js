/** @format */

const app = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const Router = app.Router();

Router.route('/').get(reviewController.getMany);

Router.use(authController.protect);

// protected routes
Router.route('/').post(
	reviewController.selectUser,
	reviewController.createReview
);

Router.route('/:id')
	.get(reviewController.getOne)
	.patch(reviewController.update)
	.delete(reviewController.delete);

module.exports = Router;
