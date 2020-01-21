const collaboratorsQueryResolvers = require('./queries/collaborators');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const collaboratorsMutationResolvers = require('./mutations/collaborators');

const resolvers = {
  Query: {
    ...collaboratorsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers
  },
  Mutation: {
    ...collaboratorsMutationResolvers
  }
};

module.exports = resolvers;
