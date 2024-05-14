/** @format */

const User = require('../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const handlerFactory = require('./handlerFactory');
const sharp = require('sharp');
const multer = require('multer');

const filterObj = (obj, ...fields) => {
	const returnObj = {};
	Object.keys(obj).forEach((el) => {
		if (fields.includes(el)) returnObj[el] = obj[el];
	});
	return returnObj;
};

// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/img/users');
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split('/')[1];
//     const string = `user-${req.user.id}-${Date.now()}.${extension}`;
//     cb(null, string);
//   }
// });
const multerStorage = multer.memoryStorage();

const multerFilter = function(req, file, cb) {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('not a proper image', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizePhoto = catchAsync(async function(req, res, next) {
	if (!req.file) return next();
	req.file.filename = `user-${req.user.id}-${Date.now()}`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/img/users/${req.file.filename}`);
	next();
});

exports.deleteMe = catchAsync(async (req, res, next) => {
	await User.findByIdAndUpdate(req.user.id, { isActive: false });
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.updateMe = catchAsync(async (req, res, next) => {
	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				'this route is not for updating password please visit ./updatePassword to do such tasks',
				400
			)
		);
	}

	const filter = filterObj(req.body, 'name', 'email', 'photo', 'phone');
	if (req.file) filter.photo = req.file.filename;
	// updated the user;
	const user = await User.findByIdAndUpdate(req.user.id, filter, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: user,
	});
});

exports.getMe = (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			data: req.user,
		},
	});
};

// exports.createUser = handlerFactory.createOne(User);

exports.createUser = catchAsync(async function(req, res, next) {
	res.status(404).json({
		status: 'fail',
		message: 'please sign up to perform this type of action',
	});
});

exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.getAllUsers = handlerFactory.getAll(User);
exports.getUser = handlerFactory.getOne(User);
