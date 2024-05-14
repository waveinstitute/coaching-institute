const app = require('express');
const postController = require('../controllers/postController');

const Router = app.Router();

Router.route('/')
    .post(postController.createPost)
    .get(postController.getMany);

Router.route('/:id')
    .get(postController.getOne)
    .patch(postController.update)
    .delete(postController.delete);

module.exports = Router;
