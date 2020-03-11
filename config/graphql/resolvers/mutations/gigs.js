const Gigs = require('../../../../server/models/gigs.model');
const authCheck = require('../../../../server/utils/authCheck');

const gigsMutationResolvers = {
  async createGig(root, {
    input
  }, context) {
    return authCheck(context,
      Gigs.createNew(input)
    );
  },

  editGig(root, {
    _id,
    input
  }, context) {
    const editedGig = input;

    return authCheck(context,
      Gigs.findOneAndUpdate({
        _id
      }, editedGig, {
        new: true
      })
    );
  },

  async deleteGig(root, {
    _id
  }, context) {
    return authCheck(context,
      Gigs.findOneAndRemove({ _id })
    );
  },

};

module.exports = gigsMutationResolvers;
