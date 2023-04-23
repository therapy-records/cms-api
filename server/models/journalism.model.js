const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Journalism Schema
 */
const Journalism = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  copy: {
    type: String,
    required: true
  },
  image: {
    cloudinaryUrl: {
      type: String,
      required: true
    },
    cloudinaryPublicId: {
      type: String,
      required: true
    }
  },
  releaseDate: {
    type: String,
    required: true
  },
  externalLink: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

Journalism.statics = {
  /**
   * Get single journalism article
   * @param {ObjectId} id - The objectId of the Journalism
   * @returns {Promise<Journalism, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((journalism) => {
        if (journalism) {
          return journalism;
        }
        const err = new APIError('No such journalism article exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  findByCategoryId(categoryId) {
    return this.find({ categoryId })
      .exec()
      .then((press) => {
        if (press) {
          return press;
        }
        const err = new APIError('No such journalism category exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((journalismUpdated) => {
        if (journalismUpdated) {
          return journalismUpdated;
        }
        const err = new APIError('Error saving journalism', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef Journalism
 */
module.exports = mongoose.model('journalisms', Journalism);
