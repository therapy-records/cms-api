const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const Collaborators = require('./collaborators.model');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * Gallery Schema
 */
const GallerySchema = new mongoose.Schema({
  cloudinaryUrl: {
    type: String,
    required: true
  },
  cloudinaryPublicId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  collaboratorsInImage: {
    type: Array
  }
}, {
  collection: 'gallery'
});

GallerySchema.statics = {
  createNew(imagesArray) {
    return this.insertMany(imagesArray, (error, savedImages) => {
      if (error) {
        const err = new APIError('Error saving gallery images', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      }

      return Promise.each(savedImages, (imageObj) => {
        const { collaboratorsInImage } = imageObj;

        return Promise.each(collaboratorsInImage, collabId =>
          Collaborators.findOneAndUpdate({ _id: collabId },
            { $push: { imageTags: imageObj._id } },
            { new: true }
          ).exec((collabError) => {
            if (collabError) {
              const err = new APIError(`Error adding imageTags to collaborator: ${collabId}`, httpStatus.NOT_FOUND);
              return Promise.reject(err);
            }
            return imageObj;
          })
        );
      });
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

  async getSingleWithCollaboratorNames(id) {
    const allCollaborators = await Collaborators.find({});

    return this.findById(id)
      .exec()
      .then((galleryImage) => {
        if (!galleryImage) {
          const err = new APIError('No such gallery image exists', httpStatus.NOT_FOUND);
          return Promise.reject(err);
        }

        const mapCollaboratorsInImage = collabIdArray =>
          collabIdArray.map(collabId =>
            allCollaborators.find(c => String(c._id) === String(collabId))
          );

        return {
          _id: galleryImage._id,
          cloudinaryUrl: galleryImage.cloudinaryUrl,
          cloudinaryPublicId: galleryImage.cloudinaryPublicId,
          description: galleryImage.description,
          collaboratorsInImage: mapCollaboratorsInImage(galleryImage.collaboratorsInImage)
        };
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
