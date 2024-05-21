/** @format */

const app = require('express');
const courseController = require('../controllers/courseController.js');

const Router = app.Router();

Router.route('/')
	.post(courseController.createPost)
	.get(courseController.getMany);

Router.route('/:id')
	.get(courseController.getOne)
	.patch(
		courseController.createUpload,
		courseController.cloudMid,
		courseController.update
	)
	.delete(courseController.delete);

module.exports = Router;
