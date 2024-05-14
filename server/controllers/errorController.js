/** @format */

const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	console.log(value);

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
	const errors = Object.values(err.errors).map((el) => el.message);

	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
};
const handleJWTError = (err) => {
	console.log({ err });
	return new AppError('you are unauthorized, please log in again', 401);
};
const handleTokenExpire = (err) =>
	new AppError('session expired log in again ', 401);

const sendErrorDev = (err, req, res) => {
	if (req.originalUrl.startsWith('/api')) {
		res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	} else {
		console.log(err);
		res.status(err.statusCode).render('error', {
			title: 'something went wrong!!❌❌',
			err: err.message,
		});
	}
};

const sendErrorProd = (err, req, res) => {
	// Operational, trusted error: send message to client
	// check if it error for api or for our page

	if (req.originalUrl.startsWith('/api')) {
		if (err.isOperational) {
			res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});

			// Programming or other unknown error: don't leak error details
		} else {
			// 1) Log error
			console.error('ERROR 💥', err);

			// 2) Send generic message
			res.status(500).json({
				status: 'error',
				message: 'Something went very wrong!',
			});
		}
	} else {
		res.status(err.statusCode).render('error', {
			title: 'something went wrong!!❌❌',
			err: 'please try again later',
		});
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === 'production') {
		let error = { ...err };
		error.message = err.message;

		if (error.name === 'CastError') error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);
		if (error.name === 'ValidationError')
			error = handleValidationErrorDB(error);
		if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
		if (error.name === 'TokenExpiredError') error = handleTokenExpire(error);
		sendErrorProd(error, req, res);
	}
};
