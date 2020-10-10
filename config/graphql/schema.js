const { gql } = require('apollo-server-express');

const schema = gql`
  type ImageObject {
    cloudinaryUrl: String!
    cloudinaryPublicId: String!
  }

  input ImageObjectInput {
    cloudinaryUrl: String!
    cloudinaryPublicId: String!
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

  type CollaboratorOrderNumbers {
    _id: ID!
    orderNumber: String!
  }

  type GalleryImageObj {
    cloudinaryUrl: String!
    cloudinaryPublicId: String!
  }

  type GalleryImage {
    _id: ID!
    image: GalleryImageObj!
  }

  input GalleryImageObjInput {
    cloudinaryUrl: String!
    cloudinaryPublicId: String!
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
    image: ImageObject!
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

    gallery: [GalleryImage],
    galleryImage(_id: ID!): GalleryImage,

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

  input GalleryInput {
    image: GalleryImageObjInput!
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

    createGalleryImage(input: GalleryInput): GalleryImage,
    editGalleryImage(
      _id: ID!,
      input: GalleryInput
    ): GalleryImage,

    deleteGalleryImage(_id: ID!): GalleryImage,

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
