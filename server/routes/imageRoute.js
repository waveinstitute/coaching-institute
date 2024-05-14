/** @format */

const Router = require('express').Router();
const imageUploader = require('../controllers/imageUploader.js');

Router.route('/').post(
	imageUploader.createUpload,
	imageUploader.cloudMid,
	imageUploader.imageUploader
);

module.exports = Router;
