const News = require('../../../../server/models/news.model');

const newsQueryResolvers = {
  async news() {
    return await News.find();
  },
  async newsArticleByUrlTitle(root, {
    urlTitle
  }) {
    return await News.findByUrlTitle(urlTitle);
  }
};

module.exports = newsQueryResolvers;
