const Collaborators = require('../../server/models/collaborators.model');

const resolvers = {
  Query: {
    async collaborators() {
      return await Collaborators.find();
    },
    async getCollaborator(root, {
      _id
    }) {
      return await Collaborators.findById(_id);
    }
  }
};

module.exports = resolvers;
