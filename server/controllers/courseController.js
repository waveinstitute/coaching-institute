/** @format */

const multer = require('multer');
const handlerFactory = require('./handlerFactory.js');
const Post = require('../models/courseModel.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: 'dwyn6rbjh',
	api_key: '719438478626195',
	api_secret: 'cmqGti-n7d3g2fuV5DQaKmW3fnI',
});

const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/user');
	},
	filename: function(req, file, cb) {
		if (file.mimetype.startsWith('image/')) {
			cb(null, file.originalname);
		} else {
			cb(new Error('File must be an image'));
		}
	},
});

exports.cloudMid = (req, res, next) => {
	if (!req.file) return next();
	cloudinary.uploader.upload(
		req.file.path,
		{
			public_id: req.file.filename.split('.')[0],
			transformation: [{ quality: 'auto' }],
		},
		function(error, result) {
			if (error) {
				return next(error);
			}
			// console.log(result, error);
			req.body.courseOverview = result.secure_url;
			res.locals.url = result.secure_url;
			res.locals.format = result.format;
			res.locals.height = result.height;
			res.locals.width = result.width;
			res.locals.type = result.resource_type;
			res.locals.size = result.bytes;
			next();
		}
	);
};

// upload is a middleware
const upload = multer({ storage: storage });
exports.createUpload = upload.single('file');

exports.createPost = handlerFactory.createOne(Post);
exports.getOne = handlerFactory.getOne(Post);
exports.getMany = handlerFactory.getAll(Post);
exports.update = handlerFactory.updateOne(Post);
exports.delete = handlerFactory.deleteOne(Post);
