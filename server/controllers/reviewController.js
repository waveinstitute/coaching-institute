/** @format */

const handlerFactory = require('./handlerFactory');
const Review = require('./../models/reviewModel.js');

exports.getOne = handlerFactory.getOne(Review);
exports.getMany = handlerFactory.getAll(Review);
exports.createReview = handlerFactory.createOne(Review);
exports.update = handlerFactory.updateOne(Review);
exports.delete = handlerFactory.deleteOne(Review);
