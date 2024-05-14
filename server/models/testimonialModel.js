/** @format */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'a user must have its username'],
	},
	photo_pc: {
		type: String,
		required: [true, 'a user must have its photo'],
	},
	photo_mob: {
		type: String,
		required: [true, 'a user must have its photo'],
	},
	to: {
		type: String,
		required: [true, 'route the testimonial is flow'],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	active: {
		type: Boolean,
		default: true,
	},
});

const Testimonial = mongoose.model('testimonial', testimonialSchema);
module.exports = Testimonial;
