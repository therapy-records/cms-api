const Collaborators = require('../../../../server/models/collaborators.model');

const collaboratorsQueryResolvers = {
  async collaborators() {
    return await Collaborators.find();
  },
  async collaborator(root, {
    _id
  }) {
    return await Collaborators.findById(_id);
  },
  async collaboratorByName(root, {
    name
  }) {
    return await Collaborators.findByName(name);
  }
};

module.exports = collaboratorsQueryResolvers;
