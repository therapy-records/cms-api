const { gql } = require('apollo-server-express');

const schema = gql`
  type CollaboratorOtherUrl {
    url: String
    title: String
  }

  type CollaboratorUrls {
    website: String
    facebook: String
    instagram: String
    twitter: String
    soundcloud: String
    bio: String
    email: String
    phone: String
    other: [CollaboratorOtherUrl]
  }

  type Collaborator {
    _id: ID!
    name: String!
    avatarUrl: String!
    collabOn: [String]!
    role: String
    about: String
    urls: CollaboratorUrls
  }

  type Query {
    collaborators: [Collaborator]
    getCollaborator(_id: ID!): Collaborator
  }
`;

module.exports = schema;
