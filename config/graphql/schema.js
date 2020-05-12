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
    orderNumber: String!
    urlName: String!
    about: String
    urls: CollaboratorUrls
  }

  type CollaboratorOrderNumbers {
    _id: ID!
    orderNumber: String!
  }

  type Press {
    _id: ID!
    author: String!
    title: String!
    excerpt: String!
    externalLink: String!
    releaseDate: String!
  }

  input PressInput {
    author: String!
    title: String!
    excerpt: String!
    externalLink: String!
    releaseDate: String!
  }

  type News {
    _id: ID!
    title: String!
  }

  type Journalism {
    _id: ID!
    title: String!
  }

  type Gig {
    _id: ID!
    title: String
    location: String!
    venue: String!
    date: String!
    ticketsUrl: String
  }

  type CloudinarySignature {
    key: String!,
    signature: String!,
    timestamp: String!,
  }

  type Query {
    collaborators: [Collaborator],
    collaborator(_id: ID!): Collaborator,

    gigs: [Gig],
    gig(_id: ID!): Gig,

    journalism: [Journalism],
    news: [News],

    press: [Press],
    pressArticle(_id: ID!): Press,

    cloudinarySignature: CloudinarySignature
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
    orderNumber: Int
    urlName: String
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

  input GigInput {
    title: String!
    location: String!
    venue: String!
    date: String!
    ticketsUrl: String
  }

  type Mutation {
    createCollaborator(input: CollaboratorInput): Collaborator,
    editCollaborator(
      _id: ID!,
      input: CollaboratorInput
    ): Collaborator,
    deleteCollaborator(_id: ID!): Collaborator,
    editCollaboratorOrderNumbers(input: CollaboratorOrderNumbersInput): [CollaboratorOrderNumbers],

    createGig(input: GigInput): Gig,
    editGig(
      _id: ID!,
      input: GigInput
    ): Gig,
    deleteGig(_id: ID!): Gig

    createPress(input: PressInput): Press,
    editPress(
      _id: ID!,
      input: PressInput
    ): Press,
    deletePress(_id: ID!): Press,
  }
`;

module.exports = schema;
