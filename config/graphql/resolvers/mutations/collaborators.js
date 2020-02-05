const Collaborators = require('../../../../server/models/collaborators.model');
const authCheck = require('../../../../server/utils/authCheck');

const collaboratorsMutationResolvers = {
  async createCollaborator(root, {
    input
  }, context) {
    return authCheck(context,
      Collaborators.createNew(input)
    );
  },

  editCollaborator(root, {
    _id,
    input
  }, context) {
    const editedCollaborator = input;
    editedCollaborator.urlName = input.name.replace(/ /g, '-');

    return authCheck(context,
      Collaborators.findOneAndUpdate({
        _id
      }, editedCollaborator, {
        new: true
      })
    );
  },

  async deleteCollaborator(root, {
    _id
  }, context) {
    return authCheck(context,
      Collaborators.findOneAndRemove({ _id })
    );
  },

  async editCollaboratorOrderNumbers(root, {
    input
  }, context) {
    return authCheck(context,
      Collaborators.updateMultipleOrderNumbers(input.collaborators)
    );
  }
};

module.exports = collaboratorsMutationResolvers;
