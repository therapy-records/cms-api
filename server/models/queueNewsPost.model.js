import mongoose from 'mongoose';
import NewsSchema from './newsSchema';

const queueNewsPostSchema = NewsSchema({ // eslint-disable-line new-cap
  scheduledTime: {
    type: Date,
    required: true
  }
}, 'newsPostQueue');

/**
 * @typedef Post
 */
export default mongoose.model('queueNewsPost', queueNewsPostSchema);
