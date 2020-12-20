const Gallery = require('../../../../server/models/gallery.model');
const Collaborators = require('../../../../server/models/collaborators.model');

const galleryQueryResolvers = {
  async gallery() {
    return await Gallery.find();
  },
  async galleryImage(root, {
    _id
  }) {
    return await Gallery.findById(_id);
  },
  async galleryImageWithCollaboratorNames(root, {
    _id
  }) {
    return await Gallery.getSingleWithCollaboratorNames(_id);
  },
  async galleryImageWithAllCollaborators(root, {
    _id
  }) {
    const galleryImage = await Gallery.getSingleWithCollaboratorNames(_id);
    const collaborators = await Collaborators.find();

    return {
      ...galleryImage,
      collaborators
    };
  },
};

module.exports = galleryQueryResolvers;
