const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: ({ message, path }) => ({
    message,
    path
  })
});

module.exports = graphql;
