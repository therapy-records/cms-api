const { ApolloServer } = require('apollo-server-express');
const { print } = require('graphql');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

/* eslint-disable class-methods-use-this */
class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables }) {
    const query = queryString || print(parsedQuery);
    console.log('GQL query', query);
    console.log('GQL vars', JSON.stringify(variables));
  }

  willSendResponse({ graphqlResponse }) {
    console.log('GQL res', JSON.stringify(graphqlResponse));
  }
}
/* eslint-enable class-methods-use-this */


const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: ({ message, path }) => ({
    message,
    path
  }),
  extensions: [() => new BasicLogging()]
});

module.exports = graphql;
