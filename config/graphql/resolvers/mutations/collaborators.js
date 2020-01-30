const Collaborators = require('../../../../server/models/collaborators.model');

const collaboratorsMutationResolvers = {
  async createCollaborator(root, {
    input
  }) {
    return await Collaborators.createNew(input);
  },

  async editCollaborator(root, {
    _id,
    input
  }) {
    const editedCollaborator = input;
    editedCollaborator.urlName = input.name.replace(/ /g, '-');

    return await Collaborators.findOneAndUpdate({
      _id
    }, editedCollaborator, {
      new: true
    });
  },

  async deleteCollaborator(root, {
    _id
  }) {
    return await Collaborators.findOneAndRemove({ _id });
  },

  async editCollaboratorOrderNumbers(root, {
    input
  }) {
    return await Collaborators.updateMultipleOrderNumbers(input.collaborators);
  }
};

module.exports = collaboratorsMutationResolvers;
