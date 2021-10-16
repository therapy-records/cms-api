const Gigs = require('../../../../server/models/gigs.model');
const gigsByYearReducer = require('../reducers/gigsByYear');

const gigsQueryResolvers = {
  async gigs() {
    return await Gigs.find();
  },
  async gig(root, {
    _id
  }) {
    return await Gigs.findById(_id);
  },
  async gigsByYear() {
    const gigs = await Gigs.find();

    const mapped = gigsByYearReducer(gigs);

    return mapped;
  },
};

module.exports = gigsQueryResolvers;
