const mongoose = require('mongoose');
const validator = require('validator');

const Post = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a user must have its username']
    }, 
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email id']
    },
    contactNumber: {
        type: String,
        minLength: [10, 'a phone number cannot be lesser than 10 digit'],
        maxLength: [10, 'a phone number cannot be greater than 10 digit']
    },
    user: mongoose.Schema.ObjectId,
    date: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        enum: ['cybercrime', 'child abuse', 'financial fraud', 'race', 'harassment', 'cyberbullying', 'human tracking', 'stalking', 'sexual assault', 'domestic violence', 'quick'],
    },
    images: [String],
    files: [String],
    status: {
        type: String,
        enum: ['pending', 'processing', 'resolved'],
        default: 'pending',
    }
});

Post.post('find', (doc, next) => {
    doc.sort((a, b) => {
        const date1 = new Date(a.date);
        const date2 = new Date(b.date);
        return date2 - date1; // Compare dates numerically
    });
    next();
});

const postModel = mongoose.model('report', Post);

module.exports = postModel;
