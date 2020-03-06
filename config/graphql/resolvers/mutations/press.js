const Press = require('../../../../server/models/press.model');
const authCheck = require('../../../../server/utils/authCheck');

const PressMutationResolvers = {
  async createPress(root, {
    input
  }, context) {
    return authCheck(context,
      Press.createNew(input)
    );
  },

  editPress(root, {
    _id,
    input
  }, context) {
    const editedPress = input;

    return authCheck(context,
      Press.findOneAndUpdate({
        _id
      }, editedPress, {
        new: true
      })
    );
  },

  async deletePress(root, {
    _id
  }, context) {
    return authCheck(context,
      Press.findOneAndRemove({ _id })
    );
  },

};

module.exports = PressMutationResolvers;
