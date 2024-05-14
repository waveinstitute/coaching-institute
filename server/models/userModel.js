/** @format */

const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const Course = require('./courseModel');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'a user must have its username'],
	},
	email: {
		type: String,
		required: [true, 'email id is required'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'enter correct email address'],
	},
	phone: {
		type: String,
		required: [true, 'phone number is required'],
		minlength: [10, 'minimum 10 digit phone number is required'],
		maxlength: [11, 'maximum 11 digit phone number is required'],
		unique: true,
	},
	photo: {
		type: String,
		default:
			'https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png',
	},
	role: {
		type: String,
		enum: ['user', 'guide', 'lead-guide', 'admin'],
		default: 'user',
	},
	password: {
		type: String,
		required: [true, 'password is required'],
		minlength: [8, 'minimum 8 character password is required'],
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: true,
		// this works on CREATE & SAVE!!
		validate: [
			function(el) {
				return this.password === el;
			},
			'both password are not same',
		],
	},
	courseEnrolled: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Course',
		},
	],
	isActive: {
		type: Boolean,
		default: true,
		select: false,
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
	passwordChangedAt: Date,
});

userSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'courseEnrolled',
		select: 'title',
	});
	next();
});

userSchema.pre(/^find/, function(next) {
	this.find({ isActive: { $ne: false } });
	// this.find({ active: true });
	next();
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	this.passwordConfirm = undefined;
	next();
});

userSchema.pre('save', function(next) {
	if (this.isModified('password') || !this.isNew) {
		this.passwordChangedAt = Date.now() - 1000;
	}
	next();
});

userSchema.methods.correctPassword = async function(
	candidatePassword,
	userPassword
) {
	try {
		return await bcrypt.compare(candidatePassword, userPassword);
	} catch (err) {
		console.log('an error occoured: ', err);
	}
};

userSchema.methods.changedPasswordAfter = async function(JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}

	// if code reaches to this line that means that code is not changed
	return false;
};

userSchema.methods.createPasswordResetToken = function() {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	console.log({ resetToken, encryptedToken: this.passwordResetToken });
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
