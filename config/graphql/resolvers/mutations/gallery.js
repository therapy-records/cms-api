const Gallery = require('../../../../server/models/gallery.model');
const authCheck = require('../../../../server/utils/authCheck');

const galleryMutationResolvers = {
  async createGalleryImages(root, {
    input
  }, context) {
    return authCheck(context,
      Gallery.createNew(input.images)
    );
  },

  async deleteGalleryImage(root, {
    _id
  }, context) {
    return authCheck(context,
      Gallery.findOneAndRemove({ _id })
    );
  }
};

module.exports = galleryMutationResolvers;
