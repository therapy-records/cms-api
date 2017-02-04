import News from '../models/news.model';
import tokenCtrl from './token.controller';

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
 * @property {string} req.body.newsname - The newsname of news.
 * @property {string} req.body.mobileNumber - The mobileNumber of news.
 * @returns {newsPost}
 */
function createPost(req, res, next) {
  const news = new News({
    title: req.body.title,
    mainBody: req.body.mainBody,
    createdAt: new Date()
    // editedAt: req.body.editedAt
  });

  return tokenCtrl.checkToken(req, res, next)
    .then(() => {
      news.save()
        .then((savedPost) => {
          res.json(savedPost);
        });
    });
}

/**
 * Update existing news
 * @property {string} req.body.newsname - The newsname of news.
 * @property {string} req.body.mobileNumber - The mobileNumber of news.
 * @returns {news}
 */
function updatePost(req, res, next) {
  const news = req.news;
  news.newsname = req.body.newsname;
  news.mobileNumber = req.body.mobileNumber;

  news.save()
    .then(savednews => res.json(savednews))
    .catch(e => next(e));
}

/**
 * Get news posts
 * @returns {news[]}
 */
function getAllPosts(req, res, next) {
  News.find()
  .then(news => res.json(news))
  .catch(e => next(e));
}

/**
 * Delete news.
 * @returns {news}
 */
function removePost(req, res, next) {
  const news = req.news;
  news.remove()
    .then(deletedPost => res.json(deletedPost))
    .catch(e => next(e));
}

export default { loadPost, getPost, createPost, updatePost, getAllPosts, removePost };
