import mongoose from 'mongoose';
import NewsSchema from './newsSchema';

const newsQueueSchema = NewsSchema({ // eslint-disable-line new-cap
  scheduledTime: {
    type: Date,
    required: true
  }
});

/**
 * @typedef Post
 */
export default mongoose.model('PostQueue', newsQueueSchema);
