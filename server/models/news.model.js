import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  bodyMain: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date
  },
  editedAt: {
    type: Date
  },
  ticketsLink: {
    type: String
  },
  venueLink: {
    type: String
  },
  videoEmbed: {
    type: String
  },
  mainImageUrl: {
    type: String
  },
  miniGalleryImages: {
    type: Array
  }
});

/**
 * Statics
 */
NewsSchema.statics = {
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
 * @typedef Post
 */
export default mongoose.model('Post', NewsSchema);
