const express = require('express');
const validate = require('express-validation');
const passport = require('passport');
const paramValidation = require('../../config/param-validation');
const newsCtrl = require('../controllers/news.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/news - Get all posts */
  .get(newsCtrl.getAllPosts)

  /** POST /api/news - Create new post */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.createPost(req, res, next);
  });

router.route('/:postId')
  /** GET /api/news/:postId - Get post */
  .get(newsCtrl.getPost)

  /** PUT /api/news/:postId - Update post */
  .put(validate(paramValidation.editNewsPost),
    passport.authenticate('jwt', { session: false }), (req, res, next) => {
      newsCtrl.editPost(req, res, next);
    })

  /** DELETE /api/news/:postId - Delete post */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.removePost(req, res, next);
  });

/** Load post when API with postId route parameter is hit */
router.param('postId', newsCtrl.loadPost);

module.exports = router;
