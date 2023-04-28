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

    const mappedArticles = sortedArticles.map((article) => {
      if (!article.image) {
        return {
          ...article,
          image: {
            cloudinaryUrl: ''
          }
        };
      }

      return article;
    });

    return mappedArticles;
  },
};

module.exports = journalismQueryResolvers;
