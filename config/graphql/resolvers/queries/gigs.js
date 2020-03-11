const Gigs = require('../../../../server/models/gigs.model');

const gigsQueryResolvers = {
  async gigs() {
    return await Gigs.find();
  },
  async gig(root, {
    _id
  }) {
    return await Gigs.findById(_id);
  }
};

module.exports = gigsQueryResolvers;
