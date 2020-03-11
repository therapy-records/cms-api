const collaboratorsQueryResolvers = require('./queries/collaborators');
const gigsQueryResolvers = require('./queries/gigs');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const pressQueryResolvers = require('./queries/press');

const collaboratorsMutationResolvers = require('./mutations/collaborators');
const gigsMutationResolvers = require('./mutations/gigs');
const pressMutationResolvers = require('./mutations/press');

const resolvers = {
  Query: {
    ...collaboratorsQueryResolvers,
    ...gigsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers,
    ...pressQueryResolvers
  },
  Mutation: {
    ...collaboratorsMutationResolvers,
    ...gigsMutationResolvers,
    ...pressMutationResolvers
  }
};

module.exports = resolvers;
