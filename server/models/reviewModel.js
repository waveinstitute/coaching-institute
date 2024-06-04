/** @format */

const mongoose = require('mongoose');

const review = new mongoose.Schema({
	review: {
		type: String,
		required: [true, 'a review must have a review'],
	},
	rating: {
		type: Number,
		required: [true, 'a review must have a rating'],
		enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	active: {
		type: Boolean,
		default: false,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'a review must have a user'],
	},
});

review.pre(/^find/, function(next) {
	this.populate({
		path: 'user',
		select: 'name photo email ',
	});
	next();
});

const Review = mongoose.model('Review', review);
module.exports = Review;
