const handlerFactory = require('./handlerFactory.js');
const Post = require('../models/postModel.js');

exports.createPost = handlerFactory.createOne(Post);
exports.getOne = handlerFactory.getOne(Post);
exports.getMany = handlerFactory.getAll(Post);
exports.update = handlerFactory.updateOne(Post);
exports.delete = handlerFactory.deleteOne(Post);
