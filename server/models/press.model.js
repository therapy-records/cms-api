const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Press Schema
 */
const PressSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  categoryId: {
    type: Number,
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  externalLink: {
    type: String,
    required: true
  },
  releaseDate: {
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
  }
});

PressSchema.statics = {
  async createNew(obj) {
    return this.create(obj)
      .then((press) => {
        if (press) {
          return press;
        }
        const err = new APIError('Error creating press', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((press) => {
        if (press) {
          return press;
        }
        const err = new APIError('No such press exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedPress) => {
        if (updatedPress) {
          return updatedPress;
        }
        const err = new APIError('Error saving press', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};


/**
 * @typedef Press
 */
module.exports = mongoose.model('press', PressSchema);
