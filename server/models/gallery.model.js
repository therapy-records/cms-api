const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * Gallery Schema
 */
const GallerySchema = new mongoose.Schema({
  image: {
    cloudinaryUrl: {
      type: String,
      required: true
    },
    cloudinaryPublicId: {
      type: String,
      required: true
    }
  }
}, {
  collection: 'gallery'
});

GallerySchema.statics = {
  async createNew(obj) {
    return this.create(obj)
      .then((galleryImage) => {
        if (galleryImage) {
          return galleryImage;
        }
        const err = new APIError('Error uploading gallery image', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((galleryImage) => {
        if (galleryImage) {
          return galleryImage;
        }
        const err = new APIError('No such gallery image exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    obj.urlName = obj.name.replace(/ /g, '-'); // eslint-disable-line no-param-reassign
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedGalleryImage) => {
        if (updatedGalleryImage) {
          return updatedGalleryImage;
        }
        const err = new APIError('Error saving gallery image', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

};

/**
 * @typedef Gallery
 */
module.exports = mongoose.model('gallery', GallerySchema);
