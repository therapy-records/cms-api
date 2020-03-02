const Press = require('../../../../server/models/press.model');

const PressQueryResolvers = {
  async press() {
    return await Press.find();
  },
  async pressArticle(root, {
    _id
  }) {
    return await Press.findById(_id);
  }
};

module.exports = PressQueryResolvers;
