import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const NewsPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subHeading: {
    type: String,
    required: true
  },
  body: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  editedAt: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String
  }
});

/**
 * Statics
 */
NewsPostSchema.statics = {
  /**
   * Get single news post
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
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
  }
};

/**
 * @typedef User
 */
export default mongoose.model('NewsPost', NewsPostSchema);
