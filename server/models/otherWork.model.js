const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Other Work Schema
 */
const OtherWork = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  copy: {
    type: String,
    required: true
  },
  mainImageUrl: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  },
  externalLink: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

OtherWork.statics = {
  /**
   * Get single other work article
   * @param {ObjectId} id - The objectId of the OtherWork
   * @returns {Promise<OtherWork, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((otherWork) => {
        if (otherWork) {
          return otherWork;
        }
        const err = new APIError('No such other work article exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((otherWorkUpdated) => {
        if (otherWorkUpdated) {
          return otherWorkUpdated;
        }
        const err = new APIError('Error saving other work', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};


/**
 * @typedef OtherWork
 */
module.exports = mongoose.model('OtherWork', OtherWork);
