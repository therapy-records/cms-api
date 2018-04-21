const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const NewsSchema = require('./newsSchema');

const QueueNewsPostSchema = NewsSchema({ // eslint-disable-line new-cap
  scheduledTime: {
    type: Date,
    required: true
  }
}, 'newsPostQueue');

QueueNewsPostSchema.statics = {
  /**
   * Get single news post
   * @param {ObjectId} id - The objectId of post.
   * @returns {Promise<Post, APIError>}
   */
  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((post) => {
        if (post) {
          return post;
        }
        const err = new APIError('No such post exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },
  /**
   * Edit single news post
   * @param {ObjectId} id - The objectId of post.
   * @returns {Promise<Post, APIError>}
   */
  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedPost) => {
        if (updatedPost) {
          return updatedPost;
        }
        const err = new APIError('Error saving post', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }
};

/**
 * @typedef QueuePost
 */
module.exports = mongoose.model('queueNewsPost', QueueNewsPostSchema);
