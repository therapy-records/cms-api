const { ApolloServer } = require('apollo-server-express');
const { print } = require('graphql');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

/* eslint-disable class-methods-use-this */
class BasicLogging {
  requestDidStart({ queryString, parsedQuery, variables }) {
    const query = queryString || print(parsedQuery);
    console.log('GQL query', query); // eslint-disable-line no-console
    console.log('GQL vars', JSON.stringify(variables)); // eslint-disable-line no-console
  }

  willSendResponse({ graphqlResponse }) {
    console.log('GQL res', JSON.stringify(graphqlResponse)); // eslint-disable-line no-console
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
