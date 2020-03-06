const collaboratorsQueryResolvers = require('./queries/collaborators');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const pressQueryResolvers = require('./queries/press');
const collaboratorsMutationResolvers = require('./mutations/collaborators');
const pressMutationResolvers = require('./mutations/press');

const resolvers = {
  Query: {
    ...collaboratorsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers,
    ...pressQueryResolvers
  },
  Mutation: {
    ...collaboratorsMutationResolvers,
    ...pressMutationResolvers
  }
};

module.exports = resolvers;
