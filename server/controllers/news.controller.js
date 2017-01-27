import News from '../models/news.model';

/**
 * Load news and append to req.
 */
function loadPost(req, res, next, id) {
  News.getPost(id)
    .then((news) => {
      req.news = news; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get news
 * @returns {news}
 */
function getPost(req, res) {
  return res.json(req.news);
}

/**
 * Create new news
 * @property {string} req.body.newsname - The newsname of news.
 * @property {string} req.body.mobileNumber - The mobileNumber of news.
 * @returns {news}
 */
function createPost(req, res, next) {
  const news = new News({
    title: req.body.title,
    subHeading: req.body.subHeading,
    mainBody: req.body.mainBody,
    createdAt: new Date()
    // editedAt: req.body.editedAt
  });

  news.save()
    .then(savednews => res.json(savednews))
    .catch(e => next(e));
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
 * Get news list.
 * @property {number} req.query.skip - Number of news to be skipped.
 * @property {number} req.query.limit - Limit number of newss to be returned.
 * @returns {news[]}
 */
function getAllPosts(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  News.list({ limit, skip })
    .then(newss => res.json(newss))
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
