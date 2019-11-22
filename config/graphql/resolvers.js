const Collaborators = require('../../server/models/collaborators.model');

const resolvers = {
  Query: {
    async collaborators() {
      return await Collaborators.find();
    },
    async collaborator(root, {
      _id
    }) {
      return await Collaborators.findById(_id);
    }
  },
  Mutation: {
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
  }
};

module.exports = resolvers;
