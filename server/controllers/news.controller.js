const News = require('../models/news.model');
const { verifyToken } = require('./token.controller');
const {
  urlFriendlyString
} = require('../utils');

/**
 * Load news and append to req.
 */
function loadPost(req, res, next, id) {
  News.getSingle(id)
    .then((post) => {
      req.post = post; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get news post
 * @returns {post}
 */
function getPost(req, res) {
  return res.json(req.post);
}

/**
 * Create new post
 * @property {string} req.body.title - The main article title, e.g 'June update'
 * @property {object} req.body.sections - The image and copy sections of the news article
 * @returns {newsPost}
 */
function createPost(req, res, next) {
  const news = new News({
    title: req.body.title,
    urlTitle: urlFriendlyString(req.body.title),
    createdAt: new Date(),
    sections: req.body.sections
  });

  verifyToken(req, res, next)
    .then(() => {
      news.save()
        .then((savedPost) => {
          res.json(savedPost);
        })
        .catch(e => next(e));
    });
}

/**
 * Update existing news
 * @property {string} req.body.title
 * @property {object} req.body.bodyMain
 * @returns {news}
 */
function editPost(req, res, next) {
  verifyToken(req, res, next)
    .then(() => {
      req.body.editedAt = new Date(); // eslint-disable-line no-param-reassign
      News.edit(req.body)
        .then(savedPost => res.json(savedPost))
        .catch(e => next(e));
    });
}

/**
 * Get all news posts
 * @returns {news[]}
 */
function getAllPosts(req, res, next) {
  News.find()
    .then(news => res.json(news))
    .catch(e => next(e));
}

/**
 * Delete news
 * @returns {message}
 */
function removePost(req, res) {
  News.findByIdAndRemove(req.params.postId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Article deleted' });
  });
}

module.exports = {
  loadPost,
  getPost,
  createPost,
  editPost,
  getAllPosts,
  removePost
};
