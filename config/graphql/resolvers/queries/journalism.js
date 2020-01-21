const Journalism = require('../../../../server/models/journalism.model');

const journalismQueryResolvers = {
  async journalism() {
    return await Journalism.find();
  }
};

module.exports = journalismQueryResolvers;
