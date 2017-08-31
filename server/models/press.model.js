import mongoose from 'mongoose';

/**
 * Press Schema
 */
const PressSchema = new mongoose.Schema({
  author: {
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
  externalLink: {
    type: String,
    required: true
  }
});

/**
 * @typedef Post
 */
export default mongoose.model('Press', PressSchema);
