/** @format */

const app = require('express');
const testimonialController = require('../controllers/testimonialController.js');

const Router = app.Router();

Router.route('/')
	.post(testimonialController.createTestimonial)
	.get(testimonialController.getMany);

Router.route('/:id')
	.get(testimonialController.getOne)
	.patch(
		testimonialController.createUpload,
		testimonialController.cloudMid,
		testimonialController.update
	)
	.delete(testimonialController.delete);

module.exports = Router;
