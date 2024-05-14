/** @format */

const mongoose = require('mongoose');
const User = require('./userModel');
const slugify = require('slugify');

// Define schema for course
const courseSchema = new mongoose.Schema({
	title: {
		unique: true,
		required: [true, 'Title is required.'],
		type: String,
		trim: true,
	},
	youtubeId: {
		type: String,
		required: [true, 'YouTube ID is required.'],
		trim: true,
	},
	courseOverview: {
		type: String,
		required: [true, 'Course overview is required.'],
		trim: true,
	},
	keyPoints: [
		{
			type: String,
			required: [true, 'Key point is required.'],
			trim: true,
			minlength: [3, 'Key point must be at least 3 characters long.'],
		},
	],
	description: {
		required: [true, 'Description is required.'],
		type: String,
		trim: true,
		minlength: [50, 'Description must be at least 50 characters long.'],
	},
	intro: {
		type: String,
		required: [true, 'Introduction is required.'],
		minlength: [20, 'Introduction must be at least 20 characters long.'],
	},
	instructor: [
		{
			type: String,
			required: [true, 'Instructor is required.'],
			trim: true,
		},
	],
	price: {
		type: Number,
		required: [true, 'Price is required.'],
	},
	duration: {
		type: Number, // Duration in weeks or hours
		required: [true, 'Duration is required.'],
	},
	category: {
		type: String,
		required: [true, 'Category is required.'],
		enum: ['Basic', 'Advanced', 'Competitive', 'Foundation', 'Other'],
	},
	// lessons: [
	// 	{
	// 		title: {
	// 			type: String,
	// 			required: [true, 'Lesson title is required.'],
	// 		},
	// 		content: {
	// 			type: String,
	// 			required: [true, 'Lesson content is required.'],
	// 		},
	// 		duration: {
	// 			type: Number,
	// 			required: [true, 'Lesson duration is required.'], // Duration in minutes
	// 		},
	// 	},
	// ],
	slug: {
		type: String,
		default: function() {
			return slugify(this.title, { lower: true });
		},
		unique: [true, 'Slug must be unique.'],
	},
	startsFrom: {
		type: Date,
		required: [true, 'Start date is required.'],
	},
	percenctageCompleted: {
		type: Number,
		default: 0,
	},
	studentsEnrolled: {
		type: Number,
		default: 0,
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'User',
		},
	],
	stage: {
		type: String,
		enum: ['Draft', 'Published'],
		default: 'Draft',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	discount: {
		type: Number,
		default: 0,
	},
});

courseSchema.post('validate', function(error, doc, next) {
	if (error) {
		const errors = Object.values(error.errors).map((err) => err.message);
		const errorMessage = `Validation failed: ${errors.join(', ')}`;
		next(new Error(errorMessage));
	} else {
		next();
	}
});

// Create Course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
