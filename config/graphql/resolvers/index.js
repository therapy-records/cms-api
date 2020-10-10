const cloudinaryQueryResolvers = require('./queries/cloudinary');
const collaboratorsQueryResolvers = require('./queries/collaborators');
const galleryQueryResolvers = require('./queries/gallery');
const gigsQueryResolvers = require('./queries/gigs');
const journalismQueryResolvers = require('./queries/journalism');
const newsQueryResolvers = require('./queries/news');
const pressQueryResolvers = require('./queries/press');

const cloudinaryMutationResolvers = require('./mutations/cloudinary');
const collaboratorsMutationResolvers = require('./mutations/collaborators');
const galleryMutationResolvers = require('./mutations/gallery');
const gigsMutationResolvers = require('./mutations/gigs');
const pressMutationResolvers = require('./mutations/press');

const resolvers = {
  Query: {
    ...cloudinaryQueryResolvers,
    ...collaboratorsQueryResolvers,
    ...galleryQueryResolvers,
    ...gigsQueryResolvers,
    ...journalismQueryResolvers,
    ...newsQueryResolvers,
    ...pressQueryResolvers
  },
  Mutation: {
    ...cloudinaryMutationResolvers,
    ...collaboratorsMutationResolvers,
    ...galleryMutationResolvers,
    ...gigsMutationResolvers,
    ...pressMutationResolvers
  }
};

module.exports = resolvers;
