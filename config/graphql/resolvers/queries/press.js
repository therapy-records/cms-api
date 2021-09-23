const Press = require('../../../../server/models/press.model');
const { pressReducer } = require('../../reducers');

const PressQueryResolvers = {
  async press() {
    const articles = await Press.find();

    const mapped = articles.map(a => pressReducer(a));
    return mapped;
  },
  async pressArticle(root, {
    _id
  }) {
    return await Press.findById(_id);
  }
};

module.exports = PressQueryResolvers;
