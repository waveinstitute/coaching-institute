/** @format */

const handlerFactory = require('./handlerFactory');
const Review = require('./../models/reviewModel.js');

exports.selectUser = (req, res, next) => {
	const user = req.user._id;
	req.body.user = user;
	next();
};

exports.getOne = handlerFactory.getOne(Review);
exports.getMany = handlerFactory.getAll(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.update = handlerFactory.updateOne(Review);
exports.delete = handlerFactory.deleteOne(Review);
