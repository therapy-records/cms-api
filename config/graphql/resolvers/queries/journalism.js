const Journalism = require('../../../../server/models/journalism.model');

const journalismQueryResolvers = {
  async journalism() {
    return await Journalism.find();
  },
  async journalismCategory(root, {
    categoryId
  }) {
    const articles = await Journalism.findByCategoryId(categoryId);

    const sortedArticles = articles.sort((a, b) =>
      new Date(a.releaseDate) - new Date(b.releaseDate)).reverse();

    return sortedArticles;
  },
};

module.exports = journalismQueryResolvers;
