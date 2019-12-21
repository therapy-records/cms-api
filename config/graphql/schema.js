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
    role: String!
    about: String
    urls: CollaboratorUrls
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

  input CollaboratorInput {
    name: String!
    avatarUrl: String!
    collabOn: [String]!
    role: String!
    about: String
  }

  type Mutation {
    createCollaborator(input: CollaboratorInput): Collaborator,
    editCollaborator(
      _id: ID!,
      input: CollaboratorInput
    ): Collaborator,
    deleteCollaborator(_id: ID!): Collaborator
  }
`;

module.exports = schema;
