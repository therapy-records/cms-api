const { gql } = require('apollo-server-express');

const schema = gql`
  type CollaboratorUrls {
    website: String
    facebook: String
    instagram: String
    twitter: String
    soundcloud: String
    bandcamp: String
    bio: String
    email: String
    phone: String
  }

  type Collaborator {
    _id: ID!
    name: String!
    avatarUrl: String!
    collabOn: [String]!
    role: String!
    orderNumber: Int!
    about: String
    urls: CollaboratorUrls
  }

  type CollaboratorOrderNumbers {
    _id: ID!
    orderNumber: Int!
  }

  type News {
    _id: ID!
    title: String!
  }

  type Journalism {
    _id: ID!
    title: String!
  }

  type Query {
    collaborators: [Collaborator]
    collaborator(_id: ID!): Collaborator
    news: [News],
    journalism: [Journalism]
  }

  input CollaboratorUrlsInput {
    website: String
    facebook: String
    instagram: String
    twitter: String
    soundcloud: String
    bandcamp: String
    bio: String
    email: String
    phone: String
  }

  input CollaboratorInput {
    name: String!
    avatarUrl: String!
    collabOn: [String]!
    role: String!
    orderNumber: Int!
    about: String
    urls: CollaboratorUrlsInput
  }

  input CollaboratorOrderNumbersCollaboratorInput {
    _id: ID!
    orderNumber: Int!
  }

  input CollaboratorOrderNumbersInput {
    collaborators: [CollaboratorOrderNumbersCollaboratorInput]!
  }

  type Mutation {
    createCollaborator(input: CollaboratorInput): Collaborator,
    editCollaborator(
      _id: ID!,
      input: CollaboratorInput
    ): Collaborator,
    deleteCollaborator(_id: ID!): Collaborator,
    editCollaboratorOrderNumbers(input: CollaboratorOrderNumbersInput): [CollaboratorOrderNumbers]
  }
`;

module.exports = schema;
