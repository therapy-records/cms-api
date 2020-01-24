const Collaborators = require('../../../../server/models/collaborators.model');

const collaboratorsMutationResolvers = {
  async createCollaborator(root, {
    input
  }) {
    return await Collaborators.create({
      ...input,
      urlName: input.name.replace(/ /g, '-')
    });
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
  }
};

module.exports = collaboratorsMutationResolvers;
