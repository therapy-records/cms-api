const Press = require('../../../../server/models/press.model');
const { pressReducer } = require('../../reducers');

const PressQueryResolvers = {
  async press() {
    const articles = await Press.find();

    const sortedArticles = articles.sort((a, b) =>
      new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();


    const mapped = pressReducer(sortedArticles);
    return mapped;
  },
  async pressArticle(root, {
    _id
  }) {
    return await Press.findById(_id);
  }
};

module.exports = PressQueryResolvers;
