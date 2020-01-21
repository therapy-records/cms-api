const News = require('../../../../server/models/news.model');

const newsQueryResolvers = {
  async news() {
    return await News.find();
  }
};

module.exports = newsQueryResolvers;
