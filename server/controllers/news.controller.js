import News from '../models/news.model';
import QueueNewsPost from '../models/queueNewsPost.model';
import { verifyToken } from './token.controller';


/**
 * Create a url friendly string
 * @property string: 'Hello World Test'
 * @returns 'hello-world-test'
 */
function urlFriendlyString(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

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
 * Load queue post and append to req.
 */
function loadPostQueue(req, res, next, id) {
  QueueNewsPost.getSingle(id)
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
 * @property {object} req.body.bodyMain - The html content of news post.
 * @returns {newsPost}
 */
function createPost(req, res, next) {
  const _mainImage = {
    url: req.body.mainImage.url,
    externalLink: req.body.mainImage.externalLink
  };
  if (req.body.ticketsLink &&
      req.body.mainImage.url &&
     !req.body.mainImage.externalLink) {
    _mainImage.externalLink = req.body.ticketsLink;
  }
  const news = new News({
    title: req.body.title,
    urlTitle: urlFriendlyString(req.body.title),
    bodyMain: req.body.bodyMain,
    quotes: req.body.quotes,
    mainImage: _mainImage,
    secondaryImageUrl: req.body.secondaryImageUrl,
    miniGalleryImages: req.body.miniGalleryImages,
    socialShare: req.body.socialShare,
    createdAt: new Date(),
    ticketsLink: req.body.ticketsLink,
    venueLink: req.body.venueLink
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
 * Create new post
 * @property {string} req.body.newsname - The newsname of news.
 * @property {object} req.body.bodyMain - The html content of news post.
 * @returns {newsPost}
 */
function createPostQueue(req, res, next) {
  const _mainImage = {
    url: req.body.mainImage.url,
    externalLink: req.body.mainImage.externalLink
  };
  if (req.body.ticketsLink &&
      req.body.mainImage.url &&
     !req.body.mainImage.externalLink) {
    _mainImage.externalLink = req.body.ticketsLink;
  }
  const news = new QueueNewsPost({
    title: req.body.title,
    urlTitle: urlFriendlyString(req.body.title),
    bodyMain: req.body.bodyMain,
    quotes: req.body.quotes,
    mainImage: _mainImage,
    secondaryImageUrl: req.body.secondaryImageUrl,
    miniGalleryImages: req.body.miniGalleryImages,
    createdAt: req.body.scheduledTime,
    scheduledTime: req.body.scheduledTime,
    ticketsLink: req.body.ticketsLink,
    venueLink: req.body.venueLink
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
 * Update existing queue post
 * @property {string} req.body.title
 * @property {object} req.body.bodyMain
 * @returns {news}
 */
function editPostQueue(req, res, next) {
  verifyToken(req, res, next)
    .then(() => {
      req.body.editedAt = new Date(); // eslint-disable-line no-param-reassign
      QueueNewsPost.edit(req.body)
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
 * Get all queue posts
 * @returns {news[]}
 */
function getAllPostsQueue(req, res, next) {
  QueueNewsPost.find()
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

/**
 * Delete queue post
 * @returns {message}
 */
function removePostQueue(req, res) {
  QueueNewsPost.findByIdAndRemove(req.params.queuePostId, (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ message: 'Article (in queue) deleted' });
  });
}

export default {
  loadPost,
  loadPostQueue,
  getPost,
  createPost,
  createPostQueue,
  editPost,
  editPostQueue,
  getAllPosts,
  getAllPostsQueue,
  removePost,
  removePostQueue,
};
