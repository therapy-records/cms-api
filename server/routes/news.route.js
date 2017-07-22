import express from 'express';
import validate from 'express-validation';
import passport from 'passport';
import paramValidation from '../../config/param-validation';
import newsCtrl from '../controllers/news.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/news - Get all posts */
  .get(newsCtrl.getAllPosts)

  /** POST /api/news - Create new post */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.createPost(req, res, next);
  });

router.route('/queue')
  /** GET /api/news/queue - Get all posts in queue */
  .get(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.getAllPostsQueue(req, res, next);
  })
  /** POST /api/news/queue - Create new post in queue*/
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.createPostQueue(req, res, next);
  });

router.route('/queue/:queuePostId')
  /** DELETE /api/news/queue/:queuePostId - Delete post in queue */
  .delete(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.removePostQueue(req, res, next);
  })

  /** PUT /api/news/:postId - Update post */
  .put(validate(paramValidation.editNewsPost),
    passport.authenticate('jwt', { session: false }), (req, res, next) => {
      newsCtrl.editPostQueue(req, res, next);
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

router.route('/create')
  /** POST /api/news/create - Create new post */
  .post(passport.authenticate('jwt', { session: false }), (req, res, next) => {
    newsCtrl.createPost(req, res, next);
  });

/** Load post when API with postId route parameter is hit */
// router.param('postId', newsCtrl.loadPost);

/** Load post when API with queuePostId route parameter is hit */
router.param('queuePostId', newsCtrl.loadPostQueue);


export default router;
