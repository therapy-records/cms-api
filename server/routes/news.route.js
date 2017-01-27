import express from 'express';
// import validate from 'express-validation';
// import paramValidation from '../../config/param-validation';
import newsCtrl from '../controllers/news.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/news - Get all posts */
  .get(newsCtrl.getAllPosts)

  /** POST /api/news - Create new post */
  .post(newsCtrl.createPost);

router.route('/:id')
  /** GET /api/news/:userId - Get post */
  .get(newsCtrl.getPost)

  /** PUT /api/news/:postId - Update post */
  .put(newsCtrl.updatePost)

  /** DELETE /api/news/:postId - Delete post */
  .delete(newsCtrl.removePost);

/** Load post when API with userId route parameter is hit */
router.param('postId', newsCtrl.loadPost);

export default router;
