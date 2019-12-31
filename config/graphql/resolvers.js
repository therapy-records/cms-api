const { UserInputError } = require('apollo-server-express');
const Collaborators = require('../../server/models/collaborators.model');
const News = require('../../server/models/news.model');
const Journalism = require('../../server/models/journalism.model');

const isEmptyString = str => str === ""; // eslint-disable-line quotes

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
    // async createCollaborator(root, {
    //   input
    // }) {
    //   console.log('***** mutation input \n', input);
    //   return await Collaborators.create(input);
    // },

    async createCollaborator(root, {
      input
    }) {
      const {
        name,
        about,
        collabOn,
        role
      } = input;

      const errors = [];
      if (!name || isEmptyString(name)) {
        errors.push('Name is required');
      }

      if (!role || isEmptyString(role)) {
        errors.push('Role is required');
      }

      if (!about || isEmptyString(about)) {
        errors.push('About is required');
      }

      if (!collabOn || collabOn.length < 1) {
        errors.push('CollabOn is required');
      }

      if (errors.length) {
        let errString = '';
        errors.map((e) => {
          errString = `${errString} ${e}`;
          return e;
        });

        throw new UserInputError(errString);
      }

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
