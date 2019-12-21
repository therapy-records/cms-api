const Collaborators = require('../../server/models/collaborators.model');
const News = require('../../server/models/news.model');
const Journalism = require('../../server/models/journalism.model');

const resolvers = {
  Query: {
    async collaborators() {
      return await Collaborators.find();
    },
    async collaborator(root, {
      _id
    }) {
      return await Collaborators.findById(_id);
    },
    async news() {
      return await News.find();
    },
    async journalism() {
      return await Journalism.find();
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
