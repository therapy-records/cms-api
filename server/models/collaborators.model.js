const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * Collaborator Schema
 */
const CollaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  avatarUrl: {
    type: String,
    required: true
  },
  urls: {
    website: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },
    soundcloud: {
      type: String
    },
    bandcamp: {
      type: String
    },
    bio: {
      type: String
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  collabOn: {
    type: Array
  }
});

CollaboratorSchema.statics = {
  /**
   * Get single collaborator
   * @param {ObjectId} id - The objectId of collaborator.
   * @returns {Promise<Collaborator, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((collab) => {
        if (collab) {
          return collab;
        }
        const err = new APIError('No such collaborator exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedCollab) => {
        if (updatedCollab) {
          return updatedCollab;
        }
        const err = new APIError('Error saving collaborator', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};

/**
 * @typedef Collaborator
 */
module.exports = mongoose.model('collaborators', CollaboratorSchema);
