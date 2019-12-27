const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema; // eslint-disable-line no-unused-vars

/**
 * Gigs Schema
 */
const GigsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  ticketsUrl: {
    type: String,
    required: true
  }
});

GigsSchema.statics = {
  /**
   * Get single gig
   * @param {ObjectId} id - The objectId of gig.
   * @returns {Promise<Gig, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((gig) => {
        if (gig) {
          return gig;
        }
        const err = new APIError('No such gig exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedGig) => {
        if (updatedGig) {
          return updatedGig;
        }
        const err = new APIError('Error saving gig', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};

/**
 * @typedef Gig
 */
module.exports = mongoose.model('gigs', GigsSchema);
