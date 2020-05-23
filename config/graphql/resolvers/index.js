const cloudinaryQueryResolvers = require('./queries/cloudinary');
const collaboratorsQueryResolvers = require('./queries/collaborators');
const gigsQueryResolvers = require('./queries/gigs');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const pressQueryResolvers = require('./queries/press');

const cloudinaryMutationResolvers = require('./mutations/cloudinary');
const collaboratorsMutationResolvers = require('./mutations/collaborators');
const gigsMutationResolvers = require('./mutations/gigs');
const pressMutationResolvers = require('./mutations/press');

const resolvers = {
  Query: {
    ...cloudinaryQueryResolvers,
    ...collaboratorsQueryResolvers,
    ...gigsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers,
    ...pressQueryResolvers
  },
  Mutation: {
    ...cloudinaryMutationResolvers,
    ...collaboratorsMutationResolvers,
    ...gigsMutationResolvers,
    ...pressMutationResolvers
  }
};

module.exports = resolvers;
