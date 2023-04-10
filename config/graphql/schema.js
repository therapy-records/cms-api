const { gql } = require('apollo-server-express');

const schema = gql`
  type ImageObject {
    cloudinaryUrl: String
    cloudinaryPublicId: String
  }

  input ImageObjectInput {
    cloudinaryUrl: String
    cloudinaryPublicId: String
  }

  type NewsImageObject {
    cloudinaryUrl: String
    cloudinaryPublicId: String
  }

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
    avatar: ImageObject!
    collabOn: [String]!
    role: String!
    orderNumber: String!
    urlName: String!
    about: String
    urls: CollaboratorUrls
  }

  type NextCollaborator {
    name: String!
    urlName: String!
  }

  type CollaboratorByName {
    _id: ID!
    name: String!
    avatar: ImageObject!
    collabOn: [String]!
    role: String!
    orderNumber: String!
    urlName: String!
    about: String
    urls: CollaboratorUrls
    nextCollaborator: NextCollaborator
  }

  type CollaboratorOrderNumbers {
    _id: ID!
    orderNumber: String!
  }

  type Press {
    _id: ID!
    author: String!
    categoryId: Int
    title: String!
    excerpt: String!
    externalLink: String!
    releaseDate: String!
    image: ImageObject
  }

  input PressInput {
    author: String!
    categoryId: String!
    title: String!
    excerpt: String!
    externalLink: String!
    releaseDate: String!
    image: ImageObjectInput!
  }

  type NewsArticleSection {
    _id: ID,
    copy: String
    images: [NewsImageObject]
    videoEmbed: String
  }

  type NewsArticle {
    _id: ID!
    title: String!
    urlTitle: String
    createdAt: String
    sections: [NewsArticleSection]
  }

  type Journalism {
    _id: ID!
    title: String!
    copy: String
    externalLink: String
    image: ImageObject
    releaseDate: String
    categoryId: Int!
  }

  type Gig {
    _id: ID!
    title: String
    location: String!
    venue: String!
    date: String!
    ticketsUrl: String
  }

  type GigsYear {
    year: String
    gigs: [Gig]
  }

  type CloudinarySignature {
    key: String!,
    signature: String!,
    timestamp: String!
  }
  
  type CloudinaryUpload {
    publicId: String!,
    url: String!
  }

  type CloudinaryDelete {
    success: String!
  }

  type Query {
    collaborators: [Collaborator],
    collaborator(_id: ID!): Collaborator,
    collaboratorByName(name: String!): CollaboratorByName,

    gigs: [Gig],
    gig(_id: ID!): Gig,
    gigsByYear: [GigsYear]

    journalism: [Journalism],
    news: [NewsArticle],
    newsArticleByUrlTitle(urlTitle: String!): NewsArticle

    press: [Press],
    pressCategory(categoryId: ID!): [Press],
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
    avatar: ImageObjectInput!
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

  input CloudinaryUploadInput {
    image: String!
  }

  input CloudinaryDeleteInput {
    publicId: String!
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

    cloudinaryUpload(input: CloudinaryUploadInput): CloudinaryUpload
    cloudinaryDelete(input: CloudinaryDeleteInput): CloudinaryDelete
  }
`;

module.exports = schema;
