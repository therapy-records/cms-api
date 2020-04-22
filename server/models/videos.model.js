const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Schema = mongoose.Schema;

const VideosSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    String,
    required: true
  },
  date: {
    String,
    required: true
  }
});


// if these are the functions where are a
VideosSchema.statics = {
  async createNew(obj) {
    return this.create(obj)
      .then((video) => {
        if (video) {
          return video;
        }
        const err = new APIError('Error creating video', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },


  getSingle(id) {
    return this.findById(id)
      .exec()
      .then((video) => {
        if (video) {
          return video;
        }
        const err = new APIError('No such video exists', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  edit(obj) {
    return this.findOneAndUpdate({ _id: obj._id },
      obj, { new: true })
      .exec()
      .then((updatedvideo) => {
        if (updatedvideo) {
          return updatedvideo;
        }
        const err = new APIError('Error saving video', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};

/**
 * @typedef video
 */

export default mongoose.model('videos', VideosSchema);
