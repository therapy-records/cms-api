const collaboratorsQueryResolvers = require('./queries/collaborators');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const gigsQueryResolvers = require('./queries/gigs');
const collaboratorsMutationResolvers = require('./mutations/collaborators');
const gigsMutationResolvers = require('./mutations/gigs');

const resolvers = {
  Query: {
    ...collaboratorsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers,
    ...gigsQueryResolvers
  },
  Mutation: {
    ...collaboratorsMutationResolvers,
    ...gigsMutationResolvers
  }
};

module.exports = resolvers;
