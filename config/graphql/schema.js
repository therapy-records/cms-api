const { gql } = require('apollo-server-express');

const schema = gql`
  type Collaborator {
    id: ID
    name: String
  }

  type Query {
    collaborators: [Collaborator]
  }
`;

module.exports = schema;
