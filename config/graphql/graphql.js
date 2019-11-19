const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const graphql = new ApolloServer({
  typeDefs,
  resolvers
});

module.exports = graphql;
