const Collaborators = require('../../../../server/models/collaborators.model');

const collaboratorsMutationResolvers = {
  async createCollaborator(root, {
    input
  }) {
    return await Collaborators.create(input);
  },
  async editCollaborator(root, {
    _id,
    input
  }) {
    return await Collaborators.findOneAndUpdate({
      _id
    }, input, {
      new: true
    });
  },
  async deleteCollaborator(root, {
    _id
  }) {
    return await Collaborators.findOneAndRemove({ _id });
  }
};

module.exports = collaboratorsMutationResolvers;
