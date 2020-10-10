const Gallery = require('../../../../server/models/gallery.model');

const galleryQueryResolvers = {
  async gallery() {
    return await Gallery.find();
  },
  async galleryImage(root, {
    _id
  }) {
    return await Gallery.findById(_id);
  }
};

module.exports = galleryQueryResolvers;
